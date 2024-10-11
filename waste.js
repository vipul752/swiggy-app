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