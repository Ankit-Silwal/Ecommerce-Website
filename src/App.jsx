import { HomePage } from "./pages/homepage/homepage";
import { CheckOut } from "./pages/checkout/checkout";
import {Orders} from './pages/orders/orders';
import { Tracking } from "./pages/tracking/Tracking";
import {Routes,Route} from 'react-router-dom'
import { useEffect,useState } from "react";
import axios from "axios";
export default function App(){
    const [cart,setCart]=useState([]);
    useEffect(()=>{
      axios.get('/api/cart-items?expand=product')
      .then((response)=>{
        setCart(response.data)
      })
    },[])
  return (
      <Routes>
        <Route path="/" element={<HomePage cart={cart}/>} />
        <Route path="/checkout" element={<CheckOut cart={cart}/>} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
  )
}