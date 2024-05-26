export const getTotalQuantity = (cart) => {
  let total = 0;
  cart.forEach((item) => {
    total += item.quantity;
  });
  return total;
};

export const getTotalCartValue = (cart) => {
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  return totalPrice;
};

export const fetchProductsApi = async (page) => {
  const res = await fetch(
    `https://dummyjson.com/products?limit=9&skip=${(page - 1) * 9}`
  );
  return await res.json();
};

export const fetchCategoriesApi = async () => {
  const res = await fetch("https://dummyjson.com/products/category-list");
  return await res.json();
};

export const fetchProductsByCategoryApi = async (category) => {
  const res = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  return await res.json();
};
