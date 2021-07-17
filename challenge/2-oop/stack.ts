{
	interface Stack {
		readonly size: number;
		readonly top: number;
		push(value: string): void;
		pop(): string;
		peek(): string;
	}

	class MyStack implements Stack {
		public size: number;
		public top: number;
		private stack: string[];
		constructor() {
			this.size = 0;
			this.top = -1;
			this.stack = [];
		}
		push(value: string) {
			this.top += 1;
			this.size += 1;
			this.stack.push(value);
		}
		pop(): string {
			if(this.top < 0) { 
				throw new Error("현재 스택이 비어있습니다. :)");
			}
			const popData = this.stack[this.top];
			this.top -= 1;
			this.size -= 1;
			return popData;
		}
		peek(): string {
			if(this.top < 0) { 
				throw new Error("현재 스택이 비어있습니다. :)");
			}
			return this.stack[this.top];
		}
	}

	const stack = new MyStack();
	stack.push("wi");
	stack.push('young');
	stack.push("min");
	console.log(`Pop Data : ${stack.pop()}`);
	console.log(`Peek Data : ${stack.peek()}`);
	console.log(`Current Stack size : ${stack.size}`);
}