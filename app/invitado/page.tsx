import InvitadoMain from "@/src/components/Invitado/main";
import { Suspense } from "react";

export default function InvitadoPage() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <InvitadoMain />
        </Suspense>
    );
}
