<script lang="ts">
	import * as config from '$lib/site/config'

	export let data
</script>

<svelte:head>
	<title>{config.siteTitle} - Learn Web Development in Go</title>
</svelte:head>

<section>
	<div class="max-w-screen-xl mx-auto mt-10">
		<div class="max-w-3xl mx-auto px-5">
			<ul class="divide-y">
				{#each data.posts as post}
				<li class="">
					<a href="/go-web/{post.slug}" class="p-5 mb-5">
						<h2>{post.title}</h2>
						<p>{post.description}</p>
					</a>
				</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
