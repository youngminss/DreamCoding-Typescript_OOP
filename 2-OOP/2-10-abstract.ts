import { throws } from "node:assert";

/**
 * abstract class
 * = 추상클래스
 * -> 상속받은 클래스마다 다르게 구현되는 부분이 있다면,부모클래스에서 abstract 메소드로 정의할 수 있다.
 * -> 추상메소드는 정의하고, 구현은 상속받은 클래스에서만 한다.
 * -> 그리고, 상속받은 클래스에서는 그 abstract 메소드를 반드시 구현해야한다. 
 * -> 추상클래스로 설정된 클래스는, 인스턴스 생성이 불가하다.
 * 
*/

{
	type CoffeeCup = {
		shots : number;
		hasMilk?: boolean;
		hasSuger? : boolean;
	}

	interface CoffeeMaker {
		makeCoffee(shots: number): CoffeeCup;
	}

	abstract class CoffeeMachine implements CoffeeMaker {
		private static BEANS_GRAM_PER_SHOT: number = 7;	
		private coffeeBeans: number = 0;	
		
		public constructor(coffeeBeans: number) {
			this.coffeeBeans = coffeeBeans;
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

		// 추상메소드( 외부에 공개되면 안되고, 상속받은 클래스에서만 사용할 것이기에 protected 접근지정자 )
		protected abstract extract(shots: number): CoffeeCup;
		
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
		
		// 이렇게 추상클래스를 상속받은 자식클래스에서 추상메소드는 오버라이딩해서 사용한다.
		// super 를 일일히 사용할 필요가 없다.
		protected extract(shots: number): CoffeeCup {
			this.steamMilk();
			return {
				shots : shots,
				hasMilk : false
			}
		}
	}

	class SweetCoffeeMaker extends CoffeeMachine {

		// 마찬가지
		protected extract(shots: number): CoffeeCup {
			return {
				shots : shots,
				hasSuger : true,
			}
		}
	}
	
	// 추상 클래스는 인스턴스 생성 불가이므로 제거
	const machines: CoffeeMaker[] = [
		// new CoffeeMachine(16),
		new CaffeLatteMachine(16,'123'),
		new SweetCoffeeMaker(16),
		// new CoffeeMachine(16),
		new CaffeLatteMachine(16,'123'),
		new SweetCoffeeMaker(16)
	]
	machines.forEach(machine => {
		console.log(`===============`);
		console.log(machine.makeCoffee(2));
	})
}
