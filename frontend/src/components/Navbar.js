import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

/**
 * @typedef {Object} NavbarProps
 * @property {Array<{ label: string, to: string }>} links - The array of link objects to be displayed in the navbar.
 */

/**
 * Navbar component for displaying navigation links.
 *
 * @param {NavbarProps} props - The props for the component.
 * @returns {JSX.Element} The rendered Navbar component.
 */
function Navbar({ links }) {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarLinks}>
                {links.map((link, index) => (
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
