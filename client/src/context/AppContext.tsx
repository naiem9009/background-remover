import { useAuth, useClerk } from "@clerk/clerk-react";
import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export interface IAppContext {
    backendUrl: string;
    credit: number | null;
    image: File | null;
    setCredit: (credit: number | null) => void; 
    loadCreditData: () => Promise<void>; 
    removeBg : (image:File) => Promise<void>;
    resultImage : string | null;
    setResultImage : (resultImage: string | null) => void; 
}


export const AppContext = createContext<IAppContext | null>(null);



const AppContextProvider = ({
    children
} : {
    children: React.ReactNode
}) => {
    const navigate = useNavigate()
    const [credit, setCredit] = useState<number | null>(null)
    const [image, setImage] = useState<File | null>(null)
    const [resultImage, setResultImage] = useState<string | null>(null)

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const {getToken, isSignedIn} = useAuth();
    const {openSignIn} = useClerk()
    const loadCreditData = async () => {
        try {
            const token = await getToken()

            const {data} = await axios.get(backendUrl + "/api/user/credits", {headers: {token}})

            if (data.success) {
                setCredit(data?.credits)
            }

            
            

        } catch (error:any) {
            console.log(error);
            toast.error(error.message)
            
        }
    }


    const removeBg = async (image:File) => {
        try {
            if (!isSignedIn) {
                return openSignIn({afterSignInUrl : "/"})
            }
            setImage(image)
            setResultImage(null)
            navigate('/result')

            const token = await getToken();

            const formData = new FormData()
            image && formData.append("image", image);

            const {data} = await axios.post(backendUrl+"/api/image/remove-bg", formData, {
                headers: {token}
            })
            

            if (data.success) {
                setResultImage(data?.resultImage)
                data?.credit && setCredit(data?.credit)
            } else {
                toast.error(data?.message)
                data?.credit && setCredit(data?.credit)

                if (data?.credit <=0) {
                    navigate('/buy')
                }
            }
        } catch (error) {
            
        }
        

    }


    const value:IAppContext = {
        credit,
        setCredit,
        loadCreditData,
        backendUrl,
        removeBg,
        resultImage,
        setResultImage,
        image
    }


    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}


export default AppContextProvider;
