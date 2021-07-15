{
	/**
	 * Type Inference
	 * = 타입 자동추론
	 */
	
	// ===== 변수 타입추론 =====
	let text = "hello";
	// let text: string
	// 누가봐도 시맨틱적으로도, string 타입이다.

	// ===== 함수 타입추론 =====
	function print(message) {
		console.log(message);
	}
	// (parameter) message: any
	// 이렇게되면, message 는 현재 어떠한 타입도 가능한 any 타입으로 ts가 인지한다.
	print(1);
	print("1");
	// 다음과 같이 타입이 구분이 안된다.

	// ===== 함수 반환값 타입추론 =====
	function add(x: number, y:number) {
		return x + y
	}
	// function add(x: number, y: number): number
	// 마지막 반환값의 타입을 명시하지 않았음에도, ts가
	// 파라미터가 number + number 이니깐 ? => 결과도 number 겠네 ! 하고 추론한다.

	/**
	 * 결론
	 * - 결과적으로 타입추론 또한, 남용하지 않는 편이 좋다.
	 * - 뭐, 너무너무너무너무 뻔한, 간단한 변수의 경우에는 타입추론을 사용해도 문제없다.
	 * - 다만, 실제 프로젝트에서 함수는 예제처럼 간단한 경우는 많지 않다.
	 * - 고로, 협업을 위해서라도, 이러한 룰의 커뮤니케이션이 필요하고, 왠만하면 타입을 명시적으로 선언하는 습관이 좋다.
	 */
}