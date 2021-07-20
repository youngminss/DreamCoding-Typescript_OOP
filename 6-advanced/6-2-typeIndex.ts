import { string } from "prop-types";

/**
 * Type Index 에 대해서 알아보자.
 */
{
	/**
	 * 먼저 흔히 아는 object 에서 키에 해당하는 값을 접근하는 방법은 2가지다.
	 */
	const obj = {
		name: 'young',
	}
	obj.name;		// young, 키에접근
	obj['name'];	// young, 키로 인덱싱 🔍

	/**
	 * Type Index 는 이와 유사하다.
	 * 정의한 타입중에 인덱싱하여 원하는 타입을 재사용할 수 있다.
	 */

	// 정의한 Animal 타입
	type Animal = {
		name: string;
		age: number;
		gender: 'male' | 'female';
	}
	
	type Name = Animal['name']	// string, Animal Type에 'name' 키값인 string 에 접근한 것
	const text: Name = '123';		// Name 타입 == string 이니깐, string 데이터만 들어갈 수 있다.

	type Gender = Animal['gender'];	//	"male" | "female"

	/**
	 * keyof 타입 = 타입의 모든 키에 대한 union string 을 반환한다.
	 */
	type Keys = keyof Animal;	// 'name' | 'age' | 'gender'
	
	type Person = {
		name: string;
		gender: Animal['gender'];
	}
	const person: Person = {
		name: 'young',
		gender: 'male',
	}
}
/**
 * 이렇게 까지만, Type Index 를 알아보니, 어떤 방식으로 사용하는지는 알겠는데
 * 이걸 "왜" "언제" 사용하는지는 아직 감이 잘 안온다.
 * 더욱 자세한건 뒤에서 알아보자.
 */