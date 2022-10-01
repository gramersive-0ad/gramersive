/**
 * Engine defined simulation interfaces.
 */
declare namespace Simulation {
  class Component {
    Schema: string;
    Init(): void;
    Deinit(): void;
  }

  class ComponentManager {
    /**
     * Defining interface type in JS.
     */
    RegisterInterface(name: string): void;

    /**
     * Tells the engine to start using the class exposed with the name "cname", and implementing the interface ID.
     */
    RegisterComponentType(iid: number, cname: string, ctor: any): void;

    /**
     * Directly retrieve the component implementing a given interface for a given entity.
     */
    QueryInterface(ent: number, iid: number): Component;

    /**
     * Destroys the specified entity, once FlushDestroyedEntities is called.
     * Has no effect if the entity does not exist, or has already been added to the destruction queue.
     */
    DestroyEntity(ent: number): void;
  }

  class RangeManager {
    /**
     * Returns a list of all entities for a specific player.
     * (This is on this interface because it shares a lot of the implementation.
     * Maybe it should be extended to be more like ExecuteQuery without
     * the range parameter.)
     */
    GetEntitiesByPlayer(player: number): number[];
  }
}

declare const IID_RangeManager: number;

/**
 * Invalid entity ID. Used as an error return value by some functions.
 * No valid entity will have this ID.
 */
declare const INVALID_ENTITY: number;

/**
 * Entity ID for singleton 'system' components.
 * Use with QueryInterface to get the component instance.
 * (This allows those systems to make convenient use of the common infrastructure
 * for message-passing, scripting, serialisation, etc.)
 */
declare const SYSTEM_ENTITY: number;

/**
 * Simulation script interface implementation.
 */
declare const Engine: Simulation.ComponentManager;

declare namespace Helpers {
  class Resources extends GlobalScripts.Resources {
    /**
     * Builds a RelaxRNG schema based on currently valid elements.
     */
    BuildSchema(
      datatype: string,
      additional?: any[],
      subtypes?: boolean
    ): string;

    /**
     * Builds the value choices for a RelaxNG `<choice></choice>` object, based on currently valid resources.
     */
    BuildChoicesSchema(subtypes?: boolean): string;
  }
}

/**
 * Similar to Engine.QueryInterface but applies to the player entity
 * that owns the given entity.
 * iid is typically IID_Player.
 */
declare function QueryOwnerInterface(
  ent: number,
  iid?: number
): Simulation.Component;

/**
 * Global scripts interfaces with helper modification implementation.
 */
declare const Resources: Helpers.Resources;

/**
 * Public defined simulation components.
 */
declare namespace Components {
  /**
   * Self-defined type for notification types.
   */
  type NotificationType =
    | "aichat"
    | "defeat"
    | "won"
    | "diplomacy"
    | "ceasefire-ended"
    | "tutorial"
    | "tribute"
    | "barter"
    | "spy-response"
    | "attack"
    | "phase"
    | "dialog"
    | "playercommand"
    | "play-tracks"
    | "map-flare";

  /**
   * Self-defined interface for notification.
   */
  interface Notification {
    type?: NotificationType;
    players: number[];
    message: string;
    translateMessage?: boolean;
  }

  class GuiInterface extends Simulation.Component {
    /* ... */

    /**
     * Add a timed notification.
     * Warning: timed notifacations are serialised
     * (to also display them on saved games or after a rejoin)
     * so they should allways be added and deleted in a deterministic way.
     */
    AddTimeNotification(notification: Notification, duration?: number): number;

    /**
     * Push notification.
     */
    PushNotification(notification: Notification): void;

    /* ... */
  }

  /**
   * Self-defined interface for resource counts.
   */
  interface ResourceCounts {
    [index: string]: number;
  }

  /**
   * Available player states.
   */
  type PlayerState = "active" | "won" | "defeated";

  class Player extends Simulation.Component {
    /**
     * Sets the player identifier.
     */
    SetPlayerID(id: number): void;

    /**
     * Returns the player identifier.
     */
    GetPlayerID(): number | undefined;

    /**
     * Sets the player name.
     */
    SetName(name: string): void;

    /**
     * Returns the player name.
     */
    GetName(): string;

    /* ... */

    /**
     * Sets the resource counts.
     */
    SetResourceCounts(resources: ResourceCounts): void;

    /**
     * Returns the resource counts.
     */
    GetResourceCounts(): ResourceCounts;

    /* ... */

    /**
     * Returns the needed resources.
     */
    GetNeededResources(amounts: ResourceCounts): ResourceCounts | undefined;

