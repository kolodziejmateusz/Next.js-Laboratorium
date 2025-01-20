"use client";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "@/app/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (!user) {
          setError("You must be logged in to view movies.");
          setLoading(false);
          return;
        }

        const moviesRef = collection(db, "movies");
        const q = query(moviesRef, where("user", "==", `/users/${user.uid}`));
        const querySnapshot = await getDocs(q);

        const userMovies = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMovies(userMovies);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching movies:", e);
        setError("Failed to load movies. Please try again.");
        setLoading(false);
      }
    };

    fetchMovies();
  }, [user]);

  if (loading) {
    return <p>Loading movies...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Movies</h1>
      {movies.length === 0 ? (
        <p>You have no movies saved.</p>
      ) : (
        <ul className="space-y-4">
          {movies.map((movie) => (
            <li key={movie.id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p>
                <strong>Director:</strong> {movie.director.firstName}{" "}
                {movie.director.lastName}
              </p>
              <p>
                <strong>Genre:</strong> {movie.genre.join(", ")}
              </p>
              <p>
                <strong>Release Year:</strong> {movie.releaseYear}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MoviesPage;
