import axios from "axios";
import type { Note } from "../types/note";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const getNotes = async (
  searchText: string,
  page: number
): Promise<{ notes: Note[]; totalCount: number }> => {
  const responce = await axios.get<Note[]>("/notes", {
    params: {
      ...(searchText !== "" && { q: searchText }),
      _page: page,
      _limit: 10,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const totalCount = Number(responce.headers["x-total-count"]);

  return {
    notes: responce.data,
    totalCount,
  };
};
