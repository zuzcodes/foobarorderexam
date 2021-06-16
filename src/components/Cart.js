import CartContent from "../components/CartContent";
import PaymentForm from "../components/PaymentForm";

export default function Cart(props) {
  return (
    <section className="Cart">
      {props.cart.length > 0 ? <CartContent cart={props.cart} key={props.cart.name} {...props.cart} removeFromCart={props.removeFromCart} totalAmount={props.totalAmount} totalPrice={props.totalPrice} modifyProductAmount={props.modifyProductAmount}/> : <p className="empty">Your FooCart is empty.</p>}
      {props.cart.length > 0 ? <PaymentForm post={props.post} showOrderConfirmation={props.showOrderConfirmation} /> : null}
    </section>
  );
}
