import { useState, useEffect, useCallback } from 'react';

export type LocState = {
  page: 'browser' | 'principles';
  filters: Set<string>;
  anchor?: string;
};

function parseHash(hash: string): LocState {
  const params = new URLSearchParams(hash.startsWith('#') ? hash.substring(1) : hash);
  const page = (params.get('page') || 'browser') as 'browser' | 'principles';
  const filtersParam = params.get('filters');
  const filters = filtersParam ? new Set(filtersParam.split(',')) : new Set<string>();
  const anchor = params.get('anchor') || undefined;

  return { page, filters, anchor };
}

export function buildHash(state: LocState): string {
  const params = new URLSearchParams();
  if (state.page && state.page !== 'browser') { // 'browser' is default, omit if so
    params.set('page', state.page);
  }

  if (state.filters.size > 0) {
    params.set('filters', Array.from(state.filters).join(','));
  }

  if (state.anchor) {
    params.set('anchor', state.anchor);
  }
  return params.toString();
}

export function useHashLocation(): [LocState, (draft: Partial<LocState>, push?: boolean) => void] {
  const [loc, setLoc] = useState<LocState>(() => parseHash(window.location.hash));

  useEffect(() => {
    const onHashChange = () => {
      setLoc(parseHash(window.location.hash));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const setHashState = useCallback((draft: Partial<LocState>, push = false) => {
    const currentState = parseHash(window.location.hash);
    
    // Ensure filters are always a Set and correctly merged
    let finalFiltersSet: Set<string>;
    if (draft.filters !== undefined) { // If draft explicitly provides filters
      if (draft.filters instanceof Set) {
        finalFiltersSet = draft.filters;
      } else {
        // This case is unlikely if FilterPanel sends a Set, but good for robustness
        finalFiltersSet = new Set(draft.filters as unknown as string[]); 
      }
    } else { // If draft does not provide filters, use filters from currentState
      finalFiltersSet = new Set(currentState.filters); // Create a new Set from current state's filters
    }
    const nextState = { ...currentState, ...draft, filters: finalFiltersSet };

    const nextHash = buildHash(nextState);
    const currentHash = window.location.hash.startsWith('#') ? window.location.hash.substring(1) : window.location.hash;

    if (nextHash !== currentHash) {
      const navAction = push ? 'pushState' : 'replaceState';
      history[navAction](null, '', nextHash ? `#${nextHash}` : window.location.pathname + window.location.search); // Clear hash if nextHash is empty
      setLoc(nextState); // Keep React in sync
    } else if (JSON.stringify(nextState) !== JSON.stringify(loc)) {
      // If only the loc state needs updating but hash is the same (e.g. default page)
      setLoc(nextState);
    }
  }, [loc]);

  // Update initial state if hash is empty but params might imply non-default state (e.g. page=principles)
  useEffect(() => {
    if(window.location.hash === '' || window.location.hash === '#'){
        const initialState = parseHash(''); // Get default state
        const currentHash = buildHash(initialState);
        if(currentHash){ // if defaults produce a hash, set it
            history.replaceState(null, '', `#${currentHash}`);
        }
        setLoc(initialState);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  return [loc, setHashState];
} 