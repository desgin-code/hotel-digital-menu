import { useState, useEffect } from "react";
import {
  FaBars,
  FaSignInAlt,
  FaArrowLeft,
  FaUser,
  FaBackward,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../redux/features/search/searchFoodSlice";
import ShowLogin from "../../components/Modal/ShowLogin";

export default function Header({ allItems }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setValueTerm] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const isLogin = useSelector((state) => state.login.islogin);
  const hotel = useSelector((state) => state.hotel.hotel);



  useEffect(() => {
    if (isLogin) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLogin]);

  const isOrderIndexPage = location.pathname !== "/menu";

  useEffect(() => {
    if (!allItems || allItems.length === 0) {
      setIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % allItems.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [allItems]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setValueTerm(value);
    dispatch(setSearchTerm(value));
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  return (
    <>
      <section className="section header-section">
        <header>
          <div className="nav-bar">
            {isOrderIndexPage ? (
              <>
                <button
                  className="back-btn flex items-center gap-2 text-lg font-semibold"
                  onClick={() => navigate("/menu")}
                >
                  <FaArrowLeft /> Back
                </button>
                <div className="auth">
                  <button className="sign-in" title="Sign In">
                    {isLoggedIn ? (
                      <Link to="/profile">
                        <FaUser />
                      </Link>
                    ) : (
                      <FaSignInAlt onClick={handleShowLogin} />
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="logo-toggle">


                  <Link to={`/hotel/${hotel.slug}`} className="toggle"  >
                    <FaArrowLeft />
                  </Link>


                  {hotel && hotel.logo ? (
                    <img
                      className="logo"
                      src={`https://manage.hotelsdigitalmenu.com/public/uploads/hotel/logo/${hotel.logo}`}
                      alt="Hotel Logo"
                      style={{ maxHeight: '100px' }}
                    />
                  ) : (
                    <span
                      className="logo-title"

                    >
                      Logo
                    </span>
                  )}



                </div>
                <div className="relative w-full max-w-md">
                  {!searchTerm && allItems.length > 0 && allItems[index] && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      Search for{" "}
                      <span className="font-bold text-gray-600">
                        {allItems[index].length > 15
                          ? allItems[index].slice(0, 15) + ".."
                          : allItems[index]}
                      </span>
                    </div>
                  )}
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border rounded-lg px-3 py-2 w-full text-black bg-transparent"
                  />
                </div>
                <div className="auth">
                  <button className="sign-in" title="Sign In">
                    {isLoggedIn ? (
                      <Link to="/profile">
                        <FaUser />
                      </Link>
                    ) : (
                      <FaSignInAlt onClick={handleShowLogin} />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </header>
      </section>

      {showLogin && (
        <ShowLogin
          setShowLogin={setShowLogin}
          setIsLoggedIn={setIsLoggedIn}
          purpose="login"
        />
      )}
    </>
  );
}
