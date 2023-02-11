import { db } from '$lib/prisma';
import type { Handle, HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');

	if (!session) {
		return await resolve(event);
	}

	const user = await db.user.findUnique({
		where: { authToken: session },
		select: { id: true, name: true }
	});

	if (user) {
		event.locals.user = {
			id: user.id,
			name: user.name
		};
	}
	return await resolve(event);
};

export const handleError: HandleServerError = ({ event }) => {
	return {
		message: event.url.pathname + 'で500エラーが発生！'
	};
};
