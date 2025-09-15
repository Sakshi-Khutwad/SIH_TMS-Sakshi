import os
import json
import base64
import cv2
import numpy as np
import mediapipe as mp
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from sklearn.metrics.pairwise import cosine_similarity

# --- 1. INITIAL APP SETUP ---

app = FastAPI(
    title="VigiLocker API",
    description="An API for user verification using document details and facial recognition.",
    version="1.0.0"
)

# Allow Cross-Origin Resource Sharing (CORS) for frontend interaction
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# --- 2. PYDANTIC MODELS FOR DATA VALIDATION ---

class VerificationRequest(BaseModel):
    """Defines the structure of the incoming request from the mobile app."""
    name: str
    document_number: str
    photo: str  # Base64 encoded string of the user's photo

class VerificationResponse(BaseModel):
    """Defines the structure of a successful verification response."""
    status: str = "verified"
    user_id: str
    name: str
    similarity: float

# --- 3. LOAD DATABASE AND MODELS ON STARTUP ---

# Load user database and facial landmarks
base_dir = os.getcwd()
photo_dir = os.path.join(base_dir, "photos")

try:
    with open("user_landmarks.json", "r") as f:
        user_landmarks = json.load(f)
except FileNotFoundError:
    raise RuntimeError("user_landmarks.json not found. Please run generate_landmarks.py first.")

# Initialize Mediapipe FaceMesh
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(static_image_mode=True, max_num_faces=1, refine_landmarks=True)

# Dummy database
dummy_users = {
    "USR001": {"name": "Prasanna Patwardhan", "aadhaar": "123456789012", "pan": "ABCDE1234F", "passport": "N1234567"},
    "USR002": {"name": "Yash Kulkarni", "aadhaar": "987654321098", "pan": "PQRSX5678Y", "passport": "M7654321"},
    "USR003": {"name": "Sakshi Khutwad", "aadhaar": "111122223333", "pan": "SAKSH1234M", "passport": "Z7654321"},
    "USR004": {"name": "Yugandhar Chawale", "aadhaar": "444455556666", "pan": "YUGAN5678P", "passport": "Y1234567"},
    "USR005": {"name": "Rahul Dewani", "aadhaar": "777788889999", "pan": "RAHUL8765D", "passport": "X4567890"},
    "USR006": {"name": "Piyush Deshmukh", "aadhaar": "555566667777", "pan": "PIYUSH5678D", "passport": "V1234567"}
}

# Integrate landmarks into the main user database
for user_id, landmarks in user_landmarks.items():
    if user_id in dummy_users:
        dummy_users[user_id]["landmarks"] = landmarks

# --- 4. HELPER FUNCTIONS ---

def normalize_doc(doc: str) -> str:
    """Removes spaces and converts to uppercase for consistent matching."""
    return doc.replace(" ", "").upper().strip()

def extract_key_landmarks(landmarks):
    """Takes Mediapipe landmarks and returns coordinates for key regions."""
    return {
        "left_eye": [(landmarks[i].x, landmarks[i].y, landmarks[i].z) for i in [33, 133]],
        "right_eye": [(landmarks[i].x, landmarks[i].y, landmarks[i].z) for i in [362, 263]],
        "nose": [(landmarks[i].x, landmarks[i].y, landmarks[i].z) for i in [1, 2, 98]],
        "mouth": [(landmarks[i].x, landmarks[i].y, landmarks[i].z) for i in [61, 291]]
    }

# --- 5. API ENDPOINTS ---

@app.get("/")
def home():
    """Root endpoint with a welcome message."""
    return {"message": "Welcome to VigiLocker Prototype API"}

@app.post("/verify", response_model=VerificationResponse)
async def verify_user(payload: VerificationRequest):
    """
    The main verification endpoint. It performs three checks:
    1. Decodes the photo and finds a face.
    2. Matches name and document number in the database.
    3. Compares facial landmarks and checks if similarity is above a threshold.
    """
    # Step 1: Decode Base64 photo and extract landmarks
    try:
        # The photo data might come with a prefix like "data:image/jpeg;base64,"
        if "," in payload.photo:
            photo_data = payload.photo.split(",")[1]
        else:
            photo_data = payload.photo
            
        photo_bytes = base64.b64decode(photo_data)
        photo_array = np.frombuffer(photo_bytes, dtype=np.uint8)
        img = cv2.imdecode(photo_array, cv2.IMREAD_COLOR)

        if img is None:
            raise HTTPException(status_code=400, detail="Invalid photo data. Could not decode image.")

        # Process image with Mediapipe
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = face_mesh.process(rgb_img)

        if not results.multi_face_landmarks:
            raise HTTPException(status_code=400, detail="No face detected in the provided photo.")
        
        # Extract landmark embeddings from the detected face
        live_landmarks = results.multi_face_landmarks[0]
        live_embeddings = extract_key_landmarks(live_landmarks.landmark)

    except Exception as e:
        # Catches base64 decoding errors or other processing issues
        raise HTTPException(status_code=400, detail=f"Failed to process photo: {str(e)}")

    # Step 2: Find the user in the database
    normalized_doc = normalize_doc(payload.document_number)
    user_name = payload.name.strip().lower()
    
    found_user = None
    found_user_id = None

    for user_id, user_data in dummy_users.items():
        if user_data["name"].lower() == user_name and (
            normalize_doc(user_data["aadhaar"]) == normalized_doc or
            normalize_doc(user_data["pan"]) == normalized_doc or
            normalize_doc(user_data["passport"]) == normalized_doc
        ):
            found_user = user_data
            found_user_id = user_id
            break

    if not found_user:
        raise HTTPException(status_code=404, detail="User not found with the provided name and document number.")

    # Step 3: Compare facial landmarks
    stored_embeddings = found_user.get("landmarks")
    if not stored_embeddings:
        raise HTTPException(status_code=500, detail=f"No stored landmarks for user {found_user_id}. Please run the generation script.")

    similarities = []
    for region in ["left_eye", "right_eye", "nose", "mouth"]:
        sim = cosine_similarity(
            [np.array(live_embeddings[region]).flatten()],
            [np.array(stored_embeddings[region]).flatten()]
        )[0][0]
        similarities.append(sim)
    
    avg_similarity = np.mean(similarities) if similarities else 0.0

    # Step 4: Final verification decision
    SIMILARITY_THRESHOLD = 0.6
    if avg_similarity > SIMILARITY_THRESHOLD:
        return VerificationResponse(
            user_id=found_user_id,
            name=found_user["name"],
            similarity=avg_similarity
        )
    else:
        raise HTTPException(
            status_code=400,
            detail=f"Verification rejected. Face similarity score ({avg_similarity:.2f}) is below the threshold ({SIMILARITY_THRESHOLD})."
        )

# --- 6. RUN THE APP ---
if __name__ == "__main__":
    import uvicorn
    # To run: uvicorn main:app --host 0.0.0.0 --port 5000 --reload
    uvicorn.run(app, host="YOUR_LOCAL_IP", port=5001)