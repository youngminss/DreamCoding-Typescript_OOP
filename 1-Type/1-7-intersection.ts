{
	/**
	 * Intersection Types : &
	 * => union Type 과 정반대
	 */
	
	type Student = {
		name: string;
		age: number;
	};
	type Worker = {
		empolyeeId: number;
		work: () => void;
	};

	function internWork(person: Student & Worker) {
		console.log(person.name, person.age, person.empolyeeId, person.work());
	}

	internWork({
		name: "young",
		age: 123,
		empolyeeId: 1,
		work: () => {}
	});
}