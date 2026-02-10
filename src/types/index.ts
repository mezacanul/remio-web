type Consumo = {
    id: string;
    nombre: string;
    cantidad: number;
    precio: number;
};

type Invitado = {
    id: string;
    nombre: string;
    consumos: Consumo[];
};

type Cuenta = {
    id: string;
    nombre: string;
    invitados: Invitado[];
    codigo: string;
    createdAt: string;
    updatedAt: string;
};

export type { Consumo, Invitado, Cuenta };