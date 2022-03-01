import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginLostPassword from "./LoginLostPassword";
import LoginResetPassword from "./LoginResetPassword";
import LoginCreate from "./LoginCreate";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import styles from '../../styles/form/Login.module.css'
import NotFound from "../NotFound";

export default function Home() {
  const { login } = useContext(UserContext)
  if (login === true) return <Navigate to='/conta' />
  return (
    <div className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/criar" element={<LoginCreate />} />
          <Route path="/perdeu" element={<LoginLostPassword />} />
          <Route path="/resetar" element={<LoginResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}