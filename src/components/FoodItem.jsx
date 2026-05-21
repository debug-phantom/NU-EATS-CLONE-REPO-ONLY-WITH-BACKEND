import React from "react";
import "../styles/components/fooditem.css";
import add from "../assets/icons/Add.png";

function FoodItem(props) {
  const handleAdd = () => {
    props.onAddToCart({
      id: props.id,
      name: props.name,
      price: props.price,
      image: props.foodimg,
    });
  };

  return (
    <div className="GridSpace">
      <div className="Item">
        <div className="ImageDiv">
          <img src={props.foodimg} alt={props.name} className="FoodImg" />
        </div>
        <div className="InfoDiv">
          <h1 className="FoodName">{props.name}</h1>
          <p className="FoodDescription">{props.description}</p>
        </div>
        <div className="PriceDiv">
          <p className="FoodPrice">₱{props.price}</p>
          <button className="AddIconButton" onClick={handleAdd}>
            <img src={add} alt="Add to Cart" className="AddIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodItem;