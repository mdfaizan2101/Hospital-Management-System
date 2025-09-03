import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
    const hours = [
        { id: 1, day: "Monday", time: "9:00 AM - 11:00 PM" },
        { id: 2, day: "Tuesday", time: "12:00 PM - 12:00 AM" },
        { id: 3, day: "Wednesday", time: "10:00 AM - 10:00 PM" },
        { id: 4, day: "Thursday", time: "9:00 AM - 9:00 PM" },
        { id: 5, day: "Friday", time: "3:00 PM - 9:00 PM" },
        { id: 6, day: "Saturday", time: "9:00 AM - 3:00 PM" },
    ];

    return (
        <>
            <footer className={"container"}>
                <hr />
                <div className="content">
                    <div>
                        <img src="/logo.png" alt="logo" className="logo-img" />
                    </div>
                    <div>
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to={"/"}>Home</Link></li>
                            <li><Link to={"/appointment"}>Appointment</Link></li>
                            <li><Link to={"/about"}>About</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Hours</h4>
                        <ul>
                            {hours.map((element) => (
                                <li key={element.id}>
                                    <span>{element.day}</span>
                                    <span>{element.time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Contact</h4>
                        <div><FaPhone /> <span>+91-99999-00000</span></div>
                        <div><MdEmail /> <span>support@truecare.com</span></div>
                        <div><FaLocationArrow /> <span>New Delhi, India</span></div>
                    </div>
                    <div>
                        <h4>Follow Us</h4>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram size={40} /></a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter size={40} /></a>
                            <a href="https://wa.me/919999900000" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={40} /></a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
