import { useDispatch, useSelector } from "react-redux";
import { asyncGetProduct } from "../store/actions/productAction";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { asyncUpdateUser } from "../store/actions/userAction";
import { toast } from "react-toastify";

const Products = () => {
  const { products } = useSelector((state) => state.productReducer);
  const { users } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(asyncGetProduct());
  }, [dispatch]);

  const AddtoCartHandler = (product) => {
    const copyuser = {
      ...users,
      cart: users.cart ? [...users.cart] : [],
    };

    const x = copyuser.cart.findIndex((n) => n?.product?.id === product.id);

    if (x < 0) {
      // If product is not in cart, add with quantity 1
      copyuser.cart.push({ product, quantity: 1 });
      toast.success("1 product add on your cart");
    } else {
      // If product exists, increment its quantity by 1
      const currentQuantity = copyuser.cart[x].quantity;
      copyuser.cart[x] = {
        product,
        quantity: currentQuantity + 1,
      };
      toast.success(`${currentQuantity + 1} product add on your cart`);
    }
    dispatch(asyncUpdateUser(copyuser)); // Update the backend/store
    navigate("/cart");
  };

  const renderproducts = products?.map((product) => (
    <div
      key={product.id}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {renderproducts}
        </div>
      )}
    </div>
  );
};

export default Products;
