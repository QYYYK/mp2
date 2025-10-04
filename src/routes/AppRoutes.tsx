import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ListPage from '../pages/ListPage/ListPage';
import GalleryPage from '../pages/GalleryPage/GalleryPage';
import DetailPage from '../pages/DetailPage/DetailPage';
import NavBar from '../components/NavBar/NavBar';

export default function AppRoutes() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* 首页就是 List */}
        <Route path="/" element={<ListPage />} />
        {/* 兼容 /list 老路径，保持功能一致 */}
        <Route path="/list" element={<ListPage />} />

        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/detail/:playerId" element={<DetailPage />} />

        {/* 兜底：任何未知路径都回首页 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
