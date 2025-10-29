import Image from 'next/image';
import { useGetMultipleLinkPreviewsLazyQuery } from '@/graphql/generated/graphql';
import { useEffect, useState } from 'react';

interface LinkPreviewViewerProps {
  url: string;
}

const LinkPreviewViewer: React.FC<LinkPreviewViewerProps> = ({ url }) => {
  const [getPreview, { data, loading, error }] = useGetMultipleLinkPreviewsLazyQuery();
  const [preview, setPreview] = useState<{
    image?: string;
    title?: string;
    description?: string;
  } | null>(null);

  useEffect(() => {
    if (url) {
      getPreview({ variables: { urls: [url] } });
    }
  }, [url, getPreview]);

  useEffect(() => {
    if (data && data.getMultipleLinkPreviews && data.getMultipleLinkPreviews.length > 0) {
      const raw = data.getMultipleLinkPreviews[0];
      setPreview({
        image: raw.thumbnail || raw.meta?.image || undefined,
        title: raw.title ?? undefined,
        description: raw.description ?? undefined,
      });
    }
  }, [data]);

  if (!url) return null;
  if (loading)
    return <div className="mb-2 text-xs text-gray-400">Chargement de l&apos;aperçu du lien...</div>;
  if (error)
    return <div className="mb-2 text-xs text-red-400">Erreur lors de l&apos;aperçu du lien</div>;
  if (!preview) return null;

  return (
    <div className="mb-2 p-2 border rounded bg-gray-50">
      {preview.image && (
        <Image
          src={preview.image}
          alt={preview.title || 'Link preview'}
          width={64}
          height={64}
          className="object-cover rounded mb-2"
        />
      )}
      <div className="font-semibold text-sm">{preview.title}</div>
      <div className="text-xs text-gray-600">{preview.description}</div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-blue-500 underline"
      >
        {url}
      </a>
    </div>
  );
};

export default LinkPreviewViewer;
