import { EMAILVALIDATION, IMAGETYPES, TELEGRAMVALIDATION } from './constants';
import apiConfig from './api-config';

interface ValidationStaticType {
  checkLength(field: string, minLength: number, maxLength: number): string;
  isEmail(value: string): string;
  isTelegramLink(nickname: string): string;
  isExistUserGithub(nickname: string): Promise<string>;
  checkPhotoSize(photo: Blob, maxSizeInBytes: number): string;
}

class Validation {

  // Метод проверки длины поля
  static checkLength(field: string, minLength: number, maxLength: number): string {
    if (field.length < minLength) {
      return `Длина поля должна быть не менее ${minLength} символов`;
    }
    if (field.length > maxLength) {
      return `Длина поля должна быть не более ${maxLength} символов`;
    }
    return '';
  }

  // Метод проверки значения на схожесть с почтой
  static isEmail(value: string): string {
    if (!EMAILVALIDATION.test(value)) {
      return 'Ваша почта не подходит';
    }
    return '';
  }

  // Метод проверки корректность ника в телеграм
  static isTelegramLink(nickname: string): string {
    if (!TELEGRAMVALIDATION.test(nickname)) {
      return 'Ник в телеграме должен начинаться с @ и иметь длину от 5 до 32 символов';
    }
    return '';
  }

  // Метод проверки пользователя на гитхабе
  static async isExistUserGithub(nickname: string): Promise<string> {
    try {
      await apiConfig.checkExistUserGitHub(nickname);
      return '';
    } catch (error) {
      return 'Пользователя с таким ником не существует';
    }
  }

  // Метод проверки на вес фотографии, а так же формат
  static checkPhotoSize(photo: Blob, maxSizeInBytes: number): string {
    if (!IMAGETYPES.includes(photo.type)) {
      return 'Изображение должно быть одного из форматов jpg, jpeg, png, bmp';
    }
    if (photo.size > maxSizeInBytes) {
      const sizeInMegabytes = maxSizeInBytes / (1048576);
      const maxSize = sizeInMegabytes >= 1 ? `${parseFloat(sizeInMegabytes.toFixed(1))} МБайт` : `${Math.round(maxSizeInBytes / 1024)} КБайт`;
      return `Изображение слишком большое, максимальный допустимый размер: ${maxSize}`;
    }
    return '';
  }
}

export const validation: ValidationStaticType = Validation;
