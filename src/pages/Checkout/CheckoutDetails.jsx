import React, { useState, useEffect } from "react";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header/Header";
import { useNavigate, Link } from "react-router-dom";

export default function CheckoutDetails() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        customerName: "",
        customerEmail: "",
        specialRequests: "",
        seatingType: "table",
        tableNumber: "",
        roomNumber: "",
        mealDateTime: "",
    });

    const [errors, setErrors] = useState({});

    // Load data from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("checkoutDetails");
        if (stored) {
            const data = JSON.parse(stored);
            setForm({
                customerName: data.name || "",
                customerEmail: data.email || "",
                specialRequests: "",
                seatingType: data.seatingType || "table",
                tableNumber: data.seatingType === "table" ? data.location : "",
                roomNumber: data.seatingType === "room" ? data.location : "",
            });
        }
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!form.customerName.trim()) {
            newErrors.customerName = "Name is required";
        }

        if (form.customerEmail.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(form.customerEmail)) {
                newErrors.customerEmail = "Enter a valid email address";
            }
        }

        if (!form.seatingType) {
            newErrors.seatingType = "Please select Table or Room";
        }

        if (form.seatingType === "table" && !form.tableNumber.trim()) {
            newErrors.tableNumber = "Table number is required";
        }

        if (form.seatingType === "room" && !form.roomNumber.trim()) {
            newErrors.roomNumber = "Room number is required";
        }

         if (!form.mealDateTime) {
            newErrors.mealDateTime = "Please Schedule Your Meal";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const customerDetails = {
            name: form.customerName,
            email: form.customerEmail,
            specialRequests: form.specialRequests,
            seatingType: form.seatingType,
            location: form.seatingType === "table" ? form.tableNumber : form.roomNumber,
            mealDateTime : form.mealDateTime,
        };

        localStorage.setItem("checkoutDetails", JSON.stringify(customerDetails));
        navigate("/ordersummary");
    };

    return (
        <Layout>
            <Header />
            <section >
                <div className="max-w-xl mx-auto bg-white rounded-xl shadow px-6 pt-2 pb-2">
                    <h2 className="text-2xl font-bold mb-6 text-[#5c471c]">Guest Details</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                name="customerName"
                                placeholder="Full Name"
                                value={form.customerName}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                            />
                            {errors.customerName && (
                                <p className="text-red-600 text-sm mt-1">{errors.customerName}</p>
                            )}
                        </div>

                        <div>
                            <input
                                type="email"
                                name="customerEmail"
                                placeholder="Email Address (Optional)"
                                value={form.customerEmail}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2"
                            />
                            {errors.customerEmail && (
                                <p className="text-red-600 text-sm mt-1">{errors.customerEmail}</p>
                            )}
                        </div>

                        <textarea
                            name="specialRequests"
                            placeholder="Special Requests / Instructions"
                            value={form.specialRequests}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2"
                        />

                        <div className="flex gap-6 items-center">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="seatingType"
                                    value="table"
                                    checked={form.seatingType === "table"}
                                    onChange={handleChange}
                                />
                                Table
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="seatingType"
                                    value="room"
                                    checked={form.seatingType === "room"}
                                    onChange={handleChange}
                                />
                                Room
                            </label>
                        </div>
                        {errors.seatingType && (
                            <p className="text-red-600 text-sm mt-1">{errors.seatingType}</p>
                        )}

                        {form.seatingType === "table" ? (
                            <div>
                                <input
                                    type="text"
                                    name="tableNumber"
                                    placeholder="Table Number"
                                    value={form.tableNumber}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                                {errors.tableNumber && (
                                    <p className="text-red-600 text-sm mt-1">{errors.tableNumber}</p>
                                )}
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="text"
                                    name="roomNumber"
                                    placeholder="Room Number"
                                    value={form.roomNumber}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2"
                                />
                                {errors.roomNumber && (
                                    <p className="text-red-600 text-sm mt-1">{errors.roomNumber}</p>
                                )}
                            </div>
                        )}


                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700">
                              Schedule Your Meal
                            </label>

                            <input
                                type="datetime-local"
                                name="mealDateTime"
                                value={form.mealDateTime}
                                onChange={handleChange}
                               
                                className="w-full border rounded-lg px-4 py-2 text-gray-700"
                            />

                            {errors.mealDateTime && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.mealDateTime}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-4 mt-4">
                            <Link
                                to="/cart"
                                className="flex-1 text-center py-2 px-4 rounded-xl border-2 border-gray-400 text-gray-700 hover:bg-gray-100 transition"
                            >
                                Back to Cart
                            </Link>
                            <button
                                type="submit"
                                className="flex-1 bg-[#e68900] text-white py-2 rounded-xl font-semibold hover:bg-[#cc7700] transition"
                            >
                                Proceed
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </Layout>
    );
}
