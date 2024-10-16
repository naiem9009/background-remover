import { useContext } from "react";
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext";

const Upload = () => {
  const {removeBg} = useContext(AppContext)!


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0]; 
          removeBg(file)
      } else {
          console.log("No file selected");
      }
  };
  

  return (
    <div className="pb-16">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-6 md:py-16">See the magic. Try now</h1>


        <div className="text-center mb-24">
            <input onChange={handleFileChange} type="file" accept="image/*" id="upload2" hidden />
            <label className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-indigo-600 to-gray-500 m-auto hover:scale-105 transition-all duration-700" htmlFor="upload2">
                <img width={20} src={assets.upload_btn_icon} />
                <p className="text-white text-sm">Upload your image</p>
            </label>
        </div>
    </div>
  )
}

export default Upload