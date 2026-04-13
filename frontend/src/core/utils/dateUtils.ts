/**
 * Utilitários para formatação de datas e horas
 */

/**
 * Formata uma data ISO 8601 para o formato brasileiro DD/MM/YYYY
 * @param dateString - String de data no formato ISO 8601 (ex: "2026-04-02T18:36:20.000000Z")
 * @returns Data formatada em DD/MM/YYYY
 */
export function formatDateBR(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return dateString;
  }
}

/**
 * Formata uma data ISO 8601 para o formato brasileiro DD/MM/YYYY HH:mm
 * @param dateString - String de data no formato ISO 8601
 * @returns Data e hora formatadas em DD/MM/YYYY HH:mm
 */
export function formatDateTimeBR(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Erro ao formatar data e hora:', error);
    return dateString;
  }
}

/**
 * Formata uma data ISO 8601 para o formato brasileiro DD/MM/YYYY HH:mm:ss
 * @param dateString - String de data no formato ISO 8601
 * @returns Data e hora completas formatadas em DD/MM/YYYY HH:mm:ss
 */
export function formatDateTimeFullBR(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  } catch (error) {
    console.error('Erro ao formatar data e hora completa:', error);
    return dateString;
  }
}

/**
 * Formata apenas a hora de uma data ISO 8601 para HH:mm
 * @param dateString - String de data no formato ISO 8601
 * @returns Hora formatada em HH:mm
 */
export function formatTimeBR(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Erro ao formatar hora:', error);
    return dateString;
  }
}

/**
 * Formata apenas a hora de uma data ISO 8601 para HH:mm:ss
 * @param dateString - String de data no formato ISO 8601
 * @returns Hora completa formatada em HH:mm:ss
 */
export function formatTimeFullBR(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  } catch (error) {
    console.error('Erro ao formatar hora completa:', error);
    return dateString;
  }
}

/**
 * Formata uma data para formato relativo (há X minutos, há X horas, etc.)
 * @param dateString - String de data no formato ISO 8601
 * @returns String relativa como "há 5 minutos", "há 2 horas", "ontem", etc.
 */
export function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) {
      return 'agora mesmo';
    } else if (diffInMinutes < 60) {
      return `há ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`;
    } else if (diffInHours < 24) {
      return `há ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    } else if (diffInDays === 1) {
      return 'ontem';
    } else if (diffInDays < 7) {
      return `há ${diffInDays} dia${diffInDays > 1 ? 's' : ''}`;
    } else {
      return formatDateBR(dateString);
    }
  } catch (error) {
    console.error('Erro ao formatar tempo relativo:', error);
    return dateString;
  }
}

/**
 * Converte uma data UTC para o timezone local do usuário
 * @param dateString - String de data no formato ISO 8601
 * @returns Data convertida para o timezone local
 */
export function convertUTCToLocal(dateString: string): Date {
  try {
    return new Date(dateString);
  } catch (error) {
    console.error('Erro ao converter UTC para local:', error);
    return new Date();
  }
}

/**
 * Formata uma data para o formato ISO 8601 sem timezone (YYYY-MM-DDTHH:mm:ss)
 * @param date - Objeto Date ou string de data
 * @returns String no formato YYYY-MM-DDTHH:mm:ss
 */
export function formatToISOString(date: Date | string): string {
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toISOString().split('.')[0];
  } catch (error) {
    console.error('Erro ao formatar para ISO string:', error);
    return new Date().toISOString().split('.')[0];
  }
}

/**
 * Verifica se uma data é hoje
 * @param dateString - String de data no formato ISO 8601
 * @returns true se a data for hoje, false caso contrário
 */
export function isToday(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  } catch (error) {
    console.error('Erro ao verificar se é hoje:', error);
    return false;
  }
}

/**
 * Verifica se uma data é ontem
 * @param dateString - String de data no formato ISO 8601
 * @returns true se a data for ontem, false caso contrário
 */
export function isYesterday(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
  } catch (error) {
    console.error('Erro ao verificar se é ontem:', error);
    return false;
  }
}

/**
 * Formata uma data para exibição em cards/componentes (mais curta)
 * @param dateString - String de data no formato ISO 8601
 * @returns Data formatada de forma curta (ex: "02/04/2026" ou "há 2h")
 */
export function formatShortDate(dateString: string): string {
  try {
    if (isToday(dateString)) {
      return formatTimeBR(dateString);
    } else if (isYesterday(dateString)) {
      return 'Ontem';
    } else {
      return formatDateBR(dateString);
    }
  } catch (error) {
    console.error('Erro ao formatar data curta:', error);
    return dateString;
  }
}

/**
 * Formata uma data para uso em inputs HTML (YYYY-MM-DD)
 * @param dateString - String de data no formato ISO 8601
 * @returns Data no formato YYYY-MM-DD para inputs
 */
export function formatForInput(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Erro ao formatar para input:', error);
    return '';
  }
}

/**
 * Calcula a diferença entre duas datas em dias
 * @param dateString1 - Primeira data no formato ISO 8601
 * @param dateString2 - Segunda data no formato ISO 8601 (opcional, padrão: hoje)
 * @returns Diferença em dias
 */
export function getDaysDifference(dateString1: string, dateString2?: string): number {
  try {
    const date1 = new Date(dateString1);
    const date2 = dateString2 ? new Date(dateString2) : new Date();
    const diffInMs = Math.abs(date2.getTime() - date1.getTime());
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  } catch (error) {
    console.error('Erro ao calcular diferença em dias:', error);
    return 0;
  }
}
