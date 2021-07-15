// 가장 바깥 {} 중괄호는, 블록 처리를 위함

import { any } from "prop-types";

// 블록처리를 하면, 글로벌 스코프에 변수들이 설정되는 것을 막는다.
{
	/**
	 * Javascript
	 * Primitive : number, string, boolean, bigint, symbol, null, undefined = 총 7개의 Primitive Value
	 * Object : 그 외 모든것 = function, array, .....
	 */
	
	// 1.number
	const num: number = 1;
	const num1: number = 1.5;
	const num2: number = -1;

	// 2.string
	const str: string = "hello";

	// 3.boolean
	const bool: boolean = true;

	// 4.undefined
	// 5.null
	// undefined = 아직 값이 미정이다.
	// null = 값이 비어있다. (확고)
	// 이렇게 할 수는 있지만, 이렇게는 쓰지 않는다.
	let name: undefined = undefined;
	let name1: null = null;
	
	// 이런 식으로 | (or) 연산자를 이용해서, 많이 사용한다.
	let name2: string | undefined;
	let name3: number | null;

	// 6. unknown
	// 어떤 타입에 값도 할당된다.
	// 음~무슨 값이 들어올지 모르겠어 뉘양스
	// 우리가 JS 라이브러리를 사용하고 반환값을 모르는 경우에 사용할 수 있긴하나
	// 되도록 사용하지 X (명시적이지 못해서 => TS의 의도에 벗어남) 
	let notSure: unknown = 0;
	notSure = "ggg";
	notSure = true;

	// 7. any
	// unknown 타입과 같으나
	// 어떤 값도 들어와도 돼 ! 뉘양스
	// 마찬가지로, 명시적이지 못해, 왠만하면 사용하지 X
	let anything: any = 0;
	anything = "hello";
	anything = false;

	// 8. void
	// 아무 반환값이 없는 타입
	// 일반 변수에는 잘 사용하지 않고
	// 반환하는 값 없는 작업의 함수에 많이 쓰인다.
	function print(): void {
		console.log("hello TS");
	}
	// 이렇게 않쓴다.
	let unuseable: void = undefined;

	// 9. never
	// 절대, 반환 값이 없는 작업의 함수에서 사용
	function throwError(message: string): never {
		// 에러 발생 시, message -> server (log) 남기고
		// throw new Error(message) 를 클라이언트에도 남기는 작업이 필요
		while(true) {}
	}

	// 10. object
	// 어떤 타입의 object 이던 상관없이 다 가능
	// unknown 과 any 와 같이, 명료하지 못해, 잘 사용하지 X
	let obj: object;
	function acceptSomeObject(obj: object) {}
	acceptSomeObject({name: "youngmin"});
	acceptSomeObject({age : 12});
}