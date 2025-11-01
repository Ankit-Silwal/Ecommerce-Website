import axios from "axios";
import { useEffect, useState } from "react";
import "./homepage.css";
import { Header } from "./header";
import "./general.css";
import { ProductsGrid } from "./productsgrid";

export function HomePage({ cart }) {
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
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };
    getHomeData();
  }, []);
  return (
    <>
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}
