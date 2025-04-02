import { atom } from "jotai";
import useSecureStore from "../hooks/useSecureStore";

// Atoms for state management
export const isAuthenticated = atom(false);
export const user = atom(null); // user can be null initially
export const accessToken = atom(null); // token can be null initially

// Atom to handle setting authentication state
export const setAuthenticated = atom(null, (get, set, data) => {
  const { setKey } = useSecureStore();
  if (data) {
    set(user, data?.user);
    set(isAuthenticated, true);
    set(accessToken, data?.token);
    setKey("dtrack-token", data?.token);
  }
});

export const setToken = atom(null, (get, set, data) => {
  if (data) {
    set(accessToken, data);
  }
});
// Atom to handle logging out and clearing data
export const LogoutUser = atom(null, (get, set) => {
  const { clearStore } = useSecureStore();
  set(isAuthenticated, false);
  set(user, null);
  set(accessToken, null);
  clearStore();
});
