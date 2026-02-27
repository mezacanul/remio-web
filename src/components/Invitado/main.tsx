"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
// import { Consumo, Invitado } from "@/src/types";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { useEffect, useMemo } from "react";
import { getInvitadoTotal } from "@/src/utils";
import {
    addInvitadoToCurrentCuenta,
    deleteInvitadoFromCurrentCuenta,
    updateInvitadoInCurrentCuenta,
} from "@/src/features/currentCuentaSlice";
import { updateCuenta } from "@/src/features/cuentasSlice";
import Header from "../Common/Header";
import { BsPersonCircle } from "react-icons/bs";
import NameAndActions from "./NameAndActions";
import BotonAgregarConsumo from "./BotonAgregarConsumo";
import ConsumoForm from "./ConsumoForm";
import ConsumoList from "../Consumo/ConsumoList";
import { useCreateCuentaMutation } from "@/src/store/api/cuentasApi";
import {
    usePushInvitadoMutation,
    useUpdateInvitadoMutation,
} from "@/src/store/api/invitadosApi";
import { Consumo } from "@/types/base";
import { resetCurrentInvitado } from "@/src/features/currentInvitado";
import {
    resetCurrentInvitadoID,
    setCurrentInvitadoID,
} from "@/src/features/currentInvitadoID";
import { useGetInvitadoQuery } from "@/src/store/api/invitadosApi";
import { skipToken } from "@reduxjs/toolkit/query";
import LoadingSpinner from "../Common/LoadingSpinner";
import { toast } from "react-toastify";

