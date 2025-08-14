'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { termsAcceptanceSchema, TermsAcceptanceValues } from './schema';

export const useTermsAcceptance = (initialValues?: Partial<TermsAcceptanceValues>) => {
  const [currentDocument, setCurrentDocument] = useState<'CGU' | 'politiqueConf' | null>(null);
  const [documentRead, setDocumentRead] = useState<Record<keyof TermsAcceptanceValues, boolean>>({
    CGU: false,
    politiqueConf: false,
  });

  const form = useForm<TermsAcceptanceValues>({
    resolver: zodResolver(termsAcceptanceSchema),
    defaultValues: {
      CGU: initialValues?.CGU ?? false,
      politiqueConf: initialValues?.politiqueConf ?? false,
    },
  });

  const handleOpenDocument = (doc: keyof TermsAcceptanceValues) => {
    setCurrentDocument(doc);
    setDocumentRead(prev => ({ ...prev, [doc]: true }));
  };

  const handleAcceptanceChange = (term: keyof TermsAcceptanceValues) => {
    if (!documentRead[term]) return;

    const newValue = !form.getValues()[term];
    form.setValue(term, newValue, { shouldValidate: true });
  };

  return {
    form,
    currentDocument,
    documentRead,
    handleOpenDocument,
    handleAcceptanceChange,
    setCurrentDocument,
  };
};
