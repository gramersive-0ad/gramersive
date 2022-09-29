/**
 * Get outlay component template data by unit name.
 */
declare function GetOutlayTemplateData(
  templateName: string
): GlobalScripts.OutlayTemplateData | undefined;

var g_SelectionPanels: Session.SelectionPanels;

let g_trampTrainingSetupButton: Session.SetupButtonFunction =
  g_SelectionPanels.Training.setupButton;

g_SelectionPanels.Training.setupButton = (data: any) => {
  g_trampTrainingSetupButton(data);
  let template = GetOutlayTemplateData(data.item);
  if (!template) {
    return;
  }
  let unitIds = data.unitEntStates.map((status) => status.id);
  let [buildingsCountToTrainFullBatch, fullBatchSize, remainderBatch] =
    getTrainingStatus(unitIds, data.item, data.playerState);
  let lines = (data.button.tooltip as string).split("\n");
  lines.splice(
    lines.findIndex((line) => line.indexOf("Cost:") !== -1) + 1,
    0,
    getEntityOutlayTooltip(
      template,
      buildingsCountToTrainFullBatch,
      fullBatchSize,
      remainderBatch
    )
  );
  data.button.tooltip = lines.join("\n");
};
