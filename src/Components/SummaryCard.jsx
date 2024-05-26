import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTotalCartValue } from "../utils/helper";

export default function SummaryCard() {
  const params = useLocation();
  const navigate = useNavigate();

  const handleCheckout = (cartLength) => {
    navigate(`${cartLength === 0 ? "" : "/checkout"}`);
  };

  const cart = useSelector((state) => state.cart.items);

  return (
    <article>
      {params.pathname !== "/checkout" ? (
        <h2 className="font-bold text-xl">Order Summary</h2>
      ) : (
        ""
      )}
      <input
        className="w-full mt-3 border border-gray-400 px-2 text-black"
        type="text"
        placeholder="Enter Coupan Code"
      />
      <div className="flex justify-between mt-3">
        <span>Subtotal</span>
        <span>₹{getTotalCartValue(cart)}</span>
      </div>
      <div className="flex justify-between mt-3">
        <span>Shipping</span>
        <small className="flex items-end text-gray-500">
          Calculated at next step
        </small>
      </div>
      <hr className="mt-3 h-0.5 m-auto bg-black" />
      <div className="flex justify-between mt-3">
        <span>Total</span>
        <span>₹{getTotalCartValue(cart)}</span>
      </div>
      {params.pathname !== "/checkout" ? (
        <button
          className="mt-3 bg-black text-white w-full py-3 disabled:bg-gray-700 tab-0"
          disabled={cart.length === 0}
          onClick={() => {
            handleCheckout(cart.length);
          }}
        >
          Continue to checkout
        </button>
      ) : (
        ""
      )}
    </article>
  );
}
