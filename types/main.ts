import { Cuenta } from "@/src/types";

type CuentaListItem = Pick<
    Cuenta,
    "nombre" | "createdAt"
> & {
    _id: string;
};

type NameAndActionsProps = {
    nameRef?: React.RefObject<HTMLInputElement | null>;
    nombre: string;
    setNombre: (nombre: string) => void;
    createdAt: string | undefined;
    onDeleteCuenta: () => void;
};

export type { CuentaListItem, NameAndActionsProps };
