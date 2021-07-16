{
	// getter, setter
	// 일반 멤버 변수처럼 사용가능하지만, 어떤 추가 연산이 필요할 때 유용하게 사용가능
	// 내부적으로는 메소드처럼 선언하지만
	// 외부에서는 일반 멤버 변수처럼 사용하고, 값을 할당하거나 사용할 때도
	// object.getter이름
	// object.setter이름 = 할당할 값
	// 형식대로 사용한다.
	
	class User {
		// 일반 field 선언방식
		// firstName: string;
		// lastName: string;
		// fullName: string;
		get fullName(): string {
			return `${this.firstName} ${this.lastName}`;
		}
		set first(firstName: string) {
			this.firstName = firstName;
		}
		set last(lastName: string) {
			this.lastName = lastName;
		}

		private internalAge = 100;
		get age(): number {
			return this.internalAge;
		}
		set age(num: number) {
			this.internalAge = num;
		}

		constructor(private firstName: string, private lastName: string) {
			// 상단에 선언도 없이, 생성자 파라미터에 모두 작성하면, 동일한 효과를 제공
			// this.firstName = firstName;
			// this.lastName = lastName;
			// this.fullName = `${firstName} ${lastName}`;
		}
	}

	// const user1 = new User('young', 'min');
	// console.log(user1.fullName);	// young min
	// user1.firstName = "one";
	// console.log(user1.fullName);	// young min << ??
	/**
	 * firstName 이 위에 변경되었음에도, fullName 에는 반영이 안된다.
	 * 이러한 상황을 위해, TS 에서는 get 와 set 프로퍼티를 제공한다.
	 */

	const user1 = new User("young", "min");
	console.log(user1.fullName);
	user1.first = "one";
	user1.last = "man";
	console.log(user1.fullName);

	console.log(user1.age);
	user1.age = 10;
	console.log(user1.age);
}