interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    firstname?: string;
    surname?: string;
    contact?: string;
  };
}

interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

interface SignupResponse {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export async function login(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  try {
    const response = await fetch(
      "https://smartpantry-bc4q.onrender.com/auth/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
import Swal from 'sweetalert2'

export async function signup(
  credentials: SignupCredentials
): Promise<SignupResponse> {
  try {
    const response = await fetch("https://smartpantry-bc4q.onrender.com/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Signup error:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "The email is already in use. Please try again with a different, valid email."
    });
    throw error;
  }
}


