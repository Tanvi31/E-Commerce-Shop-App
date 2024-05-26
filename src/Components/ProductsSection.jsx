import Filters from "./Filters";
import ProductsList from "./ProductsList";
import useProductsSection from "../hooks/useProductsSection";

function ProductsSection() {
  const {
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
  } = useProductsSection();

  return (
    <section className="flex">
      <Filters
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        setRatingFilter={setRatingFilter}
        setFilterByPrice={setFilterByPrice}
      />
      <ProductsList
        productsList={filteredProducts}
        setFilterByPrice={setFilterByPrice}
        page={page}
        setPage={setPage}
        totalCount={totalCount}
        selectedCategories={selectedCategories}
        filterByPrice={filterByPrice}
        isLoading={isLoading}
      />
    </section>
  );
}

export default ProductsSection;
