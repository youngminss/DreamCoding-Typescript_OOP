import { throws } from "node:assert";

{
	type CoffeeCup = {
		shots : number;
		hasMilk: boolean;
	}

	// < 접근지정자 >
	// private : 클래스 내부에서만 접근가능
	// public : 외부에서도 접근가능 (default)
	// protected : 상속받은 자식클래스 내에서까지 접근가능
	class CoffeeMaker {
		private static BEANS_GRAM_PER_SHOT: number = 7;	
		private coffeeBeans: number = 0;	
		
		private constructor(coffeeBeans: number) {
			this.coffeeBeans = coffeeBeans;
		}

		// 클래스 내부에서 static 메소드를 통해, 새로운 인스턴스를 생성할 수 있는 경로를 마련했다는 것은
		// 내부적으로, 집적적으로는 생성자를 통해 인스턴스를 생성하는 것을 막아놓는 것이 좋다.
		static makeMachine(coffeeBeans: number): CoffeeMaker {
			return new CoffeeMaker(coffeeBeans);
		}

		fillCoffeeBeans(coffeeBeans: number) {
			if(coffeeBeans < 0) {
				throw new Error("커피 콩은 0개 이상부터 채워넣을 수 있습니다 :)");
			}
			this.coffeeBeans += coffeeBeans;
		}

		makeCoffee(shots: number): CoffeeCup {
			
			if(this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAM_PER_SHOT) {
				throw new Error("Not enough Coffee Beans !");
			}
			this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT;
			return {
				shots : shots,
				hasMilk : false
			}
		}
	}
	
	// const maker = new CoffeeMaker(32);
	// maker.coffeeBeans = 3;
	// console.log(maker);
	// 3
	// 내부에서 private 설정을 안해놓으면, 이렇게 외부에서 클래스 내부에 프로퍼티 값을 함부로 접근할 수 있게 된다.

	// console.log(CoffeeMaker.BEANS_GRAM_PER_SHOT);
	// 7
	// 상식적으로, CoffeeMaker 에서 커피콩 하나당 shot 이 얼마나 들어가는지는 궁금하지도 않고 공개할 필요도 없다.
	// 그런데 클래스 내부에서 private 설정으로 되어있지 않기 때문에, static 접근으로 접근하면 해당 정보에 접근이 가능해진다.

	const maker = CoffeeMaker.makeMachine(32);
	maker.fillCoffeeBeans(10);
	console.log(maker)
	// 42
	/**
	 * 내부적으로 private 설정을 해놓은 프로퍼티는 "메소드를 통해 접근 해야만 한다.
	 */
	
}
