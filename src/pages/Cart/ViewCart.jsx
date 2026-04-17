import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header/Header";
import ItemDetails from "../../components/Modal/ItemDetails";
import Layout from "../../layouts/Layout";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ShowLogin from "../../components/Modal/ShowLogin";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  decreaseItem,
} from "../../redux/features/cart/cartFoodSlice";
import CurrencySymbol from "../../components/Currency/CurrencySymbol";

export default function ViewCart() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const isLogin = useSelector((state) => state.login.islogin);

  useEffect(() => {
    if (isLogin) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLogin]);

const subTotals = Math.round(
  cartItems.reduce((acc, item) => {
    const qty = item.quantity || 1;
    const discount = item.discount || 0; 
    const price = item.price || 0;      
    const discountedPrice = price * (1 - discount / 100);
    return acc + discountedPrice * qty;
  }, 0)
);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrease = (item) => {
    dispatch(decreaseItem(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setShowLogin(true);
    } else {
      navigate("/checkout-details");
      //navigate("/ordersummary");
    }
  };

  return (
    <Layout>
      <Header />
      <section className="py-4">
        <div className="mx-auto space-y-10 max-w-[92%] md:max-w-7xl">
          <h2 className="text-2xl font-bold mb-6 text-[#5c471c]">🛒 My Cart</h2>
          {cartItems && cartItems.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="flex flex-col md:flex-row cart-item bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
                  >
                    {/* Image */}
                    <div className="flex-shrink-0 w-full md:w-24 h-24 md:h-24 overflow-hidden rounded-xl border border-gray-200 m-4 md:m-2">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between p-4 gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>

                      <div className="flex justify-between items-center mt-2">

                        <div className="flex items-center space-x-2">
                          <span className="line-through text-gray-400 text-sm font-bold">
                            <CurrencySymbol /> {item.price}
                          </span>
                          <span className="font-bold text-[#e68900]">
                            <CurrencySymbol /> {Math.round(item.price - (item.price * (item.discount / 100)))}

                          </span>

                        </div>

                        <div className="flex items-center gap-2 border-2 border-[#e68900] h-9 rounded-full px-3">
                          <button
                            className="text-red-600 text-lg font-bold"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDecrease(item);
                            }}
                          >
                            −
                          </button>
                          <span className="mx-1 w-6 text-center font-semibold text-sm">
                            {item.quantity}
                          </span>
                          <button
                            className="text-[#e68900] text-lg font-bold"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(item);
                            }}
                          >
                            +
                          </button>
                          <span className="w-px h-5 bg-gray-300 mx-2"></span>
                          <button
                            className="text-gray-500 hover:text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveItem(item);
                            }}
                          >
                            <FaTrash className="text-[16px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sticky bottom-0 bg-white shadow-lg p-4 flex flex-wrap justify-between items-center rounded-lg gap-3">
                <h3 className="text-xl font-bold text-[#5c471c]">
                  Subtotal:  <CurrencySymbol /> {subTotals}
                </h3>

                <div className="flex gap-4">
                  <Link to="/menu">
                    <button
                      className="px-6 py-2 rounded-xl border-2 border-[#928d87] text-[#444] font-semibold 
             bg-gradient-to-r from-white to-gray-50 
             hover:from-[#928d87] hover:to-[#6f6a65] hover:text-white 
             "
                    >
                      + Add More Item
                    </button>
                  </Link>

                  <button
                    onClick={handleCheckout}
                    className="bg-[#e68900] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#cc7700] transition"
                  >
                    Proceed to Continue
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-12 ">
              <div className="text-5xl mb-4">🛒</div>

              <p className="text-gray-600 text-lg font-medium mb-2">
                Your cart is empty
              </p>

              <Link
                to="/menu"
                className="mt-3 px-6 py-2 bg-[#e68900] text-white rounded-xl font-semibold 
               hover:bg-[#cc7700] transition-all duration-300"
              >
                Add some items to continue
              </Link>
            </div>
          )}
        </div>
      </section>
      {showLogin && (
        <ShowLogin setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} />
      )}

      {selectedItem && (
        <ItemDetails
          items={cartItems}
          item={selectedItem}
          handleAddToCart={handleAddToCart}
          handleDecrease={handleDecrease}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </Layout>
  );
}
