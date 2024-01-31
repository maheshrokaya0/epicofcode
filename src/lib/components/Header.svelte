<script lang="ts">
	import * as config from '$lib/site/config';
</script>

<header class=" border-b z-10 bg-[#f8f9fa] bg-opacity-80 backdrop-blur-md">
	<div class="max-w-screen-xl mx-auto h-16 px-5">
		<div class="flex justify-between h-full items-center">
			<a href="/" class="text-3xl font-bold text-cyan-500">{config.siteTitle}</a>
			<nav>
				<a href="/about" class="inline-block text-lg">About</a>
			</nav>
		</div>
	</div>
</header>