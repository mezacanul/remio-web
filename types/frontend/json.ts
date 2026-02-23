import { Cuenta, Invitado, Consumo, User } from "../base";
import type { DocumentProps } from "../metadata";

interface CuentaJSON
    extends Omit<Cuenta, "invitados" | "compartidos">,
        DocumentProps {
    invitados: InvitadoJSON[] | Invitado[];
    compartidos: ConsumoJSON[] | Consumo[];
}
interface InvitadoJSON
    extends Omit<Invitado, "consumos">,
        DocumentProps {
    consumos: ConsumoJSON[] | Consumo[];
}
interface ConsumoJSON extends Consumo, DocumentProps {}
interface UserJSON extends User, DocumentProps {}

export type {
    CuentaJSON,
    InvitadoJSON,
    ConsumoJSON,
    UserJSON,
};
