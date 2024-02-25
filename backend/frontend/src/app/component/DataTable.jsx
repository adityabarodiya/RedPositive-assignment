'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";

const AddEntryForm = ({ isOpen, onClose, onSubmit, initialFormData }) => {
  const [formData, setFormData] = useState(initialFormData || {
    name: "",
    phoneNumber: "",
    email: "",
    hobbies: "",
  });

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear error message when the user starts typing
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (formData.name.trim() === "") {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (formData.phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Phone Number is required";
      valid = false;
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (formData.hobbies.trim() === "") {
      newErrors.hobbies = "Hobbies are required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (initialFormData) {
          // Update existing entry
          await axios.put(`${API_URL}/data/${initialFormData._id}`, formData);
          alert('Update Successful');
        } else {
          // Add new entry
          const response = await axios.post(`${API_URL}/data`, formData);
          onSubmit(response.data);
          alert('Entry added successfully');
        }
        onClose();
        window.location.reload();
      } catch (error) {
        console.error('Error submitting data:', error);
        // Handle error, show message to user, etc.
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-lg text-black font-semibold mb-4">{initialFormData ? "Update Entry" : "Add New Entry"}</h2>
        <form onSubmit={handleSubmit}>
          <label className="text-black">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`border p-1 mb-2 w-full text-black ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
          <label className="text-black">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`border p-1 mb-2 w-full text-black ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
          <label className="text-black">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`border p-1 mb-2 w-full text-black ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <label className="text-black">Hobbies:</label>
          <input
            type="text"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
            className={`border p-1 mb-2 w-full text-black ${
              errors.hobbies ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.hobbies && <p className="text-red-500">{errors.hobbies}</p>}
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 bg-red-500 hover:bg-gray-300 py-1 px-4 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
            >
              {initialFormData ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DataTable = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [isAddFormOpen, setAddFormOpen] = useState(false);
  const [initialFormData, setInitialFormData] = useState(null);

  const handleCheckboxChange = (itemId) => {
    if (selectedRows.includes(itemId)) {
      setSelectedRows(selectedRows.filter((id) => id !== itemId));
    } else {
      setSelectedRows([...selectedRows, itemId]);
    }
  };

  const handleSendData = () => {
    const selectedData = data.filter((item) =>
      selectedRows.includes(item._id)
    );
    const formattedData = selectedData.map((item) => ({
      ID: item._id,
      Name: item.name,
      "Phone Number": item.phoneNumber,
      Email: item.email,
      Hobbies: item.hobbies,
    }));

    const emailContent = encodeURIComponent(JSON.stringify(formattedData));
    window.open(
      `mailto:info@redpositive.in?subject=Selected Data&body=${emailContent}`
    );
  };

  const handleAddEntry = (newEntryData) => {
    // Here, you can add logic to add the new entry to your data source
    // For example, if `data` is stored in a state, you can do something like:
    // setData([...data, newEntryData]);
    console.log("Adding new entry:", newEntryData);
  };

  const handleUpdateEntry = (itemId) => {
    const entryToUpdate = data.find((item) => item._id === itemId);
    setInitialFormData(entryToUpdate);
    setAddFormOpen(true);
  };

  const handleDeleteEntry = async (itemId) => {
    try {
      await axios.delete(`${API_URL}/data/${itemId}`);
      alert('Delete Successful');
      window.location.reload();
      // Remove the deleted item from the data
      // setData(data.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting entry:', error);
      // Handle error, show message to user, etc.
    }
  };

  let cnt = 1;

  return (
    <div>
      <div style={{display:'flex',justifyContent: 'center'}}
>
      <button
        className="bg-blue-600 mt-5 hover:bg-blue-700 text-white py-2 px-4 rounded mb-4"
        onClick={() => {
          setInitialFormData(null);
          setAddFormOpen(true);
        }}
      >
        Add New Entry
      </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-300">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Select
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Phone Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Hobbies
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item._id}>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(item._id)}
                  onChange={() => handleCheckboxChange(item._id)}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">{cnt++}</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">{item.phoneNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">{item.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">{item.hobbies}</td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {selectedRows.includes(item._id) ? (
                  <button className="mr-2 bg-blue-400 hover:bg-blue-600 py-1 px-4 rounded" onClick={handleSendData}>
                    Send
                  </button>
                ) : (
                  <>
                    <button className="mr-2 bg-green-400 hover:bg-green-600 py-1 px-4 rounded" onClick={() => handleUpdateEntry(item._id)}>
                      Update
                    </button>
                    <button className="mr-2 bg-red-400 hover:bg-red-600 py-1 px-4 rounded" onClick={() => handleDeleteEntry(item._id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddEntryForm
        isOpen={isAddFormOpen}
        onClose={() => {
          setAddFormOpen(false);
          setInitialFormData(null);
        }}
        onSubmit={handleAddEntry}
        initialFormData={initialFormData}
      />
    </div>
  );
};

export default DataTable;
