// useInactivityLogout.ts (custom React hook)
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../hooks/auth";

const INACTIVITY_LIMIT_MINUTES = 15;

export function useInactivityLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(
        () => {
          logoutUser();
          navigate("/login");
          alert("You were logged out due to inactivity.");
        },
        INACTIVITY_LIMIT_MINUTES * 60 * 1000,
      );
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    resetTimer(); // initialize on mount

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [navigate]);
}
