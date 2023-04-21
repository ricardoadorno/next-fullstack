import NotesDisplay from "@/containers/NotesDisplay";
import ModalContainer from "@/containers/ModalContainer";
import HeaderContainer from "@/containers/HeaderContainer";
import AsideMenuContainer from "@/containers/AsideMenuContainer";

export default function Home() {
  return (
    <>
      <ModalContainer />
      {/* <AsideMenuContainer /> */}
      <HeaderContainer />
      <NotesDisplay />
    </>
  );
}
