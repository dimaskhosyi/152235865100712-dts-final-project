import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <footer>
            <div className="footer_content">
                <h3>Country World's</h3>
                <p>Find information about country. feel free to use search or filter feature for easier find country.</p>
                <ul className="socials">
                    <li><a href="https://www.instagram.com/dimastriangga/"><InstagramIcon /></a></li>
                    <li><a href="https://github.com/dimaskhosyi"><GitHubIcon /></a></li>
                </ul>
                <div className="footer_copyright">
                    <p>copyright &copy;2022<a href="https://github.com/dimaskhosyi"> Dimas Khosyi Triangga</a></p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;