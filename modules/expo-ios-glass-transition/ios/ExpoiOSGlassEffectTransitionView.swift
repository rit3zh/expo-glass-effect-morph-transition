import ExpoModulesCore
import SwiftUI


extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3:
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6:
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8:
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }

        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

final class LiquidGlassTransitionViewProps: ExpoSwiftUI.ViewProps {
    @Field var isExpanded: Bool = false
    @Field var actions: [[String: Any]] = []
    @Field var spacing: CGFloat = 40.0
    @Field var containerSpacing: CGFloat = 40.0
    @Field var duration: CGFloat = 0.7
    @Field var orientation: String = "horizontal"
    var onToggle = EventDispatcher()
    var onActionPress = EventDispatcher()
}

struct LiquidGlassTransitionView: ExpoSwiftUI.View, ExpoSwiftUI.WithHostingView {
    @ObservedObject var props: LiquidGlassTransitionViewProps
    @State private var isExpanded: Bool = false
    @Namespace private var namespace
    
    init(props: LiquidGlassTransitionViewProps) {
        self.props = props
    }
    
    var body: some View {
        if #available(iOS 26.0, *) {
            GlassEffectContainer(spacing: props.containerSpacing) {
                if props.orientation == "vertical" {
                    VStack(spacing: props.spacing) {
                        actionContent
                    }
                } else {
                    HStack(spacing: props.spacing) {
                        actionContent
                    }
                }
            }
            .onAppear {
                isExpanded = props.isExpanded
            }
            .onChange(of: props.isExpanded) { newValue in
                withAnimation(.easeInOut(duration: props.duration)) {
                    isExpanded = newValue
                }
            }
            .onTapGesture {
                props.onToggle([:])
            }
        } else {
            
            Text("Glass Effect requires iOS 26.0+")
                .foregroundColor(.secondary)
                .onAppear {
                    isExpanded = props.isExpanded
                }
                .onChange(of: props.isExpanded) { newValue in
                    withAnimation(.easeInOut(duration: 0.5)) {
                        isExpanded = newValue
                    }
                }
                .onTapGesture {
                    props.onToggle([:])
                }
        }
    }
    
    @available(iOS 26.0, *)
    @ViewBuilder
    private var actionContent: some View {
        
        if let mainAction = props.actions.first {
            createActionView(action: mainAction, id: "main", index: 0)
        } else {
            
            Image(systemName: "scribble.variable")
                .frame(width: 80.0, height: 80.0)
                .font(.system(size: 36))
                .foregroundColor(.white)
                .glassEffect()
                .glassEffectID("main", in: namespace)
                .onTapGesture {
                    props.onActionPress([
                        "index": 0,
                        "action": [
                            "name": "scribble.variable",
                            "type": "default"
                        ]
                    ])
                }
        }
        
        if isExpanded {
            
            ForEach(Array(props.actions.dropFirst().enumerated()), id: \.offset) { index, action in
                createActionView(action: action, id: "action\(index)", index: index + 1)
            }
        }
    }
    
    @available(iOS 26.0, *)
    @ViewBuilder
    private func createActionView(action: [String: Any], id: String, index: Int) -> some View {
        let size = action["size"] as? CGFloat ?? 36
        let width = action["width"] as? CGFloat ?? 80
        let height = action["height"] as? CGFloat ?? 80
        let cornerRadius = action["cornerRadius"] as? CGFloat ?? 12
        let colorHex = action["color"] as? String
        
        if let imageUrl = action["imageUrl"] as? String, !imageUrl.isEmpty {
            
            AsyncImage(url: URL(string: imageUrl)) { image in
                image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: width, height: height)
                    .clipShape(RoundedRectangle(cornerRadius: cornerRadius))
                    .glassEffect()
                    .glassEffectID(id, in: namespace)
                    .onTapGesture {
                        props.onActionPress([
                            "index": index,
                            "action": action
                        ])
                    }
            } placeholder: {
                
                RoundedRectangle(cornerRadius: cornerRadius)
                    .fill(Color.gray.opacity(0.3))
                    .frame(width: width, height: height)
                    .overlay(
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle(tint: .white))
                    )
                    .glassEffect()
                    .glassEffectID(id, in: namespace)
                    .onTapGesture {
                        props.onActionPress([
                            "index": index,
                            "action": action
                        ])
                    }
            }
        } else {
            
            let iconName = action["name"] as? String ?? "questionmark"
            let iconColor: Color = {
                if let colorHex = colorHex {
                    return Color(hex: colorHex)
                } else {
                    return .white
                }
            }()
            
            Image(systemName: iconName)
                .frame(width: width, height: height)
                .font(.system(size: size))
                .foregroundColor(iconColor)
                .glassEffect()
                .glassEffectID(id, in: namespace)
                .onTapGesture {
                    props.onActionPress([
                        "index": index,
                        "action": action
                    ])
                }
        }
    }
}
