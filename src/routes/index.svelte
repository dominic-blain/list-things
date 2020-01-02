<script>
	import axios from 'axios';
	import validUrl from 'valid-url';
	import CardItem from '../components/CardItem.svelte';

	let url;
	let items = [];

	function onUrlSubmit () {
		if (!!validUrl.isUri(url)) {
			axios
			.get('/fetch/?url=' + encodeURIComponent(url))
			.then(({status, data}) => {
				if (status == 200 && !!data) {
					items = [...items, data];
					console.log(items);
				}
			});
		}
	};

</script>

<style>
	
	main,
	section {
		padding: 10px;
	}

	.grid {
		display: flex;
		flex-wrap: wrap;
		margin-top: -30px;
		margin-left: -30px;
	}

	.grid > .grid-item {
		padding-top: 30px;
		padding-left: 30px;
		box-sizing: border-box;
		width: 50%;
		
	}

	@media (min-width: 1100px) {
		.grid > .grid-item {
			width: 25%;
		}
	}

	
</style>

<svelte:head>
	<title>List things</title>
</svelte:head>

<h1>List things</h1>
<section>
	<form>
		<label for="url">Url to add</label>
		<input type="text" name="url" bind:value={url} placeholder="Paste url" />
		<button type="submit" on:click|preventDefault={onUrlSubmit}>Add</button>
	</form>
</section>
<main class="grid">
	{#each items as item}
		<div class="grid-item">
			<CardItem {...item} />
		</div>
	{/each}
</main>

