import React from "react";
import styles from "./styles.module.css";
import { getClassNameFactory } from "@measured/puck/lib";
import { Section } from "../../components/Section";
import { PropsWithDropZone, ComponentFields } from "../../types";

const getClassName = getClassNameFactory("Columns", styles);

export type ColumnsProps = PropsWithDropZone<{
  distribution: "auto" | "manual";
  columns: {
    span?: number;
  }[];
}>;

export const columns: ComponentFields<ColumnsProps> = {
  fields: {
    distribution: {
      type: "radio",
      options: [
        {
          value: "auto",
          label: "Auto",
        },
        {
          value: "manual",
          label: "Manual",
        },
      ],
    },
    columns: {
      type: "array",
      getItemSummary: (col, id) =>
        `Column ${id + 1}, span ${
          col.span ? Math.max(Math.min(col.span, 12), 1) : "auto"
        }`,
      arrayFields: {
        span: {
          label: "Span (1-12)",
          type: "number",
        },
      },
    },
  },
  defaultProps: {
    distribution: "auto",
    columns: [{}, {}],
    withDropZone: true,
  },
};

export default function Columns({
  columns,
  distribution,
  DropZone,
}: ColumnsProps) {
  return (
    <Section>
      <div
        className={getClassName()}
        style={{
          gridTemplateColumns:
            distribution === "manual"
              ? "repeat(12, 1fr)"
              : `repeat(${columns.length}, 1fr)`,
        }}
      >
        {columns.map(({ span }, idx) => (
          <div
            key={idx}
            style={{
              gridColumn:
                span && distribution === "manual"
                  ? `span ${Math.max(Math.min(span, 12), 1)}`
                  : "",
            }}
          >
            <DropZone zone={`column-${idx}`} />
          </div>
        ))}
      </div>
    </Section>
  );
}
