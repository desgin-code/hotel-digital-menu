import React from "react";
import { FaHome, FaShoppingCart, FaListAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
   const { t, i18n } = useTranslation();
  const totalItems = useSelector((state) => state.cart.totalItems);
  const hotel = useSelector((state) => state.hotel.hotel);
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-[#333] text-white flex justify-between items-center py-3 px-7 shadow-lg">


      <div className="flex flex-col items-center text-sm  hover:cursor-pointer">
        <Link to={`/hotel/${hotel.slug}`}>
          {" "}
          <FaHome size={22} />
        </Link>
        <span>Home</span>
      </div>

      <div className="relative ">
        <Link to="/cart">
          <div className="shadow-lg  flex items-center justify-center hover:cursor-pointer">
            <FaShoppingCart size={30} className="text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
        </Link>

        


      </div>

      <div className="flex flex-col items-center text-sm  hover:cursor-pointer">
        <Link to="/orders">
          {" "}
          <FaListAlt size={22} />{" "}
        </Link>
        <span>Orders</span>
      </div>


      




     
    </footer>
    
  );
}
