import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaUtensils, FaCommentDots, FaGlobe } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { hotelDetails } from "../../redux/features/hotel/hotelDetailSlice";
import { useTranslation } from "react-i18next";

function LandingPage() {
  const { t, i18n } = useTranslation();
  const { endpoint } = useParams();
  const [hotel, setHotel] = useState(null);
  const [language, setLanguage] = useState(i18n.language);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchHotel = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://manage.hotelsdigitalmenu.com/api/hotel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug: endpoint }),
        }
      );

      const result = await response.json();
      if (!result.status) {
        setHotel(null);
        setLoading(false);
        dispatch(hotelDetails(null));
        return;
      }

      setHotel(result.data);
      dispatch(hotelDetails(result.data));
      setLoading(false);
    } catch (error) {
      alert("Something went wrong. Please try again later.");
      console.error("Error fetching hotel:", error.message);
      setHotel(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (endpoint) fetchHotel();
  }, [endpoint]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fff8ee] via-[#fffaf3] to-[#fcead4] p-6 relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute w-72 h-72 bg-[#e68900]/20 rounded-full blur-3xl top-[-80px] left-[-60px]"></div>
      <div className="absolute w-72 h-72 bg-[#5c471c]/20 rounded-full blur-3xl bottom-[-100px] right-[-80px]"></div>

      {/* Language Selector */}
      <div className="absolute right-4 top-2">
        <div className="flex items-center gap-2 mb-1 text-gray-700 font-medium">
          <FaGlobe className="text-[#e68900]" />
          <span>{t("language")}</span>
        </div>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#e68900]"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
          <option value="sw">Kiswahili</option>
          <option value="ar">العربية</option>
          <option value="bn">Bengali</option>
          <option value="fr">French</option>
          <option value="he">Hebrew</option>
          <option value="ja">Japanese</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center z-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t("loading")}</h2>
          <p className="text-gray-600 text-lg">{t("loadingText")}</p>
        </div>
      ) : hotel ? (
        <>
          <div className="text-center mb-12 z-10 mt-[50px]">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3 tracking-wide">
              {t("welcomeTo")}{" "}
              <span className="text-[#e68900]">
                {hotel.hotel_name
                  .toLowerCase()
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </span>
            </h2>
            <p className="text-gray-600 text-lg">{t("exploreMenu")}</p>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl w-full z-10">
            <Link
              to="/menu"
              className="group flex flex-col items-center justify-center p-8 bg-white/90 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-[#e68900]/40 hover:-translate-y-1"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#e68900]/10 group-hover:bg-[#e68900] transition-all duration-300 mb-5 shadow-inner">
                <FaUtensils className="w-10 h-10 text-[#e68900] group-hover:text-white transition-all duration-300" />
              </div>
              <h3 className="text-2xl font-semibold text-[#e68900]">{t("digitalMenu")}</h3>
              <p className="text-gray-500 mt-3 text-center text-sm">{t("digitalMenuText")}</p>
            </Link>

            <Link
              to="/feedback"
              className="group flex flex-col items-center justify-center p-8 bg-white/90 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-[#5c471c]/40 hover:-translate-y-1"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#5c471c]/10 group-hover:bg-[#5c471c] transition-all duration-300 mb-5 shadow-inner">
                <FaCommentDots className="w-10 h-10 text-[#5c471c] group-hover:text-white transition-all duration-300" />
              </div>
              <h3 className="text-2xl font-semibold text-[#5c471c]">{t("feedback")}</h3>
              <p className="text-gray-500 mt-3 text-center text-sm">{t("feedbackText")}</p>
            </Link>
          </div>

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
        </>
      ) : (
        <div className="text-center z-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t("hotelNotFound")}</h2>
          <p className="text-[red] text-lg">{t("hotelNotFoundText")}</p>
        </div>
      )}
    </section>
  );
}

export default LandingPage;
