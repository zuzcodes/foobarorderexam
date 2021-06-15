import Product from "../components/Product";

export default function ProductList(props) {
  return (
    <main className="ProductList">
      {props.product.length === 0 && <p>Loading...</p>}
      {props.product.map((item) => (
        <Product addToCart={props.addToCart} {...item} key={item.id} />
      ))}
    </main>
  );
}
