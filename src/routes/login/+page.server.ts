import { db } from '$lib/prisma';
import { UserModel } from '$lib/zod';
import { type Actions, fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';

const formDataSchema = UserModel.pick({ name: true, password: true });

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const maybeName = data.get('name');
		const maybePassword = data.get('password');

		const parsed = formDataSchema.safeParse({ name: maybeName, password: maybePassword });

		if (!parsed.success) {
			return fail(400, { message: '名前とパスワードを入力してください' });
		}

		const { name, password } = parsed.data;

		const user = await db.user.findUnique({
			where: { name }
		});

		if (!user) {
			return fail(400, { message: '名前またはパスワードを間違えています' });
		}

		const correctPassword = await bcrypt.compare(password, user.password);

		if (!correctPassword) {
			return fail(400, { message: '名前またはパスワードを間違えています' });
		}

		const authenticatedUser = await db.user.update({
			where: { name },
			data: {
				authToken: crypto.randomUUID()
			}
		});

		cookies.set('session', authenticatedUser.authToken, {
			path: '/',
			maxAge: 60 * 60 * 24 * 30
		});

		throw redirect(303, '/');
	}
};
