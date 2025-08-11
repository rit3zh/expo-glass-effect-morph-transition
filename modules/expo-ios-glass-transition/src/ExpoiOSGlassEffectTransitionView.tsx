import { requireNativeView } from "expo";
import * as React from "react";

const NativeView: React.ComponentType<any> = requireNativeView(
  "ExpoiOSGlassEffectTransition"
);

export default function ExpoiOSGlassEffectTransitionView(props: any) {
  return <NativeView {...props} />;
}
