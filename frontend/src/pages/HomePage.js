import React, { useEffect, useState } from "react";
import SideNavBar from "../components/SideNavBar.js";
import "../App.css";
import sortIcon from "../icons/sort-icon.png";

const HomePage = () => {
  const [ratingOrder, setRatingOrder] = useState("def");
  const [selectedPlatform, setSelectedPlatform] = useState("Leetcode");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [formData, setFormData] = useState({
    id: "",
    rating: "",
    tag: "",
    takeaway: "",
    status: 0,
  });

  const [selectedPlatformNotes, setSelectedPlatformNotes] = useState([]);

  const ascending = () => {
    const sortedNotes = [...selectedPlatformNotes].sort((a, b) => {
      return a.rating - b.rating;
    });
    setSelectedPlatformNotes(sortedNotes);
    console.log(sortedNotes);
  };

  const desending = () => {
    const sortedNotes = [...selectedPlatformNotes].sort((a, b) => {
      return b.rating - a.rating;
    });
    setSelectedPlatformNotes(sortedNotes);
  };

  const handleRatingClick = () => {
    console.log(ratingOrder);
    if (ratingOrder === "def") {
      setRatingOrder("asc");
      ascending();
    } else if (ratingOrder === "asc") {
      setRatingOrder("dec");
      desending();
    } else {
      setRatingOrder("asc");
      ascending();
    }
  };

  useEffect(() => {
    const getSeletedPlatformNotes = async () => {
      const resp = await window.api.getPlatformNotes(selectedPlatform);
      let respList = [];
      resp.forEach((note) => {
        respList.push({
          id: note.QId,
          rating: note.Rating,
          tag: note.TAGS,
          takeaway: note.Note,
          solved: note.Solved,
        });
      });
      setSelectedPlatformNotes(respList);
      console.log(resp);
    };
    getSeletedPlatformNotes();
  }, [selectedPlatform]);

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
  };

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    // Reset the form data when closing the modal
    setFormData({
      id: "",
      rating: "",
      tag: "",
      takeaway: "",
      status: 0,
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a new entry
    const newEntry = {
      id: formData.id,
      rating: parseInt(formData.rating),
      tag: formData.tag,
      takeaway: formData.takeaway,
      status: formData.status,
      solved: formData.status,
      platform: selectedPlatform,
    };

    await window.api.addNote(newEntry);

    // Update the platformNotes state with the new entry
    setSelectedPlatformNotes((prev) => [...prev, newEntry]);

    // Close the modal after submission
    closeModal();
  };

  return (
    <div className="homepage-container">
      <SideNavBar
        onPlatformSelect={handlePlatformSelect}
        selectedPlatform={selectedPlatform}
      />
      <div className="main-content">
        <h1>{selectedPlatform.toUpperCase()} Notes</h1>
        <div className="table-container">
          <table className="notes-table">
            <thead>
              <tr>
                <th>Question ID</th>
                <th className="flex">
                  Rating{" "}
                  <img
                    src={sortIcon}
                    className="w-5 h-5 ml-1 mt-0.5 hover:cursor-pointer"
                    onClick={handleRatingClick}
                    alt=""
                  />
                </th>
                <th>Tag</th>
                <th>Take Away</th>
                <th>Solved</th>
              </tr>
            </thead>
            <tbody>
              {selectedPlatformNotes.map((note) => (
                <tr key={note.id}>
                  <td>{note.id}</td>
                  <td>{note.rating}</td>
                  <td>{note.tag}</td>
                  <td>{note.takeaway}</td>
                  <td>{note.solved ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-button" onClick={openModal}>
            Add New Entry
          </button>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Entry</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Question ID
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rating
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="tag"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tag
                </label>
                <input
                  type="text"
                  id="tag"
                  name="tag"
                  value={formData.tag}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="takeaway"
                  className="block text-sm font-medium text-gray-700"
                >
                  Take Away
                </label>
                <input
                  type="text"
                  id="takeaway"
                  name="takeaway"
                  value={formData.takeaway}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id="status"
                  name="status"
                  checked={formData.status}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="status" className="ml-2 text-sm text-gray-700">
                  Solved
                </label>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
