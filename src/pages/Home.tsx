import Navbar from "@/components/Navbar";
import ProductNav from "@/components/ProductNav";
import ProductCard from "@/components/ProductCard";
import { useState, useEffect } from "react";
import CustomSkeleton from "@/components/Skeletal";


export default function Home(){
    const [isLoading, setIsloading ] = useState(true);

    useEffect(() =>{
   const  loadPage = setTimeout(()=>{
    setIsloading(false)
   }, 4000)

   return() => clearTimeout(loadPage)
  }, [])
  
    
    return(
        <div>
        {isLoading? (
            <CustomSkeleton/>
        ):(<section className="bg-white min-h-screen ">
            <Navbar/>
            <ProductNav/>
            <div className=" px-8 space-y-8 ">
            
            <ProductCard/>
                
            </div>
            
        </section>)}
        </div>
    )
}