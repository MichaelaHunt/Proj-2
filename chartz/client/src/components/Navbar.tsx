import "./Components.css";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import auth from "../utils/auth";

function Navbar() {
    const currentPage = useLocation().pathname
    // State to track if the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkLogin = async () => {
        if (auth.loggedIn()) {
            setIsLoggedIn(true);
        }
    };

    useEffect(() => {
        checkLogin();
    }, [isLoggedIn]);



    return (
        <div className="navContainer">
            <ul>
                <li className='nav-bar-links'>
                <Link to="/" className="chartz-link">CHARTZ</Link>
                </li>
                {isLoggedIn ? (
                    <>
                        <li className="nav-bar-links" id="linkButton">
                            <Link to="/Details">Saved Songs</Link>
                        </li>
                        <li className="nav-bar-links">
                            <button onClick={() => {
                                auth.logoutUser();
                            }}>
                                Logout</button>
                        </li>
                    </>
                ) : (
                    <li className="nav-bar-links">
                        <Link id="linkButton"
                            to="/login"
                            className={currentPage === '/login' ? 'nav-link-active' : 'nav-link'}>
                            Log in
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default Navbar;
