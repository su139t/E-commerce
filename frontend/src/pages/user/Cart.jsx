import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { asyncUpdateUser } from "../../store/actions/userAction";

const Cart = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userReducer);
  const [cartItems, setCartItems] = useState([]);

  // Sync Redux cart with local state on load & update
  useEffect(() => {
    setCartItems(users.cart || []);
  }, [users]);

  const getTotalPrice = () => {
    return cartItems
      .reduce(
        (acc, item) => acc + item.quantity * parseFloat(item.product.price),
        0
      )
      .toFixed(2);
  };

  const AddtoCartHandler = (item) => {
    const copyuser = {
      ...users,
      cart: users.cart ? [...users.cart] : [],
    };
    const x = copyuser.cart.findIndex((n) => n?.product?.id === item.product.id);
    const currentQuantity = copyuser.cart[x].quantity;
    copyuser.cart[x] = {
      product: item.product,
      quantity: currentQuantity + 1,
    };
    dispatch(asyncUpdateUser(copyuser));
  };

  const MinusFromCartHandler = (item) => {
    const copyuser = {
      ...users,
      cart: users.cart ? [...users.cart] : [],
    };
    const x = copyuser.cart.findIndex((n) => n?.product?.id === item.product.id);

    if (x !== -1) {
      const currentQuantity = copyuser.cart[x].quantity;
      if (currentQuantity === 1) {
        // ❌ Remove from cart
        copyuser.cart.splice(x, 1);
      } else {
        // 🔁 Decrease quantity
        copyuser.cart[x] = {
          product: item.product,
          quantity: currentQuantity - 1,
        };
      }

      dispatch(asyncUpdateUser(copyuser));
    }
  };

  return (
    <div className="p-6 min-h-screen  bg-blue-300">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="ml-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.product.title}
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      {item.product.description}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Category: {item.product.category}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 text-sm">Qty:</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => MinusFromCartHandler(item)}
                          className="px-2 py-1 text-sm rounded border bg-gray-100 hover:bg-gray-200"
                        >
                          -
                        </button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => AddtoCartHandler(item)}
                          className="px-2 py-1 text-sm rounded border bg-gray-100 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <span className="font-bold text-indigo-600">
                      ₹ {(item.quantity * item.product.price).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="bg-white p-6 rounded-xl shadow-md sticky top-6 h-fit">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Price Summary
            </h3>
            <div className="flex justify-between mb-2 text-sm text-gray-700">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>₹ {getTotalPrice()}</span>
            </div>
            <div className="flex justify-between mb-4 text-sm text-gray-700">
              <span>Delivery Charges</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>Total Amount</span>
              <span>₹ {getTotalPrice()}</span>
            </div>
            <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
