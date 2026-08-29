import { useState } from "react";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"
import { useNavigate } from "react-router-dom";
import { auth } from "../auths/firebase";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/admin");
        } catch (err) {
            setError("Invalid email or password");
            console.error(err)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <form
                onSubmit={handleLogin}
                className="bg-gray-800 p-8 rounded-xl w-96 shadow-xl"
            >
                <h2 className="text-white text-2xl mb-6 text-center">
                    Admin Login
                </h2>

                {error && (
                    <p className="text-red-400 text-sm mb-3">{error}</p>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
                >
                    Login
                </button>
            </form>
        </div>
    );
}