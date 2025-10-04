import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ListPage from '../pages/ListPage/ListPage';
import GalleryPage from '../pages/GalleryPage/GalleryPage';
import DetailPage from '../pages/DetailPage/DetailPage';
import NavBar from '../components/NavBar/NavBar';

export default function AppRoutes() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        {/* 必须是 :playerId，和 DetailPage 里 useParams 一致 */}
        <Route path="/detail/:playerId" element={<DetailPage />} />
      </Routes>
    </>
  );
}
