import css from "./SearchBox.module.css";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";

interface NoteFormProps {
  onSubmit: (searchText: string) => void;
}

export const SearchBox = ({ onSubmit }: NoteFormProps) => {
  const [query, setQuery] = useState("");
  const [debounceSearchQuery] = useDebounce(query, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    if (debounceSearchQuery !== "") {
      onSubmit(debounceSearchQuery);
    }
  }, [debounceSearchQuery, onSubmit]);

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleChange}
      value={query}
    />
  );
};
