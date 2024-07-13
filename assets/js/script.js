// ====Left Search sidebar begin====

let inputEl = document.getElementById(`names`);
// console.log(inputEl);
let buttonEl = document.querySelector("#names_run");
// console.log(buttonEl);
let searchlistEl = document.getElementById(`searchlist`);

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
    console.log(result.drinks[0].strDrink);
    for (let i = 0; i < result.drinks.length; i++) {
     let example = document.createElement("h3");
      example.textContent = result.drinks[i].strDrink;
      searchlistEl.appendChild(example);
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
