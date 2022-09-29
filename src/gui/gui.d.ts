/**
 * Translation of the specified English string into the current language
 */
declare function translate(text: string): string;

/**
 * Returns the number of units that will be present in a batch if the user clicks
 * the training button depending on the batch training modifier hotkey.
 */
declare function getTrainingStatus(
  selection: any,
  trainEntType: any,
  playerState: any
): any[];

/**
 * Convert text to header view.
 */
declare function headerFont(text: string): string;

/**
 * Get resource icon identifier.
 */
declare function resourceIcon(resource: GlobalScripts.ResourceCode | "time"): string;

/**
 * Type of main menu item
 */
interface MenuItem {
  caption: string;
  tooltip: string;
  submenu?: MenuItem[];
  onPress: () => void;
}

declare namespace Session {
  /**
   * Type of session selection panel setup function.
   */
  type SetupButtonFunction = (data: any) => void;

  /**
   * Type of session selection panel.
   */
  type SelectionPanel = {
    /* ... */

    setupButton: SetupButtonFunction;

    /* ... */
  };

  /**
   * Map type of all available session selection panels.
   */
  type SelectionPanels = {
    /* ... */

    Training: SelectionPanel;

    /* ... */
  };
}

/**
 * Types of GUIManager part in the Engine object
 */
declare class GUIManager {
  /**
   * Load a new GUI page and make it active
   */
  PushGuiPage(
    name: string,
    initData?: any,
    callback?: (data: any) => void
  ): void;
}

declare const Engine: GUIManager & GlobalScripts.GUIManager;
