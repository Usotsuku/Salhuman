import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await UserService.login(email, password);
            console.log(userData);
            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                

                // Redirect based on user role
                if (UserService.isAdmin()) {
                    navigate('/admin/user-management');
                } else if (UserService.isManager()) {
                    navigate('/admin/employe-management');
                } else if (UserService.isUser()) {
                    // Example: Navigate to hours worked page with the current user's employeId
                    const employeId = userData.employeId;
                    if (employeId) {
                        localStorage.setItem('Id', employeId);
                        navigate(`/hours-worked/${employeId}`);
                    } else {
                        setError("No employeId found for the user");
                    }
                } else {
                    setError("Unknown role");
                }
            } else {
                setError(userData.message);
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <div>
            <h1 className="title"> Welcome To SALHUMAN</h1>
            <div className='wrapper'>
                <div className="form-box login">
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div className="input-box">
                            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <FaEnvelope className='icon' />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <FaLock className='icon' />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
