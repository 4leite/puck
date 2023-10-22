import { rootDroppableId } from "@measured/puck/lib/root-droppable-id";
import * as Components from "../../config/blocks";
import { setupZone } from "@measured/puck/lib/setup-zone";
import Root from "../../config/root";
import { getPageData } from "./actions";
import { Data } from "@measured/puck";

function getContent(data: Data, areaId: string, zone: string) {
  if (zone === rootDroppableId) {
    return data?.content || [];
  }

  const zoneCompound = `${areaId}:${zone}`;
  return setupZone(data, zoneCompound).zones[zoneCompound];
}

async function RenderDropZone({
  data,
  areaId = "root",
  zone,
}: {
  data?: Data;
  areaId?: string;
  zone: string;
}) {
  if (!data) {
    return null;
  }

  const content = getContent(data, areaId, zone);

  return (
    <>
      {content.map((item) => {
        const Component = Components[item.type];

        if (item.props.withDropZone) {
          return (
            <Component
              key={item.props.id}
              DropZone={({ zone }) => (
                <RenderDropZone
                  data={data}
                  areaId={item.props.id}
                  zone={zone}
                />
              )}
              {...item.props}
            />
          );
        }

        if (Component) {
          return <Component key={item.props.id} {...item.props} />;
        }

        return null;
      })}
    </>
  );
}

export async function Render({
  data,
  suffix,
}: {
  data: Data;
  suffix?: string;
}) {
  return (
    <Root {...data.root} suffix={suffix} editMode={false}>
      <RenderDropZone data={data} zone={rootDroppableId} />;
    </Root>
  );
}
