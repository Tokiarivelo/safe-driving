'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { 
  useUpsertUserPreferenceMutation, 
  useGetMyUserPreferenceQuery  
} from '@/graphql/generated/graphql';
import { toast } from 'sonner';
import { termsAcceptanceSchema, TermsAcceptanceValues } from './schema';
import { useRouter } from 'next/navigation';

export const useTermsAcceptance = (initialValues?: Partial<TermsAcceptanceValues>) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [upsertUserPreference] = useUpsertUserPreferenceMutation();
  const { data: preferenceData } = useGetMyUserPreferenceQuery({
    skip: !session?.user?.id
  });

  const [currentDocument, setCurrentDocument] = useState<'CGU' | 'politiqueConf' | null>(null);
  const [documentRead, setDocumentRead] = useState<Record<keyof TermsAcceptanceValues, boolean>>({
    CGU: false,
    politiqueConf: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TermsAcceptanceValues>({
    resolver: zodResolver(termsAcceptanceSchema),
    defaultValues: {
      CGU: initialValues?.CGU ?? false,
      politiqueConf: initialValues?.politiqueConf ?? false,
    },
  });

  // Synchroniser les valeurs du formulaire avec les données de la base
  useEffect(() => {
    if (preferenceData?.userPreference) {
      const dbCguAccepted = preferenceData.userPreference.cguAccepted;
      const dbPrivacyPolicyAccepted = preferenceData.userPreference.privacyPolicyAccepted;
      
      if (dbCguAccepted !== null) {
        form.setValue('CGU', dbCguAccepted);
      }
      
      if (dbPrivacyPolicyAccepted !== null) {
        form.setValue('politiqueConf', dbPrivacyPolicyAccepted);
      }
    }
  }, [preferenceData, form]);

  const handleOpenDocument = (doc: keyof TermsAcceptanceValues) => {
    setCurrentDocument(doc);
    setDocumentRead(prev => ({ ...prev, [doc]: true }));
  };

  const handleAcceptanceChange = async (term: keyof TermsAcceptanceValues) => {
    if (!session?.user?.id) {
      toast.error('Utilisateur non connecté');
      return;
    }

    if (!documentRead[term]) return;

    const newValue = !form.getValues()[term];
    form.setValue(term, newValue, { shouldValidate: true });

    // Sauvegarder immédiatement en base de données
    try {
      const input = term === 'CGU' 
        ? { cguAccepted: newValue }
        : { privacyPolicyAccepted: newValue };

      const { errors } = await upsertUserPreference({
        variables: {
          input
        }
      });

      if (errors) {
        console.error('Erreurs GraphQL lors de la sauvegarde:', errors);
        toast.error('Erreur lors de la sauvegarde');
        return;
      }

      const documentName = term === 'CGU' ? 'CGU' : 'Politique de confidentialité';
      toast.success(`${documentName} ${newValue ? 'accepté' : 'refusé'}`);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const onSubmit = async (data: TermsAcceptanceValues) => {
    if (!session?.user?.id) {
      toast.error('Utilisateur non connecté');
      return { success: false, error: 'Utilisateur non connecté' };
    }

    setIsSubmitting(true);
    
    try {
      // Sauvegarder les acceptations en base de données
      const { errors } = await upsertUserPreference({
        variables: {
          input: {
            cguAccepted: data.CGU,
            privacyPolicyAccepted: data.politiqueConf
          }
        }
      });

      if (errors) {
        console.error('Erreurs GraphQL:', errors);
        throw new Error(errors.map(e => e.message).join(', '));
      }
      
      toast.success('Conditions générales sauvegardées avec succès');
      router.push('/recapitulatif'); 
      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des conditions:', error);
      toast.error('Erreur lors de la sauvegarde des conditions');
      
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur inconnue' 
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    currentDocument,
    documentRead,
    isSubmitting,
    handleOpenDocument,
    handleAcceptanceChange,
    setCurrentDocument,
    onSubmit: form.handleSubmit(onSubmit),
    userPreference: preferenceData?.userPreference
  };
};