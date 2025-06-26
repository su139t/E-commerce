import { useEffect } from "react";
import { asyncgetusers, asyncgetproducts } from "./store/UserActions";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const data = useSelector((state) => state);
  console.log(data);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncgetusers());
    dispatch(asyncgetproducts());
  }, []);

  return (
    <>
      <h1>App</h1>
    </>
  );
}

export default App;
