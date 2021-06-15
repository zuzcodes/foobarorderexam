import CartItem from "../components/CartItem";

export default function CartContent({ cart, removeFromCart }) {
  return (
    <section className="CartContent">
      <h3>MY FOO ORDER</h3>
      <p>
        You have {cart.length} item{cart.length === 1 ? "" : "s"} in your cart.
      </p>
      <div className="CartHeader">
        <p className="p-width">Product</p>
        <p>Amount</p>
        <p>Price</p>
        <p>Remove</p>
      </div>
      {cart.map((item) => (
        <CartItem name={item.name} removeFromCart={removeFromCart} amount={item.amount} price={item.amount * 49} key={item.id} />
      ))}
      <hr />
      <div className="CartSummary">
        <p className="p-width">Total</p>
        <p>{cart.length}</p>
        <p>{cart.length * 49}</p>
        <p> DKK </p>
      </div>
    </section>
  );
}
