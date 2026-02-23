interface Cuenta {
    nombre: string;
    codigo: string | null;
    userId: string;
    invitados: Invitado[];
    sharedConsumos: Consumo[];
}

interface Invitado {
    nombre: string;
    consumo: Consumo[];
}

interface Consumo {
    nombre: string;
    cantidad: number;
    precio: number;
}

interface User {
    _id: string;
    nombres: string | null;
    apellidos: string | null;
    email: string | null;
    profilePicture: string | null;
    token: string | null;
}

export type { Consumo, Invitado, Cuenta, User };
