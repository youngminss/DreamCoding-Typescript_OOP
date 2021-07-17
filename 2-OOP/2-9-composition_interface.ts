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

	// 오로지, 하나의 공통된 "커.피.머.신" 객체만 필요할 뿐
	class CoffeeMachine implements CoffeeMaker {
		private static BEANS_GRAM_PER_SHOT: number = 7;	
		private coffeeBeans: number = 0;	
		
		public constructor(coffeeBeans: number, private milk: MilkProvider, private suger: SugerProvider) {
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
			const coffee = this.extract(shots);	// 커피머신은 공통적으로 샷을 통해 커피를 내리고
			const sugerAddedCoffee = this.suger.addSuger(coffee);	// 설탕을 첨가 or 노첨가
			return this.milk.makeMilk(sugerAddedCoffee);	// 우유를 첨가 or 노첨가한 커피를 반환해주면 된다.
		}
	}

	// 부품에 대한 인터페이스
	interface MilkProvider {
		makeMilk(cup: CoffeeCup): CoffeeCup;
	}
	interface SugerProvider {
		addSuger(cup: CoffeeCup): CoffeeCup;
	}
	
	// 각각의 부품들을 정의한 클래스(인터페이스를 통한)
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

	class NoMilk implements MilkProvider {
			makeMilk(cup: CoffeeCup): CoffeeCup {
				return cup;
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

	class NoSuger implements SugerProvider {
			addSuger(cup: CoffeeCup): CoffeeCup {
				return cup;
			}
	}

	
	// 재료(부품)
	// 우유
	const cheapMilkMaker = new CheapMilkSteamer();	// 싸구려 우유스팀생성기
	const fancyMilkMaker = new FancyMilkSteamer();	// 팬시한 우유스팀생성기
	const coldMilkMaker = new ColdMilkSteamer();		// 고급 우유스팀생성기
	const noMilk = new NoMilk();
	
	// 설탕
	const candySuger = new CandySugerMixer();		// 캔디 쪼개서 만든 설탕
	const suger = new SugerMixer();							// 리얼 고급 설탕
	const noSuger = new NoSuger();

	// 머신들
	// 동일한 커피를 만드는 기계에, "재료만 갈아끼워서 사용가능해졌다."
	const sweetCandyMachine = new CoffeeMachine(12,noMilk, candySuger);
	const sweetMachine = new CoffeeMachine(12,noMilk, suger);

	const latteMachine = new CoffeeMachine(12, cheapMilkMaker, noSuger);
	const coldLatteMachine = new CoffeeMachine(12, coldMilkMaker, noSuger);
	const sweetLatteMachine = new CoffeeMachine(12, cheapMilkMaker, candySuger);
	
	/**
	 * 이것이 진정한, 객체지향 프로그래밍 아니겠는가 ?
	 * -> "부품"을 통해서, 하나의 "개체"를 생성해서 사용하는 것 !
	 * 너무 수직적인 상속에 관계에서 벗어나, Decoupling 하는 방법
	 */
}
