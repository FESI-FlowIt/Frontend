'use client';

import React from 'react';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

const FormField = ({ label, htmlFor, children, className }: FormFieldProps) => {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="text-body-sb-20 mb-20 block font-medium">
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormField;
