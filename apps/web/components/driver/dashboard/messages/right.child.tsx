import React, { useMemo } from 'react';
import { Icon } from '@iconify/react';
import { Input } from '@/components/ui/input-rechercher';
import { ChevronUp } from 'lucide-react';
import Modale from './modale';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import styles from './messages.module.css';
import { UserConversation, MessageFragmentFragment } from '@/graphql/generated/graphql';

interface RightProps {
  conversation?: UserConversation;
  currentUserId: string;
  messages?: MessageFragmentFragment[];
}

type Attachment = NonNullable<MessageFragmentFragment['attachments']>[number];

function Right({ conversation, currentUserId, messages }: RightProps) {
  const otherUser = useMemo(() => {
    if (!conversation?.participants) return null;
    return conversation.participants.find(
      (p) => p.user.id !== currentUserId
    )?.user;
  }, [conversation, currentUserId]);

  // Tous les attachments
  const attachments: Attachment[] = useMemo(() => {
    if (!messages?.length) return [];
    return messages.flatMap(msg => msg.attachments || []);
  }, [messages]);

  // Fichiers (avec un objet file ou une URL explicite marquée comme fichier)
  const files: Attachment[] = useMemo(() => {
    return attachments.filter(att => {
      if (att.file) return true;
      if (att.type && att.type.toLowerCase().includes('file')) return true;
      if (!att.url) return false;
      // Extensions de fichier courantes à reconnaître comme fichiers (incluant images et vidéos)
      const fileExtensionRegex = /\.(pdf|docx?|xlsx?|pptx?|txt|csv|zip|rar|7z|mp4|mov|avi|mkv|mp3|wav|ogg|jpg|jpeg|png|gif|webp|svg|bmp|tiff|heic|raw|ico)$/i;
      return fileExtensionRegex.test(att.url);
    });
  }, [attachments]);

  // Liens (type link ou URL HTTP sans objet file explicite)
  const links: Attachment[] = useMemo(() => {
    return attachments.filter(att => {
      if (att.file) return false;
      if (att.type && att.type.toLowerCase().includes('link')) return true;
      if (att.url && att.url.startsWith('http')) {
        const fileExtensionRegex = /\.(pdf|docx?|xlsx?|pptx?|txt|csv|zip|rar|7z|mp4|mov|avi|mkv|mp3|wav|ogg|jpg|jpeg|png|gif|webp|svg|bmp|tiff|heic|raw|ico)$/i;
        return !fileExtensionRegex.test(att.url);
      }
      return false;
    });
  }, [attachments]);

  // Fonction pour obtenir l'URL d'un fichier (avec fallback sécurisé)
  const getFileUrl = (attachment: Attachment): string => {
    if (attachment.file?.url) {
      return attachment.file.url;
    }
    if (attachment.url) {
      return attachment.url;
    }
    return '#';
  };

  // Fonction pour obtenir le nom d'un fichier/lien (avec fallback sécurisé)
  const getFileName = (attachment: Attachment): string => {
    if (attachment.file?.key) {
      return attachment.file.key.split('/').pop() || 'Fichier';
    }
    if (attachment.linkTitle) {
      return attachment.linkTitle;
    }
    if (attachment.url) {
      try {
        const urlObj = new URL(attachment.url);
        return urlObj.pathname.split('/').pop() || urlObj.hostname;
      } catch {
        return attachment.url || 'Lien';
      }
    }
    return 'Fichier sans nom';
  };

  // Fonction pour obtenir le titre (safe pour l'attribut HTML)
  const getSafeTitle = (attachment: Attachment): string | undefined => {
    const title = attachment.linkTitle || attachment.url || getFileName(attachment);
    return title || undefined; // Convertit les valeurs null/empty en undefined
  };

  // Fonction pour obtenir l'URL sécurisée (évite les valeurs null)
  const getSafeUrl = (attachment: Attachment): string => {
    const url = getFileUrl(attachment);
    return url === '#' ? '#' : url;
  };

  // Fonction pour obtenir l'icône appropriée
  const getFileIcon = (attachment: Attachment) => {
    if (attachment.file) {
      return 'mdi:file-outline';
    }
    return 'mdi:link-variant';
  };

  if (!otherUser) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        Aucune conversation sélectionnée
      </div>
    );
  }

  return (
    <>
      <div className="h-[92%] w-full overflow-hidden">
        {/* En-tête */}
        <div className={styles.auth_right4}>
          <div className={styles.auth_right5}>
            <h1>{otherUser.firstName} {otherUser.lastName}</h1>
          </div>
        </div>

        {/* Téléphone */}
        <div className={styles.auth_right9}>
          📞 {otherUser.phone ?? 'Non disponible'}
        </div>

        {/* Barre de recherche */}
        <div className={styles.auth_right10}></div>
        <div className={styles.auth_right11}>
          <Input
            type="text"
            placeholder="Rechercher messages"
            startOrnerIcon={<Icon icon="material-symbols:search" width="24" height="24" />}
          />
        </div>

        {/* --- 📂 FICHIERS --- */}
        <Accordion type="single" collapsible>
          <AccordionItem value="files">
            <AccordionTrigger>
              <div className={styles.auth_right12}>
                <div>
                  <Icon icon="ph:files-thin" width="30" height="30" />
                </div>
                <div>Fichiers</div>
                <div className={styles.auth_right13}>
                  +{files.length}
                </div>
                <div className="ml-30">
                  <ChevronUp size={20} strokeWidth={2} />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {files.length > 0 ? (
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {files.map((file) => (
                    <li key={file.id} className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-2 rounded">
                      <Icon icon={getFileIcon(file)} width="22" height="22" />
                      <a 
                        href={getSafeUrl(file)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline truncate flex-1"
                        title={getSafeTitle(file)}
                      >
                        {getFileName(file)}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-sm text-gray-400 p-2">Aucun fichier partagé</div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* --- 🔗 LIENS --- */}
        <Accordion type="single" collapsible>
          <AccordionItem value="links">
            <AccordionTrigger>
              <div className={styles.auth_right14}>
                <div>
                  <Icon icon="ri:links-fill" width="30" height="30" />
                </div>
                <div>Liens</div>
                <div className={styles.auth_right15}>
                  +{links.length}
                </div>
                <div className={styles.auth_right16}>
                  <ChevronUp size={20} strokeWidth={2} />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {links.length > 0 ? (
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {links.map((link) => {
                    const safeUrl = link.url || '#';
                    const safeTitle = getSafeTitle(link);
                    const displayText = link.linkTitle || link.url || 'Lien';

                    return (
                      <li key={link.id} className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50 p-2 rounded">
                        <Icon icon="mdi:link-variant" width="20" height="20" />
                        <a
                          href={safeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline truncate flex-1"
                          title={safeTitle}
                        >
                          {displayText}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="text-sm text-gray-400 p-2">Aucun lien partagé</div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* --- 📨 Bouton nouveau message --- */}
      <div className="w-full h-[8%] flex items-center">
        <Dialog>
          <DialogTrigger className="w-full">
            <div className="auth-background w-10 h-10 rounded-full ml-auto text-white flex items-center justify-center hover:bg-opacity-80 transition-colors">
              <Icon icon="icons8:create-new" width="24" height="24" />
            </div>
          </DialogTrigger>
          <DialogContent className="w-[500px] h-[500px] rounded-sm border-2 border-[#E5E7EB] p-[-2]">
            <DialogHeader>
              <DialogTitle className="text-center text-sm mt-3">
                Nouveau message
              </DialogTitle>
              <div className="w-full h-10 px-4">
                <Input
                  type="text"
                  placeholder="Rechercher une personne"
                  startOrnerIcon={<Icon icon="material-symbols:search" width="24" height="24" />}
                />
              </div>
              <div className="relative w-full h-90 mt-1 justify-center overflow-y-scroll space-y-2 px-4">
                <Modale />
                <Modale />
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default Right;