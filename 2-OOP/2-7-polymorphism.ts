import { throws } from "node:assert";

/**
 * Polymorphism (다형성)
 * - 한 가지의 클래스나 or 인터페이스를 통해 다른 방식으로 구현한 클래스를 만들 수 있다.
 * - 동일한 함수를 어떤 클래스의 함수인지 구별하지않고, 공통된 API 를 호출할 수 있다는 장점
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
	 * CaffeLatteMachine -> CoffeeMachine 를 상속한 자식클래스이다.
	 * SweetCoffeeMaker -> CoffeeMachine 를 상속한 자식클래스이다.
	 * CoffeeMachine -> CoffeeMaker 를 인테페이스로 한 클래스이다.
	 * 고로
	 * CaffeLatteMachine -> CoffeeMaker 이다.
	 * SweetCoffeeMaker -> CoffeeMaker 이다.
	 * 결고적으로
	 * 아래의 machines 라는 배열안에, 여러개의 클래스가 있는데
	 * 공통적인 인테페이스나 클래스의 타입으로 통일할 수 있다.
	 * => 약속된 동일한 함수 API를 사용할 수 있다.
	 */
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
