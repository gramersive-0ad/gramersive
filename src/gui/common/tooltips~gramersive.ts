var g_ResourceData: GlobalScripts.Resources;

function getEntityOutlayTooltip(
  template: GlobalScripts.OutlayTemplateData,
  buildingsCountToTrainFullBatch: number,
  fullBatchSize: number,
  remainderBatch: number
): string {
  let res = [];
  for (let resource of g_ResourceData.GetCodes())
    if (template.resources[resource])
      res.push(
        sprintf(translate("%(component)s %(outlay)s"), {
          component: resourceIcon(resource),
          outlay: Math.floor(
            template.resources[resource] *
              (buildingsCountToTrainFullBatch * fullBatchSize + remainderBatch)
          ),
        })
      );
  res.push(
    sprintf(translate("%(component)s %(outlay)s"), {
      component: resourceIcon("time"),
      outlay: template.interval,
    })
  );
  return sprintf(translate("%(label)s %(outlay)s"), {
    label: headerFont(translate("Outlay:")),
    outlay: res.join("  "),
  });
}
