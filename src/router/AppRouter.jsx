import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import IndexPage from "../pages/Home/IndexPage";
import ViewCart from "../pages/Cart/ViewCart";
import OrderSummary from "../pages/Summary/OrderSummary";
import Order from "../pages/Order/MyOrders";
import OrderConfirmation from "../pages/Confirmation/OrderConfirmation";
import Profile from "../pages/Profile/Profile";
import OrderDetails from "../pages/Order/OrderDetails";
import UpdateOrderPayment from "../pages/Payement/UpdateOrderPayment";
import LandingPage from "../pages/Home/LandingPage";
import FeedbackPage from "../pages/Feedback/FeedbackPage";
import ThankYouPage from "../pages/Feedback/ThankYouPage";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutDetails from "../pages/Checkout/CheckoutDetails";
function AppRouter() {
  return (
    //basename="/kuldeep/digital-menu" in Router parent paste
    <Router>
      <Routes>
        <Route path="hotel/:endpoint" element={<LandingPage />} />

        {/* Protected Routes */}
        <Route
          path="menu"
          element={
            <ProtectedRoute>
              <IndexPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="feedback"
          element={
            <ProtectedRoute>
              <FeedbackPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="thank-you"
          element={
            <ProtectedRoute>
              <ThankYouPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <ViewCart />
            </ProtectedRoute>
          }
        />
        <Route
          path="ordersummary"
          element={
            <ProtectedRoute>
              <OrderSummary />
            </ProtectedRoute>
          }
        />
        <Route
          path="ordersconfirmation"
          element={
            <ProtectedRoute>
              <OrderConfirmation />
            </ProtectedRoute>
          }
        />

        <Route
          path="orders"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        />
        <Route
          path="orders/:orderId"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="update-order-payment/:orderId"
          element={
            <ProtectedRoute>
              <UpdateOrderPayment />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />


        <Route
          path="checkout-details"
          element={
            <ProtectedRoute>
              <CheckoutDetails />
            </ProtectedRoute>
          }
        />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
