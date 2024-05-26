import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { monthsList, yearsValid } from "../utils/constants";
import { useSelector } from "react-redux";
import { orderPlaced } from "../store/slices/ordersSlice";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/slices/cartSlice";

function PaymentForm({ orderId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderStatus = useSelector((state) => state.order.address);
  const cartLength = useSelector((state) => state.cart.items.length);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data) {
      orderStatus.map((order) => {
        if (order.id === orderId) {
          dispatch(
            orderPlaced({
              ...order,
              paymentStatus: true,
              orderDate: new Date().toLocaleDateString(),
            })
          );
          dispatch(clearCart());
          navigate("/orders");
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="pb-3">
        <input
          className="py-3 border border-black pl-2 w-full"
          type="text"
          placeholder="Cardholder Name"
          name="cardHolderName"
          {...register("cardHolderName", {
            required: true,
          })}
        />
        {errors.cardHolderName && errors.cardHolderName.type === "required" && (
          <p role="alert" className="pt-2 text-red-700">
            Card Holder Name is required.
          </p>
        )}
      </div>
      <div className="pb-3">
        <input
          className="py-3 border border-black pl-2 w-full"
          type="number"
          inputMode="numeric"
          placeholder="Card Number"
          name="cardNumber"
          id="cardNumber"
          {...register("cardNumber", {
            required: true,
            pattern: {
              value:
                /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
            },
          })}
        />
        {errors.cardNumber && errors.cardNumber.type === "required" && (
          <p role="alert" className="pt-2 text-red-700">
            Card Number required
          </p>
        )}
        {errors.cardNumber && errors.cardNumber.type === "pattern" && (
          <p role="alert" className="pt-2 text-red-700">
            Invalid Card Input
          </p>
        )}
      </div>
      <div className="mb-3 flex justify-between items-center gap-2">
        <div className="py-1.5 px-1 border border-black w-1/3">
          <label
            className="text-gray-700 text-xs hide-label"
            htmlFor="month-select"
          >
            months
          </label>
          <select
            name="months"
            id="month-select"
            className="text-slate-600 w-full"
            {...register("months", {
              required: true,
            })}
          >
            {monthsList.map((n, i) => (
              <option value={n.month} key={i}>
                {n.month}
              </option>
            ))}
          </select>
          {errors.months && errors.months.type === "required" && (
            <p role="alert" className="text-red-700">
              Month required
            </p>
          )}
        </div>
        <div className="py-1.5 px-1 border border-black w-1/3">
          <label
            className="text-gray-700 text-xs hide-label"
            htmlFor="year-select"
          >
            year
          </label>
          <select
            name="years"
            id="year-select"
            className="text-slate-600 w-full"
            {...register("years", {
              required: true,
            })}
          >
            {yearsValid.map((n, i) => (
              <option value={n.yearNo} key={i}>
                {n.yearNo}
              </option>
            ))}
          </select>
          {errors.years && errors.years.type === "required" && (
            <p role="alert" className="text-red-700">
              Year required
            </p>
          )}
        </div>
        <div className="py-1.5 px-1 border border-black w-1/3 flex flex-col">
          <input
            className="w-full focus:outline-none"
            type="number"
            name="cvvNumber"
            id="cvvNumber"
            placeholder="CVV"
            {...register("cvvNumber", {
              required: true,
            })}
          />
          {errors.cvvNumber && errors.cvvNumber.type === "required" && (
            <p role="alert" className="pt-2 text-red-700 text-xs">
              CVV is required
            </p>
          )}
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={cartLength === 0}
          className="mt-3 bg-black w-full py-3 disabled:bg-gray-500 text-white"
        >
          Place Order
        </button>
      </div>
    </form>
  );
}

export default PaymentForm;
