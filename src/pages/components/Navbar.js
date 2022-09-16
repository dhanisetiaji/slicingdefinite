import React from "react";
import './navbar.scss'
import { FiMenu } from 'react-icons/fi'
import { HiChevronDown } from 'react-icons/hi'

const Navbar = () => {
    return (
        <nav>
            <img src="../../images/logo.png" alt="" />
            <div className="navmenu">
                <img src="../../images/euro4.png" alt="" />
                <div className="navlinks">
                    about us
                    <HiChevronDown className="icon" />
                    <div className="card">
                        <p>Dropdown 1</p>
                        <p>Dropdown 2</p>
                    </div>
                </div>
                <div className="navlinks">explore cars
                    <HiChevronDown className="icon" />
                    <div className="card">
                        <p>Dropdown 1</p>
                        <p>Dropdown 2</p>
                    </div>
                </div>
                <div className="navlinks">promo</div>
                <div className="navlinks">news & events
                    <HiChevronDown className="icon" />
                    <div className="card">
                        <p>Dropdown 1</p>
                        <p>Dropdown 2</p>
                    </div>
                </div>
            </div>
            <div className="navicon">
                <FiMenu className="icon" />
            </div>
        </nav>
    );
};

export default Navbar;
