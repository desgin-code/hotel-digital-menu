import { createSlice } from "@reduxjs/toolkit";

const loadOrders = () => {
  try {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState = {
  orders: loadOrders(),
};

const bookOrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    bookOrder: (state, action) => {
      const lastOrder = state.orders[state.orders.length - 1];
      const lastIdNumber = lastOrder
        ? parseInt(lastOrder.id.replace("ORD", ""))
        : 12345;
      const newOrderId = `ORD${lastIdNumber + 1}`;

      const newOrder = {
        id: newOrderId,
        user: action.payload.user,
        items: action.payload.items,
        subtotal: action.payload.subTotal,
        tax: action.payload.tax,
        total: action.payload.total,
        orderTime: new Date().toISOString(),
        status: "Processing",
        payment: action.payload.payment,
        paymentMethod: action.payload.paymentMethod,
        paymentId: action.payload.paymentId,
      };

      state.orders.push(newOrder);

      console.log(newOrder);

      localStorage.setItem("orders", JSON.stringify(state.orders));
    },

    cancelOrder: (state, action) => {
      const orderId = action.payload;
      const order = state.orders.find((o) => o.id === orderId);
      if (order) {
        order.status = "Cancelled";
        localStorage.setItem("orders", JSON.stringify(state.orders));
      }
    },

    clearOrders: (state) => {
      state.orders = [];
      localStorage.removeItem("orders");
      localStorage.removeItem("checkoutDetails");
    },

    updateOrderPayment: (state, action) => {
      const orderId = action.payload.orderId;
      const order = state.orders.find((o) => o.id === orderId);
      if (order) {
        order.payment = action.payload.payment;
        order.paymentMethod = action.payload.paymentMethod;
        order.paymentId = action.payload.paymentId;
        localStorage.setItem("orders", JSON.stringify(state.orders));
      }
    },
  },
});

export const { bookOrder, clearOrders, cancelOrder, updateOrderPayment } =
  bookOrderSlice.actions;
export default bookOrderSlice.reducer;
