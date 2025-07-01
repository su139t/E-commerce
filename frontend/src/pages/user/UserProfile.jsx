import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { asyncDeleteUser, asyncUpdateUser } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (users) {
      reset({
        id: users.id,
        email: users.email,
        password: users.password,
        isAdmin: users.isAdmin,
        username: users.username,
      });
    }
  }, [users, reset]);

  const DeleteUserAccount = () => {
    dispatch(asyncDeleteUser(users.id));
    navigate("/login");
  };

  const UpdateProfileHandler = (data) => {
    dispatch(asyncUpdateUser(data));
    navigate("/");
    reset();
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
          Update Your Profile
        </h2>
        <form
          onSubmit={handleSubmit(UpdateProfileHandler)}
          className="flex flex-col space-y-4"
        >
          {/* Username */}
          <input type="hidden" {...register("id")} />
          <input type="hidden" {...register("isAdmin")} />

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
              type="text"
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
          </div>
          <button
            type="submit"
            className="mt-4 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
          >
            Save Changes
          </button>
        </form>
        <button
          className="mt-4 py-3 bg-red-500 w-full text-white font-semibold rounded-lg hover:scale-105 transition-transform"
          onClick={DeleteUserAccount}
        >
          Delete Your Account
        </button>
      </motion.div>
    </div>
  );
};

export default UserProfile;
