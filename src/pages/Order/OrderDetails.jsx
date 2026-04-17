import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../layouts/Header/Header";
import Layout from "../../layouts/Layout";
import { formatDate } from "../../utils/formateDate";
import CurrencySymbol from "../../components/Currency/CurrencySymbol";

export default function OrderDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

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
      <div className="flex flex-col items-center bg-gray-50 min-h-screen p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 space-y-5">
          {/* Back Button */}
          <button
            className="text-sm text-[#5c471c] hover:underline mb-2"
            onClick={() => navigate(-1)}
          >
            &larr; Back to Orders
          </button>

          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Order Details
          </h2>

          {/* Order Info */}
          <div className="space-y-2 text-gray-700 flex justify-between items:center">
            <div className="">
              <p>
                <span className="font-semibold">Order ID:</span>{" "}
                {order.order_no}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {formatDate(order.created_at)}
              </p>

              <p>
                <span className="font-semibold">Payment:</span>{" "}
                <span
                  className={` text-xs font-semibold ${order?.payment === "Paid"
                    ? " text-green-600"
                    : order.payment === "Pending"
                      ? " text-yellow-600"
                      : " text-red-600"
                    }`}
                >
                  {order?.payment_status
                    ? order.payment_status.charAt(0).toUpperCase() +
                    order.payment_status.slice(1)
                    : ""}
                </span>
              </p>
              <p ><span className="font-semibold">{order?.seating_type?.charAt(0).toUpperCase() +
                order?.seating_type?.slice(1)} No. :</span> {order.order_location}</p>

              <p ><span className="font-semibold">Meal Date & Time :</span> {formatDate(order.meal_date_time)}</p>
            </div>
            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${order?.order_status === "delivered"
                  ? "bg-green-100 text-green-600"
                  : order.order_status === "processing"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                  }`}
              >
                {order?.order_status
                  ? order.order_status.charAt(0).toUpperCase() +
                  order.order_status.slice(1)
                  : ""}
              </span>
            </div>
          </div>

          {order.special_request && (

            <div className="mt-4">
              <p className="font-semibold mb-2 text-gray-800 text-lg">Special Requests</p>
              <p>{order.special_request}</p>
            </div>

          )}






          {/* Items List */}
          <div className="mt-4">
            <p className="font-semibold mb-2 text-gray-800 text-lg">Items</p>
            <ul className="divide-y divide-gray-200 border rounded-lg overflow-hidden">
              {order.order_items.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 transition"
                >
                  <span className="font-medium text-gray-700">
                    {item.item_name}
                  </span>
                  <span className="text-gray-600">
                    <span className="text-gray-600">
                      {(item.quantity || 1)} × <CurrencySymbol /> {Math.round(item.price * (1 - (item.discount || 0) / 100))} = <CurrencySymbol />
                      {(item.quantity || 1) * Math.round(item.price * (1 - (item.discount || 0) / 100))}
                    </span>

                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Totals Section */}
          <div className="mt-4 border-t pt-3 space-y-1 text-gray-700">
            <p className="flex justify-between">
              <span>Subtotal:</span>
              <span>
                <CurrencySymbol /> {order?.subtotal ?? 0}
              </span>
            </p>

            <p className="flex justify-between">
              <span>Convenience Fee:</span>
              <span>
                <CurrencySymbol /> {order?.commission_fee ?? 0}
              </span>
            </p>

            <p className="flex justify-between">
              <span>Tax:</span>
              <span>
                <CurrencySymbol /> {order?.tax ?? 0}
              </span>
            </p>

            <p className="flex justify-between">
              <span>Discount:</span>
              <span className="text-green-600">
                - <CurrencySymbol /> {order?.discount ?? 0}
              </span>
            </p>

            <p className="flex justify-between font-semibold text-gray-800 text-lg">
              <span>Total:</span>
              <span>
                <CurrencySymbol /> {order?.total_price ?? 0}
              </span>
            </p>
          </div>


          {/* Print Button */}
          <button
            onClick={() => window.print()}
            className="mt-4 w-full bg-[#5c471c] text-white py-3 rounded-full hover:bg-[#463616] transition font-semibold shadow-lg"
          >
            Print
          </button>
        </div>
      </div>
    </Layout>
  );
}
