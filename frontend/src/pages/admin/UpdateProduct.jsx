import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  asyncDeleteProduct,
  asyncGetProductById,
  asyncUpdateProduct,
} from "../../store/actions/productAction";

const ProductDetail = () => {
  const user = useSelector((state) => state.userReducer.users);
  const product = useSelector((state) => state.productReducer.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(asyncGetProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product) {
      reset({
        id: product.id,
        image: product.image,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
      });
    }
  }, [product, reset]);

  const DeleteProduct = () => {
    dispatch(asyncDeleteProduct(product.id));
    navigate("/");
  };

  const UpdateProductHandler = (data) => {
    dispatch(asyncUpdateProduct(data));
    navigate("/");
  };

  if (!product)
    return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      {/* Admin Update Form */}
      {user && user?.isAdmin && (
        <motion.div
          className="bg-white shadow-xl rounded-3xl p-8 space-y-6 backdrop-blur-md bg-opacity-90"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Update Product
          </h2>
          <form
            onSubmit={handleSubmit(UpdateProductHandler)}
            className="space-y-4"
          >
            <div>
              <input type="hidden" {...register("id")} />
              <label className="block mb-1 text-sm font-medium">
                Image URL
              </label>
              <input
                {...register("image", { required: "Enter image URL" })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
                placeholder="https://image.com/product.jpg"
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Title</label>
              <input
                {...register("title", { required: "Enter title" })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Price</label>
              <input
                {...register("price", { required: "Enter price" })}
                type="number"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Description
              </label>
              <textarea
                {...register("description")}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-400 resize-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Category</label>
              <select
                {...register("category", { required: "Select a category" })}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Select Category</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Watches">Watches</option>
                <option value="Footwear">Footwear</option>
                <option value="Accessories">Accessories</option>
                <option value="Men's Clothing">Men's Clothing</option>
                <option value="Hand Wear">Hand Wear</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition"
            >
              Save Changes
            </motion.button>
          </form>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition"
            onClick={DeleteProduct}
          >
            Delete Product
          </motion.button>
        </motion.div>
      )}

      {/* Product Preview */}
      <motion.div
        className="bg-white shadow-xl rounded-3xl overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-72 w-full object-cover"
        />
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
          <div className="flex justify-between items-center text-sm">
            <span className="text-indigo-600 font-semibold text-lg">
              ₹ {product.price}
            </span>
            <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs">
              {product.category}
            </span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>
          <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition">
            Add to Cart
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetail;
