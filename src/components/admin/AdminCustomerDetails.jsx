import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../Services/api";

export default function AdminCustomerDetails() {
  const [data, setData] = useState(null);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await api.get(`/adminSingleCustomers/${id}`);

      console.log(response.data);

      setData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <div>
      <h1>Customer Details</h1>

      {data ? (
        <div>
          <p>Name: {data.name}</p>
          <p>Email: {data.email}</p>
          <p>Mobile: {data.mobileNumber}</p>
          <p>
            {" "}
            Date:{" "}
            {data?.createdAt
              ? new Date(data.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "-"}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
