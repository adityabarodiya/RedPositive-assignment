'use client'
import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";

const AddEntryForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    hobbies: "",
  });

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
        const response = await axios.post(`${API_URL}/data`, formData);
        onSubmit(response.data);
        onClose();
        alert('Entry added successfully')
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
        <h2 className="text-lg text-black font-semibold mb-4">Add New Entry</h2>
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEntryForm;
