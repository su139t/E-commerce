import { nanoid } from "nanoid";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { asyncCreateProduct } from "../../store/actions/productAction";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const CreateProductHandler = (data) => {
    data.id = nanoid();
    dispatch(asyncCreateProduct(data));
    navigate("/")
    reset();
  };

  return (
    <div className=" flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-lg bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-3xl shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Create Product
        </h2>
        <form
          onSubmit={handleSubmit(CreateProductHandler)}
          className="space-y-5"
        >
          {/* Image */}
          <div>
            <input
              {...register("image", {
                required: "Enter image URL",
              })}
              type="text"
              placeholder="Image URL"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white bg-opacity-80"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <input
              {...register("title", {
                required: "Enter product title",
              })}
              type="text"
              placeholder="Product Title"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white bg-opacity-80"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <input
              {...register("price", {
                required: "Enter product price",
              })}
              type="number"
              placeholder="Price"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white bg-opacity-80"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <textarea
              {...register("description")}
              placeholder="Description"
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white bg-opacity-80 resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <select
              {...register("category", {
                required: "Select a category",
              })}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white bg-opacity-80 cursor-pointer"
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
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            Create Product
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateProduct;
