/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig } from "@measured/puck";
import styles from "./styles.module.css";
import { getClassNameFactory } from "@measured/puck/lib";
import { Section } from "../../components/Section";
import { ComponentFields } from "../../types";

const getClassName = getClassNameFactory("Stats", styles);

export type StatsProps = {
  items: {
    title: string;
    description: string;
  }[];
};

export const stats: ComponentFields<StatsProps> = {
  fields: {
    items: {
      type: "array",
      getItemSummary: (item, i) => item.title || `Feature #${i}`,
      defaultItemProps: {
        title: "Title",
        description: "Description",
      },
      arrayFields: {
        title: { type: "text" },
        description: { type: "text" },
      },
    },
  },
  defaultProps: {
    items: [
      {
        title: "Feature",
        description: "Description",
      },
    ],
  },
};

export default function Stats({ items }: StatsProps) {
  return (
    <Section className={getClassName()} maxWidth={"916px"}>
      <div className={getClassName("items")}>
        {items.map((item, i) => (
          <div key={i} className={getClassName("item")}>
            <div className={getClassName("label")}>{item.title}</div>
            <div className={getClassName("value")}>{item.description}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
