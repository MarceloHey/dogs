import UserHeader from "./UserHeader";
import Feed from "../feed/Feed";
import UserPhotoPost from "./UserPhotoPost";
import UserStats from "./UserStats";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import NotFound from '../NotFound'
import Head from "../helpers/Head";

export default function User() {
  const data = useContext(UserContext)
  return (
    <section className="container">
      <Head title="Minha conta" />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="/postar" element={<UserPhotoPost />} />
        <Route path="/estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  )
}