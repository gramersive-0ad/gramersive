interface OutlayTemplate {
  Interval: number;
  Resources: { [key in GlobalScripts.ResourceCode]: number };
}

var g_OutlayTemplateData = {} as {
  [key: string]: GlobalScripts.OutlayTemplateData;
};

function GetOutlayTemplateDataHelper(
  template: OutlayTemplate
): GlobalScripts.OutlayTemplateData {
  return {
    interval: template.Interval,
    resources: template.Resources,
  };
}

function GetOutlayTemplateData(
  templateName: string
): GlobalScripts.OutlayTemplateData | undefined {
  if (!(templateName in g_OutlayTemplateData)) {
    const { Outlay } = Engine.GetTemplate(templateName);
    if (!Outlay) {
      return;
    }
    g_OutlayTemplateData[templateName] = GetOutlayTemplateDataHelper(Outlay);
  }
  return g_OutlayTemplateData[templateName];
}
