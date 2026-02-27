import { Cuenta } from "@/src/types";

type CuentaListItem = Pick<
    Cuenta,
    "nombre" | "createdAt"
> & {
    _id: string;
};

export type { CuentaListItem };
