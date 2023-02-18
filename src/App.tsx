import { FormEvent, useEffect, useState } from "react";
import "./App.css";

function App() {
	const [items, setItems] = useState<number>(0);
	const [lines, setLines] = useState([[10, 5, 2], [1], [2], [3], [4]]);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		// Checking if you are adding 0 items to the card and stopping that
		if (items === undefined || items <= 0) return;

		// TODO: loop through all the lines

		//Find the line with the least items
		// push the items to the line

		let leastItemsAmount = 1e9;
		let lineWithLeast: number[];

		for (let line of lines) {
			const totalInLine = line.reduce((sum, value) => sum + value, 0);

			if (totalInLine < leastItemsAmount) {
				leastItemsAmount = totalInLine;
				lineWithLeast = line;
			}
		}

		setLines((prevLines) =>
			prevLines.map((line) =>
				line === lineWithLeast ? [...line, items] : line
			)
		);

		console.log(lines);
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setLines((prevLines) =>
				//Todo: reduce the first item by 1 in each line
				prevLines.map((line) =>
					[line[0] - 1, ...line.slice(1)].filter((value) => value > 0)
				)
			);
		}, 2000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<main className='App'>
			<form onSubmit={handleSubmit}>
				<input
					type='number'
					value={items}
					onChange={(e) => setItems(e.currentTarget.valueAsNumber)}
					required
				/>
				<button>Checkout</button>
			</form>

			<div className='lines'>
				{lines.map((line, idx) => (
					<div key={idx} className='line'>
						{line.map((items, i) => (
							<div key={i}>{items}</div>
						))}
					</div>
				))}
			</div>
		</main>
	);
}

export default App;

