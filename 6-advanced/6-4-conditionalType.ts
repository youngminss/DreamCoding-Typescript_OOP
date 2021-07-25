{
	type TypeName<T> = T extends string ? boolean : number;
	
	const val: TypeName<string> = true;
	const val2: TypeName<boolean> = 123;

	type CheckType<T> = T extends string
		? 'string'
		: T extends number
		? 'number'
		: T extends boolean
		? 'boolean'
		: T extends undefined
		? 'undefined'
		: T extends Function
		? 'function'
		: object;

	type T0 = CheckType<string>;	// 'string';
	type T1 = CheckType<() => void>	// 'function'
	type T2 = CheckType<true>	// 'boolean', true => boolean 타입 상속 받은 것이니깐 
	

}