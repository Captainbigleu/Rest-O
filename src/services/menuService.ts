import { Menus } from '../entity/Menus';
import { TMenus } from '../types/TMenus';

export class MenuService {
    async createMenu(name: string, prix: number): Promise<TMenus | undefined> {
        const menu = new Menus();
        menu.nom = name;
        menu.prix = prix;

        await menu.save();

        if (menu) {
            return menu;
        }
        return undefined;
    }

    async changeMenu(
        prix: number,
        menuId: number
    ): Promise<TMenus | undefined> {
        const oldData = await Menus.findOneBy({
            id: menuId,
        });
        oldData.prix = prix;
        const newPrice = await Menus.save(oldData);

        if (newPrice) {
            return newPrice;
        }
        return undefined;
    }

    async getOneMenu(menuId: number): Promise<TMenus | undefined> {
        const menu = await Menus.findOneBy({
            id: menuId,
        });
        if (menu) {
            return menu;
        }
        return undefined;
    }

    async deleteMenu(menuId: number): Promise<TMenus | undefined> {
        const oldData = await Menus.findOneBy({
            id: menuId,
        });
        oldData.deleted_at = true;
        const newPrice = await Menus.save(oldData);

        if (newPrice) {
            return newPrice;
        }
        return undefined;
    }

    async gettAllMenu(): Promise<TMenus[] | undefined> {
        const allMenu = await Menus.findBy({ deleted_at: false });

        if (allMenu) {
            return allMenu;
        }
        return undefined;
    }
}
