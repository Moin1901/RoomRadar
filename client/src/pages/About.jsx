import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
const About = () => {
  const { darkMode } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Add or remove the "dark" class from the body based on darkMode state
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div>
      <div className="flex justify-end p-4">
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className={`text-sm font-bold focus:outline-none ${
            darkMode
              ? "text-yellow-400 hover:text-yellow-300"
              : "text-gray-700 hover:text-gray-500"
          }`}
        >
          {darkMode ? "🌙 Light Mode" : "🌚 Dark Mode"}
        </button>
      </div>
      <div className="py-20 px-4 max-w-6xl mx-auto">
        <h1
          className={`text-3xl font-bold mb-4 ${
            darkMode ? "text-slate-300" : "text-slate-800"
          }`}
        >
          About Room Radar
        </h1>
        <p
          className={`mb-4  ${darkMode ? "text-slate-300" : "text-slate-700"}`}
        >
          Room Radar is a leading real estate agency that specializes in helping
          clients buy, sell, and rent properties in the most desirable
          neighborhoods. Our team of experienced agents is dedicated to
          providing exceptional service and making the buying and selling
          process as smooth as possible.
        </p>
        <p
          className={`mb-4  ${darkMode ? "text-slate-300" : "text-slate-700"}`}
        >
          Our mission is to help our clients achieve their real estate goals by
          providing expert advice, personalized service, and a deep
          understanding of the local market. Whether you are looking to buy,
          sell, or rent a property, we are here to help you every step of the
          way.
        </p>
        <p
          className={`mb-4  ${darkMode ? "text-slate-300" : "text-slate-700"}`}
        >
          Our team of agents has a wealth of experience and knowledge in the
          real estate industry, and we are committed to providing the highest
          level of service to our clients. We believe that buying or selling a
          property should be an exciting and rewarding experience, and we are
          dedicated to making that a reality for each and every one of our
          clients.
        </p>
      </div>
    </div>
  );
};

export default About;
