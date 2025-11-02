import { CheckOut } from "./pages/checkout/checkout";
import {Orders} from './pages/orders/orders';
import { Tracking } from "./pages/tracking/Tracking";
import {Routes,Route} from 'react-router-dom'
import { useEffect,useState } from "react";
import axios from "axios";
import { HomePage } from "./pages/homepage/homepage";
export default function App(){
    const [paymentSummery,setPaymentSummary]=useState(null)
    const [cart,setCart]=useState([]);
    const loadCart=async ()=>{
      let response=await axios.get('/api/cart-items?expand=product')
      setCart(response.data)
    }
    const loadPayment=async ()=>{
      let response=await axios.get('/api/payment-summary')
      setPaymentSummary(response.data)
    }
    useEffect(()=>{
      loadCart();
    },[])
    useEffect(()=>{
      loadPayment();
    })
    window.axios=axios;
    window.resetApi=async ()=>{
      await axios.post('/api/reset')
      {loadCart}
    }
  return (
      <Routes>
        <Route path="/" element={<HomePage cart={cart} loadCart={loadCart}/>} />
        <Route path="/checkout" element={<CheckOut cart={cart} paymentSummery={paymentSummery} loadCart={loadCart}> /</CheckOut>} />
        <Route path="/orders" element={<Orders paymentSummary={paymentSummery} loadCart={loadCart}/>} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
  )
}