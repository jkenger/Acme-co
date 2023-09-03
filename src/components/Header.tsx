import { useCart } from "../hooks/useCart";
import Nav from "./Nav";

type Props = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};
function Header({ viewCart, setViewCart }: Props) {
  const { totalItems, totalPrice } = useCart();

  const content = (
    <header>
      <div className="header__title-bar">
        <h1>Acme Co.</h1>
        <div className="header__price-box">
          <p>Total Items: {totalItems}</p>
          <p>Total Price: {totalPrice}</p>
        </div>
      </div>
      <Nav viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  );
  return <div>{content}</div>;
}
export default Header;
