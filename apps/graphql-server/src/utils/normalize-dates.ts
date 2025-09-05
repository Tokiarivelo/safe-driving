// utils/normalize-dates.ts

export type NormalizeOptions = {
  /** Ajoute/override la liste des clés traitées comme dates (en plus de l'auto-détection ISO). */
  dateKeys?: string[];
  /** Désactiver l'auto-détection ISO si tu veux une liste blanche stricte. */
  treatIsoStringsAsDates?: boolean;
};

const DEFAULT_DATE_KEYS = [
  'createdAt',
  'updatedAt',
  'sentAt',
  'editedAt',
  'deletedAt',
  'deliveredAt',
  'readAt',
  'seenAt',
  'archivedAt',
] as const;

const ISO_8601_REGEX =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?(?:Z|[+-]\d{2}:\d{2})$/;

function isIsoDateString(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    ISO_8601_REGEX.test(value) &&
    !isNaN(Date.parse(value))
  );
}

function toDateIfValid(value: unknown): Date | null {
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
  if (typeof value === 'string' && isIsoDateString(value)) {
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

/**
 * Normalise récursivement toutes les dates dans un objet/array :
 * - clés connues (createdAt, updatedAt, sentAt, …)
 * - toute string ISO 8601 valide si treatIsoStringsAsDates=true (par défaut)
 */
export function normalizeDates<T>(data: T, opts: NormalizeOptions = {}): T {
  const {
    dateKeys = DEFAULT_DATE_KEYS as readonly string[],
    treatIsoStringsAsDates = true,
  } = opts;

  const dateKeySet = new Set(dateKeys);

  const _walk = (node: any): any => {
    if (node == null) return node;

    if (Array.isArray(node)) {
      return node.map(_walk);
    }

    if (node instanceof Date) {
      // S'assure que la date est valide
      return isNaN(node.getTime()) ? node : node;
    }

    if (typeof node === 'object') {
      const out: Record<string, any> = {};
      for (const [k, v] of Object.entries(node)) {
        if (v == null) {
          out[k] = v;
          continue;
        }

        // 1) Si la clé est identifiée comme date -> convertir
        if (dateKeySet.has(k)) {
          const d = toDateIfValid(v);
          out[k] = d ?? v; // en cas de valeur invalide, on garde la valeur brute
          continue;
        }

        // 2) Sinon, si l'auto-détection est active et que la valeur est une string ISO -> convertir
        if (
          treatIsoStringsAsDates &&
          typeof v === 'string' &&
          isIsoDateString(v)
        ) {
          const d = toDateIfValid(v);
          out[k] = d ?? v;
          continue;
        }

        // 3) Descendre récursivement
        if (typeof v === 'object') {
          out[k] = _walk(v);
        } else {
          out[k] = v;
        }
      }
      return out;
    }

    // Valeurs primitives non concernées
    return node;
  };

  return _walk(data) as T;
}
