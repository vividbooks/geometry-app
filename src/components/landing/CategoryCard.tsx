import React from 'react';
import { Box, Circle } from 'lucide-react';
import type { CategoryDef } from '../../data/objects';

interface Props {
  category: CategoryDef;
  onClick: () => void;
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3.5 2.5L9.5 6L3.5 9.5V2.5Z" fill="white" />
    </svg>
  );
}

export function CategoryCard({ category, onClick }: Props) {
  const Icon = category.id === 'hranate' ? Box : Circle;

  return (
    <button
      onClick={onClick}
      className="flex flex-col text-left"
      style={{
        borderRadius: '32px',
        border: '2px solid transparent',
        overflow: 'hidden',
        backgroundColor: category.bgColor,
        transition: 'all 200ms',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
    >
      {/* Preview */}
      <div
        className="w-full flex items-center justify-center"
        style={{ height: 200, backgroundColor: category.previewBg }}
      >
        <Icon size={64} strokeWidth={1} style={{ color: '#4e5871', opacity: 0.4 }} />
      </div>

      {/* Content */}
      <div style={{ padding: '24px', paddingBottom: 0 }}>
        <h3 style={{ fontSize: '20px', fontWeight: 400, color: '#4e5871', marginBottom: '8px' }}>
          {category.title}
        </h3>
        <p style={{ fontSize: '14px', fontWeight: 400, color: '#4e5871', opacity: 0.7, lineHeight: '22px' }}>
          {category.description}
        </p>

        {/* CTA */}
        <div
          className="flex items-center justify-center gap-2"
          style={{
            background: '#4d49f3',
            height: '44px',
            borderRadius: '14px',
            boxShadow: '0px 10px 15px 0px #e0e7ff, 0px 4px 6px 0px #e0e7ff',
            marginTop: '16px',
            marginBottom: '24px',
            color: 'white',
            fontSize: '15px',
            fontWeight: 400,
            transition: 'background 200ms',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#3d39e3'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#4d49f3'; }}
        >
          <PlayIcon />
          Prozkoumat
        </div>
      </div>
    </button>
  );
}
