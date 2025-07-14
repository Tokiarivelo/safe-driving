export const convertToRelative = (url: string) => {
  try {
    const parsed = new URL(url);
    const currentOrigin = window.location.origin;

    // Si l'URL est sur le même domaine, retourne le pathname + query + hash
    if (parsed.origin === currentOrigin) {
      return parsed.pathname + parsed.search + parsed.hash;
    }

    // Sinon, on garde l'URL absolue
    return url;
  } catch (err) {
    // Si ce n'est pas une URL absolue valide, on retourne tel quel (probablement déjà relative)
    return url;
  }
};
