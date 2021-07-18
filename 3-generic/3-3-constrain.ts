{	
	// "직원"이라는 규격
	interface Employee {
		pay() : void;
	}

	// "직원"에 규격에 맞게 생성한 "풀타임 직원" 클래스
	class FullTimeEmpolyee implements Employee {
		pay() {
			console.log(`full time!!`);
		}
		workFullTime() {};
	}
	
	// "직원"에 규격에 맞게 생성한 "파트타임 직원" 클래스
	class PartTimeEmpolyee implements Employee {
		pay() {
			console.log(`part time!!`);
		}
		workPartTime() {};
	}

	// 그냥 제네릭 <T> 만 사용한다면, 말 그대로 Employee 객체타입이 아닐 수 있기 때문에
	// 그 내부에서 사용하는 함수에 접근이 안되는 것이다.
	// 고로, 이럴 때, 제네릭에 조금은 제약조건을 건다.
	// 제네릭 부분에 extends 키워드를 사용한다.
	// 여기서는 풀타임직원이던, 파트타임직원이던, Employee 라는, 공톤된 인터페이스를 상속한다 라는 의미로 제약조건을 걸었다.
	// 결과적으로, 인스턴스생성시, 각각의 workFullTime, workPartTime 메소드를 사용할 수 있게 됐다.
	function pay<T extends Employee>(employee: T): T {
		employee.pay();
		return employee;
	}

	const young = new FullTimeEmpolyee();
	const min = new PartTimeEmpolyee();
	// young.pay
	// young.workFullTime
	// min.pay
	// min.workPartTime

	const youngAfterPay = pay(young);
	const minAfterPay = pay(min);
	// youngAfterPay.pay
	// minAfterPay.pay
	/**
	 * pay 를 한번 지불하고 나서의 youngAfterPay,minAfterPay 클래스는
	 * 본인들이 각각 가지고있던, workFullTime, workPartTime 메소드를 사용하지 못한다.
	 * 이유는, pay 라는 함수가 Employee 라는 공통된 타입을 가지고, 반환값도 추상적인 Employee 를 반환하기 때문이다.
	 * 이럴 때는, 조금은 제약사항이 있어, 좁은 범위에서의 타입을 제네릭에서 사용할 수 있도록 해야한다.
	 */

	// ===============================================================================================================

	/**
	 * 추가
	 */
	const obj = {
		name: 'young',
		age: 20
	};

	const obj2 = {
		animal: 'dog'
	}

	
	// 함수를 정의한거다. getValue 라는 함수를
	// 이는, obj 와, key 값을 받아서, 존재하면 해당 obj 에 key 에 해당하는 value 를 반환해주는 함수다.
	// 어떤 obj 와 key 값이 들어올지 모르니깐, generic 를 사용할 것이다.
	// 여기서 우리는, 매번 이 함수가 호출될 때, 어떤 obj 인지모르고, 내부에 파라미터로 넘겨져온 key 값 또한
	// 같이 넘어온 obj 에 존재하는 key 인지 모르니깐, 이것을 보장하도록 제약조건(constrain) 을 걸어준다.
	// 이 때, "extends keyof" 키워드를  사용한다.
	// K extends keyof T === T 라는 타입안에, K 라는 키가 존재한다.
	// 반환 값 또한, 그냥 제네릭 <V> 가 아니라, 앞에서 T 에 속한 K 인지를 확인하는 과정이 있으니
	// 반환 값은, T[K] 타입이어야 할 것이다. 
	function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
		if(!obj[key]) {
			throw new Error(`오브젝트에 해당하는 키가 존재하지 않습니다.`)
		}
		return obj[key];
	}

	console.log(getValue(obj, "name"));
	console.log(getValue(obj, "age"));
	console.log(getValue(obj2, 'animal'));	
	// console.log(getValue(obj2, "name"));		// 사전에 실행조차 안댐
}