import { db } from '$lib/prisma';
import { CommentModel } from '$lib/zod';
import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const threadDetail = await db.post.findUnique({
		where: {
			id: Number(params.postId)
		},
		include: {
			comments: {
				orderBy: { id: 'desc' },
				select: {
					content: true,
					createdAt: true,
					user: {
						select: {
							name: true
						}
					}
				}
			},
			user: {
				select: {
					name: true
				}
			}
		}
	});

	if (!threadDetail) throw fail(404, { message: '存在しないスレッドです。' });

	return { threadDetail };
};

const formDataSchema = CommentModel.shape.content;
const paramsSchema = z
	.object({
		postId: z.string().transform((str) => parseInt(str, 10))
	})
	.passthrough();

export const actions: Actions = {
	comment: async ({ request, locals, params }) => {
		const parsedParams = paramsSchema.safeParse(params);

		if (!parsedParams.success) {
			return fail(400, { message: '不正なリクエストです。' });
		}

		const data = await request.formData();
		const parsedFormData = formDataSchema.safeParse(data.get('comment'));

		if (!parsedFormData.success) {
			return fail(400, { message: 'コメントは必須入力です。' });
		}

		const comment = parsedFormData.data;
		const { postId } = parsedParams.data;

		await db.comment.create({
			data: {
				userId: locals.user.id,
				postId,
				content: comment
			}
		});
	}
};
