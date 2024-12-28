"use client";
import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";

function Profile() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    updateProfile(user, {
      displayName: formData.displayName,
      photoURL: formData.photoURL,
    })
      .then(() => {
        console.log("Profile updated");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="h-4/5">
      <form onSubmit={onSubmit}>
        <label className="input input-bordered flex items-center gap-2 mb-4 mt-4">
          <input
            type="email"
            className="grow"
            placeholder="Email"
            value={user?.email || ""}
            disabled
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input
            type="text"
            name="displayName"
            className="grow"
            placeholder="Username"
            value={formData.displayName}
            onChange={handleChange}
            required
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input
            type="url"
            name="photoURL"
            className="grow"
            placeholder="Photo URL"
            value={formData.photoURL}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="btn btn-accent w-full mt-3">
          Save Changes
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default Profile;
