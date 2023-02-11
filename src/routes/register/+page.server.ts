import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import bcrypt from 'bcrypt';
import { db } from '$lib/prisma';
import { UserModel } from '$lib/zod';

const formDataSchema = UserModel.pick({ name: true, password: true });

export const actions: Actions = {
	register: async ({ request }) => {
		const data = await request.formData();

		const parsed = formDataSchema.safeParse({
			name: data.get('name'),
			password: data.get('password')
		});

		if (!parsed.success) {
			return fail(400, { message: '名前・パスワードは必須です。' });
		}

		const { name, password } = parsed.data;

		const user = await db.user.findUnique({
			where: { name }
		});

		if (user) {
			return fail(400, { message: '既に存在するユーザーです。' });
		}

		await db.user.create({
			data: {
				name,
				password: await bcrypt.hash(password, 10),
				authToken: crypto.randomUUID()
			}
		});

		throw redirect(303, '/login');
	}
};
