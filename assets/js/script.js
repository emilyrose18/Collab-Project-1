const url = 'https://the-cocktail-db.p.rapidapi.com/search.php?s=martini';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'ade2b8c4a4msh10cb24fb66e1426p1e4da1jsn789d10c245db',
		'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
	}
};

async function getcocktails(){
try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
}

getcocktails()