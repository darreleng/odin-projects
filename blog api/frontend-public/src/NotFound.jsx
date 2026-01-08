import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function NotFound() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{marginBottom: "20px"}}>404 - Page Not Found</h1>
      <p>Oops! That route doesn't exist.</p>
      <p>Redirecting you to the home page in <strong>{count}</strong> seconds...</p>
    </div>
  );
}