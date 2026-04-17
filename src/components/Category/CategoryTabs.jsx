import React from "react";
import { FaUtensils, FaHamburger, FaCocktail } from "react-icons/fa";

const categories = [
  { name: "All", icon: <FaUtensils /> },
  { name: "Foods", icon: <FaHamburger /> },
  { name: "Drinks", icon: <FaCocktail /> },
];

export default function CategoryTabs({ activeTab, setActiveTab }) {
  return (
    <section className="category_tabs">
      <div className="mx-auto space-y-10 max-w-[92%] md:max-w-7xl">
        <div className="flex space-x-6 overflow-x-auto border-b border-gray-200 mb-6">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(cat.name)}
              className={`flex items-center space-x-2 pb-2 border-b-4 transition-all duration-200 ${
                activeTab === cat.name
                  ? "border-[#5c471c] text-[#5c471c] font-semibold"
                  : "border-transparent text-[#e68900] font-medium"
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
