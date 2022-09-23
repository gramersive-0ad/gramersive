/**
 * Translation of the specified English string into the current language
 */
declare function translate(text: string): string;

/**
 * Type of main menu item
 */
interface MenuItem {
  caption: string;
  tooltip: string;
  submenu?: MenuItem[];
  onPress: () => void;
}

type PageCallback = (data: any) => void;

/**
 * Types of GUIManager part in the Engine object
 */
declare class GUIManager {
  /**
   * Load a new GUI page and make it active
   */
  PushGuiPage(name: string, initData?: any, callback?: PageCallback): void;
}

declare const Engine: GUIManager;
