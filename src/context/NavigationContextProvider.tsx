import React, { createContext, useContext, useState, useRef } from 'react';

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function useNavigationContext(): NavigationContextType {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigationContext musi być używane wewnątrz GridLocalStorageContextProvider');
    }
    return context;
}

export function NavigationContextProvider({ children }: NavigationContextProps) {
    const [localStorageKey, setLocalStorageKey] = useState<string | null>(null);

    const contextValue = {
        localStorageKey,
        setLocalStorageKey
    };

    return <NavigationContext.Provider value={contextValue}>{children}</NavigationContext.Provider>;
};
