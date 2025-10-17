export class ObjectParser {
  public parse(input: string): Record<string, unknown> {
    try {
      // Limpiar el input
      let content = input.trim();

      // Remover llaves externas si existen
      if (content.startsWith('{') && content.endsWith('}')) {
        content = content.slice(1, -1).trim();
      }

      if (!content) return {};

      const result: Record<string, unknown> = {};
      let currentKey = '';
      let currentValue = '';
      let inString = false;
      let stringChar = '';
      let depth = 0;
      let i = 0;

      while (i < content.length) {
        const char = content[i];

        // Detectar inicio/fin de string
        if ((char === '"' || char === "'") && (i === 0 || content[i - 1] !== '\\')) {
          if (!inString) {
            inString = true;
            stringChar = char;
          } else if (char === stringChar) {
            inString = false;
            stringChar = '';
          }
          currentValue += char;
          i++;
          continue;
        }

        // Si estamos dentro de un string, agregar todo
        if (inString) {
          currentValue += char;
          i++;
          continue;
        }

        // Manejar profundidad de objetos/arrays
        if (char === '{' || char === '[') {
          depth++;
          currentValue += char;
          i++;
          continue;
        }

        if (char === '}' || char === ']') {
          depth--;
          currentValue += char;
          i++;
          continue;
        }

        // Detectar separador key:value
        if (char === ':' && depth === 0 && !currentKey) {
          currentKey = currentValue.trim();
          currentValue = '';
          i++;
          continue;
        }

        // Detectar separador entre pares (coma)
        if (char === ',' && depth === 0) {
          if (currentKey && currentValue) {
            result[currentKey] = this.parseValue(currentValue.trim());
            currentKey = '';
            currentValue = '';
          }
          i++;
          continue;
        }

        // Agregar carácter al valor actual
        currentValue += char;
        i++;
      }

      // Procesar último par key:value
      if (currentKey && currentValue) {
        result[currentKey] = this.parseValue(currentValue.trim());
      }

      return result;
    } catch {
      return {};
    }
  }

  private parseValue(value: string): unknown {
    const trimmed = value.trim();

    // Boolean true
    if (trimmed === 'true') return true;

    // Boolean false
    if (trimmed === 'false') return false;

    // Null
    if (trimmed === 'null') return null;

    // Undefined
    if (trimmed === 'undefined') return undefined;

    // String con comillas
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return trimmed.slice(1, -1);
    }

    // Número
    if (!isNaN(Number(trimmed)) && trimmed !== '') {
      return Number(trimmed);
    }

    // Array
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        return JSON.parse(trimmed);
      } catch {
        return trimmed;
      }
    }

    // Objeto anidado
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      return this.parse(trimmed);
    }

    // String sin comillas (fallback)
    return trimmed;
  }
}
