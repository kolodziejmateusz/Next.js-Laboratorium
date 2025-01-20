"use client";
import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { db } from "@/app/lib/firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Profile() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
    street: "",
    city: "",
    zipCode: "",
  });

  const [loading, setLoading] = useState(true); // Kontrola stanu ładowania
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Pobranie adresu użytkownika z Firestore
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true);
        const snapshot = await getDoc(doc(db, "users", user?.uid));
        if (snapshot.exists()) {
          const address = snapshot.data().address || {};
          setFormData((prev) => ({
            ...prev,
            street: address.street || "",
            city: address.city || "",
            zipCode: address.zipCode || "",
          }));
        }
      } catch (e) {
        console.error("Error fetching user address:", e);
        setError("Failed to load user address. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAddress();
    }
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Aktualizacja profilu użytkownika
      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });
      console.log("Profile updated");

      // Tworzenie/aktualizacja dokumentu użytkownika w kolekcji "users"
      await setDoc(doc(db, "users", user?.uid), {
        address: {
          street: formData.street,
          city: formData.city,
          zipCode: formData.zipCode,
        },
      });

      setSuccess("Profile and address updated successfully!");
    } catch (e) {
      if (e.code === "permission-denied") {
        setError("You do not have permission to update the profile.");
      } else {
        setError("An error occurred: " + e.message);
      }
      console.error("Error updating profile or address:", e);
    }
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
            disabled={loading}
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
            disabled={loading}
          />
        </label>

        {/* Nowe pola dla adresu */}
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input
            type="text"
            name="street"
            className="grow"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input
            type="text"
            name="city"
            className="grow"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input
            type="text"
            name="zipCode"
            className="grow"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </label>

        <button
          type="submit"
          className="btn btn-accent w-full mt-3"
          disabled={loading}
        >
          {loading ? "Loading..." : "Save Changes"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </form>
    </div>
  );
}

export default Profile;
