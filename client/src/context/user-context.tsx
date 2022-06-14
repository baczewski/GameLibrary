import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { authService, User } from "../services/auth-service";

const UserContext = createContext<User | undefined>(undefined);

export function CurrentUserProvider({ children }: { children: ReactNode })  {
    const [user, setUser] = useState<User | undefined>(authService.currentUser);

    useEffect(() => {
        authService.setHandler(setUser);

        return () => {
            authService.setHandler(undefined);
        }
    }, []);

    return (
        <UserContext.Provider value={user}>{children}</UserContext.Provider>
    )
}

export function useCurrentUser() {
    return useContext(UserContext);
}