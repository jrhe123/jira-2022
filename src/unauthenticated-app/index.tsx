import React, { useState } from "react";
import { LoginScreen } from "unauthenticated-app/login";
import { RegisterScreen } from "unauthenticated-app/register";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={() => setIsRegister(!isRegister)}>
        switch login / register
      </button>
    </div>
  );
};
