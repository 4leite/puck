import React from "react";
import styles from "./styles.module.css";
import { getClassNameFactory } from "@measured/puck/lib";
import { Section } from "../../components/Section";

import { ComponentFields, PropsWithDropZone } from "../../types";

const getClassName = getClassNameFactory("Flex", styles);

export type FlexProps = {
  items: { minItemWidth?: number }[];
  minItemWidth: number;
};

export const flex: ComponentFields<FlexProps> = {
  fields: {
    items: {
      type: "array",
      arrayFields: {
        minItemWidth: {
          label: "Minimum Item Width",
          type: "number",
        },
      },
      getItemSummary: (_, id) => `Item ${id + 1}`,
    },
    minItemWidth: {
      label: "Minimum Item Width",
      type: "number",
    },
  },
  defaultProps: {
    items: [{}, {}],
    minItemWidth: 356,
  },
};

export default function Flex({
  items,
  minItemWidth,
  DropZone,
}: PropsWithDropZone<FlexProps>) {
  return (
    <Section>
      <div className={getClassName()}>
        {items.map((item, idx) => (
          <div
            key={idx}
            className={getClassName("item")}
            style={{ minWidth: item.minItemWidth || minItemWidth }}
          >
            <DropZone zone={`item-${idx}`} />
          </div>
        ))}
      </div>
    </Section>
  );
}
