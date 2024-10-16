import { assets } from "../assets/assets"

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 px-4 lg:px-44 py-3">
        <h1 className="text-2xl font-bold text-gray-600">Background Remover</h1>
        <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">Copyright @developer-naim | All right reserved.</p>

        <div className="flex -gap-1">
            <img width={40} src={assets.facebook_icon} alt="" />
            <img width={40} src={assets.twitter_icon} alt="" />
            <img width={40} src={assets.google_plus_icon} alt="" />
        </div>
    </div>
  )
}

export default Footer