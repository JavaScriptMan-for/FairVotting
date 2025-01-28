import { AuthData, DataReg } from "../types";

export const regFn = async (regData: AuthData):Promise<DataReg> => {
    const registrationData = await fetch('/api/users/register', {
        method: "POST",
        body: JSON.stringify(regData),
        headers: {
          "Content-Type": "application/json"
        }
      })
           if(!registrationData.ok) {
         const error = await registrationData.json();
          throw new Error(error.message || 'Ошибка при регистрации');
           } 
           return registrationData.json()
}