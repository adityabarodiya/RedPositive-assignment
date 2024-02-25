'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import MyForm from "./MyForm";
import DataTable from "./DataTable";
import { fetchData } from "./Api";

const API_URL = "http://localhost:8000";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("Component mounted"); // Check if the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log("Fetching data..."); // Check if fetchData is called
    try {
      const response = await axios.get(`${API_URL}/data`);
      setData(response.data.data);
      console.log('Fetched data:', response.data); // Log the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/data/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      await axios.put(`${API_URL}/data/${updatedData._id}`, updatedData);
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div>
      <DataTable data={data} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default App;
