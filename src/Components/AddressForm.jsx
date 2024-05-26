import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addAddress } from "../store/slices/ordersSlice";
import { useSelector } from "react-redux";
import { selectCartItems } from "../store/slices/cartSlice";

function AddressForm({ handleNextStep, setOrderId }) {
  const orderItems = useSelector(selectCartItems);
  const [name, setName] = useState("");
  const [last, setLast] = useState("");

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.id = data.firstName + Math.floor(1000 + Math.random() * 9000);
    data.items = [...orderItems];
    setOrderId(data.id);
    handleNextStep();
    dispatch(addAddress(data));
  };

  useEffect(() => {
    setValue("firstName", name);
    setValue("lastName", last);
  }, [name, last]);

  return (
    <form role="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div
        className={`flex justify-center items-center gap-1 pb-3 ${
          errors.firstName || errors.lastName ? "h-24" : ""
        }`}
      >
        <div className="w-1/2 flex flex-col h-full">
          <input
            className="py-3 border w-full border-black pl-2"
            type="text"
            placeholder="First Name"
            name="firstName"
            id="firstName"
            {...register("firstName", {
              required: true,
            })}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.firstName && errors.firstName.type === "required" && (
            <p role="alert" className="pt-2 text-red-600">
              First Name is required.
            </p>
          )}
        </div>
        <div className="w-1/2 flex flex-col h-full">
          <input
            className="py-3 border w-full border-black pl-2"
            type="text"
            placeholder="Last Name"
            name="lastName"
            id="lastName"
            {...register("lastName", {
              required: true,
            })}
            value={last}
            onChange={(e) => setLast(e.target.value)}
          />
          {errors.lastName && errors.lastName.type === "required" && (
            <p role="alert" className="pt-2 text-red-600">
              Last Name is required.
            </p>
          )}
        </div>
      </div>
      <div className="pb-3">
        <input
          className="py-3 border border-black pl-2 w-full"
          type="text"
          placeholder="Address"
          name="address"
          id="address"
          {...register("address", {
            required: true,
          })}
        />
        {errors.address && errors.address.type === "required" && (
          <p role="alert" className="pt-2 text-red-600">
            Address is required.
          </p>
        )}
      </div>
      <div className="pb-3">
        <input
          className="py-3 border border-black pl-2 w-full"
          type="text"
          placeholder="Apartment, suite,etc (optional)"
          name="apartment"
          id="apartment"
          {...register("apartment", {
            required: true,
          })}
        />
        {errors.apartment && errors.apartment.type === "required" && (
          <p role="alert" className="pt-2 text-red-600">
            Apartment No. required.
          </p>
        )}
      </div>
      <div className="pb-3">
        <input
          className="py-3 border border-black pl-2 w-full"
          type="text"
          placeholder="City"
          name="city"
          id="city"
          {...register("city", {
            required: true,
          })}
        />
        {errors.city && errors.city.type === "required" && (
          <p role="alert" className="pt-2 text-red-600">
            City is required.
          </p>
        )}
      </div>
      <div>
        <button
          type="submit"
          disabled={orderItems.length === 0}
          className="mt-3 bg-black  w-full py-3 disabled:bg-gray-500 text-white"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
}

export default AddressForm;
