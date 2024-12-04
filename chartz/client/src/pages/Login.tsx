import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import TextField from "../components/TextField";
import './Pages.css';
import Auth from '../utils/auth';
import { useState, type FormEvent, type ChangeEvent } from 'react';
import type { UserLogin } from '../interfaces/UserLogin';
import { login } from '../api/AuthAPI';

function Login() {
    // State to track user login
    const [userLogin, setUserLogin] = useState<UserLogin>({
        id: 0,
        username: '',
        password: '',
        email: '',
    });

    // State to track errors
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Function to handle changes in the input fields
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setUserLogin({
            ...userLogin,
            [name]: value,
        });
    };

    // Function to handle form submission
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const data = await login(userLogin); // Assuming `login` API returns a token
            Auth.loginUser(data.token); // Save token and navigate to home page
        } catch (error) {
            console.error('Failed to log in:', error);
            setErrorMessage('Login failed. Please check your credentials.');
        }
    };

    return (
        <>
            <div className="page">
                <Navbar />
                <div className="body">
                    <div className="loginContainer">
                        <div className="loginItem">
                            <h1 className="loginTitle">Log in to Chartz</h1>

                            {/* Username Input */}
                            <TextField
                                inputLabel="Username"
                                name="username"
                                value={userLogin.username}
                                onChange={handleChange}
                            />

                            <div className="space"></div>

                            {/* Password Input */}
                            <TextField
                                inputLabel="Password"
                                type="password"
                                name="password"
                                value={userLogin.password}
                                onChange={handleChange}
                            />

                            {/* Error Message */}
                            {errorMessage && <p className="error">{errorMessage}</p>}

                            {/* Submit Button */}
                            <button onClick={handleSubmit}>Login</button>

                            <div className="row">
                                <div className='horizontalLine'></div>
                                <p>or</p>
                                <div className='horizontalLine'></div>
                            </div>

                            {/* Signup Link */}
                            <Link
                                to="/signup"
                                className="signupLink">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
