const NUMBER_OF_GUESSES = 8;
const title_values = ["Type1","Type2","Taille","Poids","Gen"];

var pokemon_img = document.getElementById("img-poke");
var board = document.getElementById("board");
var not_found_text = document.getElementById("notfoundtext");
var found_text = document.getElementById("foundtext");

var current_guess = 0;
var already_guess = [];
var answer_list = [];

var todaypkm = getPokemonOfTheDay();
var found = false;


var images = [];
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

//-- usage --//
preload(
    "image/ok.png",
    "image/nok.png",
    "image/down.png",
    "image/up.png",
    "data/img/"+pad(todaypkm.index,3)+".jpg"
)




/*
Return the pokemon of the day
*/
function getPokemonOfTheDay(){
    let today = new Date();
    let today_number = Math.floor(today.valueOf()/(1000*60*60*24))
    let pokemon_number = middle_square_random_gen(today_number) % pokemonlist.length + 1
    return pokemonlist[pokemon_number];
}


/*
Create the title row for the board
*/
function createTitle(){
    let row = document.createElement("div");
    row.classList.add("row");
    for(var i = 0; i < 5; i++){
        let title = document.createElement("div");
        title.innerHTML = title_values[i];
        title.classList.add("title");
        row.appendChild(title);
    }
    board.appendChild(row);
}

/*
Create the answer column
*/
function createAnswers(){
    let answers = document.getElementById("answers");
    for(var i = 0; i < NUMBER_OF_GUESSES; i++){
        let answer = document.createElement("div");
        answer_list.push(answer);
        answer.classList.add("answer");
        answer.innerHTML ="";
        answers.appendChild(answer);
    }
}

/*
Create the grid with the hint
*/
var tiles = []
function createGrid(){
    createTitle()
    createAnswers()
    for(var i = 0; i < NUMBER_OF_GUESSES ; i++){
        tiles[i] = []
        // Create a row of tiles
        let row = document.createElement("div");
        row.classList.add("row");
        for(var j = 0; j < 5 ; j++){
            // Create a tile
            let tile = document.createElement("div");
            tile.id = i.toString() + "-" + j.toString();
            tile.classList.add("tile");
            row.appendChild(tile);
            tiles[i][j] = tile;
        }
        board.appendChild(row);
    } 
}


function guessing_pokemon(pokemon){
    already_guess.push(pokemon);

    var answer = answer_list[current_guess];
    answer.innerHTML = pokemon.name_fr;

    if(pokemon.type1 == todaypkm.type1){
        tiles[current_guess][0].style.backgroundImage = "url("+images[0].src+")"; 
    } else {
        tiles[current_guess][0].style.backgroundImage = "url("+images[1].src+")"; 
    }

    if(pokemon.type2 == todaypkm.type2){
        tiles[current_guess][1].style.backgroundImage = "url("+images[0].src+")"; 
    } else {
        tiles[current_guess][1].style.backgroundImage = "url("+images[1].src+")"; 
    }

    if(Math.abs( pokemon.height - todaypkm.height ) < 0.1){
        tiles[current_guess][2].style.backgroundImage = "url("+images[0].src+")"; 
    } else if (pokemon.height > todaypkm.height) {
        tiles[current_guess][2].style.backgroundImage = "url("+images[2].src+")"; 
    } else {
        tiles[current_guess][2].style.backgroundImage = "url("+images[3].src+")";  
    }

    if(Math.abs( pokemon.weight - todaypkm.weight ) < 0.1){
        tiles[current_guess][3].style.backgroundImage = "url("+images[0].src+")"; 
    } else if (pokemon.weight > todaypkm.weight) {
        tiles[current_guess][3].style.backgroundImage = "url("+images[2].src+")"; 
    } else {
        tiles[current_guess][3].style.backgroundImage = "url("+images[3].src+")"; 
    }


    if(pokemon.gen == todaypkm.gen){
        tiles[current_guess][4].style.backgroundImage = "url("+images[0].src+")"; 
    } else if (pokemon.gen > todaypkm.gen) {
        tiles[current_guess][4].style.backgroundImage = "url("+images[2].src+")"; 
    } else {
        tiles[current_guess][4].style.backgroundImage = "url("+images[3].src+")";  
    }



    if(pokemon == todaypkm){
        answer.style.color = "green"
        found = true;
        pokemon_img.src = images[4].src;
        pokemon_img.hidden = false;
        found_text.innerHTML = "Tu as trouvé le pokémon du jour !"
    } else {
        answer.style.color = "red"
    }

    current_guess++;

    if(current_guess == NUMBER_OF_GUESSES){
        found = true; //Stop getting input
        found_text.innerHTML = "Dommage, tu n'as pas trouvé le pokémon :(";
        found_text.style.color = "red";
    }
}


function input_enter(value){
    if(event.key === 'Enter' && !found) {  
        if(value == ""){
            not_found_text.innerHTML = "";
            return;
        }
        let find = pokemonlist.filter(p => p.name_fr == value || p.name_fr.toLowerCase() == value.toLowerCase());
        if(find.length == 1){
            pokemon = find[0];
            if (already_guess.includes(pokemon)){
                not_found_text.innerHTML = "Ce pokemon a déjà été donné !";
            } else {
                guessing_pokemon(pokemon);
                not_found_text.innerHTML = ""
            }
        } else {
            not_found_text.innerHTML = "Ce pokemon n'existe pas !"
        }
    }
}



createGrid();