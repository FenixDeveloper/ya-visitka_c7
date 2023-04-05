import { IMAGEVALIDATION } from "./constants";

interface ValidationStaticType {
  checkLength(field: string, minLength: number, maxLength: number): string;
  isEmail(value: string): string;
  isTelegramLink(link: string): string;
  isGithubLink(link: string): string;
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
    // Регулярное выражение для проверки email
    if (!IMAGEVALIDATION.test(value)) {
      return 'Ваша почта не подходит';
    }
    return '';
  }

  // Метод проверки значения на ссылку тг (с отправкой запроса, что бы убедиться, что ссылка реальная)
  static isTelegramLink(link: string): string {
    // TODO: Реализовать проверку ссылки на тг
    return '';
  }

  // Метод проверки значения на ссылку гитхаб, аналогично тг
  static isGithubLink(link: string): string {
    // TODO: Реализовать проверку ссылки на гитхаб
    return '';
  }

  // Метод проверки на вес фотографии (пока что можно сделать заглушку)
  static checkPhotoSize(photo: Blob, maxSizeInBytes: number): string {
    // TODO: Реализовать проверку веса фотографии
    return '';
  }
}

export const validation: ValidationStaticType = Validation;
