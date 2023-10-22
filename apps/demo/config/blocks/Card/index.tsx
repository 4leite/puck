/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./styles.module.css";
import { getClassNameFactory } from "@measured/puck/lib";
import * as reactFeather from "react-feather";
import { ComponentFields } from "../../types";

const getClassName = getClassNameFactory("Card", styles);

const icons = Object.keys(reactFeather).reduce((acc, iconName) => {
  if (typeof reactFeather[iconName] === "object") {
    const El = reactFeather[iconName];

    return {
      ...acc,
      [iconName]: <El />,
    };
  }

  return acc;
}, {});

const iconOptions = Object.keys(reactFeather).map((iconName) => ({
  label: iconName,
  value: iconName as keyof typeof reactFeather,
}));

export type CardProps = {
  title: string;
  description: string;
  icon?: "Feather";
  mode: "flat" | "card";
};

export const card: ComponentFields<CardProps> = {
  fields: {
    title: { type: "text" },
    description: { type: "textarea" },
    icon: {
      type: "select",
      options: iconOptions,
    },
    mode: {
      type: "radio",
      options: [
        { label: "card", value: "card" },
        { label: "flat", value: "flat" },
      ],
    },
  },
  defaultProps: {
    title: "Title",
    description: "Description",
    icon: "Feather",
    mode: "flat",
  },
};

export default function Card({ title, icon, description, mode }: CardProps) {
  return (
    <div className={getClassName({ [mode]: mode })}>
      <div className={getClassName("icon")}>{icons[icon]}</div>
      <div className={getClassName("title")}>{title}</div>
      <div className={getClassName("description")}>{description}</div>
    </div>
  );
}
