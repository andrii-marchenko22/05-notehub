import { Riple } from "react-loading-indicators";

import css from "./Loader.module.css";

export const Loader = () => (
  <div className={css.loader}>
    <Riple color="#32cd32" size="medium" text="" textColor="" />
  </div>
);