export default function InvitadoMain() {
    const [nombre, setNombre] = useState("");
    const [consumo, setConsumo] = useState<Consumo[]>([]);
    const currentCuentaID = useSelector(
        (state: RootState) => state.currentCuentaID.id
    );
    const currentInvitadoID = useSelector(
        (state: RootState) => state.currentInvitadoID.id
    );
    const {
        data: currentInvitadoData,
        isLoading,
        isFetching,
        error,
    } = useGetInvitadoQuery({
        id: currentInvitadoID,
        cuenta: currentCuentaID,
    });
    // const currentInvitado = useSelector(
    //     (state: RootState) => state.currentInvitado
    // );
    const [createCuenta] = useCreateCuentaMutation();
    const [pushInvitado] = usePushInvitadoMutation();
    const [updateInvitado] = useUpdateInvitadoMutation();

    useEffect(() => {
        if (currentInvitadoData) {
            console.log(
                "currentInvitadoData",
                currentInvitadoData
            );
            setNombre(currentInvitadoData.nombre);
            setConsumo(currentInvitadoData.consumo);
        }
    }, [currentInvitadoData]);

    async function handleSaveAndNavigate(
        navigate: boolean = false,
        route: string | null = null
    ) {
        const trimmedNombre = nombre.trim();

        // Validate: there is a name or consumo
        if (trimmedNombre != "" || consumo.length > 0) {
            // Validate: there is no current invitado (push)
            if (!currentInvitadoID) {
                console.log("pushing new invitado");

                const response = await pushInvitado({
                    nombre: trimmedNombre,
                    consumo: consumo,
                    cuentaID: currentCuentaID,
                }).unwrap();
                console.log("response", response);
                console.log("pushing new invitado");
            }
            // Validate: there is a current invitado (update)
            else if (currentInvitadoID) {
                const payload = {
                    cuentaID: currentCuentaID,
                    invitadoID: currentInvitadoID,
                    nombre: trimmedNombre,
                    consumo: consumo,
                };
                const response = await updateInvitado(
                    payload
                ).unwrap();
                console.log("response", response);
                console.log("updating invitado");
            }
        }
        if (navigate && route) {
            navigation.push(route);
            dispatch(resetCurrentInvitado());
        }
    }

    // ---------------------------------------------------
    // ---------------------------------------------------

    // const searchParams = useSearchParams();
    // const id = searchParams.get("id");
    // const [currentInvitado, setCurrentInvitado] =
    //     useState<Invitado | null>(null);
    const navigation = useRouter();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [consumos, setConsumos] = useState<Consumo[]>([]);
    const currentCuenta = useSelector(
        (state: RootState) => state.currentCuenta
    );
    const dispatch = useDispatch();
    const total = useMemo(() => {
        return getInvitadoTotal(consumo);
    }, [consumo]);
    const [currentConsumo, setCurrentConsumo] =
        useState<Consumo | null>(null);

    const mtClass = total > 0 ? "" : "mt-5";

    // useEffect(() => {
    //     if (id) {
    //         const invitado = getById(
    //             currentCuenta.invitados,
    //             id
    //         );
    //         if (invitado) {
    //             setCurrentInvitado(invitado);
    //             setNombre(invitado.nombre);
    //             setConsumos(invitado.consumos);
    //         }
    //     }
    // }, [id]);

    // function handleSaveAndNavigate(
    //     navigate: boolean = false,
    //     route: string | null = null
    // ) {
    //     console.log("handleSaveAndNavigate");
    //     const trimmedNombre = nombre.trim();
    //     const hasName = trimmedNombre != "";
    //     if (hasName || consumos.length > 0) {
    //         console.log("hasName or consumos.length > 0");
    //         let newInvitado: Invitado;
    //         if (!currentInvitado) {
    //             newInvitado = createNewInvitado(
    //                 trimmedNombre,
    //                 consumos,
    //                 currentCuenta.invitados.length
    //             );
    //             dispatch(
    //                 addInvitadoToCurrentCuenta(newInvitado)
    //             );
    //         } else {
    //             newInvitado = {
    //                 ...currentInvitado,
    //                 nombre: trimmedNombre,
    //                 consumos: consumos,
    //             };
    //             dispatch(
    //                 updateInvitadoInCurrentCuenta(
    //                     newInvitado
    //                 )
    //             );
    //         }
    //     }
    //     if (navigate && route) {
    //         navigation.push(route);
    //     }
    // }

    // useEffect(() => {
    //     dispatch(updateCuenta(currentCuenta));
    // }, [currentCuenta]);

    // function onAddConsumo(consumo: Consumo) {
    //     setConsumos([...consumos, consumo]);
    // }

    // function onUpdateConsumo(consumo: Consumo) {
    //     setConsumos(
    //         consumos.map((c) =>
    //             c.id === consumo.id ? consumo : c
    //         )
    //     );
    // }

    // function handleDeleteConsumo(consumo: Consumo) {
    //     setConsumos(
    //         consumos.filter((c) => c.id !== consumo.id)
    //     );
    // }

    // function onDeleteInvitado() {
    //     dispatch(
    //         deleteInvitadoFromCurrentCuenta(
    //             currentInvitado?.id as string
    //         )
    //     );
    //     navigation.push("/cuenta");
    // }

    async function handleAddConsumo(form: any) {
        // Validate: there is no current invitado
        if (!currentInvitadoID && consumo.length == 0) {
            // Push new invitado with consumo
            console.log(
                "pushing new invitado with consumo"
            );
            const response = await pushInvitado({
                nombre: nombre,
                consumo: [form],
                cuentaID: currentCuentaID,
            }).unwrap();
            console.log("response", response);
            dispatch(setCurrentInvitadoID(response._id));
            setConsumo(response.consumo);
        } else {
            console.log("updating invitado with consumo");
            const response = await updateInvitado({
                cuentaID: currentCuentaID,
                invitadoID: currentInvitadoID,
                nombre: nombre,
                consumo: [...consumo, form],
            }).unwrap();
            console.log("response", response);
            setConsumo(response.consumo);
        }
        setIsFormOpen(false);
    }

    // useEffect(() => {
    //     handleSaveAndNavigate(false);
    // }, [consumo]);

    if (isLoading || isFetching) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="w-full">
            <Header
                title={`Invitado`}
                onBack={() => {
                    // navigation.push("/cuenta");
                    handleSaveAndNavigate(true, "/cuenta");
                    dispatch(resetCurrentInvitadoID());
                }}
            />
            <div className="flex items-center gap-2 mt-2 w-full">
                {/* <span className="">
                    <BsPersonCircle size={24} />
                </span> */}
                <div className="w-full">
                    <NameAndActions
                        nombre={nombre}
                        setNombre={setNombre}
                        onDeleteInvitado={
                            () => {}
                            // onDeleteInvitado
                        }
                    />
                </div>
            </div>

            {total > 0 && (
                <div className="flex flex-col gap-1 items-center justify-center mt-4">
                    <p className="font-bold">{"Total"}</p>
                    <p className="font-bold text-2xl text-remiu-primary">
                        {`$${total.toFixed(2)}`}
                    </p>
                </div>
            )}

            <div className={`${mtClass} w-[100%]`}>
                {!isFormOpen && consumo.length == 0 && (
                    <div className="flex justify-center">
                        <BotonAgregarConsumo
                            title="Agregar Consumo +"
                            onClick={() => {
                                if (nombre == "") {
                                    toast.error(
                                        "Agregar un nombre al invitado"
                                    );
                                    return;
                                }
                                setIsFormOpen(true);
                            }}
                        />
                    </div>
                )}
                {isFormOpen && (
                    <ConsumoForm
                        onClose={() => setIsFormOpen(false)}
                        onAddConsumo={
                            handleAddConsumo
                            // () => {
                            //     setConsumo([
                            //         ...consumo,
                            //         currentConsumo as Consumo,
                            //     ]);
                            // }
                            // onAddConsumo
                        }
                        onUpdateConsumo={
                            () => {}
                            // onUpdateConsumo
                        }
                        currentConsumo={currentConsumo}
                        setCurrentConsumo={
                            setCurrentConsumo
                        }
                        handleDeleteConsumo={
                            () => {}
                            // handleDeleteConsumo
                        }
                    />
                )}
                {consumo.length > 0 && (
                    <div className="mt-2 mb-5 w-[100%]">
                        <ConsumoList
                            consumo={consumo}
                            setIsFormOpen={setIsFormOpen}
                            setCurrentConsumo={
                                () => {}
                                // setCurrentConsumo
                            }
                            disableAddConsumo={isFormOpen}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
