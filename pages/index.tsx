import NotesDisplay from "@/containers/NotesDisplay";
import ModalContainer from "@/containers/ModalContainer";
import HeaderContainer from "@/containers/HeaderContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";
import { useEffect } from "react";
import { CgNotes } from "react-icons/cg";

export default function Home() {
  const dispatch = useDispatch();

  // TODO Auth
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const user = localStorage.getItem("user");

  //   if (token && user) {
  //     dispatch({
  //       type: "auth/login",
  //       payload: {
  //         isAuth: true,
  //         user: JSON.parse(user),
  //         token,
  //       },
  //     });
  //   }
  // }, []);

  const auth = useSelector((state: RootState) => state.auth);

  return (
    <>
      <h1>Leave a Note!</h1>
      <ModalContainer />
      <NotesDisplay />
    </>

    // <>
    //   <ModalContainer />
    //   <HeaderContainer />
    //   {auth.isAuth ? <NotesDisplay /> : <EmptyNotesDisplay />}
    // </>
  );
}

// const EmptyNotesDisplay = () => {
//   return (
//     <div className="logout-display">
//       Login or register to see your notes!
//       <CgNotes className="logout-display__icon" />
//     </div>
//   );
// };
