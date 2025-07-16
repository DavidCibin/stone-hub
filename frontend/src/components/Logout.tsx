// LogoutButton.tsx
import { logoutUser } from "../hooks/auth";
import { useNavigate } from "react-router-dom";

export function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="btn btn-logout">
      Logout
    </button>
  );
}
