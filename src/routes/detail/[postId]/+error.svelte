<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>エラーページ</h1>
<h3>{$page.error?.message}</h3>
