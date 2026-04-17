import React, { useState, useEffect } from "react";
import Header from "../../layouts/Header/Header";
import Layout from "../../layouts/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/features/cart/cartFoodSlice";
import CurrencySymbol from "../../components/Currency/CurrencySymbol";

export default function OrderSummary() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const hotel = useSelector((state) => state.hotel.hotel);
  const { phone } = useSelector((state) => state.login.user);
  const hotel_id = hotel?.id || null;

  const per_order_tax = hotel?.per_order_tax || 0;
  const [isPaying, setIsPaying] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    seatingType: "",
    location: "",
    specialRequests: "",
  });
  const [coupon, setCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("checkoutDetails");
    if (stored) {
      setCustomerDetails(JSON.parse(stored));
    }
  }, []);

  const subTotals = Math.round(
    cartItems.reduce((acc, item) => {
      const qty = item.quantity || 1;
      const discount = item.discount || 0;
      const price = item.price || 0;
      const discountedPrice = price * (1 - discount / 100);
      return acc + discountedPrice * qty;
    }, 0)
  );

  let convenienceFee = 0;


  if (hotel?.commission_type === 'Flat') {
    console.log(hotel?.commission_type
    )
    convenienceFee = Math.floor(hotel?.commission ?? 0);
  }

  if (hotel?.commission_type === 'Percentage') {
    convenienceFee = Math.floor((subTotals * (hotel?.commission ?? 0)) / 100);
  }

  const tax = Math.round((subTotals * per_order_tax) / 100);
  const total = Math.round(subTotals + tax + convenienceFee - discount);



  const handlePayNow = async () => {

    setIsPaying(true);
    const orderData = {

      hotel_id: hotel_id,
      user: phone,
      items: cartItems,
      subtotal: subTotals,
      tax: tax,
      convenienceFee: convenienceFee,
      discount,
      total: total,
      couponCode,
      payment: "paid",
      paymentMethod: '',
      paymentId: "DUMMY12345",
      customerDetails
    };

    try {
      const response = await fetch(
        "https://manage.hotelsdigitalmenu.com/api/hotel/book-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderData)
        }
      );

      const data = await response.json();

      if (data.status) {

        const paymentResponse = data.payment_api_response;

        if (paymentResponse && paymentResponse.message) {
          alert(`${paymentResponse.message}!`);
        } else {
          alert(`${data.message}!`);
        }

        dispatch(clearCart());
        navigate("/ordersconfirmation");
      } else {
        console.error("Failed to place order:", data.message);
        alert("Failed to place order. Please try again!");
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Something went wrong while placing the order!");
    } finally {
      setIsPaying(false);
    }
  };



  const handlePayLater = async () => {
    const orderData = {
      hotel_id,
      user: phone,
      items: cartItems,
      subtotal: subTotals,
      tax,
      convenienceFee: convenienceFee,
      discount,
      total,
      couponCode,
      payment: "pending",
      paymentMethod: "pay later",
      customerDetails,
    };

    try {
      const response = await fetch(
        "https://manage.hotelsdigitalmenu.com/api/hotel/book-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();
      if (data.status) {
        dispatch(clearCart());
        navigate("/ordersconfirmation");
      } else {
        alert("Failed to place order. Try again!");
      }
    } catch (error) {
      alert("Something went wrong while placing the order!");
    }
  };



  const fetchCoupon = async () => {

    try {
      const response = await fetch(
        "https://manage.hotelsdigitalmenu.com/api/hotel/coupon",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ hotel_id: hotel_id }),
        }
      );

      const result = await response.json();

      setCoupon(result.data)

    } catch (error) {

      console.error("Error fetching hotel:", error.message);

    }
  };

  useEffect(() => {
    if (hotel_id) fetchCoupon();
  }, [hotel_id]);





  const applyCoupon = () => {
    const code = coupon.code;
    if (code === couponCode) {
      const discountDecimal = coupon.discount / 100;
      const discountAmount = Math.round(subTotals * discountDecimal);
      setDiscount(discountAmount);
      alert(`Coupon Applied! ${coupon.discount}% discount applied.`);
    } else {
      setDiscount(0);
      alert("Invalid coupon code.");
    }
  };


  return (
    <Layout>
      <Header />
      <section >
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow px-6 pt-2 pb-2">

          <h2 className="text-2xl font-bold mb-6 text-[#5c471c]">Order Summary</h2>
          {cartItems.length > 0 ? (
            <>

              <div className="bg-white rounded-2xl shadow p-6 space-y-6 mb-3">
                <h3 className="text-xl font-semibold text-gray-800">Guest Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <p className="font-medium text-gray-700">Name:</p>
                    <p className="text-gray-800">{customerDetails.name}</p>
                  </div>
                  {customerDetails.email && (
                    <div>
                      <p className="font-medium text-gray-700">Email:</p>
                      <p className="text-gray-800">{customerDetails.email}</p>
                    </div>
                  )}

                  <div>
                    <p className="font-medium text-gray-700">
                      {customerDetails.seatingType === "table" ? "Table No." : "Room No."}:
                    </p>
                    <p className="text-gray-800">{customerDetails.location}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">
                      Meal Time :
                    </p>
                    <p>
                      {new Date(customerDetails.mealDateTime).toLocaleString(undefined, {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </p>
                  </div>
                  {customerDetails.specialRequests && (
                    <div className="md:col-span-2">
                      <p className="font-medium text-gray-700">Special Requests:</p>
                      <p className="text-gray-800">{customerDetails.specialRequests}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-white rounded-2xl shadow p-4 hover:shadow-lg transition"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-24 h-24 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-800">{item.title}</h4>
                        <p className="text-gray-600">
                          <CurrencySymbol /> {Math.round(item.price - (item.price * (item.discount / 100)))} × {item.quantity || 1}
                        </p>
                      </div>
                    </div>
                    <div className="text-right font-bold text-[#5c471c]">
                      <CurrencySymbol /> {(Math.round(item.price - (item.price * (item.discount / 100))) * (item.quantity || 1))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl shadow p-6 space-y-4 mb-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 border rounded-lg px-4 py-2 w-full"
                  />
                  <button
                    onClick={applyCoupon}
                    className="w-full sm:w-auto bg-[#e68900] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#cc7700] transition"
                  >
                    Apply
                  </button>
                </div>
                {discount > 0 && (
                  <p className="text-green-600 font-semibold mt-2">
                    Discount Applied: <CurrencySymbol /> {discount}
                  </p>
                )}
              </div>


              <div className="bg-white rounded-2xl shadow p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="space-y-2 w-full sm:w-auto">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Subtotal:</span>
                    <span className="font-semibold text-gray-800">
                      <CurrencySymbol /> {subTotals}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Convenience Fee :</span>
                    <span className="font-semibold text-gray-800">
                      <CurrencySymbol /> {convenienceFee}
                    </span>
                  </div>


                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Tax ({per_order_tax}%):</span>
                    <span className="font-semibold text-gray-800">
                      <CurrencySymbol /> {tax}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Discount:</span>
                      <span className="font-semibold text-green-600">
                        - <CurrencySymbol /> {discount}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-[#5c471c] text-lg">
                    <span>Total:</span>
                    <span>
                      <CurrencySymbol /> {total}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0 flex-col sm:flex-row">
                  <button
                    onClick={handlePayLater}
                    className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-2xl transition"
                  >
                    Pay Later
                  </button>
                  <button
                    disabled={isPaying}

                    onClick={handlePayNow}
                    className="w-full sm:w-auto bg-gradient-to-r from-[#e68900] to-[#f2b100] hover:from-[#cc7700] hover:to-[#e6a100] text-white font-semibold py-3 px-6 rounded-2xl transition shadow-lg"
                  >
                    {isPaying ? "Processing..." : "Pay Now"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-32">
              <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
              <button
                onClick={() => navigate("/menu")}
                className="px-6 py-3 bg-[#e68900] text-white rounded-2xl font-semibold hover:bg-[#cc7700] transition"
              >
                Add Items
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );

}