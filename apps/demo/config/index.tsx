import { ComponentConfig, DropZone } from "@measured/puck";
import ButtonGroup, { buttonGroup } from "./blocks/ButtonGroup";
import Card, { card } from "./blocks/Card";
import Columns, { columns } from "./blocks/Columns";
import Hero, { hero } from "./blocks/Hero";
import Heading, { heading } from "./blocks/Heading";
import Flex, { flex } from "./blocks/Flex";
import Logos, { logos } from "./blocks/Logos";
import Stats, { stats } from "./blocks/Stats";
import Text, { text } from "./blocks/Text";
import VerticalSpace, { verticalSpace } from "./blocks/VerticalSpace";

import Root from "./root";
import { ComponentFields, InferredConfig } from "./types";
import { ComponentProps } from "react";

function componentConfig<Props>(
  config: ComponentFields<Omit<Props, "Zone">>,
  Component: ComponentConfig<Props>["render"]
) {
  if (config.defaultProps.withDropZone) {
    return {
      ...config,
      render: (props) => <Component DropZone={DropZone} {...props} />,
    } as ComponentConfig<Props>;
  }

  return {
    ...config,
    render: Component,
  };
}

// We avoid the name config as next gets confused
export const conf: InferredConfig<ComponentProps<typeof Root>> = {
  root: {
    render: Root,
  },
  components: {
    ButtonGroup: componentConfig(buttonGroup, ButtonGroup),
    Card: componentConfig(card, Card),
    Columns: componentConfig(columns, Columns),
    Flex: componentConfig(flex, Flex),
    Heading: componentConfig(heading, Heading),
    Hero: componentConfig(hero, Hero),
    Logos: componentConfig(logos, Logos),
    Stats: componentConfig(stats, Stats),
    Text: componentConfig(text, Text),
    VerticalSpace: componentConfig(verticalSpace, VerticalSpace),
  },
};

export default conf;
