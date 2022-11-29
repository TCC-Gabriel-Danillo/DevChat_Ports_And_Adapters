import { UserService } from "@domain/services";
import { FirebaseDatabaseRepository } from "@infrastructure/repositories";
import { FIREBASE_COLLECTION } from "../constants";
import { UsersContextProvider } from "../context";

interface Props {
    children: JSX.Element
}

export function UsersProviderComposer({ children }: Props){
    const usesDatabaseRepository = new FirebaseDatabaseRepository(FIREBASE_COLLECTION.USERS); 
    const usersService = new UserService(usesDatabaseRepository)
    return(
        <UsersContextProvider usersService={usersService}>
            {children}
        </UsersContextProvider>
    )
}