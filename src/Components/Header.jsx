import { AiOutlineShopping } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTotalQuantity } from "../utils/helper";
import { setSearchText, searchText } from "../store/slices/filtersSlice";
import { selectCartItems } from "../store/slices/cartSlice";

function Header() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const searchTextVal = useSelector(searchText);

  const onSearchHandler = (e) => {
    dispatch(setSearchText(e.target.value));
  };

  return (
    <header>
      <div className="py-2 mt-0.5 bg-black text-white flex ">
        <span className="text-center uppercase flex-1">
          Free shipping on all herman miller! feb. 25-28
        </span>
        <button className="mx-2 basis-1/6 text-left pl-9">Support</button>
      </div>
      <nav className="py-3 flex justify-center items-center gap-5 border-b border-black">
        <span className="basis-1/12 font-bold text-lg">
          <Link to="/">Website</Link>
        </span>
        <Link to="/orders">
          <span className="basis-1/12 lg:basis-1/6">My Orders</span>
        </Link>
        <div className="basis-1/2 relative md:basis-2/5">
          <CiSearch className="absolute top-1 left-0.5" />
          <input
            className="ml-6 w-11/12 focus:outline-none"
            type="text"
            placeholder="Search"
            id="searchInput"
            value={searchTextVal}
            onChange={(e) => onSearchHandler(e)}
          />
        </div>
        <Link to="/cart">
          <button className="py-1 flex justify-between items-center gap-1">
            <AiOutlineShopping size="1.5em" />
            <span>{getTotalQuantity(cart)}</span>
          </button>
        </Link>
        <button
          className="basis-1/12"
          onClick={() => console.log("dummy login")}
        >
          Login
        </button>
      </nav>
    </header>
  );
}

export default Header;
