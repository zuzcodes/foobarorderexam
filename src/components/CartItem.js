import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
export default function CartItem(props) {
  return (
    <div className="CartItems">
      <p className="p-width">{props.name}</p>
      <p>{props.amount}</p>
      <p>{props.price},-</p>
      <FontAwesomeIcon icon={faTimes} onClick={() => props.removeFromCart({ id: props.name })} className="remove-btn" />
    </div>
  );
}
