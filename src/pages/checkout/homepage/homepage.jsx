import axios from "axios";
import { useEffect, useState } from "react";
import "./homepage.css";
import { Header } from "./header";
import "./general.css";
import { ProductsGrid } from "./productsgrid";

export function HomePage({ cart,loadCart }) {
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    const getHomeData=async ()=>{
      const response=await axios.get('/api/products');
      setProducts(response.data)
    }
    getHomeData();
  })
  useEffect(() => {
    const getHomeData = async () => {
        const response = await axios.get("/api/products");
        setProducts(response.data); 
    };
    getHomeData();
  }, []);
  return (
    <>
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
