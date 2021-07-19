import { serialize } from "node:v8";

{
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
	/**
	 * // Error: No Network
	 * 콜스택 보면
	 * NetworkClient.tryConnect
	 * UserService.login
	 * App.run
	 * ...
	 */
	/**
	 * 과연, "어디에서 try ~ catch 를 하는 것이 좋을까 ?"
	 * = 에러를 발생시키는 명령을 호출하는 곳에서 잡는게 가장 좋지 않을까 ?
	 * + 더 나아가서, 에러를 잡아낸다고 한들, 의미있게 에러를 잡아낸것을 사용할 수 있는 것이 없다면
	 * + 차라리 catch 를 하지 않는 것이, 더 나은 것이다.
	 * + == 가장 우아하게 처리할 수 있는 곳에서 try ~ catch 를 사용하란다.
	 */
}
