import "../styles/components/cart.css";
import CartItem from "./CartItem";

function Cart({ cartItems, onUpdateQuantity, onCheckout, onClose }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="CartContainer">
      <div className="CartHeader">
        <button className="CloseButton" onClick={() => onClose(false)}>✕</button>
        <div className="Basket">
          <h1 id="basket-title">Basket</h1>
        </div>
      </div>
      <hr />
      <div className="CartBody">
        {cartItems.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))
        )}
      </div>
      <hr />
      <div className="CartFooter">
        <div className="Price">
          <p id="price-label">Total: ₱{total.toFixed(2)}</p>
        </div>
        <button className="CheckoutButton" onClick={onCheckout} disabled={cartItems.length === 0}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;