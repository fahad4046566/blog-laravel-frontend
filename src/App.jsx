import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";



const App = () => {
  return (
    <div>
      <div className="wave-bg">
        <div className="blue-blur-1"></div>
        <div className="blue-blur-2"></div>
        <div className="wave"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      <main className="relative z-10">
        <Navbar />
        <Outlet />
        <Footer/>
      </main>
    </div>
  );
};

export default App;
