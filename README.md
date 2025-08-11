# 🧪 expo-liquid-glass-morph-view

A **work-in-progress** iOS-only React Native view that brings native glass morphing effects with smooth expand/collapse animations. Fork, tweak, and enjoy!

## ✨ Features

- 📱 Native iOS glass morph animation
- 🎯 Supports horizontal / vertical layouts
- 🖼️ Custom SF Symbols or images for actions
- ⚡ Adjustable spacing, duration, and styling
- 🎬 Built-in expand/collapse with `isExpanded` prop

## 🛠️ Installation

1. **Fork** this repo
2. Run:

   ```sh
   pod install
   pnpm ios
   ```

---

## 📦 Props

| Prop               | Type                                | Default        | Description                                             |
| ------------------ | ----------------------------------- | -------------- | ------------------------------------------------------- |
| `isExpanded`       | `boolean`                           | **required**   | Toggles the expanded/collapsed state of the glass view. |
| `orientation`      | `"horizontal"` \| `"vertical"`      | `"horizontal"` | Direction in which actions are laid out.                |
| `actions`          | `GlassAction[]`                     | `[]`           | List of action buttons with icon, color, or image.      |
| `duration`         | `number`                            | `300`          | Animation duration in milliseconds.                     |
| `spacing`          | `number`                            | `8`            | Space between each action button.                       |
| `containerSpacing` | `number`                            | `0`            | Padding between the glass container and actions.        |
| `onToggle`         | `() => void`                        | `undefined`    | Called when the expand/collapse state is toggled.       |
| `onActionPress`    | `(event: ActionPressEvent) => void` | `undefined`    | Called when an action button is pressed.                |
| `style`            | `StyleProp<ViewStyle>`              | `undefined`    | Custom styles for the container.                        |

---

## 🚀 Usage

```tsx
import { LiquidGlassMorphView } from "~/native-view/LiquidGlassMorphView";

<LiquidGlassMorphView
  isExpanded={true}
  orientation="horizontal"
  actions={[{ name: "star.fill", color: "#FFD700" }]}
  onToggle={() => console.log("Toggled")}
  onActionPress={(e) => console.log("Pressed action", e)}
/>;
```

## ⚠️ Status

This is **still WIP** in progress and is likely to change in the future.
