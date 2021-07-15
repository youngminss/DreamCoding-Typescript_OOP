{
	/**
	 * ===== Enum =====
	 * 모바일 클라이언트같은 경우만, 네이티브 언어를 union 타입을 지원하지 않기때문에
	 * Enum 을 사용하고, 그렇지 않은 경우의 개발은 Enum 을 union 으로 모두 대체 가능하고 선호한다.
	 * 
	 */

	// Javascript
	// JS 상수는 대문자로 구분
	const MAX_NUM = 6;
	const MAX_STUDENTS_PER_CLASS = 10;
	const MONDAY = 0;
	const TUESDAY = 1;
	const WENDESDAY = 2;

	// JS 에서는 ENUM 지원이 없기때문에, 그것 비스무리하게 생성해서 사용
	// Object.freeze() 활용
	const DAYS_ENUM = Object.freeze({"MONDAY" : 0, "TUESDAY" : 1, "WENSDAY" : 2});
	const dayOfToday = DAYS_ENUM.MONDAY;


	// Typescript 에서는 ENUM 을 지원한다.
	// 아무 값도 없이, 키값만 있다면, 0 부터 시작
	// 특정 수 부터 지정가능
	// 숫자가 아닌경우는, 일일히 정의해줘야한다.
	enum Days {
		Monday ,
		Tuesday,
		Wensday = 5,
		Thursday,
		Friday,
		Satarday,
		Sunday,
	}
	console.log(Days.Monday, Days.Tuesday, Days.Wensday, Days.Thursday, Days.Friday, Days.Satarday, Days.Sunday);

	// 결론만 말하면, TS에서 Enum은 왠만하면 사용하지 않는다.
	// 타입이 정확히 유지되지 않기 때문이다.
	let day: Days = Days.Satarday;
	day = Days.Tuesday
	day = 10; // << 이게 문제다. Enum 타입으로 할당한 것에는 어떠한 값을 할당해도 에러가 발생하지 않는다.
	console.log(day)

	// 차라리 union 타입을 사용하는게 더 올바른 방법이다.
	type DaysOfWeek = "Monday" | "Tuesday" | "Wensday";
	let dayOfweek: DaysOfWeek = "Monday";
	dayOfweek = "Tuesday";
}