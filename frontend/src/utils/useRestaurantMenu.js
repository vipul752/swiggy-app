import { useEffect, useState } from "react";
import { MENU_URL } from "../utils/constant";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  useEffect(() => {
    fetchedMenu();
  }, []);

  const fetchedMenu = async () => {
    const data = await fetch(MENU_URL + resId);
    const json = await data.json();

    setResInfo(json.data);
  };
  return resInfo;
};

export default useRestaurantMenu;
