"use client";

import { useLocalData } from "./hooks";
import { Data } from "@measured/puck";
import { Render } from "./render";

export default function Preview({ path, data }: { path: string; data: Data }) {
  const [localData] = useLocalData(path);

  return <Render data={localData || data} suffix="/preview" />;
}
