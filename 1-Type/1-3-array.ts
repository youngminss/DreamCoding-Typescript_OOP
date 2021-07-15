{
	// Array 
	// 선언 방법은 2가지이다.
	// 첫번째 방식을 선호한다.
	// 다만, 첫번째 방식만 아직까지는 readonly 를 지원하고
	// readonly 는 많이 쓰이기 때문에, 현재까지는 첫번째 방식을 선호한다.
	const fruits: string[] = ["apple", "banana"];
	const score: Array<string> = ["one", "two"];
	
	function printArray(fruits: readonly string[]) {}
	/**
	 * readonly 옵션 = 해당 데이터는 읽기만 할 수 있다.
	 */

	// Tuple
	// 동적으로, 여러 타입의 데이터를 묶어서 사용해야할 경우는 tuple 을 사용한다.
	// 하지만, 그 외적으로는 인덱스 방식의 접근이고, 가독성이 매우 떨어진다.
	// 그래서, 튜플을 사용할 수 있는 곳은, 차라리
	// interface, type alias, class 를 사용하는 것이 가독성이 훨씬 높다.
	let student: [string, number] = ["name", 123];
	student[0]	// name
	student[1]	// 123

	// Array Destructing => React 에서 useState() 방식이 튜플을 이 방식으로 사용한 것
	const [name, age] = student;

	

}