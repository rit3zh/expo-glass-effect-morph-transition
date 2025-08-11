import ExpoModulesCore

public class ExpoiOSGlassEffectTransitionModule: Module {
  
  public func definition() -> ModuleDefinition {
    
    Name("ExpoiOSGlassEffectTransition")

    View(LiquidGlassTransitionView.self)
  }
}
