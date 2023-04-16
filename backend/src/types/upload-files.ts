/* eslint-disable no-unused-vars */
import { Express } from 'express';

export type TInfoTypes = 'hobby' | 'status' | 'job' | 'education' | 'avatar';

export type TFiles = { [key in TInfoTypes]: Express.Multer.File[] };
