declare class Outlay extends Simulation.Component {
  public template: any;
  CancelTimer(): void;
  PerformTick(): void;
}

function Outlay() {}

Outlay.prototype.Schema =
  "<a:help>Give unit the outlay characteristic to consume food, metal, stone, wood.</a:help>" +
  "<a:example>" +
  "<Interval>20.0</Interval>" +
  "<Resources>" +
  "<food>2.0</food>" +
  "<metal>0.0</metal>" +
  "<stone>0.0</stone>" +
  "<wood>1.0</wood>" +
  "</Resources>" +
  "</a:example>" +
  "<element name='Interval' a:help='The interval at which each resources consuming tick occurs in seconds'>" +
  "<ref name='positiveDecimal'/>" +
  "</element>" +
  "<element name='Resources' a:help='The count of resources that will consume every interval tick per unit'>" +
  Resources.BuildSchema("positiveDecimal") +
  "</element>";

Outlay.prototype.Init = function () {
  this.Interval = +this.template.Interval * 1000;
  this.Resources = this.template.Resources;

  let cmpTimer = <Components.Timer>(
    Engine.QueryInterface(SYSTEM_ENTITY, IID_Timer)
  );
  if (!cmpTimer) {
    error(
      "Error in entity: " + this.entity + ", IID: IID_Outlay, Function: Init"
    );
    return;
  }

  this.timer = cmpTimer.SetInterval(
    this.entity,
    IID_Outlay,
    "PerformTick",
    this.Interval,
    this.Interval,
    undefined
  );
};

Outlay.prototype.CancelTimer = function () {
  let cmpTimer = <Components.Timer>(
    Engine.QueryInterface(SYSTEM_ENTITY, IID_Timer)
  );
  if (!cmpTimer) {
    error(
      "Error in entity: " + this.entity + ", IID: IID_Outlay, Function: Deinit"
    );
    return;
  }
  cmpTimer.CancelTimer(this.timer);
};

Outlay.prototype.PerformTick = function () {
  let cmpPlayer = <Components.Player>(
    QueryOwnerInterface(this.entity, IID_Player)
  );
  if (!cmpPlayer) {
    error(
      "Error in entity: " +
        this.entity +
        ", IID: IID_Outlay, Function: PerformTick"
    );
    return;
  }

  if (!cmpPlayer.GetPlayerID() || cmpPlayer.GetState() === "defeated") {
    this.CancelTimer();
    return;
  }

  if (!cmpPlayer.GetNeededResources(this.Resources)) {
    let resourceCount = cmpPlayer.GetResourceCounts();
    for (let type in this.Resources) {
      resourceCount[type] -= this.Resources[type];
    }
    cmpPlayer.SetResourceCounts(resourceCount);
    return;
  }

  let cmpHealth = <Components.Health>(
    Engine.QueryInterface(this.entity, IID_Health)
  );
  if (!cmpHealth) {
    error(
      "Error in entity: " +
        this.entity +
        ", IID: IID_Outlay, Function: PerformTick"
    );
    return;
  }

  let cmpGUIInterface = <Components.GuiInterface>(
    Engine.QueryInterface(SYSTEM_ENTITY, IID_GuiInterface)
  );
  if (!cmpGUIInterface) {
    error(
      "Error in entity: " +
        this.entity +
        ", IID: IID_Outlay, Function: PerformTick"
    );
    return;
  }

  cmpGUIInterface.PushNotification({
    players: [cmpPlayer.GetPlayerID()],
    message: "Unit maintenance is no longer possible due to lack of resources",
  });

  cmpHealth.Kill();
};

Outlay.prototype.Deinit = function () {
  this.CancelTimer();
};

declare const IID_Outlay: number;

Engine.RegisterComponentType(IID_Outlay, "Outlay", Outlay);
