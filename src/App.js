import { useState, useEffect } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ThankYouPage from "./pages/ThankYouPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faTimes } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [isActive, setActive] = useState(true);
  const [products, setProducts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [taps, setTaps] = useState([]);
  const [cart, setCart] = useState([]);
  const [isVisible, setVisible] = useState(true);
  const [hasFeedback, setFeedback] = useState(true);
  const [orderNumber, setOrderNumber] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(getAvailableProducts, []);
  useEffect(getProducts, []);
  useEffect(() => {
    console.log(products.length, availableProducts.length);
    if (products.length > 0 && availableProducts.length > 0) {
      const filtered = availableProducts.map((tap) => {
        const description = products.find((item) => item.name === tap.beer);
        const nextBeer = { ...tap, ...description };
        return nextBeer;
      });
      setTaps(filtered);
    }
  }, [products, availableProducts]);

  useEffect(calcTotalAmount, [cart]);
  useEffect(calcTotalPrice, [cart]);

  const handleToggle = () => {
    setActive(!isActive);
  };
  const handleFeedback = () => {
    setFeedback(!hasFeedback);
  };

  function getProducts() {
    fetch("https://carrotsfoobar.herokuapp.com/beertypes")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }

  function getAvailableProducts() {
    fetch("https://carrotsfoobar.herokuapp.com/")
      .then((res) => res.json())
      .then((data) => {
        setAvailableProducts(data.taps);
      });
  }

  function addToCart(payload) {
    const inCart = cart.findIndex((item) => item.id === payload.id);
    if (inCart === -1) {
      //add amount
      console.log(payload);
      const nextPayload = { ...payload };
      nextPayload.amount = 1;
      setCart((prevState) => [...prevState, nextPayload]);
    } else {
      //item already exists in the basket - modify the amount
      const nextCart = cart.map((item) => {
        if (item.id === payload.id) {
          item.amount += 1;
        }
        return item;
      });
      setCart(nextCart);
    }
    handleFeedback();
  }

  function removeFromCart(payload) {
    const newCart = cart.filter((item) => {
      if (item.name !== payload.id) {
        return item;
      }
      return false;
    });
    setCart(newCart);
  }

  function modifyProductAmount(name, operand) {
    const newCart = [...cart]
    let i = 0;
    for (i = 0; i < newCart.length; i++) {
      if (newCart[i].name === name) {
        if (newCart[i].amount + operand > 0) {
          newCart[i].amount += operand;
          setCart(newCart);
        }
      }
    }
  }

  function calcTotalAmount() {
    let totalAmount = 0;
    cart.forEach((item) => (totalAmount += item.amount));
    setTotalAmount(totalAmount);
  }

  function calcTotalPrice() {
    let totalPrice = 0;
    cart.forEach((item) => { (totalPrice += item.amount * 49)
    });
    setTotalPrice(totalPrice);
  }

  function post() {
    const data = cart.map((item) => {
      return { name: item.name, amount: item.amount };
    });
    console.log(data);
    const postData = JSON.stringify(data);
    fetch("https://carrotsfoobar.herokuapp.com/order", {
      method: "post",
      body: postData,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "added") {
          console.log(res)
          setOrderNumber(res.id);
          setCart([]);
        }
      });
    }

  function showOrderConfirmation() {
    setVisible(!isVisible);
    console.log("Thank You");
  }

  function reloadPage() {
    window.location.reload();
  }

  return (
    <div className="App">
      <LandingPage />
      <div className={isActive ? "hide" : "show"}>
        <FontAwesomeIcon icon={faTimes} onClick={handleToggle} className="x-btn" />
        <Cart cart={cart} post={post} removeFromCart={removeFromCart} showOrderConfirmation={showOrderConfirmation} totalAmount={totalAmount} totalPrice={totalPrice} modifyProductAmount={modifyProductAmount}/>
      </div>
      <img alt="craft beers" className="header-image" src="../crafts.jpg" />
      <img alt="orange wave" className="orange-wave" src="../orange-wave.svg" />
      <img alt="foobar logo" className="foobar-logo" src="../foobar-logo.png" onClick={reloadPage} />
      <div className={hasFeedback ? "feedback1" : "feedback2"}>
        <FontAwesomeIcon icon={faShoppingBasket} onClick={handleToggle} className="cart-btn" totalAmount/>
      </div>
      <h1>On Tap</h1>
      <ProductList product={taps} addToCart={addToCart} />
      <div className={isVisible ? "hide" : "show"}>
        <ThankYouPage orderNumber={orderNumber}/>
      </div>
      <footer>
        <h2>Cheers</h2>
      </footer>
    </div>
  );
}
export default App;
