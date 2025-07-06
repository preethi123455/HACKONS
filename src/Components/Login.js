import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';
 // if you're using CSS

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/login", {
                email,
                password,
            });

            if (response.data.success) {
                const role = response.data.role;
                console.log("User role from backend:", role); // Debug log ✅

                if (role === 'Donor') {
                    navigate('/donor-home');
                } else if (role === 'Receiver') {
                    navigate('/receiver-home');
                } else {
                    setError("Unknown user role. Contact admin.");
                }
            } else {
                setError(response.data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred.');
        }
    };

    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Log In</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <div className="error">{error}</div>}
                <button type="submit">Log In</button>
                <p>New user? <a href="/">Sign Up</a></p>
            </form>
        </div>
    );
}

export default Login;
