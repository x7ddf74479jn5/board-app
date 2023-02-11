import * as z from 'zod';
import { type CompleteComment, RelatedCommentModel, type CompleteUser, RelatedUserModel } from '.';

export const PostModel = z.object({
	id: z.number().int(),
	userId: z.string(),
	content: z.string(),
	createdAt: z.date()
});

export interface CompletePost extends z.infer<typeof PostModel> {
	comment: CompleteComment[];
	user: CompleteUser;
}

/**
 * RelatedPostModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPostModel: z.ZodSchema<CompletePost> = z.lazy(() =>
	PostModel.extend({
		comment: RelatedCommentModel.array(),
		user: RelatedUserModel
	})
);
