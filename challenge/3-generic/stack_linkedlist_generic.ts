// 이전, OOP LinkedList Stack 을, 제네릭을 통해 확장성 높은 스택으로 만들기
{
	interface Stack<T> {
		readonly size: number;
		push(value: T): void;
		pop(): T;
		peek(): T;
	}

	type StackNode<T> = {
		readonly value: T;
		readonly next? : StackNode<T>;
	}

	class StackImpl<T> implements Stack<T> {
		private _size: number = 0;
		private head?: StackNode<T>;

		constructor(private capacity: number) {}

		get size() {
			return this._size;
		}
		push(value: T) {
			if(this.size === this.capacity) {
				throw new Error("stack is Full");
			}
			const node: StackNode<T> = { 
				value,	
				next: this.head
			}
			this.head = node;
			this._size += 1;
		}
		pop(): T {	// null == undefined (JS, 값만 확인이면 같게 취급)
			if(this.head == null) {
				throw new Error("Stack is empty")
			}
			const node = this.head;
			this.head = node.next;
			this._size -= 1;
			return node.value;
		}
		peek(): T {
			if(this.head == null) {
				throw new Error("Stack is empty");
			}
			return this.head.value;
		}
	}

	const stack: Stack<string> = new StackImpl<string>(10);
	// stack.push(10);	// 문자열 데이터가 아니라서 에러
	// stack.push(true);	// 문자열 데이터가 아니라서 에러
	stack.push("min 3");
	while(stack.size !== 0) {
		console.log(stack.pop());
	}

	const stack2: Stack<number> = new StackImpl<number>(10);
	stack2.push(10);	
	stack2.push(20);	
	// stack2.push("min 3");	// 숫자 데이터가 아니라서 에러
	while(stack2.size !== 0) {
		console.log(stack2.pop());
	}

	

	
}