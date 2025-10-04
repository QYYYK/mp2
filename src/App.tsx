import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ListPage from './pages/ListPage/ListPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import DetailPage from './pages/DetailPage/DetailPage';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/list" replace />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </>
  );
}

export default App;
