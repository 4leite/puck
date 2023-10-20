"use client";

import config from "../../config";
import { Data, Render as PuckRender } from "@measured/puck";

export function Render({ data }: { data: Data }) {
  return <PuckRender config={config} data={data} />;
}
