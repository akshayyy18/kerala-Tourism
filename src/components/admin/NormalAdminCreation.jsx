// import React, { useState } from "react";
// import api from "../../Services/api";
// import { useNavigate } from "react-router-dom";
// import AdminNavbar from "./AdminNavbar";
// import "./NormalAdminCreation.css";

// export default function NormalAdminCreation() {
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setData({
//       ...data,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleCreate = async () => {
//     try {
//       const response = await api.post("/admin/create-normal-admin", data);

//       console.log(response.data);

//       alert("admin created");
//       navigate("/admin");
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
//     <div className="admin-creation-page">
//       <AdminNavbar />

//       <div className="admin-creation-card">
//         <div className="admin-creation-header">
//           <h1>Admin Creation</h1>
//           <p>Create a new admin account for the tourism portal</p>
//         </div>

//         <div className="admin-creation-form">
//           <div className="form-field">
//             <label>Name</label>
//             <input
//               type="text"
//               placeholder="Enter name"
//               value={data.name}
//               name="name"
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-field">
//             <label>Email</label>
//             <input
//               type="email"
//               placeholder="Enter email"
//               value={data.email}
//               name="email"
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-field">
//             <label>Password</label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               value={data.password}
//               name="password"
//               onChange={handleChange}
//             />
//           </div>

//           <div className="form-field">
//             <label>Confirm Password</label>
//             <input
//               type="password"
//               placeholder="Confirm password"
//               value={data.confirmPassword}
//               name="confirmPassword"
//               onChange={handleChange}
//             />
//           </div>

//           <button className="form-submit-btn" onClick={handleCreate}>
//             Create Admin
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import api from "../../Services/api";
// import AdminNavbar from "./AdminNavbar";

// export default function NormalAdmin() {
//   const [admins, setAdmins] = useState([]);

//   const fetchNormalAdmins = async () => {
//     try {

//       const response = await api.get("/admin/normal-admins")

//       console.log(response.data);

//       setAdmins(response.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchNormalAdmins();
//   }, []);

//   return (
//     <div>
//       <AdminNavbar/>
//       <h2>Normal Admins</h2>

//       {admins.map((admin) => (
//         <div key={admin._id}>
//           <h4>{admin.name}</h4>
//           <p>{admin.email}</p>
//           <p>{admin.role?.name}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import "./NormalAdminCreation.css";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";

export default function NormalAdmin() {

  const navigate = useNavigate()
  const [admins, setAdmins] = useState([]);

  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const permissions = [
    {
      value: "viewBoats",
      label: "View Boats",
    },
    {
      value: "createBoat",
      label: "Create Boat",
    },
    {
      value: "updateBoat",
      label: "Update Boat",
    },
    {
      value: "deleteBoat",
      label: "Delete Boat",
    },
    {
      value: "viewBookings",
      label: "View Bookings",
    },
    {
      value: "manageBookings",
      label: "Manage Bookings",
    },
    {
      value: "manageCustomers",
      label: "Manage Customers",
    },
  ];

  // Get all Normal Admins
  const fetchNormalAdmins = async () => {
    try {
      // const token = localStorage.getItem("token");

      const response = await api.get("/admin/normal-admins");

      setAdmins(response.data.data);
    } catch (error) {
      console.error("Fetch Normal Admin Error:", error);

      alert(error.response?.data?.message || "Failed to fetch Normal Admins");
    }
  };

  useEffect(() => {
    fetchNormalAdmins();
  }, []);

  // Open permission popup
  const handleEditPermissions = (admin) => {
    setSelectedAdmin(admin);

    setSelectedPermissions(admin.permissions || []);

    setShowModal(true);
  };

  // Checkbox change
  const handlePermissionChange = (permission) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(
        selectedPermissions.filter((item) => item !== permission),
      );
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  // Save permissions
  const handleSavePermissions = async () => {
    try {
      console.log("Sending permissions:", selectedPermissions);

      const response = await api.put(
        `/admin/normal-admin/${selectedAdmin._id}/permissions`,
        {
          permissions: selectedPermissions,
        },
      );

      console.log("Update response:", response.data);

      alert("Permissions updated successfully");

      setShowModal(false);

      fetchNormalAdmins();
    } catch (error) {
      console.log("STATUS:", error.response?.status);
      console.log("RESPONSE:", error.response?.data);
      console.log("ERROR:", error);
    }
  };

  return (
   <div>
    <AdminNavbar/>
     <div className="normal-admin-page">
      <div className="normal-admin-shell">
        <div className="normal-admin-header">
          <div>
            <p className="normal-admin-kicker">Access management</p>
            <h2>Normal Admins</h2>
          </div>
        </div>

        <div className="normal-admin-table-wrap">
          <table className="normal-admin-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Permissions</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {admins.length === 0 ? (
                <tr>
                  <td colSpan="6" className="normal-admin-empty">
                    No Normal Admins Found
                  </td>
                </tr>
              ) : (
                admins.map((admin, index) => (
                  <tr key={admin._id}>
                    <td>{index + 1}</td>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.role?.name}</td>
                    <td>
                      {admin.permissions && admin.permissions.length > 0 ? (
                        <div className="permission-badges">
                          {admin.permissions.map((permission) => (
                            <span key={permission} className="permission-badge">
                              {permission}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="empty-permission">No permissions</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="edit-permission-btn"
                        onClick={() => handleEditPermissions(admin)}
                      >
                        Edit Permissions
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedAdmin && (
        <div
          className="permission-modal-backdrop"
          onClick={() => setShowModal(false)}
        >
          <div
            className="permission-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="permission-modal-header">
              <div>
                <p className="normal-admin-kicker">Permission update</p>
                <h3>Edit Permissions</h3>
              </div>

              <button
                className="close-modal-btn"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="permission-modal-body">
              <div className="selected-admin-box">
                <h5>{selectedAdmin.name}</h5>
                <p>{selectedAdmin.email}</p>
              </div>

              <div className="permission-list">
                {permissions.map((permission) => (
                  <label
                    className="permission-option"
                    key={permission.value}
                    htmlFor={permission.value}
                  >
                    <input
                      type="checkbox"
                      id={permission.value}
                      checked={selectedPermissions.includes(permission.value)}
                      onChange={() => handlePermissionChange(permission.value)}
                    />
                    <span>{permission.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="permission-modal-footer">
              <button
                className="secondary-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button className="primary-btn" onClick={handleSavePermissions}>
                Save Changes
              </button>
            </div>
          </div>
          
        </div>
      )}
       <button onClick={()=>navigate("/admin/normalAminRegistration")}>Add NewAdmin</button>
    </div>

   
   </div>
  );
}
