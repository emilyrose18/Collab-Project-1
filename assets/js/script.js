// ====Left Search sidebar begin====

let inputEl = document.getElementById(`names`);
// console.log(inputEl);
let buttonEl = document.querySelector("#names_run");
// console.log(buttonEl);
let searchlistEl = document.getElementById(`searchlist`);

let drinkCardInfo = document.getElementById('drinkCard');

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
    const drinks = result.drinks;

    searchlistEl.innerHTML = '';
    console.log(result);
    
    // console.log(result.drinks);
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

    for (let i = 0; i < drinks.length; i++) {
      let drinkId = drinks[i].idDrink;
      let drinkName = drinks[i].strDrink;
      console.log("testing");
      console.log(drinkName);

      let cardDiv = document.createElement('div');
      cardDiv.className = 'card';

      let drinkNameEl = document.createElement('h3');
      drinkNameEl.textContent = drinkName;

      let moreInfoButton = document.createElement('button');
      moreInfoButton.id = drinkId;
      moreInfoButton.textContent = 'More Info';
      moreInfoButton.addEventListener('click', function() {
        getMoreInfo(drinkId);
      });

      cardDiv.appendChild(drinkNameEl);
      cardDiv.appendChild(moreInfoButton);

      searchlistEl.appendChild(cardDiv);

    }
  } catch (error) {
    console.error(error);
  }
}

async function getMoreInfo(drinkId) {
const url = 'https://the-cocktail-db.p.rapidapi.com/lookup.php?i=' + drinkId;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'c826df9be6msh761406a549d7cfcp1723bbjsn6b3cf58dffd3',
		'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result.drinks[0].strDrinkThumb);
  let drinkName = result.drinks[0].strDrink;

  drinkCardInfo.innerHTML = '';

  let drinkNameDisplay = document.createElement('h3');
  drinkNameDisplay.textContent = drinkName;

 let drinkImage = document.createElement('img');
  drinkImage.src = result.drinks[0].strDrinkThumb;






  drinkCardInfo.appendChild(drinkNameDisplay);
  drinkCardInfo.appendChild(drinkImage);
  
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
function renderDrinkCard (){

}
// ===DrinkCard ends===