// src/components/RecipeList.js
import React from 'react';

const RecipeList = ({ recipes }) => {
    return (
        <div className="recipe-list">
            {recipes.map((recipe) => (
                <div key={recipe.id} className="recipe-card">
                    <h2>{recipe.title}</h2>
                    <img src={recipe.image} alt={recipe.title} />
                    <p>{recipe.instructions}</p>
                </div>
            ))}
        </div>
    );
};

export default RecipeList;