// ====Left Search sidebar begin====

let inputEl = document.getElementById(`names`);
// console.log(inputEl);
let buttonEl = document.querySelector("#names_run");
// console.log(buttonEl);
let searchlistEl = document.getElementById(`searchlist`);

let drinkCardInfo = document.getElementById("drinkCard");
let favoritesInfo = document.getElementById("favorites");

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

    searchlistEl.innerHTML = "";
    console.log(result);

    /*
    console.log(result.drinks);
    console.log(result.drinks[0].strDrink);
     for (let i = 0; i < result.drinks.length; i++) {
      let example = document.createElement("h3");
       example.textContent = result.drinks[i].strDrink;
       searchlistEl.appendChild(example);
     }


     result.drinks.forEach(element => {
       console.log(element)
       searchlistEl.innerHTML += `
       <div class="card">
       <h3>${result.drinks.strDrink}</h3>
       <button class="hobby-button" id="${result.drinks.idDrink}">More Info</button>
     });
     */

    for (let i = 0; i < drinks.length; i++) {
      let drinkId = drinks[i].idDrink;
      let drinkName = drinks[i].strDrink;
      console.log("testing");
      console.log(drinkName);

      let cardDiv = document.createElement("div");
      cardDiv.className = "card";

      let drinkNameEl = document.createElement("h3");
      drinkNameEl.textContent = drinkName;

      let moreInfoButton = document.createElement("button");
      moreInfoButton.id = drinkId;
      moreInfoButton.textContent = "More Info";
      moreInfoButton.addEventListener("click", function () {
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

buttonEl.addEventListener("click", function () {
  console.log("button test");
  console.log(inputEl.value);
  getcocktails(inputEl.value);
});

// ====Left Search sidebar ends====

// ===DrinkCard===

async function getMoreInfo(drinkId) {
  const url = "https://the-cocktail-db.p.rapidapi.com/lookup.php?i=" + drinkId;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "c826df9be6msh761406a549d7cfcp1723bbjsn6b3cf58dffd3",
      "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    let drink = result.drinks[0];

    //clears out past drink card
    drinkCardInfo.innerHTML = "";

    //displays drink name
    let drinkName = drink.strDrink;
    let drinkNameDisplay = document.createElement("h2");
    drinkNameDisplay.textContent = drinkName;
    drinkCardInfo.appendChild(drinkNameDisplay);

    //displays drink image
    let drinkImage = document.createElement("img");
    drinkImage.src = result.drinks[0].strDrinkThumb;
    drinkCardInfo.appendChild(drinkImage);

    //gets an array of all the Ingredients keys in the drink object
    let ingredients = Object.keys(drink).filter((key) =>
      key.startsWith("strIngredient")
    );
    //gets an array of all the Measurments keys in the drink object
    let measurments = Object.keys(drink).filter((key) =>
      key.startsWith("strMeasure")
    );

    //Creates the ingredients title
    let ingredientsTitle = document.createElement("h3");
    ingredientsTitle.textContent = "Ingredients:";
    drinkCardInfo.appendChild(ingredientsTitle);

    // iterates rthrogh the ingredients and measurments array
    for (let i = 0; i < ingredients.length; i++) {
      let ingredientNum = ingredients[i];
      let ingredientValue = drink[ingredientNum];

      let measurmentNum = measurments[i];
      let measurmentValue = drink[measurmentNum];
      // only displays if the value is not equal to null
      if (ingredientValue != null) {
        let ingredientsContent = document.createElement("li");
        ingredientsContent.textContent = measurmentValue + ingredientValue;
        drinkCardInfo.appendChild(ingredientsContent);
      }
    }
    //Displays drinks instructions
    let instructionsValue = drink.strInstructions;
    let instructions = document.createElement("h3");
    instructions.textContent = `Instructions: ${instructionsValue}`;
    drinkCardInfo.appendChild(instructions);

    // add button for adding to Favorites
    let drinkId = drink.DrinkId;
    let strDrink = drink.strDrink;
    let AddFavoritesButton = document.createElement("button");
    AddFavoritesButton.id = drinkId;
    AddFavoritesButton.textContent = "Add to Favorites";
    AddFavoritesButton.addEventListener("click", function () {
      AddFavorites(drinkId);
    });

    drinkCardInfo.appendChild(AddFavoritesButton);
  } catch (error) {
    console.error(error);
  }
}

// ===DrinkCard ends===

// ===Favorites sidebar begins===
async function AddFavorites(DrinkId) {
  const url = "https://the-cocktail-db.p.rapidapi.com/lookup.php?i=" + DrinkId;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "c826df9be6msh761406a549d7cfcp1723bbjsn6b3cf58dffd3",
      "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    const newFavoriteDrink = {
      favName: result.drinks[0].strDrink,
      favId: value.drinkId,
    };

    storeLocalStorage(FavoriteDrink);

  } catch (error) {
    console.error(error);
  }
}


const storeLocalStorage = function (data) {
  const allDrinks = readLocalStorage(data);
  newFavoriteDrink.push(data);
  console.log(allDrinks);
  const stringData = JSON.stringify(allDrinks);
  localStorage.setItem("FavoriteDrinks", stringData);
};

const readLocalStorage = function () {
  const stringData = localStorage.getItem("FavoriteDrinks");

  const data = JSON.parse(stringData);

  return data || [];
};

const renderFavoriteList = function () {
  const drinks = readLocalStorage();

  if (!drinks.length) {
    // let noFavorites = document.createElement("h3");
    // noFavorites.textcontent = "No favorites added yet..."
    // favoritesInfo.appendChild(noFavorites);

    favoritesInfo.textcontent = "No favorites added yet...";

    return;
  }

  for (let FavoriteDrink of FavoriteDrinks) {
    let favCard = document.createElement("h3");
    instructions.textContent = favName;

    let moreInfoButton = document.createElement("button");
    moreInfoButton.id = favId;
    moreInfoButton.textContent = "More Info";
    moreInfoButton.addEventListener("click", function () {
      getMoreInfo(favId);
    });

    favoritesInfo.appendChild(favCard);
    favoritesInfo.appendChild(moreInfoButton);
  }
};

renderFavoriteList();

// ===Favorites sidebar ends===
