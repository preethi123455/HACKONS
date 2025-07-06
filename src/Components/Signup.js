import React, { useState } from 'react';
import axios from 'axios';


function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/signup", { name, email, password });
            if (response.data.success) {
                alert('Account created!');
                setName('');
                setEmail('');
                setPassword('');
                setError(null);
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.error('Signup error:', err);
            setError('An error occurred.');
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-form">
                <form onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <div className="form-group">
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="btn-submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
