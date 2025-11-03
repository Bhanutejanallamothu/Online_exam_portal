import { createContext, useState, useContext, useEffect } from "react";
const AuthContext = createContext();
export function AuthProvider({ children }) {
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem("isAdminLoggedIn") === "true";
  });

  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(() => {
    return sessionStorage.getItem("isTeacherLoggedIn") === "true";
  });

  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(() => {
    return sessionStorage.getItem("isStudentLoggedIn") === "true";
  });

  useEffect(() => {
    sessionStorage.setItem("isAdminLoggedIn", isAdminLoggedIn);
    sessionStorage.setItem("isTeacherLoggedIn", isTeacherLoggedIn);
    sessionStorage.setItem("isStudentLoggedIn", isStudentLoggedIn);
  }, [isAdminLoggedIn, isTeacherLoggedIn, isStudentLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        isTeacherLoggedIn,
        setIsTeacherLoggedIn,
        isStudentLoggedIn,
        setIsStudentLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
