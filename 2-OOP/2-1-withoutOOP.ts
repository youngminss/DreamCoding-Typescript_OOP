{
	// JS으 전형적인 커피머신 만들기 방식
	type CoffeeCup = {
		shots : number;
		hasMilk: boolean;
	}

	const BEANS_GRAM_PER_SHOT: number = 7;
	let coffeeBeans: number = 0;
	function makeCoffee(shots: number): CoffeeCup {
		if(coffeeBeans < shots * BEANS_GRAM_PER_SHOT) {
			throw new Error("Not enough Coffee Beans !");
		}
		coffeeBeans -= shots * BEANS_GRAM_PER_SHOT;
		return {
			shots : shots,
			hasMilk : false
		}
	}
	coffeeBeans += 3 * BEANS_GRAM_PER_SHOT;
	console.log(makeCoffee(2));
	console.log(`남은 커피콩 갯수 : ${coffeeBeans}`);
}
