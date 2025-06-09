import { fetchNotes } from "../../services/noteService";
import { NoteList } from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SearchBox } from "../SearchBox/SearchBox";
import { NoteModal } from "../NoteModal/NoteModal";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const perPage = 10;

  const { data } = useQuery({
    queryKey: ["notes", searchQuery, currentPage, perPage],
    queryFn: () => fetchNotes(searchQuery, currentPage, perPage),
    // enabled: searchQuery !== "",
    placeholderData: keepPreviousData,
  });

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil((data?.totalCount ?? 0) / perPage);
  const notes = data?.notes ?? [];

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onSubmit={handleSearch} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        </header>
        <NoteList notes={notes} />
        {isModalOpen && <NoteModal onClose={closeModal} />}
      </div>
    </>
  );
}

export default App;
