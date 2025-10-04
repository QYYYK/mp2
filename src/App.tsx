import React from 'react';
import AppRoutes from './routes/AppRoutes';

// 如果文件在 src/store/CatalogContext.tsx 就用下面这个
import { CatalogProvider } from './store/CatalogContext';
// 如果你的文件在 src/CatalogContext.tsx，则改成：
// import { CatalogProvider } from './CatalogContext';

export default function App() {
  return (
    <CatalogProvider>
      <AppRoutes />
    </CatalogProvider>
  );
}
