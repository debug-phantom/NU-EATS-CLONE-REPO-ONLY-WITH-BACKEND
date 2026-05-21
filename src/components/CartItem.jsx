import "../styles/components/cart.css";

function CartItem({ id, name, price, quantity, onUpdateQuantity }) {
  return (
    <div className="CartItem">
      <div className="QuantityDiv Itemdiv">
        <button className="QuantityButton" onClick={() => onUpdateQuantity(id, -1)}>
          -
        </button>
        <p className="Quantity">{quantity}</p>
        <button className="QuantityButton" onClick={() => onUpdateQuantity(id, 1)}>
          +
        </button>
      </div>
      <div className="ItemNameDiv Itemdiv">
        <p className="ItemName">{name}</p>
      </div>
      <div className="ItemPriceDiv Itemdiv">
        <p className="ItemPrice">₱{(price * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
}

export default CartItem;