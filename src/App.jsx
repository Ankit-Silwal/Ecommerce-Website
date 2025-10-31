import { HomePage } from "./pages/homepage/homepage";
import { CheckOut } from "./pages/checkout/checkout";
import {Orders} from './pages/orders/orders';
import { Tracking } from "./pages/tracking/Tracking";
import {Routes,Route} from 'react-router-dom'
export default function App(){
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
    </>
  )
}