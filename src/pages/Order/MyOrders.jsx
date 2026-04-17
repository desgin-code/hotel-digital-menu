import { useEffect, useState } from "react";
import Header from "../../layouts/Header/Header";
import Layout from "../../layouts/Layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formateDate";
import CurrencySymbol from "../../components/Currency/CurrencySymbol";


export default function MyOrders() {
  const navigate = useNavigate();
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const phone = useSelector((state) => state.login.user?.phone || "");

  const hotel = useSelector((state) => state.hotel.hotel);

  const hotel_id = hotel?.id || null;



  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://manage.hotelsdigitalmenu.com/api/hotel/my-orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hotel_id, user: phone }),
        }
      );
      const data = await response.json();
      setAllOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmCancel) return;

    try {
      const response = await fetch(
        "https://manage.hotelsdigitalmenu.com/api/hotel/cancel-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: orderId, status: "cancelled" }),
        }
      );
      const data = await response.json();
      if (data.status) {
        alert("Order cancelled successfully!");
        fetchAllOrders();
      } else {
        alert(data.message || "Failed to cancel order.");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Something went wrong while cancelling the order.");
    }
  };

  return (
    <Layout>
      <Header />
      <section>
        <div className="mx-auto max-w-[92%] md:max-w-7xl">
          <h2 className="text-3xl font-bold text-[#5c471c] mb-6">
            Your Orders
          </h2>

          {loading ? (
            <div className="flex items-center justify-center h-[70vh]">
              <p className="text-center text-gray-500 text-lg">Loading...</p>
            </div>
          ) : allOrders.length === 0 ? (
            <div className="flex items-center justify-center h-[70vh]">
              <p className="text-center text-gray-500 text-lg">
                No orders found.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {allOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl shadow-md p-6 bg-white hover:shadow-lg transition-all"
                >
                  <div className="flex flex-row justify-between items-center gap-3">
                    <div>
                      <p className="text-sm text-gray-500">
                        Order ID:{" "}
                        <span className="font-medium">{order.order_no}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Date:{" "}
                        <span className="font-medium">
                          {formatDate(order.created_at)}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Payment:{" "}
                        <span
                          className={`text-xs font-semibold ${order.payment_status === "paid"
                            ? "text-green-600"
                            : order.payment_status === "pending"
                              ? "text-yellow-600"
                              : "text-red-600"
                            }`}
                        >
                          {order.payment_status
                            ? order.payment_status.charAt(0).toUpperCase() +
                            order.payment_status.slice(1)
                            : "Pending"}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">{order?.seating_type?.charAt(0).toUpperCase() +
                        order?.seating_type?.slice(1)} No. : {order.order_location}</p>

                      <p className="text-sm text-gray-500">
                        Meal Date & Time :  {formatDate(order.meal_date_time)}

                      </p>


                    </div>
                    <span
                      className={`px-6 py-3 rounded-full text-xs font-semibold ${order.order_status.toLowerCase() === "delivered"
                        ? "bg-green-100 text-green-600"
                        : order.order_status.toLowerCase() === "processing"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                        }`}
                    >
                      {order.order_status.charAt(0).toUpperCase() +
                        order.order_status.slice(1)}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold">Items:</span>{" "}
                      {order.order_items
                        ?.map((item) => item.item_name)
                        .join(", ")}
                    </p>
                    <p className="text-lg font-semibold mt-2 text-[#5c471c]">
                      <CurrencySymbol /> {order.total_price}
                    </p>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button
                      className="px-4 py-2 text-sm rounded-lg bg-[#5c471c] text-white hover:bg-[#463616] transition"
                      onClick={() =>
                        navigate(`/orders/${order.order_no}`, {
                          state: { order },
                        })
                      }
                    >
                      View Details
                    </button>
                    {order.order_status.toLowerCase() === "processing" &&
                      ( order.payment_status !== "paid" ) ? (
                      <button
                        className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Cancel Order
                      </button>
                    ) : null}
                    {(order.payment_status === "pending" || order.payment_status === "failed") &&
                      order.order_status.toLowerCase() !== "cancelled" ? (
                      <button
                        className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[#e68900] to-[#f2b100] hover:from-[#cc7700] hover:to-[#e6a100] text-white transition"
                        onClick={() =>
                          navigate(`/update-order-payment/${order.order_no}`, {
                            state: { order },
                          })
                        }
                      >
                        Pay Now
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
