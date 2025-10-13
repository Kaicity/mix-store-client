import React from 'react';

const VoucherBadge = () => {
  return (
    <div className="md:w-max relative inline-block bg-yellow-400 text-black text-sm px-4 py-2 rounded-md shadow-sm">
      <span className="relative z-10">THONGULAR16</span>

      {/* Lỗ khoét bên trái */}
      <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-inner"></span>

      {/* Lỗ khoét bên phải */}
      <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-inner"></span>
    </div>
  );
};

export default VoucherBadge;
