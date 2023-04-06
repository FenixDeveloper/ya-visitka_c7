import { VALIDATION, IMAGE_TYPES, VALIDATION_ERRORS } from './constants';
import apiConfig from './api-config';

interface ValidationStaticType {
  checkLength(field: string, minLength: number, maxLength: number): string;
  isEmail(value: string): string;
  isTelegramLink(nickname: string): string;
  isExistUserGithub(nickname: string): Promise<string>;
  checkPhotoSize(photo: Blob, maxSizeInBytes: number): string;
}

class Validation {
  static checkLength(field: string, minLength: number, maxLength: number): string {
    if (field.length < minLength || field.length > maxLength) {
      return VALIDATION_ERRORS.FIELD_LENGTH(minLength, maxLength);
    }
    return '';
  }

  static isEmail(value: string): string {
    if (!VALIDATION.EMAIL.test(value)) {
      return VALIDATION_ERRORS.EMAIL_INVALID;
    }
    return '';
  }

  static isTelegramLink(nickname: string): string {
    if (!VALIDATION.TELEGRAM.test(nickname)) {
      return VALIDATION_ERRORS.TELEGRAM_INVALID;
    }
    return '';
  }

  static async isExistUserGithub(nickname: string): Promise<string> {
    try {
      await apiConfig.checkExistUserGitHub(nickname);
      return '';
    } catch (error) {
      return VALIDATION_ERRORS.GITHUB_USER_NOT_FOUND;
    }
  }

  static checkPhotoSize(photo: Blob, maxSizeInBytes: number): string {
    if (!IMAGE_TYPES.includes(photo.type)) {
      return VALIDATION_ERRORS.IMAGE_TYPE_INVALID;
    }
    if (photo.size > maxSizeInBytes) {
      const sizeInMegabytes = maxSizeInBytes / (1048576);
      const maxSize = sizeInMegabytes >= 1 ? `${parseFloat(sizeInMegabytes.toFixed(1))} МБайт` : `${Math.round(maxSizeInBytes / 1024)} КБайт`;
      return VALIDATION_ERRORS.IMAGE_SIZE_INVALID(maxSize);
    }
    return '';
  }
}

export const validation: ValidationStaticType = Validation;
