import { throws } from "node:assert";

/**
 * Composition (구성?)
 * = 상속의 문제점을 해결하기 위해서다.
 * 
 * 상속의 문제점은 ?
 * - 상속은 수직적인 관계이다.
 * - 일단, A 라는 부모클래스에 의해, 생성되는 자식클래스들이 많아지면 많아질수록 !
 * - 또, 그 자식클래스로부터 상속받아 생성되는 하위자식클래스들이 많아진다면 ?
 * - 해당 자식클래스의 부모클래스에서 변경이 일어나면, 상속받는 자식클래스들에게도 영향이 간다.
 * - 그리고, 2개 이상의 부모클래스를 상속받는 것은 불가능하다.
 * 
 * ★ Dependency Injection
 * - 클래스에서 필요한 것을, 다른 클래스에서 가져와서 사용한다.
 * 
 * 각각의 클래스에서 필요한 공통된 작업을 매번 작성하는 것이 아니라
 * 외부에서 만들어진 클래스에서 가져와서 사용만 하면된다. (각각의 기능별로)
 * 이것이 "Composition"
 * -> 코드의 "재사용성"이 증가한다.
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

	// 싸구려 우유 거품기
	// -> 실제로 우유 거품을 내는데 복잡한 로직이있다고 가정하자.
	// -> 결론은 우유 거품이 들어간 커피컵을 준다.
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

	// 설탕 제조기
	// -> 실제로 설탕을 만드는 과정이 복잡한 로직이 있다고 가정하자.
	// -> 결론은 설탕을 넣은 커피컵을 준다.
	class AutomaticSugerMixer {
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
			return this.milkFrother.makeMilk(coffee)	// 외부에서 제공받는 milkFroter 에 coffee 를 넣으면, 우유가 첨가된 커피컵을 반환받는 형태
		}
	}

	class SweetCoffeeMaker extends CoffeeMachine {
		constructor(beans: number, private suger: AutomaticSugerMixer) {
			super(beans);
		}

		makeCoffee(shots: number): CoffeeCup {
			const coffee = super.makeCoffee(shots);
			return this.suger.addSuger(coffee);
		}
	}
	
	/**
	 * 현재, CoffeeMachine 라는 부모클래스에 의해 정의된 CaffeLatteMachine, SweetCoffeeMaker 가 있다.
	 * 근데, 내가 "달달한 카페라테 머신" 객체를 생성하고 싶다 ?
	 * -> 두 가지 이상의 클래스를 상속받을 수 없기에 에러 !
	 * 이럴 때 Composition 을 적용한다.
	 * 필요한 기능을 외부에서 분리해놓은 기능에서 가져다가 사용하는 방식
	 */
	class SweetCaffeeLatteMachine extends CoffeeMachine {
		constructor(private beans: number,private milk: CheapMilkSteamer,private suger: AutomaticSugerMixer) {
			super(beans);
		}
		makeCoffee(shots: number): CoffeeCup {
			const coffee = super.makeCoffee(shots);
			const sugerAddedCoffee = this.suger.addSuger(coffee);
			return this.milk.makeMilk(sugerAddedCoffee);
		}
	}

}
