import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (searchText: string) => void;
}

export const SearchBox = ({ value, onSearch }: SearchBoxProps) => {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={(event) => onSearch(event.target.value)}
      value={value}
    />
  );
};
