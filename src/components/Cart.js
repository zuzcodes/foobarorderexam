import CartContent from "../components/CartContent";
import PaymentForm from "../components/PaymentForm";

export default function Cart(props) {
  return (
    <section className="Cart">
      <CartContent cart={props.cart} removeFromCart={props.removeFromCart} />
      {props.cart.length > 0 ? <PaymentForm post={props.post} showOrderConfirmation={props.showOrderConfirmation} /> : null}
    </section>
  );
}
