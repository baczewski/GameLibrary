import { createContext, ReactNode, useContext, useState } from "react";

interface UserPreferences {
    view: 'list' | 'grid';
}

interface UserPreferencesContextData {
    preferences: UserPreferences;
    setPreferences: (preferences: UserPreferences) => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextData | undefined>(undefined);

export function UserPreferencesProvider({ children }: { children: ReactNode }) {
    const [preferences, setPreferences] = useState<UserPreferences>({ view: 'grid' });

    return (
        <UserPreferencesContext.Provider value={{ preferences, setPreferences }}>
            {children}
        </UserPreferencesContext.Provider>
    );
}

export function useUserPreferences() : UserPreferencesContextData {
    const context = useContext(UserPreferencesContext);

    if (!context) {
        throw new Error('You should use UserPreferencesProvider around your component!');
    }

    return context;
}