import { Router } from 'express';
import {
  getProfiles,
  getProfile,
  patchProfile,
  postProfileReaction,
} from '../controllers/profile';
import {
  updateProfileValidator,
  getProfileByIdValidator,
  getProfilesValidator,
} from '../helpers/validators';

const studentRouter = Router();

studentRouter.get('/profiles', getProfilesValidator, getProfiles);
studentRouter.get('/profiles/:id', getProfileByIdValidator, getProfile);
studentRouter.patch('/profiles/:id', updateProfileValidator, patchProfile);
studentRouter.get('/profiles/:id/reactions', () => {});
studentRouter.post('/profiles/:id/reactions', postProfileReaction);

export default studentRouter;
