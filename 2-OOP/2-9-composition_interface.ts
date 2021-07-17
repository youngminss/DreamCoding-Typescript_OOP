import { throws } from "node:assert";

/**
 * ★★★ Composition & Interface 를 적용했을 때 강력한 파워 ★★★
 * - 이전에 가져다쓰는 클래스들간에 가장 큰 문제점은 tight 한 coupling 이다.
 * - 하나의 클래스가 변경되면, 연관된 모든 클래스에 대해서도 업데이트가 되어야하는 참사가 발생한다.
 * - 고로, 유연하고, 더욱 확장가능한 방법이 Composition & Interface 를 활용한 방법이 있다.
 * 
 * 클래스들간에 서로 상호작용, 상호대화하는 관계가 성립이 되어 있다면
 * - 계약서(인터페이스)에 의거해서 서로간의 상호작업해야한다.
 * => 이것이 Decoupling !
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

	interface MilkProvider {
		makeMilk(cup: CoffeeCup): CoffeeCup;
	}
	interface SugerProvider {
		addSuger(cup: CoffeeCup): CoffeeCup;
	}
	
	class CheapMilkSteamer implements MilkProvider {
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

	class FancyMilkSteamer implements MilkProvider {
		private steamMilk() : void {
			console.log(`Fancy Streaming some milk...`);
		}
		makeMilk(cup: CoffeeCup): CoffeeCup {
			this.steamMilk();
			return {
				...cup,
				hasMilk: true,
			}
		}
	}

	class ColdMilkSteamer implements MilkProvider {
		private steamMilk() : void {
			console.log(`Cold Streaming some milk...`);
		}
		makeMilk(cup: CoffeeCup): CoffeeCup {
			this.steamMilk();
			return {
				...cup,
				hasMilk: true,
			}
		}
	}

	class CandySugerMixer implements SugerProvider {
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

	class SugerMixer implements SugerProvider {
		private getSuger() {
			console.log("Getting some suger from jar");
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

	// 각각에 커피머신에 대해, 설탕이나 우유스팀이 필요한 곳에 생성자에
	// 캔디부셔서 만든 설탕이나, 싸구려 스팀이 아닌, 설탕과 우유스팀기의 인터페이스를 연결해서 사용
	class CaffeLatteMachine extends CoffeeMachine {
		
		constructor(beans: number, public readonly serialNumber: string, private milkFrother: MilkProvider) {
			super(beans);
		}
	
		makeCoffee(shots: number): CoffeeCup {
			const coffee = super.makeCoffee(shots);
			return this.milkFrother.makeMilk(coffee)	
		}
	}

	class SweetCoffeeMaker extends CoffeeMachine {
		constructor(beans: number, private suger: SugerProvider) {
			super(beans);
		}

		makeCoffee(shots: number): CoffeeCup {
			const coffee = super.makeCoffee(shots);
			return this.suger.addSuger(coffee);
		}
	}

	class SweetCaffeeLatteMachine extends CoffeeMachine {
		constructor(private beans: number,private milk: MilkProvider,private suger: CandySugerMixer) {
			super(beans);
		}
		makeCoffee(shots: number): CoffeeCup {
			const coffee = super.makeCoffee(shots);
			const sugerAddedCoffee = this.suger.addSuger(coffee);
			return this.milk.makeMilk(sugerAddedCoffee);
		}
	}

	// 재료(부품)
	// 우유
	const cheapMilkMaker = new CheapMilkSteamer();	// 싸구려 우유스팀생성기
	const fancyMilkMaker = new FancyMilkSteamer();	// 팬시한 우유스팀생성기
	const coldMilkMaker = new ColdMilkSteamer();		// 고급 우유스팀생성기
	
	// 설탕
	const candySuger = new CandySugerMixer();		// 캔디 쪼개서 만든 설탕
	const suger = new SugerMixer();							// 리얼 고급 설탕
	
	// 머신들
	// 동일한 커피를 만드는 기계에, "재료만 갈아끼워서 사용가능해졌다."
	const sweetCandyMachine = new SweetCoffeeMaker(12, candySuger);
	const sweetMachine = new SweetCoffeeMaker(12, suger);

	const latteMachine = new CaffeLatteMachine(12, "ss", cheapMilkMaker);
	const coldLatteMachine = new CaffeLatteMachine(12,"SS", coldMilkMaker);
	const sweetLatteMachine = new SweetCaffeeLatteMachine(12, cheapMilkMaker, candySuger);
	

}
