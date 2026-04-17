import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";


export default function Banner() {
  const { t } = useTranslation();

  const [coupon, setCoupon] = useState(null);

  const hotel = useSelector((state) => state.hotel.hotel);
  const hotel_id = hotel?.id || null;

  const bannerImageUrl = hotel?.banner?.image
    ? `https://manage.hotelsdigitalmenu.com/public/uploads/hotel/banner/${hotel.banner.image}`
    : 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092';

  
  const fetchCoupon = async () => {

    try {
      const response = await fetch(
        "https://manage.hotelsdigitalmenu.com/api/hotel/coupon",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ hotel_id: hotel_id }),
        }
      );

      const result = await response.json();

      setCoupon(result.data)

    } catch (error) {

      console.error("Error fetching hotel:", error.message);

    }
  };

  useEffect(() => {
    if (hotel_id) fetchCoupon();
  }, [hotel_id]);

  return (
    <section
      className="relative h-[30vh] min-h-[200px] w-full flex items-center justify-center bg-cover bg-center rounded-b-3xl shadow-lg overflow-hidden"
      style={{
        backgroundImage: bannerImageUrl ? `url("${bannerImageUrl}")` : "none",
      }}
    >

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>

      {/* Coupon Badge - Bottom Right */}
      {coupon && (
        <div className="absolute bottom-4 right-4">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-full shadow-xl px-4 py-2 sm:px-5 sm:py-3 flex flex-col items-center text-center animate-pulse">
            <span className="text-[8px] sm:text-xs uppercase tracking-wider">Use Code</span>
            <span className="font-bold text-[14px]">{coupon?.code}</span>
            <span className="font-semibold text-[8px] sm:text-xs">
              Get {coupon?.discount}% OFF
            </span>
          </div>
        </div>
      )}


      {/* Banner Content */}
      <div className="relative z-10 text-center px-4 sm:px-6">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
          {t("welcomeTo")} <span className="text-[#e68900]"> {hotel.hotel_name
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}</span>
        </h2>
        <p className="text-sm sm:text-lg text-gray-200 mb-4 sm:mb-6 max-w-xs sm:max-w-md mx-auto">
          {hotel?.banner?.sub_title}
        </p>
      </div>

    </section>
  );
}
