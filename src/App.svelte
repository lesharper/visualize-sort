<script lang="ts">
import Controls from './lib/Controls.svelte'
import SortVisualizer from './lib/SortVisualizer.svelte'
</script>

<style>
	main {
		height: 100dvh;
		
		font-family: Inter, sans-serif;
		
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		margin: 0;
		padding: 20px;
		background-color: #f4f4f9;
	}
	
	h1 {
		text-align: center;
		margin-bottom: 20px;
	}
	
	.info {
		height: 40dvh;
	}
</style>

<main>
	<section class="info">
		<h1>Sort Methods</h1>
		<Controls />
	</section>

	<SortVisualizer />
</main>


