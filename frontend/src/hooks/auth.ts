const BASE_URL = "http://localhost:8000";

export async function signupUser(data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Signup failed");
  return res.json();
}

export async function loginUser(data: { username: string; password: string }) {
  const formData = new URLSearchParams();
  formData.append("username", data.username);
  formData.append("password", data.password);

  const res = await fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json(); // { access_token, token_type }
}

// auth.ts
export function logoutUser() {
  localStorage.removeItem("access_token");
}
