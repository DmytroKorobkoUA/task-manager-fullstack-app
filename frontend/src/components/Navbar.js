import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

function Navbar({ links }) {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                setIsAdmin(decodedToken.role === 'admin');
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    const filteredLinks = links.filter(link => {
        return isAdmin || !link.to.includes('/users');
    });

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarLinks}>
                {filteredLinks.map((link, index) => (
                    <Link
                        key={index}
                        className={styles.navbarLink}
                        to={link.to}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default Navbar;
