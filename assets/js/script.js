// ====Left Search sidebar begin====

let inputEl = document.getElementById(`names`);
// console.log(inputEl);
let buttonEl = document.querySelector("#names_run");
// console.log(buttonEl);
let searchlistEl = document.getElementById(`searchlist`);
let drinkCardEl = document.getElementById(`drinkCard`)

async function getcocktails(names) {
  const url = "https://the-cocktail-db.p.rapidapi.com/search.php?s=" + names;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "ade2b8c4a4msh10cb24fb66e1426p1e4da1jsn789d10c245db",
      "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.drinks);
    // console.log(result.drinks[0].strDrink);
    // for (let i = 0; i < result.drinks.length; i++) {
    //  let example = document.createElement("h3");
    //   example.textContent = result.drinks[i].strDrink;
    //   searchlistEl.appendChild(example);
    // }


    // result.drinks.forEach(element => {
    //   console.log(element)
    //   searchlistEl.innerHTML += `
    //   <div class="card">
    //   <h3>${result.drinks.strDrink}</h3>
    //   <button class="hobby-button" id="${result.drinks.idDrink}">More Info</button>
    //   `
    // });

    // for (let i = 0; i < result.drinks.length; i++) {
    //   searchlistEl.innerHTML += `
    //   <div class="card">
    //   <h3>${result.drinks[i].strDrink}</h3>
    //   <button id="${result.drinks[i]}">More Info</button>
    //   `
    // }
    for (let i = 0; i < result.drinks.length; i++) {
      searchlistEl.innerHTML += `
      <div class="card">
      <h3>${result.drinks[i].strDrink}</h3>
      <button onclick=renderDrinkCard(${result.drinks[i]})>More Info</button>
      `
    }
  } catch (error) {
    console.error(error);
  }
}

buttonEl.addEventListener("click", function () {
  console.log("button test");
  console.log(inputEl.value);
  getcocktails(inputEl.value);
});

// ====Left Search sidebar ends====


// ===DrinkCard===
function renderDrinkCard(${result.drinks[i]}){
  drinkCardEl.innerHTML += `
    <div class="card">
    <h2>${result.drinks[i].strDrink}</h2>
    <img src=y${result.drinks[i].strDrinkThumb} alt="${result.drinks[i].strDrink}">
    <h2>Ingredient: 
      ${result.drinks[i].strIngredient1} - ${result.drinks[i].strMeasure1}
      ${result.drinks[i].strIngredient2} - ${result.drinks[i].strMeasure2}
      ${result.drinks[i].strIngredient3} - ${result.drinks[i].strMeasure3}
      ${result.drinks[i].strIngredient4} - ${result.drinks[i].strMeasure4}
      ${result.drinks[i].strIngredient5} - ${result.drinks[i].strMeasure5}
      ${result.drinks[i].strIngredient6} - ${result.drinks[i].strMeasure6}
      ${result.drinks[i].strIngredient7} - ${result.drinks[i].strMeasure7}
      ${result.drinks[i].strIngredient8} - ${result.drinks[i].strMeasure8}
      ${result.drinks[i].strIngredient9} - ${result.drinks[i].strMeasure9}
      ${result.drinks[i].strIngredient10} - ${result.drinks[i].strMeasure10}
      ${result.drinks[i].strIngredient11} - ${result.drinks[i].strMeasure11}
      ${result.drinks[i].strIngredient12} - ${result.drinks[i].strMeasure12}
      ${result.drinks[i].strIngredient13} - ${result.drinks[i].strMeasure13}
      ${result.drinks[i].strIngredient14} - ${result.drinks[i].strMeasure14}
      ${result.drinks[i].strIngredient15} - ${result.drinks[i].strMeasure15}
      </h2>
    <h2>Served in: ${result.drinks[i].strGlass}</h2>
    <h2>${result.drinks[i].strInstructions}</h2>

    <button onclick=renderDrinkCard(${result.drinks[i]})>More Info</button>
  `
};
// ===DrinkCard ends===