
import Navbar from "@/components/Navbar";
import ProductNav from "@/components/ProductNav";
import ProductCard from "@/components/ProductCard";

export default function Home(){
    return(
        <section className="bg-white min-h-screen ">
            <Navbar/>
            <ProductNav/>
            <div className=" px-8 space-y-8 ">
            
            <ProductCard/>
                
            </div>
            
        </section>
    )
}