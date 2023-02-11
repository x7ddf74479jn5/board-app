<script lang="ts">
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export const threadDetail = data.threadDetail;
	export let form: ActionData;
</script>

<div>
	<a href="/"> ＜ 一覧に戻る</a>
</div>

<h1>スレッド詳細</h1>
<h2>{threadDetail.content}</h2>
<p>作成者：{threadDetail.user.name} 作成日時：{threadDetail.createdAt}</p>
<h2>コメント</h2>
{#if threadDetail.comments.length}
	{#each threadDetail.comments as comment}
		<p>名前：{comment.user.name}</p>
		<p>日時：{comment.createdAt}</p>
		<p>コメント：{comment.content}</p>
		<br />
	{/each}
{:else}
	<p>コメントはありません</p>
{/if}
<div>
	{#if form?.message}
		<p class="error">{form.message}</p>
	{/if}
</div>
<form method="POST" action="?/comment">
	<input name="comment" type="text" />
	<button>コメントする</button>
</form>

<style>
	.error {
		color: red;
	}
</style>
