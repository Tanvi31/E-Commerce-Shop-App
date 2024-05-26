import React from "react";
import { useDispatch } from "react-redux";
import { removeItem } from "../store/slices/cartSlice";

function CartItem({ item }) {
  const { id, title, price, brand, quantity, thumbnail } = item;

  const dispatch = useDispatch();
  return (
    <article className="mt-2 flex justify-between gap-4 py-3 border-b border-black">
      <div className="w-1/3 min-h-24 bg-gray-400">
        <img className="w-full h-full" src={thumbnail} alt="product-img" />
      </div>
      <div className="w-2/3 flex flex-col py-1">
        <h4>{title}</h4>
        <div className="flex justify-between">
          <div className="flex">
            <span>Quantity:</span>
            <span>{quantity}</span>
          </div>
          <span>By {brand}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold text-2xl">₹{price}</span>
          <small
            className="flex underline items-end cursor-pointer"
            onClick={() => dispatch(removeItem(id))}
          >
            Remove
          </small>
        </div>
      </div>
    </article>
  );
}

export default CartItem;
