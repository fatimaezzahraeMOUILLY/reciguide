import './Food_recognition.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import './Food_recognition.css'


function ReciGuide() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [nutritionalData, setNutritionalData] = useState({});
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handlePredict = async () => {
    if (!image) {
      alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setPrediction(data.prediction);
    setNutritionalData(data.nutritional_data);
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
      <div className="content-box">
        <header>
          <h1>ReciGuide 🍔📷</h1>
          <h2>Identify what's in your food photos!</h2>
        </header>
        <main>
          <div id="formContainer">
            <input type="file" id="fileInput" accept=".jpg, .jpeg, .png" onChange={handleImageUpload} />
            <button id="predictButton" onClick={handlePredict}>Predict</button>
          </div>
          <div id="data_image">
            <div id="imageContainer">
              {image && <img id="submitted_image" src={URL.createObjectURL(image)} alt="Submitted" />}
            </div>
            {prediction && (
              <div id="predictionResult">
                Prediction: {prediction}
              </div>
            )}
            <div id="nutritional_data">
              {Object.keys(nutritionalData).length > 0 && (
                <div>
                  <p>This nutritional information is for a 200g serving:</p>
                  {Object.keys(nutritionalData).map((key) => (
                    <div key={key} className="nutrition_box">
                      {key}: {nutritionalData[key]}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ReciGuide;