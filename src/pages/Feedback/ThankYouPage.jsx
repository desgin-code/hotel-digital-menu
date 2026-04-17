import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function ThankYouPage() {
  const navigate = useNavigate();
   const { t, i18n } = useTranslation();
  const [message, setMessage] = useState("");

  const hotel = useSelector((state) => state.hotel.hotel);
  const hotel_id = hotel?.id || null;


  const bannerImageUrl = hotel?.banner?.image
    ? `https://testing-demo.com/jaichand/digital-menu/public/uploads/hotel/banner/${hotel.banner.image}`
    : 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092';

  const fetchFeedbackMessage = async () => {
    try {
      const response = await fetch(
        `https://testing-demo.com/jaichand/digital-menu/api/hotel/feedback-thank-you-message/${hotel_id}`
      );
      const result = await response.json();
      const data = result.data;
      setMessage(data?.message || "");
    } catch (error) {
      console.error("Error fetching thank you message:", error);
      setMessage("Your feedback has been submitted successfully. Thank you!");
    }
  };

  useEffect(() => {
    const submitted = sessionStorage.getItem("feedbackSubmitted");
    if (!submitted) {
      navigate(`/${hotel?.slug || ""}`);
    } else {
      fetchFeedbackMessage();
    }
  }, [navigate, hotel?.slug]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <header className="flex justify-center items-center  bg-white shadow-md">
        {hotel?.logo ? (
          <img
            src={`https://testing-demo.com/jaichand/digital-menu/public/uploads/hotel/logo/${hotel.logo}`}
            alt={hotel?.name || "Hotel Logo"}
            className="h-14 object-contain"
          />
        ) : (
          <h1 className="text-3xl font-bold text-gray-800">{hotel?.name}</h1>
        )}
      </header>


      <main className="flex-grow flex justify-center items-center relative">

        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: bannerImageUrl ? `url("${bannerImageUrl}")` : "none",
          }}
        ></div>


        <div className="relative bg-white rounded-3xl shadow-2xl p-12 text-center max-w-lg w-full transform transition-all hover:scale-105">
          <FaCheckCircle className="mx-auto text-green-500 text-6xl mb-6 animate-bounce" />
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Thank You!</h1>
          <p className="text-gray-700 text-lg mb-8">
            {message
              ? message
              : "Your feedback has been submitted successfully. We appreciate your time and thoughts!"}
          </p>

          <Link
            to={`/hotel/${hotel?.slug}`}
            className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl shadow-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
          >
            Go to Home
          </Link>
        </div>
      </main>


      <footer className="bg-gray-100 py-3 text-center mt-auto border-t">
         <div className="mt-12 text-gray-500 text-sm z-10">
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
            . {t("allRightsReserved")}
          </div>
      </footer>
    </div>
  );
}

export default ThankYouPage;
