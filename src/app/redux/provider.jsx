"use client";

import { Provider } from "react-redux";
import store from "./store";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
