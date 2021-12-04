export class TextUtils {
  static truncate(text, maxLength = 100) {
    const replaced = text.replace('/\n/g', '');
    return replaced.length <= maxLength
      ? replaced
      : replaced.slice(0, maxLength).concat('...');
  }
}
