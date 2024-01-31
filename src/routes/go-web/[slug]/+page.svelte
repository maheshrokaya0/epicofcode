<script lang="ts">
	export let data
	import * as config from '$lib/site/config'
	import { onMount } from 'svelte';
	import { error } from '@sveltejs/kit'
	import type { Post } from '$lib/types/types.js'
	import ChevronsRight from '$lib/icons/ChevronsRight.svelte'
	import ChevronsLeft from '$lib/icons/ChevronsLeft.svelte'

	async function fetchMenus() {
		try {
			const response = await fetch('/api/go-web');
			const posts: Post[] = await response.json();
			return posts;
		} catch (e) {
			throw error(404, `Could not find items`);
		}
  	}
	
  	let posts: Post[] = [];

	onMount(async () => {
	posts = await fetchMenus();
	});

	let showSidebar = false;

	function toggleSidebar() {
		showSidebar = !showSidebar
	}

	onMount(() => {
		if (window.innerWidth >= 1440) {
		showSidebar = true;
		}
  	});

</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
	<meta content={config.siteUrl} property="og:url" />
	<meta property="og:description" content={data.meta.description} />
	<meta content={config.siteName} property="og:site_name" />

	<meta content={data.meta.title} name="twitter:title" />
	<meta content={data.meta.description} name="twitter:description" />
</svelte:head>

<aside class="max-w-72 fixed top-1/2 right-3 -translate-y-2/4">
	<section>
		{#if !showSidebar }
		<button on:click={ toggleSidebar } class="p-3 border rounded bg-white"><ChevronsLeft /></button>
		{/if}

		{#if showSidebar }
		<div class="bg-white p-5 border rounded">
			<button on:click={ toggleSidebar }><ChevronsRight /></button>
			<ul class="max-h-96 overflow-y-auto">
				{#each posts as post}
				<li class="mt-3">
					<a href="/go-web/{post.slug}" class="block w-full hover:text-cyan-500 font-semibold rounded">{post.title}</a>
				</li>
				{/each}
			</ul>
		</div>
		{/if}
	</section>
</aside>

<div class="max-w-3xl w-full mx-auto pt-10">
	<article class="px-5">
		<h1 class="text-5xl font-normal capitalize">{data.meta.title}</h1>
		<div class="prose">
			<svelte:component this={data.content} />
		</div>
	</article>
</div>