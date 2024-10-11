import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useLocation } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();

  const orderId = new URLSearchParams(location.search).get("orderId");
  const totalPrice =
    parseFloat(new URLSearchParams(location.search).get("totalPrice")) || 0;

  const cartItemsString = new URLSearchParams(location.search).get("cartItems");
  let cartItems = [];

  if (cartItemsString) {
    try {
      cartItems = JSON.parse(decodeURIComponent(cartItemsString));
    } catch (error) {
      console.error("Failed to decode or parse cart items:", error);
      cartItems = [];
    }
  }

  const generateInvoice = () => {
    const pdf = new jsPDF();

    // Set title and styling
    pdf.setFontSize(22);
    pdf.setTextColor(40, 87, 141);
    pdf.text("Invoice", 20, 20);

    pdf.setFontSize(12);
    pdf.setTextColor(50);
    pdf.text(`Order ID: ${orderId}`, 20, 40);
    pdf.text(`Total Price: ₹${totalPrice.toFixed(2)}`, 20, 50);

    const items = cartItems.map((item) => [
      item.card.info.name,
      item.card.info.price
        ? `₹${(item.card.info.price / 100).toFixed(2)}`
        : `₹${(item.card.info.defaultPrice / 100).toFixed(2)}`,
    ]);

    // Set styles for the table
    pdf.autoTable({
      head: [["Item Name", "Price"]],
      body: items,
      startY: 60,
      theme: "grid",
      headStyles: {
        fillColor: [40, 87, 141], // Blue color for header
        textColor: [255, 255, 255], // White text
        fontSize: 12,
      },
      styles: {
        cellPadding: 5,
        fontSize: 10,
        overflow: "linebreak", // Allow text to break
      },
      columnStyles: {
        0: { cellWidth: "auto" }, // Auto width for item names
        1: { cellWidth: 40 }, // Fixed width for price column
      },
    });

    pdf.save(`invoice_${orderId}.pdf`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-10 max-w-lg bg-white shadow-lg rounded-lg border border-gray-300">
        <h1 className="text-5xl font-extrabold text-green-600 mb-4 animate-bounce">
          Thank You!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Your payment was successful, and your order is being processed. We
          hope you enjoy your meal!
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Your order ID is: <span className="font-semibold">{orderId}</span>
        </p>
        <p className="text-lg font-semibold text-gray-800 mt-2">
          Total Price:{" "}
          <span className="text-green-700">₹{totalPrice.toFixed(2)}</span>
        </p>

        {/* Displaying cart items */}
        <h2 className="text-xl font-semibold mt-6 mb-4 text-gray-800">
          Ordered Items:
        </h2>
        <ul className="list-none mt-2 space-y-2">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <li key={index} className="text-gray-700 border-b pb-2">
                <span className="font-semibold">{item.card.info.name}</span> - ₹
                {item.card.info.price
                  ? (item.card.info.price / 100).toFixed(2)
                  : (item.card.info.defaultPrice / 100).toFixed(2)}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No items found.</li>
          )}
        </ul>

        <div className="mt-8 space-y-4">
          <button
            onClick={generateInvoice}
            className="w-full mb-4 bg-blue-600 text-white py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-105"
          >
            📄 Download Invoice
          </button>
          <a
            href="/"
            className="w-full bg-gradient-to-r from-green-500 to-lime-500 text-white py-2 px-6 rounded-full text-xl  transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            Continue Shopping
          </a>
        </div>

        <div className="mt-10">
          <img
            src="https://img.freepik.com/free-vector/delicious-vegetable-pizza-realistic-illustration_1284-53994.jpg"
            alt="Pizza Illustration"
            className="w-72 mx-auto rounded-lg shadow-lg border border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
