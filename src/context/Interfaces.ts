export interface OffertModel {
    id: string;
    sector: string;
    place: string;
    createUser: string;
    intrestedUsers: string[];
    intrestedOfferts:string[];
}

export enum ActionStatus {
    Before = 1,
    During = 2,
    LastDays = 3,
    Closed = 4
}

export interface ActiveAction {
    id: string;
    name: string;
    eventDate: Date | null;
    offerts: OffertModel[];
    status: ActionStatus;
    img:string;
}

export interface ModalProps {
    onClose: () => void;
    children: React.ReactNode; // Zakładając, że 'children' to zawartość modala
    actionBar?: React.ReactNode; // Zakładając, że 'actionBar' to pasek akcji modala (opcjonalny)
    modalWidthClass?: string;
  }