    /* ... */

    /**
     * Try to subtract the resources and notify if failed.
     */
    TrySubtractResources(amounts: ResourceCounts): boolean;

    /* ... */

    /**
     * Get current player state.
     */
    GetState(): PlayerState;

    /* ... */
  }

  /**
   * Self-defined interface for health change.
   */
  interface HealthChange {
    healthChange: number;
  }

  /**
   * Self-defined interface for health update.
   */
  interface HealthUpdate {
    old: number;
    new: number;
  }

  class Health extends Simulation.Component {
    /**
     * Returns the current hitpoint value.
     * This is 0 if (and only if) the unit is dead.
     */
    GetHitpoints(): number;

    /**
     * Returns the max hitpoint value.
     */
    GetMaxHitpoints(): number;

    /**
     * Whether the units are injured. Dead units are not considered injured.
     */
    IsInjured(): boolean;

    /**
     * Sets the current hitpoint value.
     */
    SetHitpoints(value: number): void;

    /**
     * Whether the units are reperiable.
     */
    IsRepairable(): boolean;

    /**
     * Whether the units are unhealable.
     */
    IsUnhealable(): boolean;

    /**
     * Returns the idle regen rate value.
     */
    GetIdleRegenRate(): number;

    /**
     * Returns the regen rate value.
     */
    GetRegenRate(): number;

    /**
     * Execute regeneration according the regen rate.
     */
    ExecuteRegeneration(): void;

    /**
     * Check if the regeneration timer needs to be started or stopped.
     */
    CheckRegenTimer(): void;

    /**
     * True destruction of a unit with leaving a corpse.
     */
    Kill(): void;

    /**
     * Take a damage from the specified player unit.
     */
    TakeDamage(
      amount: number,
      attacker: number,
      attackerOwner: number
    ): HealthChange;

    /**
     * Called when an entity kills us.
     */
    KilledBy(attacker: number, attackerOwner: number): void;

    /**
     * Reduce amount of hitpoints. Kills the entity if required.
     */
    Reduce(amount: number): HealthChange;

    /**
     * Handle what happens when the entity dies.
     */
    HandleDeath(): void;

    /**
     * Increase amount of hitpoints.
     */
    Increase(amount: number): HealthUpdate | undefined;

    /**
     * Create a persistent unit corpse.
     */
    CreateCorpse(): void;

    /**
     * Create SpawnEntityOnDeath entity.
     */
    CreateDeathSpawnedEntity(): number;

    /**
     * Update visual state of entity.
     */
    UpdateActor(): void;

    /**
     * Recalculate template values of entity.
     */
    RecalculateValues(): void;

    /**
     * On template value modification event handler.
     */
    OnValueModification(): void;

    /**
     * On ownership change event handler.
     */
    OnOwnershipChanged(): void;

    /**
     * Register health change via engine post message.
     */
    RegisterHealthChanged(): void;
  }

  class Timer extends Simulation.Component {
    /**
     * Get the elapsed time in milliseconds since the game was started.
     */
    GetTime(): number;

    /**
     * Get the duration of the latest turn in milliseconds.
     */
    GetLatestTurnLength(): number;

    /**
     * Create a new timer, which will call the 'funcname' method with arguments (data, lateness)
     * on the 'iid' component of the 'ent' entity, after at least 'time' milliseconds.
     * 'lateness' is how late the timer is executed after the specified time (in milliseconds).
     */
    SetTimeout(
      ent: number,
      iid: number,
      funcname: string,
      time: number,
      data: any
    ): number;

    /**
     * Create a new repeating timer, which will call the 'funcname' method with arguments (data, lateness)
     * on the 'iid' component of the 'ent' entity, after at least 'time' milliseconds.
     * 'lateness' is how late the timer is executed after the specified time (in milliseconds)
     * and then every 'repeattime' milliseconds thereafter.
     */
    SetInterval(
      ent: number,
      iid: number,
      funcname: string,
      time: number,
      repeattime: number,
      data: any
    ): number;

    /**
     * Updates the repeat time of a timer.
     * Note that this will take only effect after the next update.
     */
    UpdateRepeatTime(timerID: number, newRepeatTime: number): void;

    /**
     * Cancels an existing timer that was created with SetTimeout/SetInterval.
     */
    CancelTimer(id: number): void;
  }
}

declare const IID_GuiInterface: number;
declare const IID_Player: number;
declare const IID_Health: number;
declare const IID_Timer: number;
