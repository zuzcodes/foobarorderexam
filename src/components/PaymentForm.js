import { useState, useEffect, useRef } from "react";
import InputMask from "react-input-mask";

export default function PaymentForm(props) {
  const [name, setName] = useState("");
  const [cardnumber, setCardnumber] = useState("");
  const [monthYear, setMonthYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [isValid, setIsValid] = useState(false);

  const form = useRef(null);

  useEffect(() => {
    const isCreditCardValid = cardnumber.replaceAll(" ", "").length === 16;
    const isMonthYearValid = monthYear.replace("/", "").length === 4;
    const isCvcValid = cvc.replace(" ").length === 3;
    setIsValid(form.current.checkValidity() && isCvcValid && isMonthYearValid && isCreditCardValid);
  }, [name, cardnumber, monthYear, cvc]);

  function onSubmit(e) {
    e.preventDefault();
    props.post();
    props.showOrderConfirmation();
  }

  return (
    <section className="PaymentForm">
      <form onSubmit={onSubmit} ref={form}>
        <h3>PAYMENT</h3>
        <label htmlFor="name">Name</label>
        <input type="text" required minLength="2" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="cardnumber">Card number</label>
        <InputMask mask="9999 9999 9999 9999" value={cardnumber} maskChar="" onChange={(e) => setCardnumber(e.target.value)} required />
        <div className="form-group-inline">
          <div className="form-group">
            <label htmlFor="monthyear">Expiration (MM/YY)</label>
            <InputMask mask="99/99" maskChar="" required value={monthYear} onChange={(e) => setMonthYear(e.target.value)} minLength="5"></InputMask>
          </div>
          <div className="form-group left">
            <label htmlFor="cvc">CVC</label>
            <InputMask mask="999" value={cvc} maskChar="" onChange={(e) => setCvc(e.target.value)} required />
          </div>
        </div>
        <button className="submit-btn" htmltype="submit" disabled={!isValid}>
          Confirm & Pay
        </button>
      </form>
    </section>
  );
}
