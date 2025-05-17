import { useEffect } from 'react';

export function useScrollOnAnchor(anchor?: string) {
  useEffect(() => {
    if (!anchor) return;
    try {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    } catch (e) {
      console.warn(`Could not find element with id "${anchor}" to scroll to.`, e);
    }
  }, [anchor]);
} 