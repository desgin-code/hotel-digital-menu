import React from "react";
import Footer from "./Footer/Footer";
export default function Layout({ children }) {
  return (
    <>
      <main className="main mb-20">{children}</main>
      <Footer />
    </>
  );
}
