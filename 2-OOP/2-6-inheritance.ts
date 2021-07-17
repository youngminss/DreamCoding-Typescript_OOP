import { throws } from "node:assert";

/**
 * Inheritance (상속)
 * - 부모클래스 <- 자식클래스
 * - super 키워드
 * - 오버라이딩
 */

{
	type CoffeeCup = {
		shots : number;
		hasMilk: boolean;
	}

	interface CoffeeMaker {
		makeCoffee(shots: number): CoffeeCup;
	}

	class CoffeeMachine implements CoffeeMaker {
		private static BEANS_GRAM_PER_SHOT: number = 7;	
		private coffeeBeans: number = 0;	
		
		public constructor(coffeeBeans: number) {
			this.coffeeBeans = coffeeBeans;
		}

		
		static makeMachine(coffeeBeans: number): CoffeeMachine {
			return new CoffeeMachine(coffeeBeans);
		}

		fillCoffeeBeans(coffeeBeans: number) {
			if(coffeeBeans < 0) {
				throw new Error("커피 콩은 0개 이상부터 채워넣을 수 있습니다 :)");
			}
			this.coffeeBeans += coffeeBeans;
		}
		clean() {
			console.log(`Cleaning the machine...`);
		}

		private grindBeans(shots: number) {
			console.log(`grinding beans for ${shots}`);
			if(this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
				throw new Error("Not enough coffee beans");
			}
			this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
		}

		private preheat(): void {
			console.log(`heating up...`);
		}

		private extract(shots: number): CoffeeCup {
			console.log(`Pulling ${shots} shots...`);
			return {
				shots : shots,
				hasMilk : false
			}
		}
		
		makeCoffee(shots: number): CoffeeCup {
			this.grindBeans(shots);	// 원두를 갈고
			this.preheat();	// 열 처리를 하고
			return this.extract(shots);	// 커피를 추출
	
		}
	}
	
	class CaffeLatteMachine extends CoffeeMachine {
		
		constructor(beans: number, readonly serialNumber: string) {
			super(beans);
		}

		private steamMilk() {
			console.log(`Streaming some milk...`);
		}
	
		/**
		 * 라떼 커피머신 -> 부모 클래스인 CoffeeMachine 클래스의 makeCoffee 메소드 "오버라이딩"
		 * super = 부모클래스에 멤버변수나 멤버함수에 접근
		 */
		makeCoffee(shots: number): CoffeeCup {
			const coffee = super.makeCoffee(shots);
			this.steamMilk();
			return {
				...coffee,
				hasMilk : true
			}
		}
	}

	const machine = new CoffeeMachine(32);
	const latteMachine = new CaffeLatteMachine(32, "SSSS");
	const latte = latteMachine.makeCoffee(2);
	console.log(latte)
	console.log(latteMachine.serialNumber)

}
