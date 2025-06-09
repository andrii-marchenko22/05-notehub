import { fetchNotes } from "../../services/noteService";
import { NoteList } from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import css from "./App.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SearchBox } from "../SearchBox/SearchBox";
import { NoteModal } from "../NoteModal/NoteModal";
import { useDebounce } from "use-debounce";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data } = useQuery({
    queryKey: ["notes", debouncedSearchQuery, currentPage],
    queryFn: () => fetchNotes(debouncedSearchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const handleSearchQuery = (newQuery: string) => {
    setSearchQuery(newQuery);
    setCurrentPage(1);
  };

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={searchQuery} onSearch={handleSearchQuery} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          )}
          <button className={css.button} onClick={openModal}>
            Create note +
          </button>
        </header>

        {isModalOpen && <NoteModal onClose={closeModal} />}
        {notes.length > 0 && <NoteList notes={notes} />}
      </div>
    </>
  );
}

export default App;
