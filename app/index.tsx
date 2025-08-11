import type {
  ActionPressEvent,
  GlassAction,
} from "@/modules/expo-ios-glass-transition/index.ios";
import { LiquidGlassMorphView } from "@/modules/expo-ios-glass-transition/index.ios";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const URL: string = `https://i.pinimg.com/1200x/8f/fa/ee/8ffaee78b572a9be81d61d6efa2eab2c.jpg`;

interface DemoSection {
  title: string;
  orientation: "horizontal" | "vertical";
  actions: GlassAction[];
  description: string;
  containerHeight?: number;
  duration: number;
}

export default function LiquidGlassShowcase() {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    main: false,
    toolbar: false,
    social: false,
    menu: false,
  });

  const glowOpacity = useSharedValue(0);
  const titleScale = useSharedValue(1);
  const backgroundShift = useSharedValue(0);

  useEffect(() => {
    glowOpacity.value = withRepeat(
      withSequence(
        withSpring(0.9, { duration: 2500 }),
        withSpring(0.4, { duration: 2500 })
      ),
      -1,
      false
    );

    titleScale.value = withRepeat(
      withSequence(
        withSpring(1.03, { duration: 3500 }),
        withSpring(1, { duration: 3500 })
      ),
      -1,
      false
    );

    backgroundShift.value = withRepeat(
      withTiming(1, { duration: 8000 }),
      -1,
      true
    );
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: 1 + glowOpacity.value * 0.1 }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: titleScale.value }],
  }));

  const backgroundStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: backgroundShift.value * 10 - 5 },
      { translateY: backgroundShift.value * 5 - 2.5 },
    ],
  }));

  const handleToggle = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleActionPress = (event: ActionPressEvent) => {
    alert(`Action pressed: ${event.action.name}\nIndex: ${event.index}`);
  };

  const demoSections: DemoSection[] = [
    {
      title: "Main Actions",
      orientation: "horizontal",
      description:
        "Primary glass morphing showcase with enhanced interactions. Extremely slow",
      containerHeight: 140,
      duration: 3.2,
      actions: [
        { name: "plus", color: "#FFFFFF", size: 20, width: 50, height: 50 },
        { name: "heart", color: "#FF6B6B", size: 20, width: 50, height: 50 },
        { name: "star", color: "#FFD700", size: 20, width: 50, height: 50 },
        { name: "bookmark", color: "#4ECDC4", size: 20, width: 50, height: 50 },
        {
          name: "shareplay",
          color: "#BB86FC",
          size: 20,
          width: 50,
          height: 50,
        },
      ],
    },
    {
      title: "Creative Toolbar",
      orientation: "horizontal",
      description: "Enhanced horizontal layout for creative applications",
      containerHeight: 160,
      duration: 0.5,
      actions: [
        {
          name: "paintbrush",
          color: "#FFFFFF",
          size: 18,
          width: 55,
          height: 55,
        },
        { name: "pencil", color: "#FF6B6B", size: 18, width: 55, height: 55 },
        {
          name: "coloncurrencysign.square",
          color: "#4ECDC4",
          size: 18,
          width: 55,
          height: 55,
        },
        {
          name: "textformat",
          color: "#FFD700",
          size: 18,
          width: 55,
          height: 55,
        },
        {
          name: "square.and.arrow.up",
          color: "#BB86FC",
          size: 18,
          width: 55,
          height: 55,
        },
      ],
    },
    {
      title: "Social Actions",
      orientation: "horizontal",
      description: "Interactive social media buttons with modern styling",
      duration: 0.5,
      containerHeight: 130,
      actions: [
        {
          name: "bubble.left.and.bubble.right.fill",
          color: "#FFFFFF",
          size: 18,
          width: 60,
          height: 60,
        },
        {
          name: "heart.fill",
          color: "#FF3B30",
          size: 18,
          width: 60,
          height: 60,
        },
        {
          name: "paperplane.fill",
          color: "#34C759",
          size: 18,
          width: 60,
          height: 60,
        },
        {
          name: "bookmark.fill",
          color: "#FF9500",
          size: 18,
          width: 60,
          height: 60,
        },
        { name: "ellipsis", color: "#8E8E93", size: 18, width: 60, height: 60 },
      ],
    },
    {
      title: "Vertical Menu",
      orientation: "vertical",
      description: "Enhanced floating action menu with premium feel",
      containerHeight: 580,
      duration: 0.3,
      actions: [
        {
          name: "plus.circle.fill",
          color: "#FFFFFF",
          size: 32,
          width: 80,
          height: 80,
        },
        {
          name: "camera.fill",
          color: "#FF6B6B",
          size: 28,
          width: 70,
          height: 70,
        },
        {
          name: "photo.fill",
          color: "#4ECDC4",
          size: 28,
          width: 70,
          height: 70,
        },
        {
          name: "video.fill",
          color: "#FFD700",
          size: 28,
          width: 70,
          height: 70,
        },
        { name: "mic.fill", color: "#BB86FC", size: 26, width: 65, height: 65 },
        { name: "doc.fill", color: "#FF9500", size: 26, width: 65, height: 65 },
      ],
    },
  ];

  return (
    <ImageBackground style={styles.container} source={{ uri: URL }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Animated.View style={[styles.glowEffect, glowStyle]} />
      <Animated.View style={[styles.glowEffect2, glowStyle]} />
      <ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="always"
        bounces
        bouncesZoom
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Animated.View style={titleStyle}>
              <Text style={styles.title}>Liquid Glass</Text>
            </Animated.View>
            <Text style={styles.subtitle}>
              Testing fluid morphing transitions with premium glass effects
            </Text>
            <View style={styles.headerDivider} />
          </View>

          {demoSections.map((section, index) => (
            <View key={section.title} style={styles.sectionContainer}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() =>
                  handleToggle(section.title.toLowerCase().replace(/\s+/g, ""))
                }
                activeOpacity={0.7}
              >
                <View style={styles.sectionHeaderContent}>
                  <View style={styles.sectionTitleRow}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    <View style={styles.sectionBadge}>
                      <Text style={styles.sectionBadgeText}>
                        {section.actions.length}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.sectionDescription}>
                    {section.description}
                  </Text>
                </View>
                <View style={styles.expandIcon}>
                  <Ionicons
                    name={
                      expandedSections[
                        section.title.toLowerCase().replace(/\s+/g, "")
                      ]
                        ? "chevron-up"
                        : "chevron-down"
                    }
                    size={22}
                    color="#FFFFFF"
                  />
                </View>
              </TouchableOpacity>

              <View
                style={[
                  styles.demoContainer,
                  section.orientation === "vertical" && styles.verticalDemo,
                  { minHeight: section.containerHeight || 120 },
                ]}
              >
                <LiquidGlassMorphView
                  isExpanded={
                    expandedSections[
                      section.title.toLowerCase().replace(/\s+/g, "")
                    ]
                  }
                  duration={section.duration}
                  orientation={section.orientation}
                  actions={section.actions}
                  spacing={section.orientation === "vertical" ? 20 : 24}
                  containerSpacing={
                    section.orientation === "vertical" ? 32 : 28
                  }
                  onToggle={() =>
                    handleToggle(
                      section.title.toLowerCase().replace(/\s+/g, "")
                    )
                  }
                  onActionPress={(e) => {
                    handleToggle(
                      section.title.toLowerCase().replace(/\s+/g, "")
                    );
                    const isExpanded =
                      expandedSections[
                        section.title.toLowerCase().replace(/\s+/g, "")
                      ];
                    return isExpanded ? handleActionPress(e) : null;
                  }}
                  style={[
                    styles.liquidGlass,
                    {
                      width: section.orientation === "vertical" ? 200 : "100%",
                      height:
                        section.orientation === "vertical"
                          ? 500
                          : section.containerHeight || 120,
                    },
                  ]}
                />
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>
                    {section.actions.length}
                  </Text>
                  <Text style={styles.statLabel}>Actions</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>
                    {section.orientation === "horizontal" ? "H" : "V"}
                  </Text>
                  <Text style={styles.statLabel}>Layout</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>
                    {section.containerHeight}px
                  </Text>
                  <Text style={styles.statLabel}>Height</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>Glass</Text>
                  <Text style={styles.statLabel}>Effect</Text>
                </View>
              </View>
            </View>
          ))}

          <View style={styles.footer}>
            <LinearGradient
              colors={["rgba(255,255,255,0.05)", "rgba(255,255,255,0.02)"]}
              style={styles.footerGradient}
            >
              <Text style={styles.footerText}>
                Built with SwiftUI Glass Effects • React Native
              </Text>
              <Text style={styles.footerSubtext}>
                Premium liquid morphing transitions
              </Text>
            </LinearGradient>
          </View>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  glowEffect: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.15,
    left: SCREEN_WIDTH * 0.25,
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.5,
    borderRadius: SCREEN_WIDTH * 0.25,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 40,
  },
  glowEffect2: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.6,
    right: SCREEN_WIDTH * 0.1,
    width: SCREEN_WIDTH * 0.3,
    height: SCREEN_WIDTH * 0.3,
    borderRadius: SCREEN_WIDTH * 0.15,
    backgroundColor: "rgba(116, 185, 255, 0.06)",
    shadowColor: "#74B9FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 25,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 35,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",

    marginBottom: 12,

    textShadowColor: "rgba(255, 255, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "500",
    color: "#FFFFFF",
    textAlign: "center",
  },
  headerDivider: {
    width: 60,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    marginTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 30,
  },
  sectionContainer: {
    marginBottom: 32,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  sectionHeaderContent: {
    flex: 1,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    marginRight: 12,
  },
  sectionBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  sectionBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  sectionDescription: {
    fontSize: 15,
    color: "#BBBBBB",
    fontWeight: "400",
    lineHeight: 20,
  },
  expandIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  demoContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  verticalDemo: {
    paddingVertical: 50,
  },
  liquidGlass: {
    width: 200,
    height: 200,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 18,
    paddingHorizontal: 24,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.12)",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  statLabel: {
    fontSize: 11,
    color: "#AAAAAA",
    marginTop: 3,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  footerGradient: {
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  footerText: {
    fontSize: 13,
    color: "#AAAAAA",
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  footerSubtext: {
    fontSize: 11,
    color: "#888888",
    textAlign: "center",
    fontWeight: "400",
    marginTop: 4,
  },
});
