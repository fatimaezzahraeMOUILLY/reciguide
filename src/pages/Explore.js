import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Explore.css'; // Assurez-vous d'importer le nouveau fichier CSS ici
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

function Explore() {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRecipes(); // Charge initialement des recettes par défaut
    }, [fetchRecipes]);

    const fetchRecipes = async () => {
        const apiKey = "f48e5b59a6d24a49a378f0f24ec6f767";
        const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`;
        try {
            const response = await axios.get(url);
            setRecipes(response.data.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchRecipes();
    };

    return (
        <div className="explore-container">
            <div className="navbar">
                <div className="logo">
                    <img src={logo} alt="Logo" onClick={() => navigate('/home')} />
                </div>
                <div className="about">
                    <ul className="nav-links">
                    <li onClick={() => navigate('/home')}>Home</li>
                    <li onClick={() => navigate('/about')}>About</li>
                    <li onClick={() => navigate('/explore')}>Explore</li>
                    <li onClick={() => navigate('/personalize')}>Personalize</li>
                    <li onClick={() => navigate('/CalorieCalculator')}>Compose</li>
                    <li onClick={() => navigate('/contact')}>Identify</li>
                    </ul>
                </div>
                <div className="about">
                    <button className="Login-button" onClick={() => navigate('/Login')}>Login</button>
                    <button className="Profile-button" onClick={() => navigate('/Profile')}>Profile</button>
                </div>
            </div>
            <div className="search-bar">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for recipes"
                        required
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="recipes-list">
                {recipes.map((recipe) => (
                    <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="recipe">
                        <img src={recipe.image} alt={recipe.title} />
                        <h3>{recipe.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Explore;