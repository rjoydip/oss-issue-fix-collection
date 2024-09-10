<script>
	import '$front/css/app.css';
</script>

<div class="flex">
	<div class="flex h-svh w-full flex-col overflow-y-hidden">
		<main class="m-2 h-full overflow-auto">
			<div class="flex h-full flex-col px-4">
				<slot></slot>
			</div>
		</main>
	</div>
</div>
