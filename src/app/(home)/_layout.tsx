import { useAppSelector } from "@shared/store";
import { selectIsLoggedIn } from "@shared/store/auth";
import { Redirect, Slot } from "expo-router";

export default function HomeLayout() {
  const authed = useAppSelector(selectIsLoggedIn);

  if (!authed) {
    return <Redirect href="/auth/login" />;
  }

  return <Slot />;
}
