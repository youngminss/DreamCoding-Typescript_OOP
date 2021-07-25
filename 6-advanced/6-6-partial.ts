/**
 * utility - Partial<Type>
 * = 기존에 정의한 Type 에 대해, 부분 수정가능한 타입으로 변경해서 사용하고 싶을 때
 */
{
	type ToDo = {
		title: string;
		description: string;
		label: string;
		priority: 'high' | 'low';
	}

	function updateTodo(todo: ToDo, fieldsToUpdate: Partial<ToDo>): ToDo {
		return { ...todo, ...fieldsToUpdate };
	};

	const todo: ToDo = {
		title: '타입스크립트 배우기',
		description: '겸손하게 배우기',
		label: '화이팅',
		priority: 'low',
	};

	// priority 라는 프로퍼티만 부분적으로 넘겨서 업데이트..
	const update = updateTodo(todo, { priority: 'high' });
	console.log(update);
}