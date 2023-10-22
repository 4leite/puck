import React from "react";
import { spacingOptions } from "../../options";
import { ComponentFields } from "../../types";

export type VerticalSpaceProps = {
  size: string;
};

export const verticalSpace: ComponentFields<VerticalSpaceProps> = {
  fields: {
    size: {
      type: "select",
      options: spacingOptions,
    },
  },
  defaultProps: {
    size: "24px",
  },
};

export default function VerticalSpace({ size }: VerticalSpaceProps) {
  return <div style={{ height: size, width: "100%" }} />;
}
