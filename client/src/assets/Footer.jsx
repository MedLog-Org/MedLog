import React from 'react';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="Footer">
            <div className="footer-container">
                <div className="footer-left">
                    <h2>MedLog</h2>
                </div>
                <div className="footer-middle">
                    <div className="footer-section">
                        <h3>MedLog</h3>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About us</a></li>
                            <li><a href="#">Help</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Top Specialities</h3>
                        <ul>
                            <li><a href="#">Lorem Ipsum</a></li>
                            <li><a href="#">Lorem Ipsum</a></li>
                            <li><a href="#">Lorem Ipsum</a></li>
                            <li><a href="#">Lorem Ipsum</a></li>
                            <li><a href="#">Lorem Ipsum</a></li>
                            <li><a href="#">Lorem Ipsum</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Contact</h3>
                        <p>Email: <a href="mailto:service@xyz.com">service@xyz.com</a></p>
                        <p>Phone: 91X-X89-8989</p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; MedLog, Inc. <a href="#">Terms</a> <a href="#">Privacy</a></p>
            </div>
        </footer>
    );
}

export default Footer;
