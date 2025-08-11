import { requireNativeView } from "expo";
import * as constants from "~/constants/index";
import type { GlassEffectTransitionProps } from "~/typings/index";

export const ExpoNativeView: React.ComponentType<GlassEffectTransitionProps> =
  requireNativeView<GlassEffectTransitionProps>(
    constants.Module.Name,
    constants.Module.View
  );
