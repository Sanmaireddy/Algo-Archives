import "../App.css";
import icon from "./icon.png";
import { useEffect, useState } from "react";

function SideNavBar({ onPlatformSelect, selectedPlatform }) {
  // const platforms = ["codeforces", "leetcode", "codechef", "atcoder"];
  const [platforms, setPlatforms] = useState([]);
  const [isAddingPlatform, setIsAddingPlatform] = useState(false);
  const [newPlatformName, setNewPlatformName] = useState("");

  const getPlatforms = async () => {
    try {
      const resp = await window.api.getPlatformNames();
      let fetchedPlatforms = [];
      resp.forEach((entry) => {
        fetchedPlatforms.push(entry.Name);
      });
      setPlatforms(fetchedPlatforms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlatforms();
  }, []);

  const startAddingPlatform = () => {
    setIsAddingPlatform(true);
  };

  const cancelAddingPlatform = () => {
    setIsAddingPlatform(false);
    setNewPlatformName(""); // Reset the input field
  };

  const handlePlatformSubmit = async (e) => {
    e.preventDefault();
    if (newPlatformName.trim()) {
      try {
        await window.api.addPlatform(newPlatformName);
        setPlatforms((platforms) => [...platforms, newPlatformName]);
      } catch (error) {
        console.log(error);
      }
      setIsAddingPlatform(false);
      setNewPlatformName(""); // Reset the input field
    }
  };
  return (
    <div className="sidenav">
      {/**/}
      <div className="web-site-name flex">
        <img
          src={icon} // Placeholder for user image
          alt="User"
          style={{ width: 30, height: 30 }}
        />
        <span className="user-name ml-1 mt-2">Algo Archives</span>
      </div>
      {/* Add New Platform Button or Input Form */}
      {isAddingPlatform ? (
        <form onSubmit={handlePlatformSubmit} className="mb-5 mt-5">
          <div className="items-center space-x-2">
            <input
              type="text"
              value={newPlatformName}
              onChange={(e) => setNewPlatformName(e.target.value)}
              placeholder="Enter platform name"
              className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-2"
            >
              Save
            </button>
            <button
              type="button"
              onClick={cancelAddingPlatform}
              className="px-3 py-1 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={startAddingPlatform}
          className="bg-blue-500 text-white border-none w-full h-8 rounded-md cursor-pointer mb-5 text-sm hover:bg-blue-600 mt-5"
        >
          + Add New Platform
        </button>
      )}
      <h2>Platforms</h2>
      <ul className="platform-list">
        {platforms.map((platform) => (
          <li
            key={platform}
            className={`platform-item ${
              selectedPlatform === platform ? "active" : ""
            }`}
            onClick={() => onPlatformSelect(platform)}
          >
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideNavBar;
