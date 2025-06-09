import axios from "axios";
import type { Note, NewPostCreate } from "../types/note";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api/notes";

interface notesRes {
  notes: Note[];
  page: number;
  totalPage: number;
  totalCount: number;
}

export const fetchNotes = async (
  searchText: string,
  page = 1,
  perPage = 12
): Promise<notesRes> => {
  const response = await axios.get<notesRes>(BASE_URL, {
    params: {
      ...(searchText !== "" && { search: searchText }),
      page,
      perPage,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const totalCount = Number(response.headers["x-total-count"]);

  return { ...response.data, totalCount };
};

export const createNote = async (noteData: NewPostCreate) => {
  const response = await axios.post(BASE_URL, noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteNote = async (notesId: number) => {
  const response = await axios.delete(`${BASE_URL}/${notesId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
