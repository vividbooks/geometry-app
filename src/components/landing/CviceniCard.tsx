import React from 'react';
import { Calculator } from 'lucide-react';

interface Props {
  onClick: () => void;
}

export function CviceniCard({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col text-left"
      style={{
        borderRadius: '32px',
        border: '2px solid transparent',
        overflow: 'hidden',
        backgroundColor: '#fef9c3',
        transition: 'all 200ms',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow =
          '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.98)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
      }}
    >
      <div
        className="w-full flex items-center justify-center"
        style={{ height: 200, backgroundColor: '#fef08a' }}
      >
        <Calculator size={64} strokeWidth={1} style={{ color: '#b45309', opacity: 0.5 }} />
      </div>
      <div style={{ padding: '24px', paddingBottom: 0 }}>
        <h3 style={{ fontSize: '20px', fontWeight: 400, color: '#4e5871', marginBottom: '8px' }}>
          Cvičení
        </h3>
        <p
          style={{
            fontSize: '14px',
            fontWeight: 400,
            color: '#4e5871',
            opacity: 0.7,
            lineHeight: '22px',
          }}
        >
          Počítání objemu a povrchu těles — úlohy na procvičení.
        </p>
        <div
          className="flex items-center justify-center gap-2"
          style={{
            background: '#d97706',
            height: '44px',
            borderRadius: '14px',
            boxShadow: '0px 10px 15px 0px #fef3c7, 0px 4px 6px 0px #fef3c7',
            marginTop: '16px',
            marginBottom: '24px',
            color: 'white',
            fontSize: '15px',
            fontWeight: 400,
            transition: 'background 200ms',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#b45309';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#d97706';
          }}
        >
          Vybrat úlohu
        </div>
      </div>
    </button>
  );
}
