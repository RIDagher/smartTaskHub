import { useState } from "react";
import { useAuth } from "../features/auth/useAuth";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate()

  // call the hook
   const { saveAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    try {
      setLoading(true);

      // 
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }

      // your backend returns { user, token }
      saveAuth({ user: data.user, token: data.token });             // update context
      console.log("User logged in:", data.user);
      // localStorage.setItem("token", data.token); // store JWT (optional)

      // on successful login, navigate to dashboard according to role
      if (data.user.role === 'admin') {
        navigate('/admin-dashboard')
      } else  
      navigate('/user-dashboard')

      // TODO: navigate to dashboard
      // navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }

    

    
  };



  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 text-sm">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="border rounded px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="mb-1 text-sm">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          className="border rounded px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-indigo-600 text-white py-2 hover:bg-indigo-700 disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>


   <Link to="/register" className="text-sm text-indigo-600 hover:underline">Don't have an account? Register</Link> 
    </form>
    
  );
};

export default LoginForm;