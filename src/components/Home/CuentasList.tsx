import CuentaItem from "./CuentaItem";
import { CuentaListItem } from "@/types/main";

export default function CuentasList({
  cuentas,
}: {
  cuentas: CuentaListItem[];
}) {
  return (
      <div className="flex flex-col gap-2 py-4">
          {cuentas.map((cuenta, index) => (
              <CuentaItem
                  key={index}
                  idx={index}
                  cuenta={cuenta}
              />
          ))}
      </div>
  );
}