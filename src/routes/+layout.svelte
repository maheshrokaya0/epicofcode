<script lang="ts">
	import Footer from '$lib/components/Footer.svelte'
	import Header from '$lib/components/Header.svelte'
    import PageTransition from '$lib/components/Transition.svelte'

	

	import '$lib/styles/global.css'

    export let data;
</script>

<div class="layout">
  <!-- Header -->
	<Header />

	<main>
        <PageTransition url={data.url}>
		<!-- Black hole for other content -->
		    <slot />
        </PageTransition>
	</main>

  <!-- Footer -->
	<Footer />
</div>
