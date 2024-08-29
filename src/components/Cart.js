import React from "react";
import ItemListCart from "./ItemListCart";
import { clearCart } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const totalPrice =
    cartItems.reduce((total, item) => {
      const itemPrice = item.card.info.price || item.card.info.defaultPrice;
      return total + itemPrice;
    }, 0) / 100;

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Your Shopping Cart
      </h1>

      {cartItems.length > 0 ? (
        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
          <div className="w-full md:w-3/4">
            <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
              <ItemListCart items={cartItems} />
            </div>
          </div>
          <div className="w-full md:w-1/4 md:sticky top-6 bg-gray-50 p-6 rounded-lg shadow-lg">
            <div className="mb-6">
              <p className="text-xl text-gray-700">
                Total Items:{" "}
                <span className="font-semibold">{cartItems.length}</span>
              </p>
              <p className="text-xl text-gray-700">
                Total Price:{" "}
                <span className="font-semibold text-green-600">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </p>
            </div>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 mb-4">
              Place Order
            </button>
            <button
              onClick={handleClearCart}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 mb-4"
            >
              Clear Cart
            </button>

            <button
              onClick={() => window.history.back()}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              {cartItems.length === 0 ? "Go Back" : "Continue Shopping"}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-2xl text-gray-600 mb-6">Your cart is empty.</p>
          <p className="text-gray-500 mb-4">
            You can go to the home page to view more restaurants.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
