import { Consumo, Cuenta, Invitado, User } from "../types";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

function getById(array: any[], id: string) {
    return array.find((item) => item.id === id);
}

function createNewCuenta(
    nombre: string,
    invitados: Invitado[]
): Cuenta {
    const id = uuidv4();
    const codigo = id.slice(0, 6).toUpperCase();
    const now = format(new Date(), "dd/MM/yyyy");
    return {
        id: id,
        nombre: nombre,
        invitados: invitados,
        codigo: codigo,
        createdAt: now,
        updatedAt: now,
    };
}

function saveCuentasToLocalStorage(
    cuentas: Cuenta[]
): void {
    localStorage.setItem(
        "remiu-cuentas",
        JSON.stringify(cuentas)
    );
}

function saveUserToLocalStorage(user: User): void {
    localStorage.setItem(
        "remiu-user",
        JSON.stringify(user)
    );
}

function getUserFromLocalStorage(): User | null {
    const user = localStorage.getItem("remiu-user");
    return user ? JSON.parse(user) : null;
}

function getCuentasFromLocalStorage(): Cuenta[] | null {
    const cuentas = localStorage.getItem("remiu-cuentas");
    return cuentas ? JSON.parse(cuentas) : null;
}

function createNewInvitado(
    nombre: string,
    consumos: Consumo[],
    invitadosCount: number
): Invitado {
    const id = uuidv4();
    const hasName = nombre.trim() != "";
    return {
        id: id,
        nombre: hasName
            ? nombre
            : `Invitado${
                  invitadosCount > 0
                      ? ` (${invitadosCount})`
                      : ""
              }`,
        consumos: consumos,
        joined: false,
    };
}

function createNewConsumo(
    nombre: string,
    precio: string,
    cantidad: number
): Consumo {
    const id = uuidv4();
    return {
        id: id,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad,
    };
}

function getInvitadoTotal(consumos: Consumo[]): number {
    return consumos.reduce((acc, consumo) => {
        return (
            acc +
            parseFloat(consumo.precio) * consumo.cantidad
        );
    }, 0);
}

export {
    getById,
    createNewCuenta,
    saveCuentasToLocalStorage,
    getCuentasFromLocalStorage,
    createNewInvitado,
    createNewConsumo,
    getInvitadoTotal,
    saveUserToLocalStorage,
    getUserFromLocalStorage,
};
