import { db } from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const threads = await db.post.findMany({
		orderBy: { id: 'desc' }
	});
	return { threads };
};
