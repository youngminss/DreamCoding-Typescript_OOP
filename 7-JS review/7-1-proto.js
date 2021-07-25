const x = {};
const y = {};
console.log(x);
console.log(y);
console.log(x.toString());
console.log(x.__proto__ === y.__proto__);
// {} __proto__: Object
// {}__proto__: Object
// [object Object]
// true

const array = [];
console.log(array);
// Array -> Object
console.clear();

// TS 에서 CoffeeMachine 이라는 클래스를 JS 에서 Prototype 을 통해 비슷하게 만들어보기
function CoffeeMachine(beans) {
  this.beans = beans;

  // // Instance member level
  // this.makeCoffee = (shots) => {
  //   console.log(`making ${shots}shots Coffee~`);
  // };
}

// Prototype Level
CoffeeMachine.prototype.makeCoffee = (shots) => {
  console.log(`making ${shots}shots Coffee~`);
};

const machine1 = new CoffeeMachine(123);
const machine2 = new CoffeeMachine(456);
console.log(machine1);
machine1.__proto__.makeCoffee(machine1.beans);
console.log(machine2);
machine2.__proto__.makeCoffee(machine2.beans);

function LatteMachine(milk) {
  this.milk = milk;
}
LatteMachine.prototype = Object.create(CoffeeMachine.prototype);
const latteMachine = new LatteMachine(123);
console.log(latteMachine);
latteMachine.makeCoffee(latteMachine.milk);
