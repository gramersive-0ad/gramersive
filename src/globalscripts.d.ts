/**
 * Public defined globalscripts components.
 */
declare namespace GlobalScripts {
  /**
   * Self-defined type for resource codes.
   */
  type ResourceCode = "food" | "wood" | "stone" | "metal";

  /**
   * Self-defined interface for translatable resources.
   */
  interface TranslatableResources {
    [index: string]: string;
  }

  /**
   * Self-defined interface for resource data.
   */
  interface ResourceData {
    code: ResourceCode;
    name: string;
    description: string;
    order: number;
    subtypes: TranslatableResources;
    properties: string[];
    truePrice: number;
    aiAnalysisInfluenceGroup: string;
  }

  class Resources {
    /**
     * Returns the objects defined in the JSON files for all available resources,
     * ordered as defined in these files.
     */
    GetResources(): ResourceData[];

    /**
     * Returns the object defined in the JSON file for the given resource.
     */
    GetResource(): ResourceData;

    /**
     * Returns an array containing all resource codes ordered as defined in the resource files.
     */
    GetCodes(): ResourceCode[];

    /**
     * Returns an array containing all barterable resource codes ordered as defined in the resource files.
     */
    GetBarterableCodes(): ResourceCode[];

    /**
     * Returns an array containing all tradable resource codes ordered as defined in the resource files.
     */
    GetTradableCodes(): ResourceCode[];

    /**
     * Returns an array containing all tributable resource codes ordered as defined in the resource files.
     */
    GetTributableCodes(): ResourceCode[];

    /**
     * Returns an object mapping resource codes to translatable resource names. Includes subtypes.
     */
    GetNames(): TranslatableResources;
  }
}
