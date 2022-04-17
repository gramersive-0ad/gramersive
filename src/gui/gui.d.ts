/**
 * Translation of the specified English string into the current language
 */
declare function translate(text: string): string;

declare namespace GUI
{
	/**
	 * Self-defined interface for page callback.
	 */
	type PageCallback = (data: any) => void;
	
	class GUIManager
	{
		/**
		 * Load a new GUI page and make it active
		 */
		PushGuiPage(name: string, initData?: any, callback?: PageCallback): void;
	}

	/**
	 * Type of main menu item
	 */
	interface MenuItem
	{
		"caption": string,
		"tooltip": string,
		"submenu"?: MenuItem[],
		"onPress": () => void
	}
}

declare const Engine: GUI.GUIManager;
