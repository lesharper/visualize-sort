<script>
	import { onMount } from 'svelte';
	import { method, size, speed } from '../stores';
	
	let array = [];
	let bars = [];
	
	function generateArray() {
		array = Array.from({ length: $size }, () => Math.floor(Math.random() * 300));
		bars = array.map((value, index) => ({ value, index }));
	}
	
	async function bubbleSort() {
		for (let i = 0; i < array.length - 1; i++) {
			for (let j = 0; j < array.length - 1 - i; j++) {
				if (array[j] > array[j + 1]) {
					[array[j], array[j + 1]] = [array[j + 1], array[j]];
					bars[j].value = array[j];
					bars[j + 1].value = array[j + 1];
					await new Promise(resolve => setTimeout(resolve, $speed));
				}
			}
		}
	}
	
	async function selectionSort() {
		for (let i = 0; i < array.length - 1; i++) {
			let minIndex = i;
			for (let j = i + 1; j < array.length; j++) {
				if (array[j] < array[minIndex]) {
					minIndex = j;
				}
			}
			if (minIndex !== i) {
				[array[i], array[minIndex]] = [array[minIndex], array[i]];
				bars[i].value = array[i];
				bars[minIndex].value = array[minIndex];
				await new Promise(resolve => setTimeout(resolve, $speed));
			}
		}
	}
	
	async function insertionSort() {
		for (let i = 1; i < array.length; i++) {
			let key = array[i];
			let j = i - 1;
			while (j >= 0 && array[j] > key) {
				array[j + 1] = array[j];
				bars[j + 1].value = array[j + 1];
				j--;
				await new Promise(resolve => setTimeout(resolve, $speed));
			}
			array[j + 1] = key;
			bars[j + 1].value = key;
		}
	}
	
	async function mergeSort(arr, left, right) {
		if (left < right) {
			const mid = Math.floor((left + right) / 2);
			await mergeSort(arr, left, mid);
			await mergeSort(arr, mid + 1, right);
			await merge(arr, left, mid, right);
		}
	}
	
	async function merge(arr, left, mid, right) {
		const n1 = mid - left + 1;
		const n2 = right - mid;
		
		const L = arr.slice(left, left + n1);
		const R = arr.slice(mid + 1, mid + 1 + n2);
		
		let i = 0, j = 0, k = left;
		
		while (i < n1 && j < n2) {
			if (L[i] <= R[j]) {
				arr[k] = L[i];
				bars[k].value = L[i];
				i++;
			} else {
				arr[k] = R[j];
				bars[k].value = R[j];
				j++;
			}
			k++;
			await new Promise(resolve => setTimeout(resolve, $speed));
		}
		
		while (i < n1) {
			arr[k] = L[i];
			bars[k].value = L[i];
			i++;
			k++;
			await new Promise(resolve => setTimeout(resolve, $speed));
		}
		
		while (j < n2) {
			arr[k] = R[j];
			bars[k].value = R[j];
			j++;
			k++;
			await new Promise(resolve => setTimeout(resolve, $speed));
		}
	}
	
	async function quickSort(arr, low, high) {
		if (low < high) {
			const pi = await partition(arr, low, high);
			await quickSort(arr, low, pi - 1);
			await quickSort(arr, pi + 1, high);
		}
	}
	
	async function partition(arr, low, high) {
		const pivot = arr[high];
		let i = low - 1;
		
		for (let j = low; j < high; j++) {
			if (arr[j] < pivot) {
				i++;
				[arr[i], arr[j]] = [arr[j], arr[i]];
				bars[i].value = arr[i];
				bars[j].value = arr[j];
				await new Promise(resolve => setTimeout(resolve, $speed));
			}
		}
		
		[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
		bars[i + 1].value = arr[i + 1];
		bars[high].value = arr[high];
		await new Promise(resolve => setTimeout(resolve, $speed));
		
		return i + 1;
	}
	
	async function sort() {
		switch ($method) {
			case 'bubble':
				await bubbleSort();
				break;
			case 'selection':
				await selectionSort();
				break;
			case 'insertion':
				await insertionSort();
				break;
			case 'merge':
				await mergeSort(array, 0, array.length - 1);
				break;
			case 'quick':
				await quickSort(array, 0, array.length - 1);
				break;
		}
	}
	
	onMount(() => {
		generateArray();
	});
	
	$: $method, $size, $speed, generateArray();
</script>

<style>
	.sort-container {
		display: flex;
		align-items: flex-end;
		justify-content: center;
	
		width: 100%;
		box-sizing: border-box;
		
		border: 1px solid lightgray;
		padding: 100px 0 0;
	}
	
	.bar {
		width: 20px;
		transition: height 0.1s;

		background: rgb(226,28,52);
		background: linear-gradient(145deg, rgba(226,28,52,1) 0%, rgba(80,11,40,1) 100%);
	}
	.bar:hover {
		transform: scale(1.1);
	}
	
	button {
		min-width: 200px;
		outline: none;
		border: 1px solid lightgray;
		border-radius: 7px;
		padding: 15px 25px;
		
		text-transform: uppercase;
		
		
		background: black;
		color: lightgray;
		
		cursor: pointer;
	}
	button:hover {
		background: #3b3b3b;
		transform: scale(1.01);
	}
	button:active {
		background: #3b3b3b;
		transform: scale(0.9);
	}
	
	.by {
		margin: 20px;
	}
</style>

<button on:click={sort}>SORT</button>
<div class="sort-container">
	{#each bars as bar (bar.index)}
		<div class="bar" style={`height: ${bar.value}px;`}></div>
	{/each}
</div>
<a class="by" href="https://github.com/lesharper">by Lesharper</a>


