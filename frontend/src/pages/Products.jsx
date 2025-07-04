import { useDispatch, useSelector } from "react-redux";
import { asyncGetProduct } from "../store/actions/productAction";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { asyncUpdateUser } from "../store/actions/userAction";
import { toast } from "react-toastify";
import InfiniteScroll from "../../node_modules/react-infinite-scroll-component/dist/index.es";
import axios from "../api/axiosconfig";

const Products = () => {
  // const { products } = useSelector((state) => state.productReducer);
  const { users } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setproducts] = useState([]);
  const [hasMore, sethasMore] = useState(true);

  // useEffect(() => {
  //   dispatch(asyncGetProduct());
  // }, [dispatch]);

  const fetchMoreData = async () => {
    try {
      const initialItems = 6;
      const { data } = await axios.get(
        `/products?_limit=${initialItems}&_start=${products.length}`
      );

      if (data.length == 0) {
        sethasMore(false);
      } else {
        setproducts([...products, ...data]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMoreData();
  }, []);

  const AddtoCartHandler = (product) => {
    const copyuser = {
      ...users,
      cart: users.cart ? [...users.cart] : [],
    };

    const x = copyuser.cart.findIndex((n) => n?.product?.id === product.id);

    if (x < 0) {
      // If product is not in cart, add with quantity 1
      copyuser.cart.push({ product, quantity: 1 });
      toast.success(`🛒 "${product.title}" added to your cart.`);
    } else {
      // If product exists, increment its quantity by 1
      const currentQuantity = copyuser.cart[x].quantity;
      copyuser.cart[x] = {
        product,
        quantity: currentQuantity + 1,
      };
      toast.info(
        `🛒 "${product.title}" quantity updated to ${currentQuantity + 1}.`
      );
    }
    dispatch(asyncUpdateUser(copyuser)); // Update the backend/store
    navigate("/cart");
  };

  const renderproducts = products?.map((product, index) => (
    <div
      key={index}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow hover:scale-105 duration-300 overflow-hidden"
    >
      <img
        src={product.image}
        alt={product.title}
        className="h-52 w-full object-cover"
      />
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {product.title}
        </h2>

        <div className="flex items-center justify-between">
          <span className="text-indigo-600 font-bold text-md">
            ₹ {product.price}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {product.category}
          </span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center pt-2">
          <Link
            to={`/products-details/${product.id}`}
            className="text-sm text-indigo-500 hover:underline"
          >
            Read more
          </Link>
          <button
            className="bg-indigo-600 text-white text-sm px-4 py-1.5 rounded-full hover:bg-indigo-700 transition"
            onClick={() => AddtoCartHandler(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="p-6">
      {products?.length === 0 ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {renderproducts}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Products;
