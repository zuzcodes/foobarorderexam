import { useState } from "react";

export default function LandingPage() {
  const [isVisible, setVisible] = useState(true);
  const openMenu = () => {
    setVisible(!isVisible);
  };
  return (
    <section className={isVisible ? null : "hide"}>
      <article className="landing">
        <img alt="foobar logo" className="foobar-logo-landing" src="../foobar-logo.png" />
        <img onClick={openMenu} alt="sample qr code" className="qr-sample" src="../qr-sample.png" />
        <img alt="blue wave" className="blue-wave" src="../blue-wave.svg" />
        <img alt="beer taps by adam wilson from unsplash" className="landing-image" src="../adam-wilson-ANK5zq-g_-g-unsplash.jpg" />
        <p className="instructions">SCAN (CLICK) QR CODE TO SEE THE MENU</p>
      </article>
    </section>
  );
}
