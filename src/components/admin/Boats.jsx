import React, { useEffect, useState } from "react";
import "../../Pages/Admin.css";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import AdminNavbar from "../../components/admin/AdminNavbar";
import api from "../../Services/api";

export default function AdminBoats() {
  const [profile, setProfile] = useState(null);
  const [boats, setBoats] = useState([]);

  const [profileError, setProfileError] = useState("");
  const [boatError, setBoatError] = useState("");

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

 

  const getBoats = async () => {
    try {
      const response = await api.get("/getBoat");

      console.log("All Boats:", response.data);

      setBoats(response.data.data || []);
    } catch (error) {
      console.log("Boat error:", error);

      setBoatError(error.response?.data?.message || "Unable to fetch boats");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      // await getProfile();

      await getBoats();

      setLoading(false);
    };

    loadData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this boat?",
    );

    if (!confirmDelete) {
      return;
    }
    try {
      const response = await api.delete(`/deleteBoat/${id}`);

      console.log(response.data);

      getBoats();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  const handleDetails = (id) => {
    navigate(`/admin/boat/${id}`);
  };

  const filtersData = boats.filter((boat) => {
    return boat.boatName?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <AdminNavbar />
      <div className="admin-container">
        <h1>Admin Dashboard</h1>
        {profileError && <p className="error-message">{profileError}</p>}
        {profile && (
          <div className="profile-section">
            <h2>Welcome, {profile.name}</h2>
            <div className="profile-info">
              <p>
                <strong>Name:</strong> {profile.name}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              {/* <p>
                <strong>Mobile Number:</strong> {profile.mobileNumber}
              </p> */}
              <p>
                <strong>Role:</strong> {profile.role}
              </p>
            </div>
          </div>
        )}

        <hr />
        <div>
          <input
            placeholder="serch boats"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="inputFilter"
          />
        </div>

        <div className="boats-section">
          <h2>All Boats</h2>
          {boatError && <p className="error-message">{boatError}</p>}

          {loading && <p className="loading-message">Loading boats...</p>}

          {!loading && !boatError && boats.length === 0 && (
            <p className="no-data-message">No boats found</p>
          )}
          <button onClick={() => navigate("/admin/add-boat")}>
            + Add Boat
          </button>

          {!loading && boats.length > 0 && (
            <table border="1">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Boat Name</th>
                  <th>Boat Type</th>
                  <th>Category</th>
                  <th>Facility</th>
                  <th>Capacity</th>
                  <th>Price</th>
                  <th>Location</th>
                  <th>Destination</th>
                  {/* <th>Description</th> */}
                  <th>Image</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th colSpan={3}>Action</th>
                </tr>
              </thead>

              <tbody>
                {filtersData.map((boat, index) => (
                  <tr key={boat._id}>
                    <td>{index + 1}</td>
                    <td>{boat.boatName}</td>
                    <td>{boat.boatType}</td>
                    <td>{boat.category}</td>
                    <td>{boat.facility}</td>
                    <td>{boat.capacity} members</td>
                    <td>₹{boat.price}</td>
                    <td>{boat.location}</td>
                    <td>{boat.destination}</td>
                    {/* <td>{boat.description}</td> */}
                    <td>
                      {<img src={boat.image} alt={boat.boatName} width="100" />}
                    </td>
                    <td>
                      <span
                        className={`status-badge ${boat.status?.toLowerCase()}`}
                      >
                        {boat.status}
                      </span>
                    </td>
                    <td>
                      {boat.createdAt
                        ? new Date(boat.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          navigate(`/admin/boat/update/${boat._id}`)
                        }
                      >
                        <MdEdit />
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(boat._id)}>
                        <MdDelete />
                      </button>
                    </td>

                    <td>
                      <button onClick={() => handleDetails(boat._id)}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
