import ProductsSection from "../Components/ProductsSection";

function Products() {
  return (
    <>
      <section className="w-1/2 pt-3 pb-7">
        <h1 className="font-bold text-3xl py-3 mt-2">E-Commerce Shop App</h1>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id,
          repellendus natus? Dolorem explicabo ex, possimus deserunt atque
          nostrum autem quasi tempora culpa consequuntur sequi assumenda omnis?
          Iure est tempora debitis!
        </p>
      </section>
      <ProductsSection />
    </>
  );
}

export default Products;
