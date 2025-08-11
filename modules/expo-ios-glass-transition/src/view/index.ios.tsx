import React from "react";
import { ExpoNativeView } from "~/native-view/index";
import type { ActionPressEvent, GlassEffectTransitionProps } from "../typings";

export const LiquidGlassMorphView: React.FC<GlassEffectTransitionProps> &
  React.FunctionComponent<GlassEffectTransitionProps> = React.memo(
  (
    props: GlassEffectTransitionProps
  ): React.ReactNode & React.JSX.Element & React.ReactElement => {
    return (
      <ExpoNativeView
        {...props}
        onActionPress={(event: any) => {
          const actionEvent: ActionPressEvent =
            event?.nativeEvent as ActionPressEvent;
          if (props.onActionPress) {
            props.onActionPress?.(actionEvent);
          }
        }}
      />
    );
  }
);
LiquidGlassMorphView.displayName = "LiquidGlassMorphView";
