import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { searchText } from "../store/slices/filtersSlice";
import {
  fetchProductsApi,
  fetchCategoriesApi,
  fetchProductsByCategoryApi,
} from "../utils/helper";

const useProductsSection = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [filterByPrice, setFilterByPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  const searchTextInput = useSelector(searchText);

  const fetchCategories = async () => {
    const data = await fetchCategoriesApi();
    setCategories(data);
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    const data = await fetchProductsApi(page);
    setProductsList(data.products);
    setTotalCount(data.total);
    setIsLoading(false);
  };

  const fetchProductsByCategory = async () => {
    let filtered = [];
    for (const category of selectedCategories) {
      try {
        const data = await fetchProductsByCategoryApi(category);
        filtered = filtered.concat(data.products);
        setTotalCount(filtered.length);
      } catch (e) {
        console.error("Error Fetching Filtered Products", e);
      }
    }
    setFilteredProducts(filtered);
  };

  const filterProductsBySearch = () => {
    let resultItem = productsList.filter((product) =>
      product.title.toLowerCase().includes(searchTextInput.toLowerCase())
    );
    setFilteredProducts(resultItem);
  };

  const sortByDiscountPrice = () => {
    if (filterByPrice === "low") {
      let res = [];
      res = productsList.toSorted(
        (a, b) => a.discountPercentage - b.discountPercentage
      );
      return setFilteredProducts(res);
    }
    if (filterByPrice === "high") {
      let res = [];
      res = productsList.sort(
        (a, b) => b.discountPercentage - a.discountPercentage
      );
      return setFilteredProducts(res);
    }
    if (filterByPrice === "max") {
      let res = [];
      res = productsList.sort((a, b) => b.price - a.price);
      return setFilteredProducts(res);
    }
    if (filterByPrice === "min") {
      let res = [];
      res = productsList.sort((a, b) => a.price - b.price);
      return setFilteredProducts(res);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect(() => {
    sortByDiscountPrice();
  }, [filterByPrice]);

  useEffect(() => {
    filterProductsBySearch();
  }, [searchTextInput]);

  useEffect(() => {
    const filterProducts = () => {
      if (selectedCategories.length === 0) {
        setFilteredProducts(productsList);
      } else {
        fetchProductsByCategory();
      }
    };
    filterProducts();
  }, [selectedCategories, productsList]);

  useEffect(() => {
    const filterByRating = () => {
      if (ratingFilter < 0) {
        setFilteredProducts(productsList);
      } else {
        const filteredRatingData = productsList.filter(
          (product) => Number(product.rating) >= Number(ratingFilter)
        );
        setFilteredProducts(filteredRatingData);
        setTotalCount(filteredRatingData.length);
      }
    };
    filterByRating();
  }, [ratingFilter, productsList]);

  return {
    fetchCategories,
    categories,
    selectedCategories,
    setSelectedCategories,
    setRatingFilter,
    setFilterByPrice,
    filteredProducts,
    page,
    setPage,
    totalCount,
    filterByPrice,
    isLoading,
    filterProductsBySearch,
  };
};

export default useProductsSection;
