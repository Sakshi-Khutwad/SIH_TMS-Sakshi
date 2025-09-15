// import { BASE_URL } from '@env'

interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  docType: "aadhaar" | "pan" | "passport";
  document_number: string;
  photo: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

const REQUEST_TIMEOUT = 30000; // 30 seconds

export const registerUser = async (payload: RegisterPayload): Promise<ApiResponse> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(`YOUR_LOCAL_IP/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 400) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`${errorData.message}: Invalid data provided`);
      } else if (response.status === 500) {
        throw new Error("Server error. Please try again later.");
      } else if (response.status >= 500) {
        throw new Error("Server is currently unavailable");
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    }

    const data = await response.json();
    return {
      success: true,
      data,
      message: data.message || "Registration successful"
    };

  } catch (error: any) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      throw new Error("Request timeout. Please check your internet connection.");
    } else if (error.message.includes('Network request failed')) {
      throw new Error("Network error. Please check your internet connection.");
    } else if (error.message.includes('fetch')) {
      throw new Error("Unable to connect to server. Please try again.");
    } else {
      throw error;
    }
  }
};

// Additional utility function for checking network connectivity
export const checkServerHealth = async (): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(`YOUR_LOCAL_IP/health`, {
        method: "GET",
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response.ok;
    } catch {
      clearTimeout(timeoutId);
      return false;
    }
  } catch {
    return false;
  }
};