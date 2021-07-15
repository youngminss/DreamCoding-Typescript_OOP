{
	/**
	 * Union Types : OR
	 * => 정해진 다양한 종류의 데이터 값이 있을 경우 유용하다.
	 * => 사전에 정의한 값들 중에서만 할당가능하다.
	 */
	type Direction = "left" | "right" | "up" | "down";
	function move(direction: Direction) {
		console.log(direction);
	}
	move("up");

	type TileSize = 8 | 16 | 32;
	const tile: TileSize = 16;

	// 가령, function: login -> success, fail
	// type SuccessState = {
	// 	response: {
	// 		body: string;
	// 	}
	// };
	// type FailState = {
	// 	reason: string;
	// };
	// type LoginState = SuccessState | FailState;
	// function login(id: string, password: string): LoginState {
	// 	return {
	// 		response: {
	// 			body : "login 성공",
	// 		}
	// 	}
	// }

	// Quiz. printLoginState(state)
	// type SuccessState = {
	// 	response : {
	// 		body : "로그인 성공"
	// 	}
	// };
	// type FailState =  {
	// 	reason : "잘못된 로그인 접근"
	// }
	// type LoginState = SuccessState | FailState;
	// function printLoginState(state: LoginState) {
	// 	if ("response" in state) {
	// 		console.log(`🎉 ${state.response.body}`);
	// 	} else {
	// 		console.log(`😂 ${state.reason}`);
	// 	}
	// }
}