import NotesDisplay from "@/components/NotesDisplay";
import ModalContainer from "@/components/ModalContainer";
import HeaderContainer from "@/components/HeaderContainer";
import AsideMenuContainer from "@/components/AsideMenuContainer";

export default function Home() {
  return (
    <>
      <ModalContainer />
      <AsideMenuContainer />
      <HeaderContainer />
      <NotesDisplay />
    </>
  );
}
