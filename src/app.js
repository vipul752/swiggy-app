import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Error from "./components/Error";
import About from "./components/About";
import RestaurantsMenu from "./components/RestaurantsMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// Main App component

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantsMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

// Rendering the App component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
