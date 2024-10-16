import { useContext } from "react"
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext"
import { motion } from "framer-motion"

const Header = () => {

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
    <div className="flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20">
        {/* left side */}
        <div>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight">
                    Remove the <br className="max-md:hidden" /> <span className="bg-gradient-to-r from-indigo-600 to-gray-500 bg-clip-text text-transparent">background</span> from <br className="max-md:hidden" /> images for free
                </h1>

                <p className="my-6 text-[15px] text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem tempora magni corrupti, <br className="max-sm:hidden" /> soluta fugit voluptates architecto ea obcaecati dolores cupiditate.</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <input onChange={handleFileChange} type="file" accept="image/*" id="upload1" hidden />
                <label className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-indigo-600 to-gray-500 m-auto hover:scale-105 transition-all duration-700" htmlFor="upload1">
                    <img width={20} src={assets.upload_btn_icon} />
                    <p className="text-white text-sm">Upload your image</p>
                </label>
            </motion.div>
        </div>



        {/* right side */}
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
        >
            <div className="w-full max-w-md">
                <img src={assets.header_img} />
            </div>
        </motion.div>
    </div>
  )
}

export default Header