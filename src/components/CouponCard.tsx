const CouponCard = () => {
  return (
    <div className="w-max border-2 border-gray-100 rounded-lg flex-shrink-0">
      <div className="shadow-lg rounded-md border-l-8 border-yellow-400">
        <div className="flex items-stretch">
          <div className="flex items-center px-4 py-2 border-r border-dashed border-gray-300">
            <span className="font-bold text-md">SED9</span>
          </div>

          <div className="p-1 flex-1">
            <h2 className="text-md font-medium mb-2">GIẢM 9K</h2>
            <p className="text-xs">giảm 9k (đơn từ 0đ)</p>
            <div className="mt-4 flex items-center gap-1">
              <div className="text-xs">
                <p className="font-medium">Mã: SEP9</p>
                <p>HSD: 30/09/2025</p>
              </div>
              <button className="rounded-full px-3 py-1 bg-black text-white text-xs hover:bg-gray-800 transition">
                Lấy mã
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
