import type { RequestEvent } from '@sveltejs/kit';

export const load = ({ url }: RequestEvent) => {
	const { pathname } = url;

	return {
		pathname
	};
};