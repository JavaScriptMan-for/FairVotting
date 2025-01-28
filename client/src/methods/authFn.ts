import { AuthData } from "../types";
import {Data} from "../types"

export const authFn = async (authData: AuthData): Promise<Data> => {
      const serverData = await fetch('api/users/login', {
        method: "POST",
        body: JSON.stringify(authData),
        headers: {
         'Content-Type': 'application/json',
        }
      })
           if(!serverData.ok) {
            const error = await serverData.json();
            throw new Error(error.message || 'Ошибка при авторизации');
           }
           return serverData.json()
         } 