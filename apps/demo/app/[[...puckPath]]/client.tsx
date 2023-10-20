"use client";

import { Data } from "@measured/puck";
import { Puck } from "@measured/puck/components/Puck";
import { Button } from "@measured/puck/components/Button";
import headingAnalyzer from "@measured/puck-plugin-heading-analyzer/src/HeadingAnalyzer";
import config from "../../config";
import { join } from "path";
import { useLocalData } from "./hooks";
import { publishPageData } from "./actions";

export default function Client({ path, data }: { path: string; data: Data }) {
  const [localData, setLocalData] = useLocalData(path);

  return (
    <Puck
      config={config}
      data={localData || data}
      onChange={(data: Data) => {
        setLocalData(data);
      }}
      onPublish={(data: Data) => {
        publishPageData(path, data);
      }}
      plugins={[headingAnalyzer]}
      headerPath={path}
      renderHeaderActions={() => (
        <>
          <Button href={join(path, "/preview")} newTab variant="secondary">
            View page
          </Button>
        </>
      )}
    />
  );
}
