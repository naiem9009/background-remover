import { useState } from "react"
import { assets } from "../assets/assets";

const BgSlider = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const handleSliderChange = (e:any) => {
        setSliderPosition(e.target.value)
    }
  return (
    <div className="mt-10 py-20 mx-2">
        {/* title */}
        <h1 className="mb-12 sm:mb-20 text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">Remove Background With High <br /> Quality and Accuracy
        </h1>


        <div className="relative w-full max-w-3xl overflow-hidden m-auto rounded-xl">
            {/* bg image */}
            <img style={{clipPath : `inset(0 ${100.2 - sliderPosition}% 0 0)`}} src={assets.image_w_bg} alt="" />

            {/* forground image */}

            <img className="absolute left-0 top-0 w-full h-full" style={{clipPath : `inset(0 0 0 ${sliderPosition}%)`}} src={assets.image_wo_bg} alt="" />


            {/* slider */}
            <input className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 slider" onChange={handleSliderChange} value={sliderPosition} type="range" min={0} max={100} />

        </div>
    </div>
  )
}

export default BgSlider