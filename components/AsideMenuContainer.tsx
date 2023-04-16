import { useState } from "react";
import { FaBars, FaTimes, FaTrash } from "react-icons/fa";
import { PortalWithState } from "react-portal";

export default function AsideMenuContainer() {
  const [allFolders, setAllFolders] = useState([
    {
      id: 1,
      name: "Folder 1",
    },
    {
      id: 2,
      name: "Folder 2",
    },
  ]);
  return (
    <PortalWithState closeOnOutsideClick closeOnEsc>
      {({ openPortal, closePortal, isOpen, portal }) => (
        <>
          <div className="hamburger">
            <FaBars onClick={openPortal} />
          </div>
          {portal(
            <aside className="aside">
              <div className="aside-title">
                <h3>Notes Folders</h3>
                <FaTimes onClick={closePortal} />
              </div>

              {allFolders.map((folder) => (
                <div
                  className={`aside-item ${folder.id === 1 ? "active" : ""}`}
                  key={folder.id}
                >
                  <h4>{folder.name}</h4>
                  <FaTrash />
                </div>
              ))}
            </aside>
          )}
        </>
      )}
    </PortalWithState>
  );
}
