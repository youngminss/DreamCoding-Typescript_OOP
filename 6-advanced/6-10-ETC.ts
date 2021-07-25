/**
 * 이번 장에서 배운 utility Type 들만 알아도, 왠만한 Type 정의에 대해 충분하다.
 * + 물론, 이외에 utility Type 이 많다.
 * 
 * 이번 장에서 배운 utility Type 을 정리
 * - type Partial<T> = { [P in keyof T]?: T[P] };		// 기존에 내부 타입 중에, 일부 타입만 사용해도 되는 경우
 * - type Required<T> = { [P in keyof T]-?: T[P] };	// 기존에 내부 타입 중에, 이 타입은 반드시 있어야할 때
 * - type Readonly<T> = { readonly [P in keyof T]: T[P] };	// 기존에 내부 타입들이, 오로지 읽기전용으로만 사용해야 할 때
 * - type Pick<T, K extends keyof T> = { [P in K]: T[P] };	// 기존에 내부 타입 중에, 필요한 타입만 쏙쏙 뽑아 사용할 때
 * - type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;	// 기존에 내부 타입 중에, 필요없는 타입만 제거하고 사용하고 싶을 때
 * - type Record<K extends keyof any, T> = { [P in K]: T };	// 하나의 타입안에, 다른 타입 형식을 연결하고 싶을 때
 */


