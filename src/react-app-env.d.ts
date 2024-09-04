/// <reference types="react-scripts" />

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.gif';
declare module '*.svg';

interface User {
    accessToken: string,
    accessTokenExpirationTime: number,
    userId: string,
    email: string,
    name: string,
    role: string,
    picture: string,
    timeout: Node.timeout,
    permissions: any,
  }
  

interface AuthContextProps {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children:ReactNode;
}

interface Routing {
    headerName:string;
    children:RoutingLink[];
}

interface RoutingLink {
    label: string;
    path: string;
    roles: string[];
    editableRoles: string[];
    Component: any;
  }

interface NavigationContextType {
    localStorageKey: string | null;
    setLocalStorageKey: (key: string | null) => void;
}

interface NavigationContextProps {
    children: ReactNode;
}

interface Offer {
    id: number;
    sector: string;
    place: string;
    createUser: string;
    intrestedOfferts: strig[];
  }