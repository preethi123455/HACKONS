import React, { useState } from 'react';
import axios from 'axios';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Both fields are required.');
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/login", { email, password });
            if (response.data.success) {
                alert('Login successful!');
                setEmail('');
                setPassword('');
                setError(null);
            } else {
                setError(response.data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred.');
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-form">
                <form onSubmit={handleSubmit}>
                    <h1>Log In</h1>
                    <div className="form-group">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="btn-submit">Log In</button>
                    <p className="login-link">Don’t have an account? <a href="/signup">Sign Up</a></p>
                </form>
            </div>
        </div>
    );
}

export default Login;
