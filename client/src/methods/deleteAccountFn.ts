import { PutData } from "../types";
export const deleteAccount = async ():Promise<PutData> => {
    const response = await fetch('/api/delete-account',
         {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
         });
    if(!response.ok) throw new Error('Ошибка сервера')

    const data = await response.json();

    return data.message;
}
