{
	// ===== 더하기 함수 =====
	// Javascript
	// function jsAdd(num1, num2) {
	// 	return num1 + num2;
	// }

	// // Typescript
	// function tsAdd(num1: number, num2: number): number {
	// 	return num1 + num2;
	// }

	// ===== fetch 함수 =====
	// Javascript
	// function jsFetchNum(id) {
	// 	// code ...
	// 	// code ...
	// 	return new Promise((resolve, reject) => {
	// 		resolve(100);
	// 	})
	// }

	// Typescript
	// function tsFetchNum(id: string): Promise<number> {
	// 	// code ...
	// 	// code ...
	// 	return new Promise((resolve, reject) => {
	// 		resolve(100);
	// 	})
	// }

	// ===== 1. Optional Parameter (?) =====
	function printName(firstName: string, lastName?: string) {
		console.log(firstName);
		console.log(lastName);
	}
	printName("영민","위");
	printName("영민");
	// 영민
	// 위
	// 영민
	// undefined

	// ===== 2. Default Parameter (=) =====
	function printMessage(message: string = "default message") {
		console.log(message);
	}
	printMessage();
	// default message

	// ===== 3. Rest Parameter (spread operation) =====
	function addNumbers(...numbers: number[]): number {
		return numbers.reduce((a,b) => a + b);
	}
	console.log(addNumbers(1,2,3,4,5));
	console.log(addNumbers(1,2,3));
	// 15
	// 6

	
}