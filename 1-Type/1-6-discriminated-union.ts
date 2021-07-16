{
	// ===== discriminated union =====
	// 차별화 할 수 있는 union
	// 조금 더 직관된, 읽을 때도 가독성있는 코드를 작성할 수 있다.
	// union 타입을 사용할 때, 공통적인 프로퍼티를 가지고 있으므로써, 구분이 편리해지는 효과
	
	type SuccessState = {
		result: "success";
		response: {
			body: string;
		}
	};
	type FailState = {
		result: "fail";
		reason: string;
	};
	type LoginState = SuccessState | FailState;

	// function printLoginState(state: LoginState) {
	// 	if(state.result === "success") {
	// 		console.log(`🎉 ${state.response.body}`);
	// 	} else {
	// 		console.log(`🎉 ${state.reason}`);			
	// 	}
	// }
}
