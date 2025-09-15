import cv2
import mediapipe as mp
import os
import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Initialize Mediapipe FaceMesh
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(static_image_mode=True, max_num_faces=1, refine_landmarks=True)

# Path to your photos
base_dir = os.getcwd()
photo_dir = os.path.join(base_dir, "photos")

# --- IMPORTANT ---
# Make sure the filenames here are correct and match your files.
# The original code had a typo for USR006 ("Kaka.jpeg" instead of "Kaka.jpg")
photos = {
    "USR001": "PP.jpeg",
    "USR002": "Yashu.jpeg",
    "USR003": "SK.jpeg",
    "USR004": "Yo.jpeg",
    "USR005": "Jadoo.jpeg",
    "USR006": "Kaka.jpeg"
}

landmarks_data = {}

# Helper to extract key facial regions from Mediapipe landmarks
def extract_key_landmarks(landmarks):
    """Takes Mediapipe landmarks and returns coordinates for key regions."""
    return {
        "left_eye": [(landmarks[i].x, landmarks[i].y, landmarks[i].z) for i in [33, 133]],
        "right_eye": [(landmarks[i].x, landmarks[i].y, landmarks[i].z) for i in [362, 263]],
        "nose": [(landmarks[i].x, landmarks[i].y, landmarks[i].z) for i in [1, 2, 98]],
        "mouth": [(landmarks[i].x, landmarks[i].y, landmarks[i].z) for i in [61, 291]]
    }

# Function to get landmarks from an image file path
def get_key_landmarks_from_image(image_path):
    """Reads an image, processes it with Mediapipe, and returns key landmarks."""
    img = cv2.imread(image_path)
    if img is None:
        print(f"[ERROR] Could not read image at {image_path}")
        return None

    rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(rgb_img)

    if results.multi_face_landmarks:
        landmarks = results.multi_face_landmarks[0]
        return extract_key_landmarks(landmarks.landmark)
    else:
        return None

# --- Main Script Logic ---
# Build JSON for all known users
for user_id, filename in photos.items():
    path = os.path.join(photo_dir, filename)
    if not os.path.exists(path):
        print(f"[ERROR] File not found: {path}")
        continue
    
    try:
        key_landmarks = get_key_landmarks_from_image(path)
        if key_landmarks:
            landmarks_data[user_id] = key_landmarks
            print(f"[OK] Processed landmarks for {user_id} from {filename}")
        else:
            print(f"[WARN] No face detected in {filename} for {user_id}")
            landmarks_data[user_id] = None
    except Exception as e:
        print(f"[ERROR] Failed to process {filename}: {e}")
        landmarks_data[user_id] = None

# Save the extracted landmarks to a JSON file
with open("user_landmarks.json", "w") as f:
    json.dump(landmarks_data, f, indent=4)

print("\n✅ Successfully saved key facial landmarks to user_landmarks.json")