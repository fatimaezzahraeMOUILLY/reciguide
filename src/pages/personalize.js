// src/Personalize.js
import React, { useState } from "react";
import "./personalize.css";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import IngredientForm from '../components/IngredientForm';
import RecipeList from '../components/RecipeList';

function Personalize() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchRecipes = async (ingredients) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=f48e5b59a6d24a49a378f0f24ec6f767`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      const detailedRecipes = await Promise.all(
        data.map(async (recipe) => {
          const res = await fetch(
           `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=f48e5b59a6d24a49a378f0f24ec6f767`
          );
          if (!res.ok) {
            throw new Error("Failed to fetch recipe details");
          }
          return res.json();
        })
      );
      setRecipes(detailedRecipes);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="explore-container">
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" onClick={() => navigate("/home")} />
        </div>
        <div className="about">
          <ul className="nav-links">
            <li onClick={() => navigate("/home")}>Home</li>
            <li onClick={() => navigate("/about")}>About</li>
            <li onClick={() => navigate("/explore")}>Explore</li>
            <li onClick={() => navigate("/personalize")}>Personalize</li>
            <li onClick={() => navigate("/CalorieCalculator")}>Compose</li>
            <li onClick={() => navigate("/contact")}>Identify</li>
          </ul>
        </div>
        <div className="about">
          <button
            className="Profile-button"
            onClick={() => navigate("/Profile")}
          >
            Profile
          </button>
        </div>
      </div>
      <div className="search-bar">
        <IngredientForm onSearch={searchRecipes} />

        {loading && <p>Loading recipes...</p>}
        {error && <p className="error">{error}</p>}
        
      </div>
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default Personalize;