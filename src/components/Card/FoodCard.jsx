import React from "react";
import { useState } from "react";
import {
  addToCart,
  decreaseItem,
} from "../../redux/features/cart/cartFoodSlice";
import { useDispatch, useSelector } from "react-redux";
import ItemDetails from "../../components/Modal/ItemDetails";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import CurrencySymbol from "../Currency/CurrencySymbol";

export default function FoodCard({ cat }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartMessage, setCartMessage] = useState(null);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();



  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    setCartMessage(`${totalItems + 1} items added to cart!`);
    setTimeout(() => setCartMessage(null), 3000);
  };

  const handleDecrease = (item) => {
    dispatch(decreaseItem(item));
    setCartMessage(`${totalItems - 1} items  in cart!`);
    setTimeout(() => setCartMessage(null), 3000);
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cat.items.map((item) => {
          const cartItem = items.find((i) => i.id === item.id);

          return (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="flex items-center bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer p-3"
            >
              {/* Image */}
              <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-xl border border-gray-200">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 ml-3">
                <h3 className="text-md md:text-lg font-semibold text-gray-800 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[#e68900] font-bold mt-1 text-sm md:text-base flex">

                  <div className="flex items-center space-x-2">
                    <span className="line-through text-gray-400 text-sm">
                      <CurrencySymbol /> {item.price}
                    </span>
                    <span className="font-bold">
                      <CurrencySymbol /> {Math.round(item.price - (item.price * (item.discount / 100)))}

                    </span>

                  </div>

                </p>
              </div>

              {/* Add to Cart */}
              <div className="ml-auto">
                {cartItem ? (
                  <div className="flex items-center border-2 border-[#e68900] rounded-full px-2 py-1">
                    <button
                      className="text-red-500 font-bold px-2 hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDecrease(item);
                      }}
                    >
                      -
                    </button>
                    <span className="mx-2 font-semibold">
                      {cartItem.quantity}
                    </span>
                    <button
                      className="text-[#e68900] font-bold px-2 hover:text-yellow-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item);
                      }}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-[#e68900] text-white w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full hover:bg-[#cc7700] transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(item);
                    }}
                  >
                    +
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {cartMessage && (
        <div className="fixed bottom-20 inset-x-0 mx-auto bg-[#e68900] text-white w-[70%] max-w-md text-center px-4 py-2 rounded-xl shadow-lg animate-bounce">
          <div className="flex gap-2 justify-center">
            <div className="bg-[#5c471c] rounded-full p-2">
              <FaShoppingCart size={20} />
            </div>
            <span>{cartMessage}</span>
          </div>
          <Link
            to="/cart"
            className="ml-2 underline font-semibold hover:text-yellow-300"
          >
            View Cart
          </Link>
        </div>
      )}

      {selectedItem && (
        <ItemDetails
          items={items}
          item={selectedItem}
          handleAddToCart={handleAddToCart}
          handleDecrease={handleDecrease}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
}
