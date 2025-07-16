// utils/authHelpers.ts
export function isLoggedIn(): boolean {
  return !!localStorage.getItem("access_token");
}

export function logoutUser() {
  localStorage.removeItem("access_token");
}
