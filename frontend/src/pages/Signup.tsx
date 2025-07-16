import { signupUser } from "../hooks/auth";
import { AuthForm } from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = async (data: any) => {
    try {
      await signupUser(data);
      alert("Signup successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <AuthForm onSubmit={handleSignup} isSignup />
    </div>
  );
}
