import React, { useState } from "react";
import CartItem from "../Components/CartItem";
import SummaryCard from "../Components/SummaryCard";
import { faqItems } from "../utils/constants";
import { useSelector } from "react-redux";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="mt-12">
      <h1 className="font-bold text-3xl">Your cart</h1>
      <div className="flex gap-10">
        <div role="list" className="w-3/5 mt-3">
          <span role="listitem">Not Ready to Checkout ? Continue Shipping</span>
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              return <CartItem key={item.id} item={item} />;
            })
          ) : (
            <p className="pt-8 text-xl">Oops! Your Cart is Empty</p>
          )}
        </div>
        <div className="w-2/5 mt-3">
          <SummaryCard />
        </div>
      </div>
      <div className="mt-24 w-[55%]">
        <h4 className="font-bold pb-2 border-b border-black">FAQS</h4>
        <div className="w-full text-slate-500">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center py-4 focus:outline-none"
              >
                <span>{item.title}</span>
                <span>{activeIndex === index ? "-" : "+"}</span>
              </button>
              {activeIndex === index && (
                <div className="py-4">
                  <p>{item.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Cart;
