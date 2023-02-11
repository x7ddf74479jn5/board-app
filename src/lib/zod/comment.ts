import * as z from 'zod';
import { type CompletePost, RelatedPostModel, type CompleteUser, RelatedUserModel } from '.';

export const CommentModel = z.object({
	id: z.number().int(),
	userId: z.string(),
	postId: z.number().int(),
	content: z.string(),
	createdAt: z.date()
});

export interface CompleteComment extends z.infer<typeof CommentModel> {
	post: CompletePost;
	user: CompleteUser;
}

/**
 * RelatedCommentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCommentModel: z.ZodSchema<CompleteComment> = z.lazy(() =>
	CommentModel.extend({
		post: RelatedPostModel,
		user: RelatedUserModel
	})
);
