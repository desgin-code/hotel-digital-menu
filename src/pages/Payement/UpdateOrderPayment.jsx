import React, { useState } from "react";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { formatDate } from "../../utils/formateDate";
import CurrencySymbol from "../../components/Currency/CurrencySymbol";

export default function UpdateOrderPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const order = location.state?.order;

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isPaying, setIsPaying] = useState(false);

  const handleOnlinePayment = async () => {
    // if (!selectedMethod) {
    //   alert("Please select a payment method first!");
    //   return;
    // }
    setIsPaying(true);

    try {
      const response = await fetch(
        "https://manage.hotelsdigitalmenu.com/api/hotel/update-order-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_id: order.id,
            payment: "paid",
            payment_method: '',
            payment_id: "DUMMY123",
          }),
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


        navigate("/orders");
      } else {
        alert(data.message || "Failed to update payment.");
      }
    } catch (error) {
      console.error("Error updating payment:", error);
      alert("Something went wrong while processing payment.");
    } finally {
      setIsPaying(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (!order) {
    return (
      <Layout>
        <Header />
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500 text-lg">No order selected.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      <section>
        <div className="max-w-md md:max-w-2xl mx-auto px-4 space-y-8">
          <h2 className="text-3xl font-bold text-[#5c471c] text-center">
            Complete Your Payment
          </h2>

          <div className="bg-white shadow-xl rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center justify-between">
              <button
                className="text-sm text-[#5c471c] hover:underline"
                onClick={() => navigate(-1)}
              >
                &larr; Back
              </button>
              Your Order
            </h3>

            <div className="space-y-4">
              <p>
                <span className="font-semibold">Order ID:</span>{" "}
                {order.order_no}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {formatDate(order.created_at)}
              </p>

              {order.order_items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition"
                >
                  <div className="items-center gap-3">
                    <div>
                      <p className="font-medium text-gray-700">
                        {item.item_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity || 1}
                      </p>
                    </div>
                  </div>
                  <div className="font-semibold text-[#e68900]">
                    <CurrencySymbol /> {(item.price * (item.quantity || 1)).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Summary */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Subtotal</span>
                <span><CurrencySymbol /> {Math.ceil(order.subtotal) || 0}</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Tax (5%)</span>
                <span><CurrencySymbol /> {Math.ceil(order.tax) || 0}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-[#5c471c]">
                <span>Total</span>
                <span><CurrencySymbol /> {Math.ceil(order.total_price) || 0}</span>
              </div>
            </div>

            {/* <div className="space-y-3 mt-6">
              <h4 className="font-semibold text-gray-700">
                Choose Payment Method
              </h4>
              <div className="flex gap-3">
                {["UPI", "Card", "Wallet"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setSelectedMethod(method)}
                    className={`flex-1 py-3 rounded-xl border font-medium transition-all ${
                      selectedMethod === method
                        ? "border-[#e68900] bg-[#fff7e6] text-[#e68900] shadow-md"
                        : "border-gray-300 hover:bg-gray-100 text-gray-600"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div> */}

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={handleOnlinePayment}
                disabled={isPaying}
                className="flex-1 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-[#e68900] to-[#f2b100] shadow-lg hover:from-[#cc7700] hover:to-[#e6a100] transition-all"
              >
                {isPaying ? "Paying..." : "Pay Now"}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-4 rounded-2xl font-semibold text-gray-800 bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
