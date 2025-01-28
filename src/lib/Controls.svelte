<script lang="ts">
	import { method, size, speed } from '../stores';
	
	const methods = ['bubble', 'selection', 'insertion', 'merge', 'quick'];
	
	function handleMethodChange(event) {
		method.set(event.target.value);
	}
	
	function handleSizeChange(event) {
		size.set(parseInt(event.target.value, 10));
	}
	
	function handleSpeedChange(event) {
		speed.set(parseInt(event.target.value, 10));
	}
</script>

<style>
	.controls {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
		margin-bottom: 20px;
	}
	
	select, input {
		padding: 8px;
		border-radius: 4px;
		border: 1px solid #ccc;
		
		font-size: 16px;
		
		min-width: 200px;
	}
	
	
	label {
		display: flex;
		flex-direction: column;
		align-items: center;
		
		font-size: 16px;
	}
</style>

<div class="controls">
	<select bind:value={$method} on:change={handleMethodChange}>
		{#each methods as m}
			<option value={m}>{m}</option>
		{/each}
	</select>

		<label>
			<input type="range" min="10" max="1000" step="10" bind:value={$speed} on:change={handleSpeedChange} />
			
			<p class="text">Speed: {$speed} ms</p>
		</label>
		
		<label>
			<input type="range" min="20" max="1000" step="10" bind:value={$size} on:change={handleSizeChange} />
			
			<p class="text">Count items: {$size}</p>
		</label>
	
	

</div>
