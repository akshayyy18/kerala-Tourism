import React, { useEffect, useState } from 'react'
import api from '../Services/api'
import { useNavigate } from 'react-router-dom'

export default function CustomerPage() {

    const [data,setData] = useState([])
    const navigate = useNavigate()
    
    const user = JSON.parse(localStorage.getItem("user"))

    const permissions = user?.permissions || []

    const getData = async()=>{
       try{
         const respose = await api.get("/admin/superAdminProfile")
        console.log(respose.data)
         setData(respose.data.data)
       }catch(error){
        console.log(error.message)
       } 
    }

    useEffect(()=>{
        getData()
    },[])
  return (
    <div>
      <h1>Customer Page</h1>
     {
        data.length === 0 ? (<p>No customer Found</p>):(
            <table>
        <thead>
            <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
               {permissions.includes("manageCustomers") && <th>View Bookings</th>}
            </tr>
        </thead>
        <tbody>
            {
                data.map((customer,index)=>(
                    <tr key={index}>
                <td>{index+1}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.mobileNumber}</td>
                {permissions.includes("manageCustomers") && <td><button onClick={()=>navigate(`/admin/bookingData/${customer._id}`)}>View Details</button></td>}
            </tr>
                ))
            }
        </tbody>
     </table>
        )
     }

    </div>
  )
}
