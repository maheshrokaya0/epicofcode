<script lang="ts">
	import * as config from '$lib/site/config'
</script>

<!-- Footer -->
<footer>
	<div class="max-w-3xl mx-auto mt-10 py-10 border-t">
		<div class="px-5 text-center">
			<h3>{config.siteTitle}</h3>
			<div class="mt-2">
				<a href="/about" class="text-sm">About</a>
				<a href="/privacy" class="text-sm ml-3">Privacy</a>
				<a href="mailto:mahesh@gmail.com" class="text-sm ml-3">Contact</a>
			</div>
			<p class="text-sm mt-2">&copy {new Date().getFullYear()} {config.siteTitle}. All rights reserved.</p>
		</div>
	</div>
</footer>