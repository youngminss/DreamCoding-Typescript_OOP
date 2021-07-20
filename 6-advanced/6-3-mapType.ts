/**
 * mapType 에 대해 알아보자.
 */
{
	/**
	 * 이전에 JS 에서 for - in 문은, obj 에 대해, 모든 키값을 통해 for 문을 실행할 수 있었다.
	 * 예를 들어보자.
	 */
	const obj = {
		name: 'young',
		age: 100,
		gender: 'male',
		developer : true,
	}
	for(const k in obj) {
		console.log(`키: ${k}`);
	}
	// 키: name
	// 키: age
	// 키: gender
	// 키: developer

	// ========== MapType ============
	/**
	 * 우리가 하나의 타입을 선언했다 치자.
	 * 그리고, 이 타입에 대한 optional 버전의 타입도 있다 치자.
	 * 그리고, 값 변경이 안되게, readOnly 타입버전도 있다 치자.
	 * - 그런데, 만약, 타입내부에, 프로퍼티가 하나 추가해야 될 것이 생겼다 가정하자.
	 * - 그러면, 일일히, optional 과 readonly 타입버전으로 만든 곳에도, 수작업으로 변경해줘야 하나 ?
	 * 
	 * 답은, 아니다. => mapType 을 사용하면 된다.
	 * - 여기서 map 의 뉘양스는, 맞다. JS 에서의 map 함수와 비슷하다.
	 * - 새로운 결과들의 배열을 반환하듯이..
	 */

	// 문제의 상황 🔥
	// type Video = {
	// 	title: string;
	// 	author: string;
	// }
	// type VideoOptional = {
	// 	title?: string;
	// 	author: string;
	// }
	// type VideoReadOnly = {
	// 	readonly title: string;
	// 	readonly author: string;
	// }

	type Video = {
		title: string;
		author: string;
	}

	/**
	 * 해당 T Type 에 대해, 전체 optional 템플릿을 만들었다 생각해도 될 듯하다.
	 */
	type Optional<T> = {
		// 의미 : 어떤 타입인지는 모르는 T가 가지고있는 키들 중에, 각 하나의 키,프로퍼티 P는, 각 키에대한 T[P] 에 해당하는 타입이 설정이된다.
		// for ~ in 문과 비슷하다.
		[P in keyof T]? : T[P];	
	}

	/**
	 * readonly 템플릿도 만들어보자.
	 */
	type ReadOnly<T> = {
		readonly [P in keyof T]: T[P];
	}

	type VideoOptional = Optional<Video>;
	const videoOp: VideoOptional = {
		title : 'young',	// undefined 도 가능
		// author: 'dsad' // optional 이라 author 는 없어도 에러 X
	}

	type Animal = {
		name: string;
		age: number;
	};
	const animal: Optional<Animal> = {
		name: 'dog',	// undefined 도 가능
		// age 프로퍼티 없어도 에러 X
	}
	animal.name = "cat";	// 가능, optional 템플릿 타입이니깐

	const video: ReadOnly<Video> = {
		title: 'hi',
		author: 'young',
	}
	// video.title = "dsad"	// 불가능, readonly 템플릿 타입이니깐


	type Nullable<T> = { [P in keyof T]: T[P] | null };
	const obj2: Nullable<Video> = {
		title: 'hi',
		author: null
	}
}