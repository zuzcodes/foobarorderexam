import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faTrash } from "@fortawesome/free-solid-svg-icons";
export default function CartItem({name, amount, price, removeFromCart, modifyProductAmount}) {
  return (
    <div className="CartItems">
      <p className="p-width">{name}</p>
      <FontAwesomeIcon icon={faChevronDown} onClick={() => {modifyProductAmount(name, -1);}} className="item-btn"/>
      <p>{amount}</p>
      <FontAwesomeIcon icon={faChevronUp} onClick={() => {modifyProductAmount(name, 1);}} className="item-btn"/>
      <p>{price} DKK</p>
      <FontAwesomeIcon icon={faTrash} onClick={() => removeFromCart({ id: name })} className="item-btn" />
    </div>
  );
}
