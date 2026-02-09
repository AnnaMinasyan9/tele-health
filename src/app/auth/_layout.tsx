import { UserRole } from "@shared/models";
import { useAppSelector } from "@shared/store";
import { selectCurrentUserRole, selectIsLoggedIn } from "@shared/store/auth";
import { Redirect, Slot } from "expo-router";

export default function AuthLayout() {
    const authed = useAppSelector(selectIsLoggedIn);
    const role = useAppSelector(selectCurrentUserRole);
        
    if (authed) {        
        return (
            <Redirect
                href={role === UserRole.Doctor ? "/doctor/patients" : "/patient/home"}
            />
        );
    }
    return <Slot />;

}
