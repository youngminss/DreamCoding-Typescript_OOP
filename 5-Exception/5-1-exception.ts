// Java : Exception
// Javascript : Error

// 예시
// const array = new Array(1000000000000000000000);
// console.log(array);
// RangeError: Invalid array length
// ==================================================

/**
 * Error(Exception) Handling : try ~ catch ~ finally
 */

{	
	// 파일이름을 읽어들여, 해당 파일 내용을 반환해주는 함수가 있다치자.
	function readFile(fileName: string): string {
		if(fileName === "Not Exist") {
			throw new Error(`file not exist ! ${fileName}`);
		}
		return 'file contents';
	}
	
	// 파일을 읽었었으면, 끝날때는 항상 파일을 닫아줘야하니깐, 파일을 닫아주는 함수
	function closeFile(fileName: string) {
		console.log(`file closed`);
	}

	const fileName = 'file';
	console.log(readFile(fileName));
	closeFile(fileName);
	// file contents
	// file closed

	// const fileName2 = "Not Exist";
	// console.log(readFile(fileName2));
	// closeFile(fileName2);
	// Error: file not exist ! Not Exist
	// = Error(Exception) Handling 하지 않은 경우 -> 프로그램 죽음

	const fileName3 = "Not Exist";
	try {
		console.log(readFile(fileName3));
	} catch(err) {
		console.log("Error(Exception) Catched !!");
	} finally {
		closeFile(fileName3);
	}
	// Error(Exception) Catched !!
	// file closed
	/**
	 * 프로그램이 죽지는 않았다.
	 * try -> 뭔가 실행하는 문장이 에러(예외)를 발생할 여지가 있는 문장이면 try 내부에 넣고
	 * catch -> try 에서 아니나 다를까 에러(예외)가 발생하게 되면, 여기서 잡아, catch 문을 실행해서, 프로그램이 실행 도중 죽지는 않도록 한다.
	 * finally -> try 가 실행이 되던, catch 가 실행이 되던간에, "무.조.건" 끝내 실행이 되어야하는 명령어는 이곳에 배치한다.
	 * 		+ finally 에 위치한 문장은, 앞에서 try ~ catch 에서 종료나 분기가 있어도(예 return 문), finally 내부에 있는 명령은 반드시 실행한다. (비동기 처리의 이유같다.)
	 */
}



