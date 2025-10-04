import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

export default function NavBar(){
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>NBA Stats</div>
        <nav className={styles.nav}>
          <NavLink to="/" end className={({isActive}) => isActive ? styles.active : ''}>List</NavLink>
          <NavLink to="/gallery" className={({isActive}) => isActive ? styles.active : ''}>Gallery</NavLink>
        </nav>
      </div>
    </header>
  );
}
