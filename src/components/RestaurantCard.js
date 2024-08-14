import { CDN_URL } from "../utils/constant";

// RestaurantCard component
const RestaurantCard = (props) => {
  const { resData } = props;

  const { name, avgRating, cuisines, cloudinaryImageId, costForTwo } =
    resData?.info;

  return (
    <div className="res-card">
      <img className="res-logo" src={CDN_URL + cloudinaryImageId} alt="logo" />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} star</h4>
      <h4>{resData.info.sla.deliveryTime} minutes</h4>
      <h4>{costForTwo}</h4>
    </div>
  );
};

export default RestaurantCard;
