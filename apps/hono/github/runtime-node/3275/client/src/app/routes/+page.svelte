<script lang="ts">
	import { Button } from '$front/components/ui/button/index.js';

	import { hc } from 'hono/client';
	import { type ApiTestRoutes } from '../../../../server/api/index';

	const fetchPricing = async (selectedRegion: string, startUtcDate: string, endUtcDate: string) => {
		console.log('getPricing: ', selectedRegion, startUtcDate, endUtcDate);

		try {
			const dataClient = hc<ApiTestRoutes>('/');
			const api = dataClient.api;
			const res = await api.pricing.$post({
				json: {
					countryCode: selectedRegion,
					startDateUtc: startUtcDate,
					endDateUtc: endUtcDate
				}
			});

			if (!res.ok) {
				const errorText = 'Request failed: ' + res.statusText;
				console.error('Error:', errorText);
				return;
			}

			const result = await res.json();
			console.log('Request successful: ');
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}

		// const response = await fetch('http://localhost:3000/api/pricing', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		countryCode: selectedRegion,
		// 		startDateUtc: startUtcDate,
		// 		endDateUtc: endUtcDate
		// 	})
		// });

		// if (!response.ok) {
		// 	const errorText = await response.text();
		// 	console.error('Error:', errorText);
		// }

		// const data = await response.json();
		// console.log(data);
	};

	const buttonClicked = async () => {
		console.log('buttonClicked');

		await fetchPricing('US', '2024-07-29T21:00:00.000Z', '2024-07-30T20:59:59.999Z');
	};
</script>

<div class="flex h-full flex-col items-center justify-center gap-8">
	<Button type="submit" class="w-full" on:click={buttonClicked}>Fetch data</Button>
</div>
