export default function moveLastSubstringToNewLine(str: string, separator: string = ' '): string {
    // 1. Разбить строку на части
    const parts = str.trim().split(separator);
  
    if (parts.length <= 1) {
      return str; // Возвращаем строку, если в ней 0 или 1 элемент
    }
  
    // 2. Получить последнюю подстроку
    const lastPart = parts.pop() || '';
  
    // 3. Соединить оставшиеся подстроки
    const remainingString = parts.join(separator);
  
    // 4. Вернуть новую строку
    return `${remainingString}\n${lastPart}`;
  }