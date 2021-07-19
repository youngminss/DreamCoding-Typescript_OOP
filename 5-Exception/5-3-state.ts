/**
 * try ~ catch 에서 발생시키는 에러를 "any" 타입이다.
 * error 를 instanceof 연산자 같은 것으로 판단하려고해도 사용이 불가하다.
 * + any 타입이라 타입에 대한 판별이 불가하기 때문이다.
 * 
 * 그래서, 상세한 error 에 대한 정보를 catch 를 통해 제공하고 싶다면
 * => "error state" 를 제공하는 것이 좋다.
 * 
 * 코드를 작성할 때, 성공할수도 실패할수도 있는 에러는 -> throw 를 남발하지 않고
 * => state 를 만드는 것이 좋다.
 * 
 * + 우리가 충분히 예상할 수 있는, 성공적인 or 실패적인 State를 type 으로 정의하는 것이 깔끔하고 안정적이고 예상가능한 프로그래밍을 가능케한다.
 */
{
	class TimeoutError extends Error {}
	class OfflineError extends Error {}

	// 네트워크 이유로 실패(Error(Exception)) 했을 경우
	type NetworkErrorState = {
		result: 'fail';
		reason: 'offline' | 'down' | 'timeout';
	}
	// 성공했을경우 
	type SuccessState = {
		result : "success";
	}

	// Error States
	type ResultState = SuccessState | NetworkErrorState;
	
	class NetworkClient {
		tryConnect(): void {
			throw new Error("No Network");
		}
	}

	class UserService {
		constructor(private client: NetworkClient) {};

		login() {
			this.client.tryConnect();
			// 로그인 ...
		}
	}

	class App {
		constructor(private userService: UserService) {};
		run() {
			try {
				this.userService.login();
			} catch(error) {
				// 에러 다이어로그를 사용자에게 제공하기
			}
		}
	}

	const client = new NetworkClient();
	const service = new UserService(client);
	const app = new App(service);
	console.log(app.run());	
}
