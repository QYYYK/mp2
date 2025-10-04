import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* 左侧品牌，返回首页（等价于 List） */}
        <div className={styles.logo}>
          <Link to="/">NBA Stats</Link>
        </div>

        {/* 右侧导航：/ 与 /list 都指向列表，/gallery 指向画廊 */}
        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Home
          </NavLink>

          <NavLink
            to="/list"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            List
          </NavLink>

          <NavLink
            to="/gallery"
            className={({ isActive }) => (isActive ? styles.active : '')}
          >
            Gallery
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
