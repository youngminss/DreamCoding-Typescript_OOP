import { throws } from "node:assert";

/**
 * Composition (구성?)
 * = 상속의 문제점을 해결하기 위해서다.
 * 
 * 상속의 문제점은 ?
 * - 일단, A 라는 부모클래스에 의해, 생성되는 자식클래스들이 많아지면 많아질수록 !
 * - 또, 그 자식클래스로부터 상속받아 생성되는 하위자식클래스들이 많아진다면 ?
 * - 해당 자식클래스의 부모클래스에서 변경이 일어나면, 상속받는 자식클래스들에게도 영향이 간다.
 * - 그리고, 2개 이상의 부모클래스를 상속받는 것은 불가능하다.
 * 
 * 
 */

{
	type CoffeeCup = {
		shots : number;
		hasMilk: boolean;
		hasSuger? : boolean;
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
			this.grindBeans(shots);	
			this.preheat();	
			return this.extract(shots);	
	
		}
	}
	
	class CaffeLatteMachine extends CoffeeMachine {
		
		constructor(beans: number, readonly serialNumber: string) {
			super(beans);
		}

		private steamMilk() {
			console.log(`Streaming some milk...`);
		}
	
		makeCoffee(shots: number): CoffeeCup {
			const coffee = super.makeCoffee(shots);
			this.steamMilk();
			return {
				...coffee,
				hasMilk : true
			}
		}
	}

	class SweetCoffeeMaker extends CoffeeMachine {
		makeCoffee(shots: number): CoffeeCup {
			const coffee = super.makeCoffee(shots);
			return {
				...coffee,
				hasSuger : true
			}
		}
	}
	
	/**
	 * 현재, CoffeeMachine 라는 부모클래스에 의해 정의된 CaffeLatteMachine, SweetCoffeeMaker 가 있다.
	 * 근데, 내가 "달달한 카페라테 머신" 객체를 생성하고 싶다 ?
	 * -> 두 가지 이상의 클래스를 상속받을 수 없기에 에러 !
	 */
	class SweetCaffeeLatteMachine extends CaffeLatteMachine, SweetCoffeeMaker {

	}

	const machines: CoffeeMaker[] = [
		new CoffeeMachine(16),
		new CaffeLatteMachine(16,'123'),
		new SweetCoffeeMaker(16),
		new CoffeeMachine(16),
		new CaffeLatteMachine(16,'123'),
		new SweetCoffeeMaker(16)
	]
	machines.forEach(machine => {
		console.log(`===============`);
		console.log(machine.makeCoffee(2));
	})
}
