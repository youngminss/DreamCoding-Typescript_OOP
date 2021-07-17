import { throws } from "node:assert";

/**
 * 추상화하는 방법
 * - 접근지정자를 통해 추상화하는 법
 * 	 + private 설정으로, 외부에서 안보이도록
 * - 인터페이스를 통한 추상화하는 법
 * 	 + 인턴페이스를 제공하지 않는 언어도 있다.
 * 
 * 인터페이스
 * - 클래스에 대해, 나는 이런~이런 작업을 할 수 있다~라는 사전계약서 느낌
 * - 인터페이스라면
 * 	+ 앞에 I
 * 	+ 또는 클래스뒤에 ImpI
 *  + 또는 인터페이스에서 이름은 간단하고 명확하게
 *  + 그리고, 클래스에서는 조금 다른 이름을 사용
 *  + 인터페이스를 implements 한 클래스는, 인터페이스에 규격된 모든 사항을 반드시 구현해놔야한다.
 * 
 * 하나의 클래스에 대해, 여러개의 인터페이스 생성이 가능하고, 연결또한 가능하다.
 * 그리하여, 하나의 클래스에 대해, 인스턴스를 생성할 때, 인스턴스마다 할당받는 인터페이스로 규약을 걸어서
 * 해당 인스턴스의 사용가능한 메소드의 범위를 제약할 수 있다.
 */
{
	type CoffeeCup = {
		shots : number;
		hasMilk: boolean;
	}

	// 일반 커피메이커 인터페이스
	interface CoffeeMaker {
		makeCoffee(shots: number): CoffeeCup;
	}

	// 상업용 커피메이커 인터페이스
	interface CommercialCoffeeMaker {
		makeCoffee(shots: number): CoffeeCup;
		fillCoffeeBeans(beans: number): void;
		clean(): void;
	}

	class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
		private static BEANS_GRAM_PER_SHOT: number = 7;	
		private coffeeBeans: number = 0;	
		
		private constructor(coffeeBeans: number) {
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
	
	class AmateurUser {
		constructor(private machine: CoffeeMaker) {}
		makeCoffee() {
			const coffee = this.machine.makeCoffee(2);
			console.log(coffee);
		}
	}
	class Pro {
		constructor(private machine: CommercialCoffeeMaker) {}
		makeCoffee() {
			const coffee = this.machine.makeCoffee(2);
			console.log(coffee);
			this.machine.fillCoffeeBeans(45);
			this.machine.clean();
		}
	}

	const maker: CoffeeMachine = CoffeeMachine.makeMachine(32);
	const amateur = new AmateurUser(maker);
	const pro = new Pro(maker);
	console.log(`프로의 커피내리기 과정`)
	pro.makeCoffee();

	console.log(`아마추어의 커피내리기 과정`)
	amateur.makeCoffee();

}
