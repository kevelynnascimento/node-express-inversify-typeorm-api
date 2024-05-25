export class EnumHelper {
  public static isValid<T>(enumType: T, value: string): boolean {
    return Object.values(enumType).includes(value);
  }
}
