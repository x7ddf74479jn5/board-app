import * as z from 'zod';
import { type CompleteComment, RelatedCommentModel, type CompletePost, RelatedPostModel } from '.';

export const UserModel = z.object({
	id: z.string(),
	name: z.string(),
	password: z.string(),
	authToken: z.string(),
	createdAt: z.date()
});

export interface CompleteUser extends z.infer<typeof UserModel> {
	comment: CompleteComment[];
	Post: CompletePost[];
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() =>
	UserModel.extend({
		comment: RelatedCommentModel.array(),
		Post: RelatedPostModel.array()
	})
);
