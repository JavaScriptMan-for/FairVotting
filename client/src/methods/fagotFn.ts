import { PutData, FagotAuth } from "../types"
export const fagotPassword = async (fagot_data:FagotAuth):Promise<PutData> => {
    const response = await fetch('/api/update-password', {
        method: 'PUT',
        body: JSON.stringify(fagot_data),
        headers: {
            "Content-Type": 'application/json'
        }
    })
    if(!response.ok) throw new Error('Ошибка при изменении пароля');
    
    const data = await response.json()
    return data.message
}