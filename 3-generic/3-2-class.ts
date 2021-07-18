/**
 * 클래스에서 Generic
 */
// 아무 의미없는 오로지 클래스에서의 제네릭을 위한 예제
{
	interface Either<L, R> {
		left: () => L;
		right: () => R;
	}

	class EitherImpl<L, R> implements Either<L, R> {
		constructor(private leftValue: L,private rightValue: R) {};
		left(): L {
			return this.leftValue;
		}
		right(): R {
			return this.rightValue;
		}
	}

	// 여기서, either 의 타입을 EitherImpl 클래스가 아니라
	// Either 인테페이스인 것은, EitherImpl 클래스가 곧, Either 인테페이스에 규격에 맞게 구현된 것이기 때문이다.
	// 즉, Either == EitherImpl 이다.
	const either: Either<number, number> = new EitherImpl(123,123);
	const either2: Either<number, string> = new EitherImpl(123,"123")
	console.log(either.left(), either.right());
	console.log(either2.left(), either2.right());
}