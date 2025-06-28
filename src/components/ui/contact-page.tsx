import React, { useState } from 'react';
import { EnhancedContactForm } from './enhanced-contact-form';

interface ContactPageProps {
  onBack?: () => void;
}

export function ContactPage({ onBack }: ContactPageProps) {
  return <EnhancedContactForm onBack={onBack} />;
}