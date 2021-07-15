{
	/**
	 * Type Assertion
	 * = 타입 역설
	 */

	function jsStrFunc(): any {
		return "hello";
	};
	const result = jsStrFunc();
	console.log(result.length)
	// function jsStrFunc(): any
	// Type Assertion
	/**
	 * 나는 물론, jsStrFunc 함수의 반환값이 "string" 인것을 100% 확신하지만
	 * 함수의 정의상 반환 값이 현재 any 이다.
	 * 그럼에도, 결과값의 length 를 사용하는데는 이상이없다.
	 * */	

	// 다음 3가지 방식으로, 내가 100% "이 타입이다 !" 할 경우에 type assertion 을 사용할 수 있다.
	console.log((result as string).length);
	console.log((<string>result).length);
	console.log(result!.length);

	/**
	 * 결론
	 * - type assertion 또한, 내가 정말정말정말정말 어떤 값의 타입이 확실할 때만 사용을 한다.
	 * - 그 외에는 왠만하면 사용하지 않는 것이 좋다.
	 * - type assertion 을 사용하면, 왠만하면 프로그램은 죽지 않지만, 죽는 경우도 있긴 있다.
	 */
	const wrong: any = 5;
	console.log((wrong as Array<number>).push(1));
	// 프로그램 죽는다.....

	const button = document.querySelector(".class");
	console.log(button)
	// 이는 버튼이 있을 경우 => 버튼 Element
	// 존재하지 않을 경우 => undefined
	/**
	 * 그런데 우리는 이런 Element를 가져와서 무언가 하려는 작업이 많고
	 * 그 때, 보통 if 문을 사용해서, Element 가 비워 있지 않을 경우와, 비워있을 경우를 나눈다.
	 * 근데, 내가 분명 !! 이 단계는 무조건 값을 받아올 수 있어 ! 하면 
	 * const button = document.querySelector(".class")!; << 이런식으로 끝에 ! 연산자를 붙여 확실하게 표현한다.
	 */
}