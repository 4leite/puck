"use client";

import React from "react";
import styles from "./styles.module.css";
import { getClassNameFactory } from "@measured/puck/lib";
import { Button } from "@measured/puck/components/Button";
import { Section } from "../../components/Section";
import { ComponentFields } from "../../types";

const getClassName = getClassNameFactory("ButtonGroup", styles);

export type ButtonGroupProps = {
  align?: string;
  buttons: { label: string; href: string; variant: "primary" | "secondary" }[];
};

export const buttonGroup: ComponentFields<ButtonGroupProps> = {
  fields: {
    buttons: {
      type: "array",
      getItemSummary: (item) => item.label || "Button",
      arrayFields: {
        label: { type: "text" },
        href: { type: "text" },
        variant: {
          type: "radio",
          options: [
            { label: "primary", value: "primary" },
            { label: "secondary", value: "secondary" },
          ],
        },
      },
      defaultItemProps: {
        label: "Button",
        href: "#",
        variant: "primary",
      },
    },
    align: {
      type: "radio",
      options: [
        { label: "left", value: "left" },
        { label: "center", value: "center" },
      ],
    },
  },
  defaultProps: {
    buttons: [{ label: "Learn more", href: "#", variant: "primary" }],
  },
};

export default function ButtonGroup({ align, buttons }: ButtonGroupProps) {
  return (
    <Section className={getClassName({ center: align === "center" })}>
      <div className={getClassName("actions")}>
        {buttons.map((button, i) => (
          <Button
            key={i}
            href={button.href}
            variant={button.variant}
            size="large"
          >
            {button.label}
          </Button>
        ))}
      </div>
    </Section>
  );
}
