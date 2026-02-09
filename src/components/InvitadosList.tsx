import InvitadoItem from "./InvitadoItem";
import { useRouter } from "next/navigation";

export default function InvitadosList() {
    const navigation = useRouter();
    return (
        <div className="flex flex-col gap-2">
            {invitados.map((invitado) => (
                <InvitadoItem
                    key={invitado.nombre}
                    nombre={invitado.nombre}
                    monto={invitado.monto}
                    joined={invitado.joined}
                    onClick={() => {
                        navigation.push(
                            `/consumo/${invitado.nombre}`
                        );
                    }}
                />
            ))}
        </div>
    );
}

const invitados = [
    {
        nombre: "Jose Meza",
        monto: "$3,500.00",
        joined: false,
    },
    {
        nombre: "Juan Perez",
        monto: "$12,450.00",
        joined: true,
    },
    {
        nombre: "Maria Lopez",
        monto: "$100.00",
        joined: false,
    },
    {
        nombre: "Pedro Garcia",
        monto: "$100.00",
        joined: true,
    },
    {
        nombre: "Ana Rodriguez",
        monto: "$100.00",
        joined: false,
    },
    {
        nombre: "Luis Martinez",
        monto: "$100.00",
        joined: true,
    },
    {
        nombre: "Carlos Ramirez",
        monto: "$100.00",
        joined: true,
    },
    {
        nombre: "Laura Hernandez",
        monto: "$100.00",
        joined: false,
    },
    {
        nombre: "Diego Gonzalez",
        monto: "$100.00",
        joined: false,
    },
    {
        nombre: "Sofia Perez",
        monto: "$100.00",
        joined: false,
    },
];
