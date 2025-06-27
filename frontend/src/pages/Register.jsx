import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

const Register = () => {
  let password;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    getValues,
  } = useForm({ mode: "onTouched" });

  password = watch("password", "");

  const RegisterHandler = (data) => {
    data.id = nanoid();
    console.log(data);
    reset(); // optional: reset form after submission
  };

  return (
    <div className="flex items-center justify-center p-4 text-gray-800  ">
      <motion.div
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Fill Your Details
        </h2>
        <form
          onSubmit={handleSubmit(RegisterHandler)}
          className="flex flex-col space-y-4"
        >
          {/* Username */}
          <div>
            <input
              {...register("username", {
                required: "Enter Username",
              })}
              type="text"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          {/* Email */}
          <div>
            <input
              {...register("email", {
                required: "Enter Your Email Id",
              })}
              type="email"
              placeholder="Email ID"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Password */}
          <div>
            <input
              name="password"
              {...register("password", {
                required: "**Password is required",
              })}
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>{" "}
          <div>
            <input
              {...register("cpassword", {
                required: "**Password is required",
                validate: (val) => {
                  if (watch("password") != val) {
                    return "Your passwords do no match";
                  }
                },
              })}
              // {...register(
              //   "cpassword",
              //   { required: "**Password is required" },
              //   { validate: (value) => value === getValues("password") }
              // )}
              type="password"
              placeholder="Confirm Password"
              name="cpassword"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            {errors.cpassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.cpassword.message}
              </p>
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
          >
            Register User
          </button>
          <p>
            Already have an account{" "}
            <Link to="/login" className="text-red-400">
              Log-In
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
