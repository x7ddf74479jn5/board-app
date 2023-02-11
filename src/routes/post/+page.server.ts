import { db } from '$lib/prisma';
import { PostModel } from '$lib/zod';
import { fail, redirect, type Actions } from '@sveltejs/kit';

const formDataSchema = PostModel.shape.content;

export const actions: Actions = {
	post: async ({ request, locals }) => {
		const data = await request.formData();
		const maybeContent = data.get('content');

		const parsed = formDataSchema.safeParse(maybeContent);

		if (!parsed.success) {
			return fail(400, { message: 'タイトルと内容は必須入力です。' });
		}

		const content = parsed.data;

		if (!locals.user) return fail(400, { message: '登録されていないユーザーです。' });

		await db.post.create({
			data: {
				userId: locals.user.id,
				content
			}
		});

		throw redirect(303, '/');
	}
};
