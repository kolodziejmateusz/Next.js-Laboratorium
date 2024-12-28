/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";
import { redirect } from "next/navigation";

function RegisterForm() {
  const { user } = useAuth();

  if (user) {
    return null;
  }

  const auth = getAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerError, setRegisterError] = useState(""); // Stan błędu rejestracji

  // Obsługa zmian w polach formularza
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault(); // Zatrzymanie domyślnego wysyłania formularza
    const { email, password, confirmPassword } = formData;

    // Walidacja haseł
    if (password !== confirmPassword) {
      setRegisterError("Hasła nie są zgodne.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Zarejestrowano użytkownika!");
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Wysłano e-mail weryfikacyjny!");
          redirect("/user/verify");
        });
      })
      .catch((error) => {
        setRegisterError(error.message);
        console.dir(error);
      });
  };

  return (
    <div className="h-4/5">
      <form onSubmit={onSubmit}>
        <label className="input input-bordered flex items-center gap-2 mb-4 mt-4">
          <input
            type="email"
            name="email"
            className="grow"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input
            type="password"
            name="password"
            className="grow"
            placeholder="Hasło"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input
            type="password"
            name="confirmPassword"
            className="grow"
            placeholder="Potwierdź hasło"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="btn btn-accent w-full mt-3">
          Zarejestruj się
        </button>

        {registerError && <p className="text-red-500 mt-2">{registerError}</p>}
      </form>
    </div>
  );
}

export default RegisterForm;
