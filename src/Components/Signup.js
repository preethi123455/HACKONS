import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Signup.css';

function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Donor(Individual)');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !role) {
            setError('All fields are required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/signup', {
                name,
                email,
                password,
                role
            });

            if (response.data.success) {
                alert('Signup successful!');
                navigate('/login');
            } else {
                setError(response.data.message || 'Signup failed.');
            }
        } catch (err) {
            console.error('Signup error:', err);
            setError('Signup error.');
        }
    };

    return (
        <div className="signup-page">
            <form onSubmit={handleSubmit}>
                <h2>Signup</h2>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="Donor(Individual)">Donor (Individual)</option>
                    <option value="Donor(BloodBank)">Donor (Blood Bank)</option>
                    <option value="Receiver">Receiver</option>
                </select>
                {error && <div className="error">{error}</div>}
                <button type="submit">Sign Up</button>
                <p className="login-link">Already registered? <a href="/login">Log In</a></p>
            </form>
        </div>
    );
}

export default SignUp;