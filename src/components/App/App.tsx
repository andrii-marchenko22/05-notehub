import { createNote, fetchNotes } from "../../services/noteService";
import { NoteList } from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import css from "./App.module.css";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { SearchBox } from "../SearchBox/SearchBox";
import { NoteModal } from "../NoteModal/NoteModal";
import { useDebounce } from "use-debounce";
import type { NewPostCreate } from "../../types/note";

function App() {
  const QueryClient = useQueryClient();

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

  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / 12) : 0;
  const notes = data?.notes ?? [];

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => QueryClient.invalidateQueries({ queryKey: ["notes"] }),
  });

  const handleCreateNote = (noteData: NewPostCreate) => {
    mutation.mutate(noteData);
  };

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={searchQuery} onSearch={handleSearchQuery} />
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

        {isModalOpen && (
          <NoteModal onClose={closeModal} onCreate={handleCreateNote} />
        )}
        {notes.length > 0 && <NoteList notes={notes} />}
      </div>
    </>
  );
}

export default App;
