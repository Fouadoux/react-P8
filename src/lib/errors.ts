const FALLBACK_MESSAGE = 'Erreur inconnue'

export const getErrorMessage = (error: unknown): string => {
  return error instanceof Error ? error.message || FALLBACK_MESSAGE : FALLBACK_MESSAGE
};
