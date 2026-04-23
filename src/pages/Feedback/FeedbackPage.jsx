import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import countryCodes from "../../data/countryCodes";
import { useTranslation } from "react-i18next";

function FeedbackPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [questions, setQuestions] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState("");
  const [countryCode, setCountryCode] = useState("+254");

  const hotel = useSelector((state) => state.hotel.hotel);

  const hotel_id = hotel?.id || null;

  const fetchFeedbackQuestion = async () => {
    const response = await fetch(
      `https://manage.hotelsdigitalmenu.com/api/hotel/feedback/${hotel_id}`
    );
    const result = await response.json();

    const data = result.data;
    setQuestions(data);
    setRatings(
      data.map((q) => ({
        question: q.question,
        score: 0,
        feedbackCategory: q.feedback_category,
      }))
    );
  };

  useEffect(() => {
    fetchFeedbackQuestion();
  }, []);

  const handleStarClick = (qIndex, starValue) => {
    const newRatings = [...ratings];
    newRatings[qIndex].score = starValue;
    setRatings(newRatings);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return alert("Please enter your name.");
    // if (!email.trim()) return alert("Please enter your email.");
    // if (!phone.trim()) return alert("Please enter your phone number.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) && email)
      return alert("Please enter a valid email address.");

    const phoneRegex = /^[0-9]{6,12}$/;
    if (!phoneRegex.test(phone) && phone)
      return alert("Please enter a valid phone number.");


    const filledRatings = ratings.map((r) => ({
      question: r.question,
      feedbackCategory: r.feedbackCategory,
      score: r.score || 0,
    }));

    const fullPhone = `${countryCode}${phone}`;

    const formData = new FormData();
    formData.append("hotelId", hotel_id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", fullPhone);
    formData.append("comment", comment);
    formData.append("ratings", JSON.stringify(filledRatings));
    if (file) formData.append("file", file);

    try {
      const response = await fetch(
        "https://manage.hotelsdigitalmenu.com/api/hotel/store-feedback-response",
        {
          method: "POST",
          body: formData, // Do NOT set Content-Type manually
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Validation failed");
        return;
      }

      sessionStorage.setItem("feedbackSubmitted", "true");
      navigate("/thank-you");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 via-white to-blue-50 py-12 px-4 ">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <button className="px-5 py-2 bg-white shadow-md rounded-full hover:bg-gray-100 transition">
          <button onClick={() => navigate(-1)}>← Back</button>
        </button>
        <h1 className="text-4xl font-extrabold text-gray-800 border-b-4 border-[#e68900] pb-2">
          {t("feedback")}
        </h1>
        <div></div>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-10 grid md:grid-cols-12 gap-10">
        {questions && questions.length > 0 ? (
          <>
            {/* Left Column: Feedback Questions */}
            <div className="md:col-span-7 grid md:grid-cols-1 gap-6">
              {questions.map((qItem, qIndex) => (
                <div
                  key={qIndex}
                  className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl shadow-md transform transition-all duration-300"
                >
                  <h3 className="text-gray-700 font-semibold mb-4">
                    {qItem.question}
                  </h3>

                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={22}
                        className={`cursor-pointer transition-colors duration-200 ${ratings[qIndex]?.score >= star
                          ? "text-yellow-400"
                          : "text-gray-300"
                          }`}
                        onClick={() => handleStarClick(qIndex, star)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: User Details */}
            <div className="md:col-span-5 flex flex-col justify-start space-y-6">
              <input
                type="text"
                placeholder="Your Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 pt-5 pb-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />

              <input
                type="email"
                placeholder="Your Email "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 pt-5 pb-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required
              />

              <div className="flex gap-1 mb-6">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full px-4 pt-5 pb-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                  {countryCodes.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.country} ({item.code})
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 pt-5 pb-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>


              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full px-4 pt-5 pb-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />

              <textarea
                rows="4"
                placeholder="Please enter your comments (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 pt-5 pb-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              ></textarea>

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
              >
                Submit Feedback
              </button>
            </div>
          </>
        ) : (
          <div className="md:col-span-12 flex items-center justify-center h-[300px]">
            <p className="text-center text-gray-500 font-medium text-lg">
              Nothing For Feedbacks
            </p>
          </div>
        )}
      </div>

      <div className=" mt-4 text-gray-500 text-sm z-10 text-center">
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
    </section>
  );
}

export default FeedbackPage;
