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

	// 
	function pay(employee: Employee): Employee {
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

	
}