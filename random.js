
// Middle-square technique to generate a unique random number from a seed
// It's not the best way to generate a random but I wanted to test it

function middle_square_random_gen(num){
	for (let i = 0; i < 10; i++) {
		num = num.toString();
		sqr = (num * num).toString();

		mid = Math.floor( num.length/2 );
		midsqr = Math.floor( sqr.length/2 );

		add = 0;
		if (sqr.length%2 == 0)
			add = 1;

		num = sqr.substring(midsqr - mid, midsqr + mid + add);
		num = parseInt(num);
		if (num < 99) num += 99;
	} 
	return num;
}


