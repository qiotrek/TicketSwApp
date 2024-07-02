import { createContext, useContext, useEffect, useState, } from 'react';
import { getItem, removeItem, setItem } from '../Hooks/useLocalStorage';

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const userData: User | null = getItem("user");
        if (userData && (userData.accessTokenExpirationTime > Date.now() / 1000)) {
            const timeout = setTimeout(() => {
                logout();
            }, (userData.accessTokenExpirationTime * 1000) - Date.now());
            setUser({ ...userData, timeout });
        }
    }, []);

    const login = (userData: User) => {
        const timeout = setTimeout(() => {
            logout();
        }, (userData.accessTokenExpirationTime * 1000) - Date.now());
        setUser({ ...userData, timeout });
        setItem("user", { ...userData });
    };

    const logout = () => {
        setUser(null);
        removeItem("user");
        removeItem('shipowners')
    };

    const contextValue: AuthContextProps = {
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth musi być używane wewnątrz AuthProvider');
    }

    return context;
};
