import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import "./AdminCustomersPage.css";

export default function AdminCustomersPage() {
  const [customer, setCustomer] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const getCustomers = async () => {
    try {
      const response = await api.get("/admin/getAllCustomers");
      console.log("customers data:", response.data);

      setCustomer(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const filterData = customer.filter((boat) => {
    return boat.name.toLowerCase().includes(search.toLowerCase());
  });

  const handleDelete = (id) => {};

  return (
    <div className="customers-page">
      <AdminNavbar />

      <div className="customers-container">
        <div className="customers-header">
          <h1 className="customers-title">Customers</h1>
          <button className="back-button" onClick={() => navigate("/admin")}>
            Back Page
          </button>
        </div>

        <div className="search-box">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name"
            className="search-input"
          />
        </div>

        {filterData.length === 0 ? (
          <div className="empty-state">
            <h3>No customers found</h3>
          </div>
        ) : (
          <div className="customers-table-wrap">
            <table className="customers-table">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile Number</th>
                  <td></td>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filterData.map((customers, index) => (
                  <tr key={customers._id}>
                    <td>{index + 1}</td>
                    <td>{customers.name}</td>
                    <td>{customers.email}</td>
                    <td>{customers.mobileNumber}</td>
                    <td>
                      <button onClick={() => handleDelete(customers._id)}>
                        Delete Customer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
