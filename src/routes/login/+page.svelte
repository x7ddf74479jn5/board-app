<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<h1>ログイン画面</h1>
{#if form?.message}
	<p class="error">{form.message}</p>
{/if}
<form method="POST" action="?/login">
	<label
		>名前:
		<input name="name" type="text" />
	</label>
	<label>
		パスワード：
		<input name="password" type="password" />
	</label>
	<button>ログイン</button>
</form>

<style>
	.error {
		color: red;
	}
</style>
