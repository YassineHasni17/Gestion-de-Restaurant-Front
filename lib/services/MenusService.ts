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
        return await fetchApi<Menu[]>(API_URL);
    },

    async getMenuById(id: number) {
        return await fetchApi<Menu>(`${API_URL}/${id}`);
    },

    async createMenu(menuData: { name: string; description?: string; price: number }) {
        return await fetchApi<Menu>(API_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
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