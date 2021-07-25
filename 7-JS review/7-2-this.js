console.log(this);
// Window { ... }

function simpleFunc() {
  console.log(this);
}
simpleFunc();
// Window { ... }
console.clear();

class Counter {
  count = 0;
  /**
   * JS Class 에서 메소드
   */
  increase = function () {
    console.log(this);
  };
}
const counter = new Counter();
counter.increase();
// Counter { ... }

/**
 * caller 라는 변수에, counter 인스턴스에 increase 메소드 포인터를 할당
 * 결과는 => undefined
 * ✅ 왜 ?
 * - counter.increase 를 할당하려는 순간, increase 함수에 있던 this 정보가 사라지게 된다.
 *
 * 💡 해결책
 * - 1. 할당할 때, binding 을 한다.
 * - 2. 내부에서 정의할 때, arrow function 으로 사용한다.
 */

// const caller = counter.increase;	 // 💩 문제
const caller = counter.increase.bind(counter); // 💡 해결
caller();
// undefined

class Bob {}
const bob = new Bob();

bob.run = counter.increase;
bob.run();
// Bob { ... }
/**
 * counter.increase 를 bob 이라는 Bob 클래스 인스턴스에 run 이라는 이름으로 포인터를 할당했으면
 * 실행시켰을 경우, counter 인스턴스에 increase 에서의 this 니깐, Counter 클래스가 출력되기를 기대
 * 하지만, 실제 결과는, run(즉, counter.increase 포인터를 가진) 함수를 호출한 주체인 "Bob" 클래스가 출력된다.
 * 이 또한, 위에 undefined 출력 상황과 같이, this 의 정보가 사라졌기 때문이다.
 *
 * 💡 해결책
 * - 1. 할당할 때, binding 을 한다.
 * - 2. 내부에서 정의할 때, arrow function 으로 사용한다.
 */
