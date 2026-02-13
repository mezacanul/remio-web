type Consumo = {
    id?: string;
    nombre: string;
    cantidad: number;
    precio: string;
};

type Invitado = {
    id: string;
    nombre: string;
    consumos: Consumo[];
    joined?: boolean;
};

type Cuenta = {
    id?: string | null;
    nombre: string;
    invitados: Invitado[];
    codigo?: string | null;
    createdAt?: string;
    updatedAt?: string;
};

type User = {
    number: number | null;
    token: string | null;
    name: string | null;
};

export type { Consumo, Invitado, Cuenta, User };
