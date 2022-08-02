import React from "react";
import PublicIcon from '@mui/icons-material/Public';
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
    const authToken = sessionStorage.getItem('Auth Token');
    const emailA = sessionStorage.getItem('Email');
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        sessionStorage.removeItem('Email');
        navigate('/login')
      }

    return (
        <div className="header">
            <div className="header_container">
                <div className="header_title">
                    <PublicIcon />
                    <h2 className="logo">Country World</h2>
                </div>
                <div className="right_panel">
                    {
                        authToken === null ? (
                            <Link to="/signup">
                                <button className="right_panel_btn">Get Started</button>
                            </Link>
                        ) : (
                            <>
                                <p className="login_text"><b>Hi!</b> {emailA}</p>
                                <p className="login_text login_text_btn" onClick={handleLogout}>Log out</p>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;