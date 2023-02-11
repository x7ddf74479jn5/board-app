import * as z from "zod"
import { CompleteComment, RelatedCommentModel, CompleteUser, RelatedUserModel } from "./index"

export const PostModel = z.object({
  id: z.number().int(),
  userId: z.string(),
  content: z.string(),
  createdAt: z.date(),
})

export interface CompletePost extends z.infer<typeof PostModel> {
  comments: CompleteComment[]
  user: CompleteUser
}

/**
 * RelatedPostModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPostModel: z.ZodSchema<CompletePost> = z.lazy(() => PostModel.extend({
  comments: RelatedCommentModel.array(),
  user: RelatedUserModel,
}))
