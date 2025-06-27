import Nav from "./component/Nav";
import Mainroutes from "./routes/mainroutes";
function App() {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[#FFFBDE] via-[#90D1CA] to-[#129990] text-gray-800 ">
      <div className="backdrop-blur-xl bg-white/10 w-full h-full px-4 md:px-40">
        <Nav />
        <Mainroutes />
      </div>
    </div>
  );
}

export default App;
