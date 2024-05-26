import { useState } from "react";
import CartItem from "../Components/CartItem";
import SummaryCard from "../Components/SummaryCard";
import { useSelector } from "react-redux";
import AddressForm from "../Components/AddressForm";
import PaymentForm from "../Components/PaymentForm";
import { selectCartItems } from "../store/slices/cartSlice";

function Checkout() {
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState(null);
  const cartItems = useSelector(selectCartItems);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };
  return (
    <section className="mt-12">
      <h1 className="font-bold text-3xl">Checkout</h1>
      <div className="flex gap-10">
        <div className="w-1/2 mt-3">
          <div className="flex justify-center items-center gap-3">
            <span
              className={step === 1 ? "font-bold" : ""}
              onClick={handlePrevStep}
            >
              Address
            </span>
            <hr className="bg-black w-24 h-0.5" />
            <span className={step === 2 ? "font-bold" : ""}>Payment</span>
          </div>
          <div className="mt-8 px-4">
            <h3 className="pb-3">
              {step === 1 ? "Shipping Information" : "Payment Details"}
            </h3>
            {step === 1 && (
              <AddressForm
                handleNextStep={handleNextStep}
                setOrderId={setOrderId}
              />
            )}
            {step === 2 && <PaymentForm orderId={orderId} />}
          </div>
        </div>
        <div className="w-1/2 mt-3">
          <span>Your Cart</span>
          {cartItems.map((item) => {
            return <CartItem key={item.id} item={item} />;
          })}
          <SummaryCard />
        </div>
      </div>
    </section>
  );
}

export default Checkout;
