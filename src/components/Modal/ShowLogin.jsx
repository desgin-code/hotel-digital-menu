import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/features/login/loginUserSlice";
import countryCodes from "../../data/countryCodes";
import { useTranslation } from "react-i18next";

export default function ShowLogin({
  setShowLogin,
  setIsLoggedIn,
  purpose = "checkout",
}) {
  const [countryCode, setCountryCode] = useState("+254");
  const [phone, setPhone] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleContinue = () => {

    if (!/^7\d{8}$/.test(phone)) {
      setErrorMsg("Please enter a valid  phone number");
      return;
    }
    const fullPhone = `${countryCode}${phone}`;
    setErrorMsg(null);

    dispatch(loginUser({ phone: fullPhone }));
    setIsLoggedIn(true);
    setShowLogin(false);

    purpose === "login"
      ? window.location.reload()
      : navigate("/checkout-details");
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-end justify-center z-50"
      onClick={() => setShowLogin(false)}
    >
      <div
        className="bg-white w-full sm:max-w-md h-[60vh] sm:h-auto rounded-t-3xl p-4 sm:p-6 shadow-lg flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 text-[#5c471c]">
          {t("loginToContinue")}
        </h3>

        {errorMsg && (
          <p className="text-red-700 text-center font-semibold mb-4 text-sm sm:text-base">
            {errorMsg}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="border-2 border-gray-200 rounded-xl px-3 py-3 text-sm sm:text-base w-full sm:w-32"
          >
            {countryCodes.map((item, index) => (
              <option key={index} value={item.code}>
                {item.flag} {item.country} ({item.code})
              </option>
            ))}
          </select>

          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-sm sm:text-base"
          />
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-[#e68900] text-white py-3 rounded-xl font-semibold text-sm sm:text-base mb-2 sm:mb-0"
        >
          Continue
        </button>

        <button
          onClick={() => setShowLogin(false)}
          className="w-full mt-2 sm:mt-4 text-gray-500 text-center text-sm sm:text-base"
        >
          Cancel
        </button>
      </div>
    </div>

  );
}
