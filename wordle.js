// Choose the pokemon of the day

var today = new Date();
var today_number = Math.floor(today.valueOf()/(1000*60*60*24))
var pokemon_number = middle_square_random_gen(today_number) % pokemonlist.length + 1

console.log(pokemonlist[pokemon_number])