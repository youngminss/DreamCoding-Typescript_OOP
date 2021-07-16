import { throws } from "node:assert";

{

	type CoffeeCup = {
		shots : number;
		hasMilk: boolean;
	}

	class CoffeeMaker {
		// BEANS_GRAM_PER_SHOT = 클래스에서 공통적으로 사용하는 프로퍼티
		// 이런 아이들은 static 으로 사용하는 것이 좋다.
		// 그렇지 않을 경우, 객체를 생성할 때마다 메모리를 차지하기 때문에, 공유하는 static 처리를 한다.

		static BEANS_GRAM_PER_SHOT: number = 7;	// ★ class Level !
		coffeeBeans: number = 0;	// ★ instance(= object) Level !
		
		constructor(coffeeBeans: number) {
			this.coffeeBeans = coffeeBeans;
		}

		static makeMachine(coffeeBeans: number): CoffeeMaker {
			return new CoffeeMaker(coffeeBeans);
		}

		makeCoffee(shots: number): CoffeeCup {
			// static 프로퍼티에 접근할 때는, 해당 클래스명을 통해 접근한다.
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
	
	const maker1 = new CoffeeMaker(30);
	console.log(maker1)
	// CoffeeMaker { BEANS_GRAM_PER_SHOT: 7, coffeeBeans: 30 }
	// CoffeeMaker { coffeeBeans: 30 } << static 프로퍼티는 출력에 보이지 않는다.

	const maker2 = new CoffeeMaker(20);
	console.log(maker2);
	// CoffeeMaker { BEANS_GRAM_PER_SHOT: 7, coffeeBeans: 20 }
	// CoffeeMaker { coffeeBeans: 20 }  << static 프로퍼티는 출력에 보이지 않는다.

	// 외부에서도 인스턴스 생성없이, 새로운 CoffeeMaker 를 생성가능
	// CoffeeMaker 내부에서 makeMachine 이라는 메소드가 새로운 CoffeeMaker 인스턴스를 반환한다.
	const maker3 = CoffeeMaker.makeMachine(50);
	console.log(maker3);
	
}
