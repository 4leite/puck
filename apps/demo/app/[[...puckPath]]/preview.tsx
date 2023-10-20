"use client";

import { Render } from "@measured/puck/components/Render";
import config from "../../config";
import { useLocalData } from "./hooks";
import { Data } from "@measured/puck";

export default function Edit({ path, data }: { path: string; data: Data }) {
  const [localData] = useLocalData(path);

  return <Render config={config} data={localData || data} />;
}
