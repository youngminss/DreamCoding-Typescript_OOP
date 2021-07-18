{
	/**
	 * checkNotNull 이라는 함수 자체의 의도는 좋다.
	 * 예를 들면, 우리가 DOM 객체를 가져오는데, 받아오지 못해 null 일 경우가 많다.
	 * 그 경우를 체크한다고 가정해보자.
	 * 
	 * checkNotNullBad 는 좋지 못한 예다 => Bad ~
	 * - 왜냐면, 이 함수는 number 타입만 체크하고 반환해주기 때문이다.
	 * 
	 * 그럼, 타입에 종속되지, 일반적 << ?? 인 방법은 없는가 ?
	 * - 있다. => Generic
	 */
	function checkNotNullBad(arg: number | null): number {
		if(arg == null) {
			throw new Error("Not Vaild Number!");
		}
		return arg;
	}
	
	// any 의 경우는 => 타입에 종속되지는 않는데, 반대로, 타입을 "보장"하지 못한다.
	// 즉, 어떤 타입인지, 내부적으로 모르기 때문에, 결과적으로도 타입이 무엇인지 보장되지 못한다.
	function checkNotNullAny(arg: any | null): any {
		if(arg == null) {
			throw new Error("Not Vaild Number!");
		}
		return arg;
	}

	// Generic
	// 함수의 이름과 파라미터 사이에 < > 안에 일반적으로 사용할 이름을 적어낸다.
	// 보통, Type, Generic 이런 긴 단어가 아닌
	// T, G ... 처럼 앞자만 따서 대문자로 사용한다.
	// 이는, <T> 처럼, T는 어떤 타입인지, 명시해놓지는 않고, 들어오는 타입이 무엇인가에 따라 결정된다.
	function checkNotNull<T>(arg: T | null): T {
		if(arg == null) {
			throw new Error("Not Vaild Number!");
		}
		return arg;
	}

	const result = checkNotNull(123);
	const result1 = checkNotNull("ddd"); 
	const result2 = checkNotNull(true);
	console.log(result);
	console.log(result1);
	console.log(result2);
}