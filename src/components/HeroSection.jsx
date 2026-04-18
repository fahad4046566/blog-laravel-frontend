import { FaBloggerB } from "react-icons/fa";

const HeroSection = () => {
  return (
   <>
   <div className="flex justify-center m-6">
   <div className="">
    <div className="flex justify-center p-1"><div className="badge badge-warning bg-amber-300 font-bold"><FaBloggerB />Blogger</div></div>
    <div className="flex justify-center p-1"><h1 className="text-5xl font-sans font-bold">Blog & Articles</h1></div>
    <div className="flex justify-center pt-4"><p className="font-semibold">Search Your Favorite topic</p></div>
   </div>
   </div>
   </>
  );
};

export default HeroSection;
