"use client";

import { useRef, useEffect } from 'react';

export function useHorizontalScroll() {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        // Mencegah scroll vertikal default dari halaman
        e.preventDefault();
        // Menambahkan nilai scroll vertikal (deltaY) ke posisi scroll horizontal (scrollLeft)
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: 'smooth' // Opsi agar scroll lebih halus
        });
      };

      el.addEventListener('wheel', onWheel);
      
      // Cleanup listener saat komponen di-unmount
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);
  
  return elRef;
}