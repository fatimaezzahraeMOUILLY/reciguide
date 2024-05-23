// src/components/IngredientForm.js
import React, { useState } from 'react';

const IngredientForm = ({ onSearch }) => {
    const [ingredients, setIngredients] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(ingredients);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Enter ingredients separated by commas"
            />
            <button type="submit">Search Recipes</button>
        </form>
    );
};

export default IngredientForm;