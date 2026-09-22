import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
import "./AdminProfile.css";

export default function AdminProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const response = await api.get("/admin/superAdminProfile");

      console.log("Profile response:", response.data);

      setProfile(response.data.admin);
    } catch (error) {
      console.log("Profile error:", error);

      setError(error.response?.data?.message || "Unable to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return (
      <div>
        <h2>Loading profile...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>{error}</h2>
      </div>
    );
  }

  if (!profile) {
    return (
      <div>
        <h2>Profile not found</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h1>My Profile</h1>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar"></div>

          <div>
            <h2>{profile.role?.name}</h2>

            {/* <p>{profile.role}</p> */}
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-field">
            <label>Name</label>

            <p>{profile.name || "-"}</p>
          </div>

          <div className="profile-field">
            <label>Email</label>

            <p>{profile.email || "-"}</p>
          </div>

          {/* <div className="profile-field">
            {/* <label>Mobile Number</label> */}

          {/* <p>{profile.mobileNumber || "-"}</p> */}
          {/* </div>   */}

          <div className="profile-field">
            <label>Role</label>

            <p>{profile.role?.name || "-"}</p>
          </div>

          <div className="profile-field">
            <label>User ID</label>

            <p>{profile._id || "-"}</p>
          </div>

          <div className="profile-field">
            <label>Account Created</label>

            <p>
              {profile.createdAt
                ? new Date(profile.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            navigate(-1)
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}
