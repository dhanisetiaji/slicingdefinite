import React from 'react'
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi'

const Footer = () => {
    return (
        <footer>
            <div className="social">
                <span className="border" />
                <div className="title">STAY CONNECTED WITH US</div>
                <div className="socials">
                    <FiFacebook className="icon" />
                    <FiInstagram className="icon" />
                    <FiTwitter className="icon" />
                    <FiYoutube className="icon" />
                </div>
                <div className="contactus">Contact Us</div>
                <span className="border" />
            </div>
            <div className="copyright">
                <div className="title1">
                    Copyright © 2021.
                </div>
                <div className="title2">
                    PT Mitsubishi Motors Krama Yudha Sales Indonesia
                </div>
            </div>
        </footer>
    )
}

export default Footer