import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCartItems } from "../store/slices/cartSlice";
import {
  addItem,
  incrementQuantity,
  decrementQuantity,
} from "../store/slices/cartSlice";
import { jest } from "@jest/globals";

const useMockedProductDetails = ({ id }) => {
  const items = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [productDetails, setProductDetails] = useState({});

  const fetchSingleProduct = async () => {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await res.json();
    setProductDetails(data);
  };

  useEffect(() => {
    fetchSingleProduct();
    if (items.some((item) => item.id === parseInt(id))) {
      setQty(items.find((item) => item.id === parseInt(id))?.quantity);
    }
    window.scrollTo(0, 0);
  }, []);

  const addToCartHandler = jest.fn((product) => {
    dispatch(addItem(product));
  });

  const handleQtyIncrease = jest.fn(() => {
    setQty(qty + 1);
  });

  const handleQtyDecrease = jest.fn(() => {
    setQty(qty - 1);
  });

  return {
    fetchSingleProduct,
    addToCartHandler,
    handleQtyDecrease,
    handleQtyIncrease,
    productDetails,
    qty,
  };
};

export default useMockedProductDetails;
