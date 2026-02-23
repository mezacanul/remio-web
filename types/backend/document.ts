import { Document } from "mongoose";
import { Cuenta, Invitado, Consumo, User } from "../base";
import type { DocumentProps } from "../metadata";

interface CuentaDocument
    extends Omit<Cuenta, "invitados" | "compartidos">,
        Document,
        Omit<DocumentProps, "_id"> {
    invitados: InvitadoDocument[] | Invitado[];
    compartidos: ConsumoDocument[] | Consumo[];
}
interface InvitadoDocument
    extends Omit<Invitado, "consumos">,
        Document,
        Omit<DocumentProps, "_id"> {
    consumos: ConsumoDocument[] | Consumo[];
}
interface ConsumoDocument
    extends Consumo,
        Document,
        Omit<DocumentProps, "_id"> {}
interface UserDocument
    extends User,
        Document,
        Omit<DocumentProps, "_id"> {}

export type {
    ConsumoDocument,
    InvitadoDocument,
    CuentaDocument,
    UserDocument,
};
