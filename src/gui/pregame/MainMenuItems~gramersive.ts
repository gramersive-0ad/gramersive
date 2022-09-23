var g_MainMenuItems: MenuItem[];

g_MainMenuItems.unshift({
  caption: translate("Gramersive Mod"),
  tooltip: translate(
    "View the changes that gramersive-0ad brings to the game."
  ),
  onPress: () => {
    Engine.PushGuiPage("page_gramersive~gramersive.xml");
  },
});
