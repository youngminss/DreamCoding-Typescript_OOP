import { throws } from "node:assert";

/**
 * ★★★ Composition & Interface 를 적용했을 때 강력한 파워 ★★★
 * - 이전에 가져다쓰는 클래스들간에 가장 큰 문제점은 tight 한 coupling 이다.
 * - 하나의 클래스가 변경되면, 연관된 모든 클래스에 대해서도 업데이트가 되어야하는 참사가 발생한다.
 * - 고로, 유연하고, 더욱 확장가능한 방법이 Composition & Interface 를 활용한 방법이 있다.
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

	
	class CheapMilkSteamer {
		private steamMilk() : void {
			console.log(`Streaming some milk...`);
		}
		makeMilk(cup: CoffeeCup): CoffeeCup {
			this.steamMilk();
			return {
				...cup,
				hasMilk: true,
			}
		}
	}

	
	class CandySugerMixer {
		private getSuger() {
			console.log("Getting some suger from candy");
			return true;
		}
		addSuger(cup: CoffeeCup): CoffeeCup {
			const suger = this.getSuger();
			return {
				...cup,
				hasSuger: suger,
			}
		} 
	}

	class CaffeLatteMachine extends CoffeeMachine {
		
		constructor(beans: number, public readonly serialNumber: string, private milkFrother: CheapMilkSteamer) {
			super(beans);
		}
	
		makeCoffee(shots: number): CoffeeCup {
			const coffee = super.makeCoffee(shots);
			return this.milkFrother.makeMilk(coffee)	
		}
	}

	class SweetCoffeeMaker extends CoffeeMachine {
		constructor(beans: number, private suger: CandySugerMixer) {
			super(beans);
		}

		makeCoffee(shots: number): CoffeeCup {
			const coffee = super.makeCoffee(shots);
			return this.suger.addSuger(coffee);
		}
	}

	class SweetCaffeeLatteMachine extends CoffeeMachine {
		constructor(private beans: number,private milk: CheapMilkSteamer,private suger: CandySugerMixer) {
			super(beans);
		}
		makeCoffee(shots: number): CoffeeCup {
			const coffee = super.makeCoffee(shots);
			const sugerAddedCoffee = this.suger.addSuger(coffee);
			return this.milk.makeMilk(sugerAddedCoffee);
		}
	}

	const CheapMilkMaker = new CheapMilkSteamer();
	const candySuger = new CandySugerMixer();
	
	const sweetMachine = new SweetCoffeeMaker(12, candySuger);
	const latteMachine = new CaffeLatteMachine(12, "ss", CheapMilkMaker);
	const sweetLatteMachine = new SweetCaffeeLatteMachine(12, CheapMilkMaker, candySuger);
	// 이렇게까지만 사용할 경우, 이후 변경사항에 대한 코드 재사용성이 매우 떨어진다.

}
