"use client";

import { useState, useEffect } from 'react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`flex justify-between items-center px-8 py-5 fixed w-full top-0 z-50 font-sans transition-all duration-300 ${
            isScrolled 
                ? 'bg-white text-gray-700 shadow-md' 
                : 'text-white shadow-2xl'
        }`} style={!isScrolled ? { 
            background: 'linear-gradient(135deg, #131c30 0%, #1a2442 50%, #131c30 100%)',
            boxShadow: '0 10px 30px rgba(19, 28, 48, 0.3), 0 6px 20px rgba(19, 28, 48, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        } : {}}>
            {/* Logo / Name */}
            <h1 className={`text-2xl md:text-3xl font-extrabold tracking-wide transition-colors duration-300 ${
                isScrolled ? 'text-blue-600' : 'text-white'
            }`}>
                NP
            </h1>

            {/* Nav Links */}
            <ul className="flex gap-8 font-medium text-lg">
                <li>
                    <a href="#about" className={`transition-colors duration-300 ${
                        isScrolled 
                            ? 'text-gray-700 hover:text-blue-600' 
                            : 'text-white hover:text-blue-200'
                    }`}>
                        About
                    </a>
                </li>
                <li>
                    <a href="#skills" className={`transition-colors duration-300 ${
                        isScrolled 
                            ? 'text-gray-700 hover:text-blue-600' 
                            : 'text-white hover:text-blue-200'
                    }`}>
                        Skills
                    </a>
                </li>
                <li>
                    <a href="#projects" className={`transition-colors duration-300 ${
                        isScrolled 
                            ? 'text-gray-700 hover:text-blue-600' 
                            : 'text-white hover:text-blue-200'
                    }`}>
                        Projects
                    </a>
                </li>
                <li>
                    <a href="#socialLinks" className={`transition-colors duration-300 ${
                        isScrolled 
                            ? 'text-gray-700 hover:text-blue-600' 
                            : 'text-white hover:text-blue-200'
                    }`}>
                        Contact
                    </a>
                </li>
            </ul>
        </nav>
    );
}