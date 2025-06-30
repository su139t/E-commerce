import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { asyncCurrentUser } from "./store/actions/userAction";
import { asyncGetProduct } from "./store/actions/productAction";
import Nav from "./component/Nav";
import Mainroutes from "./routes/mainroutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncCurrentUser());
    dispatch(asyncGetProduct());
  }, [dispatch]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#FFFBDE] via-[#90D1CA] to-[#129990] text-gray-800">
      {/* Toast container should be placed near the root */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Optional blur effect container */}
      <div className="backdrop-blur-xl bg-white/10 min-h-screen">
        <Nav />
        <Mainroutes />
      </div>
    </div>
  );
}

export default App;
