import React from 'react';

export default function NotFound() {
  return (
    <html>
      <body>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
          <h1>404 - Halaman Tidak Ditemukan</h1>
          <p>Maaf, halaman yang Anda cari tidak ada.</p>
        </div>
      </body>
    </html>
  );
}