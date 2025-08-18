import React from 'react';
import styles from './StarrySky.module.scss'; // Ubah ekstensi import menjadi .scss

const StarrySky = () => {
  // Jumlah bintang jatuh yang ingin ditampilkan. Bisa Anda ubah.
  const shootingStarCount = 15;

  return (
    <div className={styles.sky}>
      <div className={styles.stars}></div>
      <div className={styles.stars2}></div>
      <div className={styles.stars3}></div>

      {/* Membuat elemen bintang jatuh sejumlah shootingStarCount */}
      {[...Array(shootingStarCount)].map((_, i) => (
        <div key={i} className={styles.shootingStar}></div>
      ))}
    </div>
  );
};

export default StarrySky;