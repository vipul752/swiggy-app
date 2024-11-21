import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [originalRestaurants, setFilterRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  console.log(listOfRestaurants);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilterRestaurants(listOfRestaurants);
    } else {
      let filtered = listOfRestaurants.filter((restaurant) =>
        restaurant.info.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilterRestaurants(filtered);
    }
  }, [search]);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6557205&lng=77.4106242&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTINGs"
    );

    const json = await data.json();

    console.log(json);
    setListOfRestaurants(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
    setFilterRestaurants(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  const online = useOnlineStatus();

  if (online === false) {
    return (
      <div className="offline-message">
        <h2>Connection Error</h2>
        <p>Please check your internet connection and try again.e</p>
      </div>
    );
  }

  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="filter">
        <div className="search-container">
          <input
            className="search-box"
            type="text"
            placeholder="Search for restaurants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="search-btn"
            onClick={() => {
              let filteredRestaurants = listOfRestaurants.filter((restaurant) =>
                restaurant.info.name
                  .toLowerCase()
                  .includes(search.toLowerCase())
              );
              setFilterRestaurants(filteredRestaurants);
            }}
          >
            <span>Search</span>
          </button>
        </div>
      </div>
      <div className="res-container">
        {originalRestaurants.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
