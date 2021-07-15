import { type } from "node:os";

{
	/**
	 * Typescript 의 꽃
	 * Type Aliases
	 * = 새로운 타입을 내가 정의함
	 */
	type Text = string;
	const name: string = "young";
	const name2: Text = "min";
	
	type Num = number;
	const num: Num = 100;

	type Student = {
		name: string;
		age: number;
	}
	const student: Student = {
		name : "youngmin",
		age : 100
	};

	/**
	 * String Literal Types
	 * => 이걸 왜 쓸까 ?
	 */
	type Name = "name";
	let youngName: Name;
	youngName = 'name';
	type JSON = "json";
	const json: JSON = "json";


}