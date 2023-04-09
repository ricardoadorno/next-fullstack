import NotesDisplay from "@/components/NotesDisplay";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { FaTrash } from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";

export default function Home() {
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

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      return res.json();
    },
  });

  return (
    <>
      {isAuthenticated ? (
        <header>
          <h3>Name</h3>
          <button type="button">Logout</button>
        </header>
      ) : (
        <header>
          <h3>Login</h3>
          <form>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
          <button type="button">Register</button>
        </header>
      )}

      <aside>
        <h3>Notes Folders</h3>
        {allFolders.map((folder) => (
          <div key={folder.id}>
            <h4>{folder.name}</h4>
            <FaTrash />
          </div>
        ))}
      </aside>

      <NotesDisplay />

      <ClipLoader
        color="red"
        loading={isLoading}
        size={50}
        aria-label="Loading Spinner"
      />

      {todos &&
        todos.map((todo) => (
          <div key={todo.id}>
            <h4>{todo.title}</h4>
            <p>{todo.completed ? "Completed" : "Not Completed"}</p>
          </div>
        ))}
    </>
  );
}
