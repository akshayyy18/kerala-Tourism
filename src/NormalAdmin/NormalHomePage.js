import React, { useEffect, useState } from "react";
import api from "../Services/api";
import NormalAdminNavbar from "./NormalAdminNavbar";
import "./NormalHomePage.css";
import { useNavigate } from "react-router-dom";

export default function NormalHomePage() {
  const [boats, setBoats] = useState([]);
  const navigate = useNavigate()

  // Get logged-in admin
  const user = JSON.parse(localStorage.getItem("user"));

  // Get permissions
  const permissions = user?.permissions || [];

  const getBoats = async () => {
    try {
      const response = await api.get("/getBoat");

      console.log(response.data);

      setBoats(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBoats();
  }, []);

  return (
    <div className="normal-home-page">
      <NormalAdminNavbar />

      <div className="normal-home-container">
        <div className="normal-home-header">
          <h1>Admin Details</h1>
          <p>Overview of the current boat inventory managed by the admin.</p>
        </div>

        {/* VIEW BOATS */}
        {permissions.includes("viewBoats") && (
          <>
            {boats.length === 0 ? (
              <div className="empty-state">
                <h3>No Boats Are Created Till Now</h3>
              </div>
            ) : (
              <div className="normal-home-table-wrap">
                <table className="normal-home-table">
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>Boat Name</th>
                      <th>Boat Type</th>
                      <th>Category</th>
                      <th>Facility</th>
                      <th>Capacity</th>

                      {/* Show Actions only if update/delete permission exists */}
                      {(permissions.includes("updateBoat") ||
                        permissions.includes("deleteBoat")) && <th>Actions</th>}
                    </tr>
                  </thead>

                  <tbody>
                    {boats.map((boat, index) => (
                      <tr key={boat._id}>
                        <td>{index + 1}</td>
                        <td>{boat.boatName}</td>
                        <td>{boat.boatType}</td>
                        <td>{boat.category}</td>
                        <td>{boat.facility}</td>
                        <td>{boat.capacity}</td>

                        {/* ACTIONS */}
                        {(permissions.includes("updateBoat") ||
                          permissions.includes("deleteBoat")) && (
                          <td>
                            {permissions.includes("updateBoat") && (
                              <button onClick={()=> navigate(`/updateBoat/${boat._id}`)}>Edit</button>
                            )}

                            {permissions.includes("deleteBoat") && (
                              <button>Delete</button>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
