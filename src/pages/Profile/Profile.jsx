import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/Header/Header";
import Layout from "../../layouts/Layout";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/features/login/loginUserSlice";

export default function Profile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/menu");
  };

  return (
    <Layout>
      <Header />
      <div className="flex flex-col items-center bg-orange-50 min-h-[75vh] p-4">
        <div className="bg-white shadow-xl rounded-3xl w-full max-w-sm p-8 flex flex-col items-center relative">
          <div className="absolute -top-12 bg-orange-100 p-6 rounded-full shadow-lg">
            <FaUser className="text-5xl text-[#5c471c]" />
          </div>

          <div className="h-16"></div>

          <h2 className="text-2xl font-bold text-gray-800 mb-1">Hello!</h2>

          <p className="text-lg text-gray-600 mb-6">
            {user?.phone || "5634653"}
          </p>

          <button
            onClick={handleLogout}
            className="w-full bg-orange-700 text-white font-semibold py-3 rounded-full hover:bg-orange-600 transition-all shadow-lg hover:cursor-pointer"
          >
            Logout
          </button>
        </div>

        {/* Optional footer / info */}
        <p className="mt-8 text-gray-500 text-sm">
          You are logged in with your phone number
        </p>
      </div>
    </Layout>
  );
}
