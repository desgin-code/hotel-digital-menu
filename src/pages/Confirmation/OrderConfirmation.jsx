import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/Header/Header";
import Layout from "../../layouts/Layout";

export default function OrderConfirmation() {
  const navigate = useNavigate();

  const handleCheckOrders = () => {
    navigate("/orders");
  };

  return (
    <Layout>
      <Header />
      <div className="flex  mt-[-33px] items-center justify-center min-h-[80vh] bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 px-4">
        <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg text-center transform transition duration-500 hover:scale-[1.02]">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-100 rounded-full p-6 animate-bounce">
              <svg
                className="w-14 h-14 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-800">
            🎉 Order Confirmed!
          </h2>

          <p className="text-gray-600 mt-3 text-base leading-relaxed">
            Your order has been placed successfully. You can view your order
            history and track your status anytime from your account.
          </p>

          <div className="flex justify-center mt-6">
            <span className="h-1 w-20 rounded-full bg-yellow-400"></span>
          </div>

          <button
            onClick={handleCheckOrders}
            className="mt-8 w-full bg-gradient-to-r from-yellow-500 to-orange-700 hover:from-yellow-600 hover:to-orange-800 text-white text-lg font-semibold py-3 rounded-xl shadow-lg transition-all duration-300"
          >
            View Orders
          </button>

           <div className="mt-2 text-gray-500 text-sm z-10">
            © {new Date().getFullYear()}{" "}
            Powered by{" "}
            <a
              href="https://hotelsdigitalmenu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Hotelsdigitalmenu.com
            </a>
             . AllRightsReserved
          </div>


        </div>
      </div>
    </Layout>
  );
}
