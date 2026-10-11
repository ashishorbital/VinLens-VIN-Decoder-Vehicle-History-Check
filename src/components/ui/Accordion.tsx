import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon } from '@hugeicons/core-free-icons';

export interface AccordionItemData {
  id: string;
  title: string;
  content: string | React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  defaultOpenId?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenId,
  className = ''
}) => {
  const [openIds, setOpenIds] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : [items[0]?.id || '']
  );

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds(prev =>
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds(prev => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map(item => {
        const isOpen = openIds.includes(item.id);

        return (
          <div
            key={item.id}
            className={`border rounded-xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'border-theme-hover bg-theme-card shadow-sm'
                : 'border-theme-subtle bg-theme-card/60 hover:border-theme-hover'
            }`}
          >
            <button
              type="button"
              id={`accordion-btn-${item.id}`}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between text-left px-5 py-4 font-semibold text-theme-primary transition-colors cursor-pointer group"
            >
              <span className="text-base md:text-lg pr-4 font-medium group-hover:text-accent-primary transition-colors">
                {item.title}
              </span>
              <span
                className={`p-1.5 rounded-full shrink-0 transition-transform duration-200 ${
                  isOpen
                    ? 'rotate-180 bg-theme-secondary text-accent-primary'
                    : 'text-theme-muted group-hover:text-theme-primary'
                }`}
              >
                <HugeiconsIcon icon={ArrowDown01Icon} size={20} strokeWidth={1.5} />
              </span>
            </button>

            {isOpen && (
              <div
                id={`accordion-panel-${item.id}`}
                role="region"
                aria-labelledby={`accordion-btn-${item.id}`}
                className="px-5 pb-5 pt-1 text-sm md:text-base text-theme-muted leading-relaxed border-t border-theme-subtle/40 animate-in fade-in duration-200"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
