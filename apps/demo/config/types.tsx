import {
  DropZone,
  ComponentConfig,
  DefaultRootProps,
  DefaultComponentProps,
} from "@measured/puck";
import { PropsWithChildren } from "react";

export type PropsWithDropZone<T> = T & { DropZone: typeof DropZone };

export type ComponentFields<Props> = {
  fields: ComponentConfig<Omit<Props, "DropZone">>["fields"];
  defaultProps: ComponentConfig<Omit<Props, "DropZone">>["defaultProps"] & {
    withDropZone?: boolean;
  };
};

export type InferredConfig<
  RootProps extends DefaultRootProps = DefaultRootProps,
  ComponentProps extends DefaultComponentProps = DefaultComponentProps
> = {
  components: {
    [key: string]: ComponentConfig<ComponentProps>;
  };
  root?: ComponentConfig<
    PropsWithChildren<RootProps>,
    Partial<PropsWithChildren<RootProps>>
  >;
};
