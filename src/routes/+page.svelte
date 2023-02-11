<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import Thread from '$components/Thread.svelte';
	export let data: PageData;
</script>

<main>
	<h1>スレッド一覧</h1>
	<button type="button" on:click={() => goto('/post')}>投稿する</button>
	{#each data.threads as thread}
		<Thread id={thread.id} content={thread.content} />
	{/each}
</main>
