import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NotFound() {
  const navigate = useNavigate();
  const hotel = useSelector((state) => state.hotel.hotel);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  to-black text-white px-6">
      <h1 className="text-9xl font-extrabold  text-[#935b63] ">404</h1>

      {/* Sub Heading */}
      <h2 className="mt-4 text-3xl font-semibold">Oops! Page Not Found</h2>
      <p className="mt-2 text-gray-400 text-lg text-center max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <button
        onClick={() => navigate(hotel.slug ? `/hotel/${hotel.slug}` : "/")}
        className="mt-8 px-6 py-3 bg-[#935b63] hover:bg-[#935b63] text-white font-semibold rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
      >
        Go Back Home
      </button>
    </div>
  );
}
