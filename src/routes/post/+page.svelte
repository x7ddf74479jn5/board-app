<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<h1>スレッド投稿</h1>
{#if form?.message}
	{form.message}
{/if}
<form method="POST" action="?/post">
	<label
		>内容：
		<input name="content" type="text" />
	</label>
	<button>投稿する</button>
</form>
