/**
 * utility - Readonly<Type> 
 * = 기존에 정의한 Type 에 대해, 읽기 전용에 타입으로 사용하고 싶을 때
 * 
 * display 라는 함수는 ToDo 타입의 데이터를 받아, 오로지 내부 프로퍼티를 출력만 해야한다.
 * 그런데, readonly 속성이 아니기 때문에, 주석처리한 부분이 있을 경우, 값이 변경된다.
 * 
 * 그래서 이전 mapType 에서 일일히 특정 Type 에 대해, Readonly 버전의 타입을 만들고 하지 않았는가 ?
 * - 그런데, 사실 이미, TS 개발자들이, 이러한 자주사용하는 utility Type 을 정의해 놓으셨다. 👍
 * - 사용법은, 타입을 사용하는 곳에, 필요한 utility<타입> 을 사용하면, 내부적으로 해당 utility 타입으로 변환해서 반환해준다.
 * 
 * ✅ 가변성에 수정이 가능한 오브젝트를 여러 곳에 전달하는 것은 좋지 못한다. => 💩
 * ✅ 불변성(Immutable) 을 지켜주는 것이 좋다. 💡
 */
{
	type ToDo = {
		title: string;
		description: string;
	}

	// 보여주기전용(즉, 읽기전용 함수)
	function display(todo: Readonly<ToDo>) {
		console.log(todo.title);

		// todo.title = "바꿧지롱 ~";
		// console.log(todo.title);
	} 

	const work: ToDo = {
		title: 'Typescript 어울리기',
		description: 'Elie 의 강의 잘 듣기',
	}
	display(work);
}