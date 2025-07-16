import { loginUser } from "../hooks/auth";
import { AuthForm } from "../components/AuthForm";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async (data: { username: string; password: string }) => {
    try {
      const res = await loginUser(data);
      localStorage.setItem("token", res.access_token);
      navigate("/"); // or wherever
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <AuthForm onSubmit={handleLogin} />
    </div>
  );
}
