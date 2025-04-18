import { fetchApi } from './api-config';
export interface Menu {
    id: number;
    name: string;
    price: number;
    description: string;
}

const API_URL = '/menus';

export const MenusService = {
    async getAllMenus() {
        const accessToken = localStorage.getItem("accessToken");
        console.log("😂😂😂 Token JWT:", accessToken);
        return await fetchApi<Menu[]>(API_URL,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
    },

    async getMenuById(id: number) {
        return await fetchApi<Menu>(`${API_URL}/${id}`);
    },

    async createMenu(menuData: { name: string; description?: string; price: number }) {
        const accessToken = localStorage.getItem("accessToken"); 
        console.log("😂😂😂 Token JWT:", accessToken); // Debugging line
        return await fetchApi<Menu>(API_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(menuData),
        });
    },

    async updateMenu(id: number, menuData: { name: string; description?: string; price: number }) {
        return await fetchApi<Menu>(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(menuData),
        });
    },

    async deleteMenu(id: number) {
        await fetchApi(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
    },
};