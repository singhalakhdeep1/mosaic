import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary' }) => {
  const styles: React.CSSProperties = {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: variant === 'primary' ? '#2563eb' : '#64748b',
    color: '#ffffff',
    fontWeight: 600,
  };

  return (
    <button style={styles} onClick={onClick}>
      {children}
    </button>
  );
};
