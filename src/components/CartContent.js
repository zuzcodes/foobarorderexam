import CartItem from "../components/CartItem";

export default function CartContent({ cart, removeFromCart, totalAmount, totalPrice, modifyProductAmount}) {
  return (
    <section className="CartContent">
      <h3>MY FOO ORDER</h3>
      <div className="CartHeader">
        <p className="p-width">Product</p>
        <p>Amount</p>
        <p>Price</p>
        <p><span></span></p>
      </div>
      {cart.map((item) => (
        <CartItem name={item.name} removeFromCart={removeFromCart} amount={item.amount} price={item.amount * 49} key={item.id} modifyProductAmount={modifyProductAmount}/>
      ))}
      <hr />
      <div className="CartSummary">
        <p className="p-width">Total</p>
        <p className="p">{totalAmount}</p>
        <p className="p">{totalPrice} DKK</p>
        <p></p>
      </div>
    </section>
  );
}
