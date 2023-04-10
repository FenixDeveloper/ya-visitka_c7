import { Router } from 'express';
import {
  getProfiles,
  getProfile,
  patchProfile,
  postProfileReaction,
  getProfileReactions,
} from '../controllers/profile';
import {
  updateProfileValidator,
  getProfileByIdValidator,
  getProfilesValidator,
  postReactionValidator,
  getProfileReactionsValidator,
} from '../helpers/validators';

const studentRouter = Router();

studentRouter.get('/profiles', getProfilesValidator, getProfiles);
studentRouter.get('/profiles/:id', getProfileByIdValidator, getProfile);
studentRouter.patch('/profiles/:id', updateProfileValidator, patchProfile);
studentRouter.get('/profiles/:id/reactions', getProfileReactionsValidator, getProfileReactions);
studentRouter.post('/profiles/:id/reactions', postReactionValidator, postProfileReaction);

export default studentRouter;
