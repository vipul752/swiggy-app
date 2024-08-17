import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const RestaurantsMenu = ({ restaurants }) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchedData();
  }, []);

  const fetchedData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.99740&lng=79.00110&restaurantId=912754&catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await data.json();
    console.log(json);
    setResInfo(data);
  };

  if (resInfo === null) return <Shimmer />;

  return (
    <div>
      <h1></h1>
    </div>
  );
};

export default RestaurantsMenu;
