import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Customer from "./Pages/Customer";
import Admin from "./Pages/Admin";
import Boats from "./Pages/customer/Boats";
import AddBoat from "./components/admin/AddBoat";
import BoatDetails from "./components/BoatDetails";
import UpdateBoat from "./components/UpdateBoat";
import BoatDetail from "./components/customer/BoatDetail";
import BookingBoat from "./Pages/customer/BookingBoat";
import CustomerBooking from "./components/customer/CustomerBooking";
import AdminBoats from "./components/admin/Boats";
import Bookings from "./components/admin/Bookings";
import AdminBookingDetails from "./components/admin/AdminBookingDetails";
import AdminProfile from "./components/admin/AdminProfile";
import CustomerHomePage from "./components/customer/CustomerHomePage";
import Contact from "./components/customer/Contact";
import About from "./components/customer/About";
import AdminLogin from "./components/admin/AdminLogin";
import AdminCustomersPage from "./components/admin/AdminCustomersPage";
import NormalLogin from "./NormalAdmin/NormalLogin";
import NormalHomePage from "./NormalAdmin/NormalHomePage";
import AddData from "./NormalAdmin/AddData";
import NormalAdminCreation from "./components/admin/NormalAdminCreation";
import IndividualBoats from "./NormalAdmin/IndividualBoats";
import UpdataBoats from "./NormalAdmin/UpdataBoats";
import BookingData from "./NormalAdmin/BookingData";
import AdminRegistration from "./components/admin/AdminRegistration";
import ViewCustomerHistory from "./components/admin/ViewCustomerHistory";
import CustomerPage from "./NormalAdmin/CustomerPage";
import BookingHistory from "./NormalAdmin/BookingHistory";
import AdminCustomerDetails from "./components/admin/AdminCustomerDetails";
import SeatSelection from "./Pages/customer/SeatSelection";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/admin/profile" element={<AdminProfile/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/customer/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/" element={<CustomerHomePage/>}/>
        <Route path="/customer" element={<Customer />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/customer/boats" element={<Boats />} />
        <Route path="/admin/add-boat" element={<AddBoat />} />
        <Route path="/admin/boat/:id" element={<BoatDetails />} />
        <Route path="/admin/boat/update/:id" element={<UpdateBoat />} />
        <Route path="/customer/boat/:id" element={<BoatDetail />} />
        <Route path="/bookingboat/:id" element={<BookingBoat />} />
        <Route path="/myBookings" element={<CustomerBooking />} />
        <Route path="/admin/boats" element={<AdminBoats/>}/>
        <Route path="/admin/booking" element={<Bookings/>}/>
        <Route path="/admin/bookingDetails/:id" element={<AdminBookingDetails/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/admin/customers" element={<AdminCustomersPage/>}/>
        <Route path="/adminLogin" element={<NormalLogin/>}/>
        <Route path="/adminHomePage" element={<NormalHomePage/>}/> 
        <Route path="/addData" element={<AddData/>}/>
        <Route path="/admin/creation" element={<NormalAdminCreation/>}/>
        <Route path="/getBoats" element={<IndividualBoats/>}/>
        <Route path="/updateBoat/:id" element={<UpdataBoats/>}/>
        <Route path="/normalAdminBookings" element={<BookingData/>}/>
        <Route path="/admin/normalAminRegistration" element={<AdminRegistration/>}/>
        <Route path="/admin/viewCustomer/:id" element={<ViewCustomerHistory/>}/>
        <Route path="/customerPage" element={<CustomerPage/>}/>
        <Route path="/admin/bookingData/:id" element={<BookingHistory/>}/>
        <Route path="/admin/sigleCustomerPage/:id" element={<AdminCustomerDetails/>}/>
        <Route path="/customer/seatSelection/:id" element={<SeatSelection/>}/>
      </Routes>
    </div>
  );
}
