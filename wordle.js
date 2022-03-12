// Choose the pokemon of the day
var today = new Date();
var today_number = Math.floor(today.valueOf()/(1000*60*60*24))
var pokemon_number = middle_square_random_gen(today_number) % pokemonlist.length + 1
var pokemon = pokemonlist[pokemon_number]
console.log(pokemon)


// Display pokemon of the day as default image
var pokemon_img = document.getElementById("img-poke");
pokemon_img.src = "data/img/"+pad(pokemon.index,3)+".jpg"



// Change display pokemon when enter is pressed
function input_enter(value){
    if(event.key === 'Enter') {
        console.log(value);     
        let find = pokemonlist.filter(p => p.name_fr == value);
        if(find.length == 1){
        	pokemon = find[0];
        	pokemon_img.src = "data/img/"+pad(pokemon.index,3)+".jpg";
        }
    }
}