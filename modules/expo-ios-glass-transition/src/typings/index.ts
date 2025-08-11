import type { StyleProp, ViewStyle } from "react-native";
import { SFSymbol } from "sf-symbols-typescript";

export interface GlassAction {
  name?: SFSymbol;
  color?: string;
  imageUrl?: string;

  size?: number;

  width?: number;

  height?: number;

  cornerRadius?: number;
}

export interface ActionPressEvent {
  index: number;

  action: GlassAction;
}
export type ActionOrentation = "horizontal" | "vertical";
export interface GlassEffectTransitionProps {
  isExpanded: boolean;
  orientation?: ActionOrentation;
  actions?: GlassAction[];

  duration?: number
  spacing?: number;

  containerSpacing?: number;

  onToggle?: () => void;
  onActionPress?: (event: ActionPressEvent) => void;

  style?: StyleProp<ViewStyle>;
}
