import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { CiShare1 } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addItem,
  decrementQuantity,
  incrementQuantity,
} from "../store/slices/cartSlice";
import { useSelector } from "react-redux";
import { selectCartItems } from "../store/slices/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);

  const [qty, setQty] = useState(1);

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

  const addToCartHandler = (product) => {
    dispatch(addItem(product));
  };

  const handleQtyIncrease = (id) => {
    setQty(qty + 1);
    dispatch(incrementQuantity(id));
  };

  const handleQtyDecrease = (id) => {
    setQty(qty - 1);
    dispatch(decrementQuantity(id));
  };

  return (
    <>
      {productDetails ? (
        <>
          <div className="flex mt-8 gap-3">
            <div className="w-1/2">
              <div className="flex flex-wrap gap-2 justify-center">
                {productDetails?.images &&
                  productDetails?.images.slice(0, 4).map((e, i) => {
                    return (
                      <div key={i} className="bg-slate-300 w-[45%] h-48">
                        <img
                          src={e}
                          alt="product-image"
                          className="w-full h-full"
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="w-1/2 flex flex-col">
              <div className="flex justify-between">
                <h2 className="font-bold text-3xl">{productDetails.title}</h2>
                <div className="flex gap-1">
                  <CiHeart className="cursor-pointer" size="2rem" />
                  <CiShare1 className="cursor-pointer" size="2rem" />
                </div>
              </div>
              <span className="my-2">₹{productDetails.price}</span>
              <p className="my-3">{productDetails.description}</p>
              <div className="my-8"></div>
              <div className="flex pb-1">
                <span className="w-3/4"></span>
                <span className="w-1/4 text-sm text-slate-700">Quantity</span>
              </div>
              <div className="flex justify-between h-12">
                <button
                  className="bg-black text-white py-3 text-xs w-1/2"
                  data-testid="add"
                  onClick={() => {
                    addToCartHandler({
                      id: productDetails.id,
                      title: productDetails.title,
                      price: productDetails.price,
                      brand: productDetails.brand,
                      thumbnail: productDetails.thumbnail,
                      quantity: qty,
                    });
                  }}
                >
                  Add to Cart - ₹{productDetails.price}
                </button>
                <div className="w-1/4 flex justify-center items-center gap-1 border border-black">
                  <button
                    className="h-full w-1/3  text-slate-400"
                    onClick={() => handleQtyDecrease(productDetails.id)}
                  >
                    -
                  </button>
                  <span className="h-full  w-1/3 flex items-center justify-center">
                    {qty}
                  </span>
                  <button
                    className="h-full w-1/3  text-slate-400"
                    onClick={() => handleQtyIncrease(productDetails.id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex gap-3 text-gray-700 text-sm w-1/2">
                  <small>Free standard shipping</small>
                  <small className="underline">Free Returns</small>
                </div>
                <div className="w-1/4"></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default ProductDetails;
