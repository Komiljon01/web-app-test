import { totalPrice } from "../units/total-price";
import Button from "./Button";

function Cart({ cartItems, onCheckout }) {
  return (
    <div className="mt-10 flex items-center justify-center gap-5">
      <p className="text-2xl">
        Umumiy narx:{" "}
        {totalPrice(cartItems).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p>

      <Button
        type="checkout"
        title={cartItems.length === 0 ? "Buyurtma" : "To'lov"}
        disabled={cartItems.length === 0}
        onClick={onCheckout}
      />
    </div>
  );
}

export default Cart;
