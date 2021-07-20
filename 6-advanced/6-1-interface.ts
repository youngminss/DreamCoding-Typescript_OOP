// 구현사항에 초점을 맞춰, Interface 와 Type 을 비교해보자.
{
	/**
	 * 비슷한 기능의(정의하는) 타입과 인터페이스가 있다치자.
	 */
	type PositionType = {
		x: number;
		y: number;
	}
	interface PositionInterface {
		x: number;
		y: number;
	}

	/**
	 * 이전에 선언한 인터페이스, 동일한 이름으로 재선언후, 확장가능
	 * Only Interface can be merged 
	 */
	interface PositionInterface {
		z: number;
	}

	/**
	 * 지금부터는 Type 과 Interface 의 공통사항 🔍
	 */
	// 앞서 선언한 타입과 인터페이스는 object 선언시 비슷한 기능으로 사용가능하다.
	// Object ★
	
	// Type 을 적용한
	const obj1: PositionType = {
		x: 1,
		y: 1,
	};

	// Interface 를 적용한
	const obj2: PositionInterface = {
		x: 1,
		y: 2,
		z: 3,
	};

	// 클래스 선언시에도 비슷하게 사용가능하다.
	// Class ★
	
	// Type 을 implements 한
	class Pos1 implements PositionType {
		x: number;
		y: number;
	}

	// Interface 를 implements 한
	class Pos2 implements PositionInterface {
		x: number;
		y: number;
		z: number;
	}

	/**
	 * 지금부터는 Type 과 Interface 의 차이점 🔍
	 */
	
	// [ Extends ]
	/**
	 * Interface 는 기존의 Interface 를 동일한 이름의 확장한 인터페이스 생성가능, extends 가능 ⭕
	 * Type 은 불가능 ❌
	 * 	+ 대신 & (intersaction 연산으로 비슷하게 사용가능)
	 */

	// 인터페이스 확장
	interface ZPositionInterface extends PositionInterface {
		z: number;
	}

	// 타입 확장
	type ZPositionType = PositionType & { z: number };

	/**
	 * 오로지, Typed 에서만 가능한 것들
	 */
	// Type aliases can use computed properties
	type Person = {
		name: string,
		age: number,
	}
	type Name = Person['name'];	// index Type(맛보기), string
	
	type NumberType = number;		// 새로운 NumberType 이라는 Type 정의
	type direction = 'left' | 'up'	// union 타입
}