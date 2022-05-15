var table = document.getElementById("pokebody");

console.log(table)

for (i = 0; i < pokemonlist.length; i++){
	p = pokemonlist[i]
	var tr = document.createElement("tr");

	var id = document.createElement("td");
	id.textContent = p.index;
	tr.appendChild(id);

	var nom = document.createElement("td");
	nom.textContent = p.name_fr;
	tr.appendChild(nom);

	var type1 = document.createElement("td");
	var img = document.createElement("img");
	img.classList.add("type_icon");
	img.src = "image/"+p.type1+".svg"
	type1.appendChild(img);
	tr.appendChild(type1);

	var type2 = document.createElement("td");
	var img = document.createElement("img");
	img.classList.add("type_icon");
	if(p.type2 != null) img.src = "image/"+p.type2+".svg"
	else img.src = "image/None.svg";
	type2.appendChild(img);
	tr.appendChild(type2);

	var height = document.createElement("td");
	height.textContent = p.height;
	tr.appendChild(height);

	var weight = document.createElement("td");
	weight.textContent = p.weight;
	tr.appendChild(weight);

	var gen = document.createElement("td");
	gen.textContent = p.gen;
	tr.appendChild(gen);

	table.appendChild(tr)
}