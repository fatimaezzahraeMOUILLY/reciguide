import React, { useState, useEffect } from 'react';
import './style.css';
import './Home.css';
import logo from '../images/logo.png';
import { useNavigate } from 'react-router-dom';



function CalculateTotalCal() {
  let navigate = useNavigate();


  // Définition des données (à importer de `index2.js` dans une version finale)
const vegetables = [ ["tomate", 17], ["courgette", 18], ["poireau", 61], ["carotte", 41],
["oignon", 40], ["navet", 28], ["poivron", 20], ["endive", 17],
["pomme de terre", 80], ["avocat", 160], ["céleri", 18], ["broccoli", 34],
["betterave", 43], ["chou-fleur", 25], ["chou vert", 25], ["aubergine", 25],
["salade verte", 15], ["chou de Bruxelles", 43], ["petits pois", 80],
["maïs", 106], ["champignon", 20]];

const drinks = [["eau", 0], ["champagne", 81], ["vin blanc", 77], ["vin rouge", 67],
["vin rosé", 70], ["bière", 43], ["café", 0], ["chocolat chaud", 76],
["cognac", 200], ["porto", 154], ["thé", 1], ["sirop", 352],
["jus de fruit", 50], ["lait", 48], ["whisky", 249], ["vodka", 237],
["limonade", 40], ["rhum", 248], ["cidre", 40], ["pastis", 274],
["liqueur", 196], ["eau de vie", 237], ["gin", 264]];

const seafood = [ ["poulpe", 86], ["crevettes", 94], ["espadon", 172], ["turbot", 118],
["maquereau", 228], ["sardine", 163], ["huîtres", 42], ["sole", 73],
["calamar", 77], ["raie", 90], ["colin", 73], ["thon", 132],
["rouget", 143], ["cabillaud", 77], ["bulots", 90], ["moules", 72],
["crabe", 70], ["saumon", 184]];


const fruits = [ ["cassis", 73], ["grenade", 83], ["goyave", 68], ["prune", 49],
["groseille", 56], ["pomme", 52], ["ananas", 50], ["kiwi", 61],
["mangue", 60], ["fraise", 33], ["poire", 57], ["banane", 89],
["pêche", 39], ["abricot", 78], ["cerise", 60], ["orange", 45],
["pamplemousse", 45], ["datte", 280], ["raisin", 72]];

const cereals = [  ["blé", 149], ["millet", 378], ["avoine", 350], ["orge", 120],
["graine de couscous", 170], ["riz blanc", 150], ["pois cassés", 130],
["pois chiches", 150], ["lentilles vertes", 150], ["pâtes", 130]];


const dishes = [  ["tartiflette", 150], ["glace", 180], ["nem au poulet", 192],
["pot-au-feu", 72], ["sorbet", 130], ["crème brûlée", 300],
["riz cantonais", 141], ["île flottante", 140], ["poulet au curry", 120],
["pizza", 250], ["quiche", 300], ["paella", 170], ["daube", 130],
["mousse au chocolat", 164], ["tarte au pommes", 280], ["meringue", 400],
["éclair au café", 250]];

const condiments = [   ["moutarde", 150], ["huile d'olive", 900], ["beurre", 750],
["vinaigre", 20], ["vinaigre balsamique", 280], ["huile de tournesol", 900],
["lait de coco", 190], ["mayonnaise", 700], ["ketchup", 120],
["sauce nuoc-mâm", 60], ["sauce au poivre", 61], ["sauce Roquefort", 165],
["sauce à l'échalote", 70], ["sauce Rouille", 360], ["sauce Tartare", 520],
["coulis de tomate", 25], ["tapenade", 240], ["anchoïade", 300]];


const meat = [    ["canard", 200], ["saucisse de Morteau", 316], ["merguez", 316],
["chipolata", 282], ["saucisse de Francfort", 270], ["lapin", 130],
["veau", 172], ["boeuf", 250], ["porc", 242], ["agneau", 208],
["rognons", 96], ["foie de volaille", 155], ["joue de boeuf", 136],
["poulet", 239], ["sanglier", 150], ["cerf", 113], ["foie de veau", 136],
["dinde", 175], ["oeuf", 140], ["jambon blanc", 135],
["jambon cru", 230], ["mortadelle", 300], ["saucisson sec", 400]];

const quantity = [ 0, 5, 10, 15, 20, 25, 50, 75, 80, 100, 150, 200, 250, 300, 350, 400, 450, 500,
    550, 600, 650, 700, 750, 800, 850, 900, 950, 1000];

  // États pour les sélections et les quantités
  const [selections, setSelections] = useState({
    vegetables: { choice: '', quantity: 0, total: 0 },
    seafood: { choice: '', quantity: 0, total: 0 },
    fruits: { choice: '', quantity: 0, total: 0 },
    condiments: { choice: '', quantity: 0, total: 0 },
    dishes: { choice: '', quantity: 0, total: 0 },
    cereals: { choice: '', quantity: 0, total: 0 },
    drinks: { choice: '', quantity: 0, total: 0 },
    meat: { choice: '', quantity: 0, total: 0 },
  });

  const [totals, setTotals] = useState({
    fruit: 0,
    vegetable: 0,
    seafood: 0,
    condiments: 0,
    dishes: 0,
    cereals: 0,
    drinks: 0,
    meat: 0,
    
  });

  // Fonction pour mettre à jour les sélections et les quantités
  const handleSelectChange = (group, field, value) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [group]: {
        ...prevSelections[group],
        [field]: value,
      }
    }));
  };

  // Calcul des calories totales par groupe
  const calculateCalories = (group) => {
    const { choice, quantity } = selections[group];
    if (choice && quantity) {
      const calories = parseInt(choice.split(',')[1]);
      const totalCalories = (calories * quantity) / 100;
      setSelections((prevSelections) => ({
        ...prevSelections,
        [group]: {
          ...prevSelections[group],
          total: totalCalories,
        }
      }));
    }
  };

  const calculateTotalCalories = () => {
    let total = 0;
    for (const group in selections) {
      total += selections[group].total;
    }
    return total;
  };

  // Initialisation des options de sélection
  useEffect(() => {
    // Fonction pour créer des options
    const createOptions = (group, data) => {
      return data.map(item => (
        <option key={item[0]} value={item}>{item[0]}</option>
      ));
    };

    setOptions({
      vegetables: createOptions('vegetables', vegetables),
      seafood: createOptions('seafood', seafood),
      fruits: createOptions('fruits', fruits),
      condiments: createOptions('condiments', condiments),
      meat: createOptions('meat', meat),
      cereals: createOptions('cereals', cereals),
      drinks: createOptions('drinks', drinks),
      dishes: createOptions('dishes', dishes),
    });
  }, [cereals, condiments, dishes, drinks, fruits, meat, seafood, vegetables]);
  

  const [options, setOptions] = useState({});

    
  return (
            <div className="div-container">
                <div className="navbar">
      <div className="logo">
       <img src={logo} alt="" />
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

                <div class="header">
                    <div class="titre">
                        <div id="good">
                            <div id="g">C</div>
                            <div id="ood">OMPOSE YOUR</div>
                        </div>
                        <div id="good2">
                            <div id="f">P</div>
                            <div id="ood2">LATE</div>
                        </div>
                    </div>
                </div>

                <div class="group">
                    <div class="food" id="vegetables">
                        <label for="choice1">Légumes</label>
                        <select class="select1" id="choice1" onChange={(e) => handleSelectChange('vegetables', 'choice', e.target.value)}>{options.vegetables}</select>
                        <label for="quant1">Quantité en grammes</label>
                        <select class="select2" id="quant1" onChange={(e) => handleSelectChange('vegetables', 'quantity', parseInt(e.target.value))}>{quantity.map(q => <option key={q} value={q}>{q}</option>)}</select>
                        <button type="button" class="button" id="total1" onClick={() => calculateCalories('vegetables')}>Valider</button>
                        <div class="text" id="text1">{selections.vegetables.total}</div>
                    </div>

                    <div class="food" id="cereals">
                        <label for="choice2">Céréales</label>
                        <select class="select1" id="choice2" onChange={(e) => handleSelectChange('cereals', 'choice', e.target.value)}>{options.cereals}</select>
                        <label for="quant2">Quantité en grammes</label>
                        <select class="select2" id="quant2" onChange={(e) => handleSelectChange('cereals', 'quantity', parseInt(e.target.value))}>{quantity.map(q => <option key={q} value={q}>{q}</option>)}</select>
                        <button type="button" class="button" id="total2" onClick={() => calculateCalories('cereals')}>Valider</button>
                        <div class="text" id="text2">{selections.cereals.total}</div>
                    </div>

                    <div class="food" id="fruits">
                        <label for="choice3">Fruits</label>
                        <select class="select1" id="choice3" onChange={(e) => handleSelectChange('fruits', 'choice', e.target.value)}>{options.fruits}</select>
                        <label for="quant3">Quantité en grammes</label>
                        <select class="select2" id="quant3" onChange={(e) => handleSelectChange('fruits', 'quantity', parseInt(e.target.value))}>{quantity.map(q => <option key={q} value={q}>{q}</option>)}</select>
                        <button type="button" class="button" id="total3" onClick={() => calculateCalories('fruits')}>Valider</button>
                        <div class="text" id="text3">{selections.fruits.total}</div>
                    </div>

                    <div class="food" id="meat">
                        <label for="choice4">meat</label>
                        <select class="select1" id="choice4" onChange={(e) => handleSelectChange('meat', 'choice', e.target.value)}>{options.meat}</select>
                        <label for="quant4">Quantité en grammes</label>
                        <select class="select2" id="quant4" onChange={(e) => handleSelectChange('meat', 'quantity', parseInt(e.target.value))}>{quantity.map(q => <option key={q} value={q}>{q}</option>)}</select>
                        <button type="button" class="button" id="total4" onClick={() => calculateCalories('meat')}>Valider</button>
                        <div class="text" id="text4">{selections.meat.total}</div>
                    </div>
                </div>
                <div class="group">
                    <div class="food" id="seafood">
                        <label for="choice5" >Poissons / Crustacés</label>
                        <select class="select1" id="choice5"  onChange={(e) => handleSelectChange('seafood', 'choice', e.target.value)}>{options.seafood}</select>
                        <label for="quant5">Quantité en grammes</label>
                        <select class="select2" id="quant5" onChange={(e) => handleSelectChange('seafood', 'quantity', parseInt(e.target.value))}>{quantity.map(q => <option key={q} value={q}>{q}</option>)}</select>
                        <button type="button" class="button" id="total5" onClick={() => calculateCalories('seafood')}>Valider</button>
                        <div class="text" id="text5">{selections.seafood.total}</div>
                    </div>
                    <div class="food" id="drinks">
                        <label for="choice6">Boissons</label>
                        <select class="select1" id="choice6" onChange={(e) => handleSelectChange('drinks', 'choice', e.target.value)}>{options.drinks}</select>
                        <label for="quant6">Quantité en centilitre</label>
                        <select class="select2" id="quant6" onChange={(e) => handleSelectChange('drinks', 'quantity', parseInt(e.target.value))}>{quantity.map(q => <option key={q} value={q}>{q}</option>)}</select>
                        <button type="button" class="button" id="total6" onClick={() => calculateCalories('drinks')}>Valider</button>
                        <div class="text" id="text6">{selections.drinks.total}</div>
                    </div>

                    <div class="food" id="dishes">
                        <label for="choice7">Plats cuisinés</label>
                        <select class="select1" id="choice7" onChange={(e) => handleSelectChange('dishes', 'choice', e.target.value)}>{options.dishes}</select>
                        <label for="quant7">Quantité en grammes</label>
                        <select class="select2" id="quant7" onChange={(e) => handleSelectChange('dishes', 'quantity', parseInt(e.target.value))}>{quantity.map(q => <option key={q} value={q}>{q}</option>)}</select>
                        <button type="button" class="button" id="total7" onClick={() => calculateCalories('dishes')}>Valider</button>
                        <div class="text" id="text7">{selections.dishes.total}</div>
                    </div>
                    <div class="food" id="condiments">
                        <label for="choice8">Condiments / Sauces</label>
                        <select class="select1" id="choice8" onChange={(e) => handleSelectChange('condiments', 'choice', e.target.value)}>{options.condiments}</select>
                        <label for="quant8">Quantité en grammes</label>
                        <select class="select2" id="quant8" onChange={(e) => handleSelectChange('condiments', 'quantity', parseInt(e.target.value))}>{quantity.map(q => <option key={q} value={q}>{q}</option>)}</select>
                        <button type="button" class="button" id="total8" onClick={() => calculateCalories('condiments')}>Valider</button>
                        <div class="text" id="text8">{selections.condiments.total}</div>
                    </div>
                </div>
                <button type="button" id="totalAll" onClick={() => document.getElementById('textAll').innerText = `Total des calories : ${calculateTotalCalories()}`}>Total des calories!</button>
                <div id="textAll"></div>
                <div class="calnec">Calories nécessaires / Jour (en kcal => kilocalories)</div>
                <div class="moyenne">
                    <div class="act">PERSONNE ACTIVE</div>
                    <div class="sed">PERSONNE SÉDENTAIRE</div>
                    <div class="hs">Homme<br />2200 à 2600 kcal</div>
                    <div class="fs">Femme<br />1600 à 2000 kcal</div>
                    <div class="ha">Homme<br />2400 à 3000 kcal</div>
                    <div class="fa">Femme<br />1800 à 2400 kcal</div>
                </div>
            </div>
  );
}

export default CalculateTotalCal;
