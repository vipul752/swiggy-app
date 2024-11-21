import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false); // Toggle for edit mode

  useEffect(() => {
    const storedUser = {
      name: localStorage.getItem("username") || "John Doe",
      email: localStorage.getItem("email") || "Email not provided",
      contact: localStorage.getItem("mobileNumber") || "Contact not provided",
      address: localStorage.getItem("address") || "Address not provided",
    };
    setUser(storedUser);
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = () => {
    localStorage.setItem("username", user.name);
    localStorage.setItem("email", user.email);
    localStorage.setItem("mobileNumber", user.contact);
    localStorage.setItem("address", user.address);

    setIsEditing(false); // Exit edit mode
    toast.success("Profile updated successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <Toaster position="top-center" />
      <div className="w-[1200px] overflow-hidden shadow-lg rounded-lg bg-white">
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-12 text-gray-800">Profile</h1>

          <div className=" mb-8">
            {/* Conditionally render input fields for editing */}
            {isEditing ? (
              <>
                <div className="mb-8">
                  <label className="block text-gray-700 font-medium mb-2">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-8">
                  <label className="block text-gray-700 font-medium mb-2">
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Contact:
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={user.contact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Address:
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {user.name}
                </h2>
                <p className="text-gray-600">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-gray-600">
                  <strong>Contact:</strong> {user.contact}
                </p>
                <p className="text-gray-600">
                  <strong>Address:</strong> {user.address}
                </p>
              </>
            )}
          </div>

          <div className="mt-6">
            {/* Toggle between Save and Edit buttons */}
            {isEditing ? (
              <button
                onClick={handleSave}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={handleEditToggle}
                className="w-96 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 "
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
