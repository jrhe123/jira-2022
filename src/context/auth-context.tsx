import React, { ReactNode, useCallback, useState } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { useDispatch, useSelector } from "react-redux";
//
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import * as authStore from "store/auth.slice";
import { RootState } from "store";

export interface AuthForm {
  username: string;
  password: string;
}

// interface IContext {
//   user: User | null;
//   login: (form: AuthForm) => Promise<void>;
//   register: (form: AuthForm) => Promise<void>;
//   logout: () => Promise<void>;
// }
// const AuthContext = React.createContext<IContext | undefined>(undefined);
// AuthContext.displayName = "AuthContext";

// fetch user info while refresh
export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", {
      token,
    });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {
    // data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    // setData: setUser,
  } = useAsync<User | null>();

  const dispatch: (...args: unknown[]) => Promise<User> = useTypedDispatch();

  // const login = (form: AuthForm) => auth.login(form).then(setUser);
  // const register = (form: AuthForm) => auth.register(form).then(setUser);
  // const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    // run(bootstrapUser());
    run(dispatch(bootstrapUser()));
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
    // <AuthContext.Provider
    //   value={{
    //     user,
    //     login,
    //     register,
    //     logout,
    //   }}
    //   children={children}
    // />
    <div>{children}</div>
  );
};

export const useAuth = () => {
  // const context = React.useContext(AuthContext);
  // if (!context) {
  //   throw new Error("useAuth requires AuthProvider");
  // }
  const dispatch: (...args: unknown[]) => Promise<User> = useTypedDispatch();
  const user = useSelector(authStore.selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);

  return {
    user,
    login,
    register,
    logout,
  };
};

export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
