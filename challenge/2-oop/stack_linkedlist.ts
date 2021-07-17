import { node } from "prop-types";

{
	interface Stack {
		readonly size: number;
		push(value: string): void;
		pop(): string;
		peek(): string;
	}

	// 노드 개념
	// 사용자가 데이터를 넣어서 한 단계 감싸는 무언가를 만들때 불변성을 유지하는 것이 좋음
	// 값이 한번 들어오면, 그 값이 절대 바뀌지 않도록 하는 것이 안정적
	type StackNode = {
		readonly value: string;
		readonly next? : StackNode;
	}

	// 스택 오브젝트
	class StackImpl implements Stack {
		private _size: number = 0;
		private head?: StackNode;

		constructor(private capacity: number) {}

		get size() {
			return this._size;
		}
		push(value: string) {
			if(this.size === this.capacity) {
				throw new Error("stack is Full");
			}
			const node: StackNode = { 
				value,	// = value : value
				next: this.head
			}
			this.head = node;
			this._size += 1;
		}
		pop(): string {	// null == undefined (JS, 값만 확인이면 같게 취급)
			if(this.head == null) {
				throw new Error("Stack is empty")
			}
			const node = this.head;
			this.head = node.next;
			this._size -= 1;
			return node.value;
		}
		peek(): string {
			if(this.head == null) {
				throw new Error("Stack is empty");
			}
			return this.head.value;
		}
	}

	const stack = new StackImpl(10);
	stack.push("wi 1");
	stack.push("young 2");
	stack.push("min 3");
	while(stack.size !== 0) {
		console.log(stack.pop());
	}

	// stack.pop();
}