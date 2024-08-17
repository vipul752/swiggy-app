import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [originalRestaurants, setFilterRestaurants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
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

        <button
          className="filter-btn"
          onClick={() => {
            let filteredData = originalRestaurants.filter(
              (restaurant) => restaurant?.info?.avgRating > 4.2
            );
            setFilterRestaurants(filteredData);
          }}
        >
          Top Rated Restraunts
        </button>
        <button
          className="price-filter-btn"
          onClick={() => {
            let filteredDataForPrice = originalRestaurants.filter(
              (restaurant) => {
                const costForTwoString = restaurant.info.costForTwo;
                const costForTwo = parseInt(
                  costForTwoString.replace(/[^0-9]/g, "")
                );
                return costForTwo >= 250 && costForTwo <= 300;
              }
            );
            setFilterRestaurants(filteredDataForPrice);
          }}
        >
          Rs 250-300
        </button>
        <button
          className="sort-low-to-high-btn"
          onClick={() => {
            let sortedData = [...originalRestaurants].sort((a, b) => {
              const costForTwoStringA = a.info.costForTwo;
              const costForTwoA = parseInt(
                costForTwoStringA.replace(/[^0-9]/g, "")
              );
              const costForTwoStringB = b.info.costForTwo;
              const costForTwoB = parseInt(
                costForTwoStringB.replace(/[^0-9]/g, "")
              );
              return costForTwoA - costForTwoB;
            });
            console.log(sortedData);
            setFilterRestaurants(sortedData);
          }}
        >
          Sort : Low to High
        </button>
        <button
          className="sort-high-to-low-btn"
          onClick={() => {
            let sortedData = [...originalRestaurants].sort((a, b) => {
              const costForTwoStringA = a.info.costForTwo;
              const costForTwoA = parseInt(
                costForTwoStringA.replace(/[^0-9]/g, "")
              );
              const costForTwoStringB = b.info.costForTwo;
              const costForTwoB = parseInt(
                costForTwoStringB.replace(/[^0-9]/g, "")
              );
              return costForTwoB - costForTwoA;
            });
            console.log(sortedData);
            setFilterRestaurants(sortedData);
          }}
        >
          Sort : High to Low
        </button>
        <button
          className="fast-delevary-btn"
          onClick={() => {
            let filteredData = originalRestaurants.filter(
              (restaurant) => restaurant?.info?.sla.deliveryTime < 50
            );
            console.log(filteredData);
            setFilterRestaurants(filteredData);
          }}
        >
          Fast Delivery
        </button>
      </div>
      <div className="res-container">
        {originalRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
