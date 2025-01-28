import { IVerify } from "../types";
export const mutateCode = async (data: IVerify):Promise<void> => {
        const response = await fetch('/api/users/verify',
             {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            }
            }
        );
        if(!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Ошибка при отправке кода');
          }
    }