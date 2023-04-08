import { Router } from 'express';
import { getProfiles, getProfile, patchProfile } from '../controllers/profile';
import {
  updateProfileValidator,
  getProfileByIdValidator,
  getProfilesValidator,
} from '../helpers/validators';

const studentRouter = Router();

studentRouter.get('/profiles', getProfilesValidator, getProfiles);
studentRouter.get('/profiles/:id', getProfileByIdValidator, getProfile);
studentRouter.post('/profiles/:id', updateProfileValidator, patchProfile);
studentRouter.get('/profiles/:id/reactions', () => {});
studentRouter.post('/profiles/:id/reactions', () => {});

export default studentRouter;
