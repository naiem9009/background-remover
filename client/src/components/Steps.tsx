import { assets } from "../assets/assets"
import { IStepBox } from "../types/type"
import {motion} from "framer-motion"


const stepBox : IStepBox[] = [
    {
        icon : assets.upload_icon,
        title: "Upload Image",
        description: "This is a demo text, will replace it later. This is a demo..",
    },
    {
        icon : assets.remove_bg_icon,
        title: "Remove background",
        description: "This is a demo text, will replace it later. This is a demo..",
    },
    {
        icon : assets.download_icon,
        title: "Download image",
        description: "This is a demo text, will replace it later. This is a demo..",
    }
]


const Steps = () => {
  return (
    <div className="mx-4 lg:mx-44 py-20 xl:py-40">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent">Steps to temove background <br /> image in seconds</h1>


        <div className="flex items-start flex-wrap gap-4 mt-16 xl:mt-24 justify-center">

            
            {stepBox && stepBox.map((step:IStepBox, index:number) => (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    key={index} 
                    className="flex items-start gap-4 bg-white border drop-shadow-md p-7 mb-10 rounded hover:scale-105 transition-all duration-500"
                >
                    <img className="max-w-9" src={step.icon} alt="" />
                    <div>
                        <p className="text-xl font-medium">{step.title}</p>
                        <p className="text-sm text-neutral-500 mt-1">{step.description}</p>
                    </div>
                </motion.div>
            ))}

        </div>
    </div>
  )
}

export default Steps