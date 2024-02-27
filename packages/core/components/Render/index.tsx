"use client";

import { rootDroppableId } from "../../lib/root-droppable-id";
import { Config, Data } from "../../types/Config";
import { DropZone, DropZoneRenderProvider } from "../DropZone";

export function Render<
  UserConfig extends Config<any, any, any> = Config<any, any, any>
>({ config, data }: { config: UserConfig; data: Data }) {
  // DEPRECATED
  const rootProps = data.root.props || data.root;
  const title = rootProps?.title || "";

  if (config.root?.render) {
    return (
      <DropZoneRenderProvider value={{ data, config, mode: "render" }}>
        <config.root.render
          {...rootProps}
          puck={{
            renderDropZone: DropZone,
          }}
          title={title}
          editMode={false}
          id={"puck-root"}
        >
          <DropZone zone={rootDroppableId} />
        </config.root.render>
      </DropZoneRenderProvider>
    );
  }

  return (
    <DropZoneRenderProvider value={{ data, config, mode: "render" }}>
      <DropZone zone={rootDroppableId} />
    </DropZoneRenderProvider>
  );
}
