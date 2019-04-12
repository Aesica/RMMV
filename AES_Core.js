var Imported = Imported || {};
Imported.AES_Core = true;
var Aesica = Aesica || {};
Aesica.Core = Aesica.Core || {};
Aesica.Core.version = 1.54;
/*:
* @plugindesc v1.54 Contains several enhancements for various aspects of RMMV.
*
* @author Aesica
*
* @param Config Manager
* @desc Enable the Config Manager initial settings tweaks provided by this plugin?
* @type boolean
* @on Enable
* @off Disable
* @default true
*
* @param Always Dash
* @parent Config Manager
* @desc Enable 'Always Dash' by default the first time the game is run?
* @type boolean
* @default false
* @on On
* @off Off
*
* @param Show Always Dash
* @parent Config Manager
* @desc Show "Always Dash" setting in the options menu?
* @type boolean
* @default true
* @on Show
* @off Hide
*
* @param Remember Commands
* @parent Config Manager
* @desc Enable 'Remember Commands' by default the first time the game is run?
* @type boolean
* @default false
* @on On
* @off Off
*
* @param Show Command Remember
* @parent Config Manager
* @desc Show "Remember Commands" setting in the options menu?
* @type boolean
* @default true
* @on Show
* @off Hide
*
* @param Master Volume Label
* @parent Config Manager
* @desc Label for Master Volume setting.  Leave blank to disable.
* @type text
* @default Master Volume
*
* @param Default Master Volume
* @parent Config Manager
* @desc Default master volume when the game is run for the first time.
* @type number
* @default 100
* @min 0
* @max 100
*
* @param Default BGM Volume
* @parent Config Manager
* @desc Default BGM volume when the game is run for the first time.
* @type number
* @default 100
* @min 0
* @max 100
*
* @param Default BGS Volume
* @parent Config Manager
* @desc Default BGS volume when the game is run for the first time.
* @type number
* @default 100
* @min 0
* @max 100
*
* @param Default ME Volume
* @parent Config Manager
* @desc Default ME volume when the game is run for the first time.
* @type number
* @default 100
* @min 0
* @max 100
*
* @param Default SE Volume
* @parent Config Manager
* @desc Default SE volume when the game is run for the first time.
* @type number
* @default 100
* @min 0
* @max 100
*
* @param Individual Volume Controls
* @parent Config Manager
* @desc Show the individual controls for BGM, BGS, ME, and SE?
* @type boolean
* @default true
* @on Show
* @off Hide
*
* @param Volume Adjustment Offset
* @parent Config Manager
* @desc Number to increment/decrement by when adjusting volume.  A multiple of 5 is recommended
* @type number
* @default 20
* @min 0
* @max 100
*
* @param Instant Text
* @parent Config Manager
* @desc Default setting for instant text rendering.  This can be changed ingame via plugin commands.
* @type boolean
* @on Instant
* @off Standard
* @default true
*
* @param Show Instant Text
* @parent Config Manager
* @desc Show the Instant Text option in the config manager?
* @type boolean
* @on Show
* @off Hide
* @default true
*
* @param Auto Save
* @desc Text displayed (instead of File n) for the autosave slot.  Leave blank for no change
* @type text
* @default 
*
* @param Battle Commands
* @desc Enable the battle command control and limit break system provided by this plugin?
* @type boolean
* @on Enable
* @off Disable
* @default true
*
* @param Limit Break Command
* @parent Battle Commands
* @desc This is a skillType ID.  When TP reaches specified threshold, replace "Attack" with this command.  0: Disable
* @type number
* @min 0
* @default 0
*
* @param Limit Break Threshold
* @parent Battle Commands
* @desc If a limit break command is specfied above, this is the TP threshold required to enable it.
* @type number
* @min 0
* @default 100
*
* @param Enable Attack
* @parent Battle Commands
* @desc Shows or hides the "Attack" command in battle.
* @type boolean
* @on Show
* @off Hide
* @default true
*
* @param Enable Guard
* @parent Battle Commands
* @desc Shows or hides the "Guard" command in battle.
* @type boolean
* @on Show
* @off Hide
* @default true
*
* @param Enable Item
* @parent Battle Commands
* @desc Shows or hides the "Item" command in battle.
* @type boolean
* @on Show
* @off Hide
* @default true
*
* @param Combat Formulas
* @desc Enable the extra combat formula functions provided by this plugin?
* @type boolean
* @on Enable
* @off Disable
* @default true
*
* @param Damage Formula
* @parent Combat Formulas
* @desc Damage formula eval used by Aesica.Core.damage().  See plugin description for more info.
* @type text
* @default userStat * multiplier - targetStat * 2
*
* @param Healing Formula
* @parent Combat Formulas
* @desc Healing formula eval used by Aesica.Core.heal().  See plugin description for more info.
* @type text
* @default userStat * multiplier + targetStat
*
* @param Minimum Damage
* @parent Combat Formulas
* @desc Minimum damage an attack can inflict.
* @type number
* @default 0
*
* @param Maximum Damage
* @parent Combat Formulas
* @desc Maximum damage an attack can inflict.  0: Disable
* @type number
* @default 0
*
* @param Unarmed Weapon Value
* @parent Combat Formulas
* @desc The value to be returned by weapon stat functions if no weapon is equipped.  This is processed as an eval.
* @default 1
*
* @param Critical Hit Multiplier
* @parent Combat Formulas
* @desc Critical hit multiplier.  Default: 3
* @type number
* @min 0
* @default 3
*
* @param Initial TP
* @parent Combat Formulas
* @desc Initial TP on battle start when TP is not preserved.  Processed as an eval.  Default: Math.randomInt(25)
* @type text
* @default Math.randomInt(25)
*
* @param Battle End Effects
* @desc Use after-battle effects provided by this plugin?
* @type boolean
* @on Enable
* @off Disable
* @default true
*
* @param Revive Dead
* @parent Battle End Effects
* @desc Revive dead members after each battle?  Default: No
* @type boolean
* @on Yes
* @off No
* @default false
*
* @param Heal HP
* @parent Battle End Effects
* @desc HP healed to living members after each battle.  This is an eval (actor.mhp, etc).  Default: 0
* @type text
* @default 0
*
* @param Recover MP
* @parent Battle End Effects
* @desc MP recovered for living members after each battle.  This is an eval (actor.mmp * 0.25, etc).  Default: 0
* @type text
* @default 0
*
* @param Universal Obtain Item
* @desc Enable the universal "Obtain Item" functionality provided by this plugin?
* @type boolean
* @on Enable
* @off Disable
* @default true
*
* @param Currency Icon
* @parent Universal Obtain Item
* @desc Icon displayed with "ObtainGold" command.  0 = no icon or YEP_CoreEngine default (if installed)
* @type number
* @min 0
* @default 314
*
* @param Item Obtain Message
* @parent Universal Obtain Item
* @desc i% = item icon, n% = item name, %q = item quantity
* @default Obtained %i%n x%q
*
* @param Item Obtain Sound
* @parent Universal Obtain Item
* @desc Sound effect to play when obtaining an item
* @default Sword1
*
* @param Item Obtain Volume
* @parent Universal Obtain Item
* @desc Volume for item obtain sound effect
* @type number
* @min 0
* @max 100
* @default 70
*
* @param Shop Patch
* @desc Enable the shop 'Quantity Possessed' patch to include equipped weapons and armor?
* @type boolean
* @on Enable
* @off Disable
* @default true
*
* @param Shop Sell Modifier
* @parent Shop Patch
* @desc Set the multiplier for an item's default selling price.  (default 0.5)
* @type text
* @default 0.5
*
* @param Bush Depth/Opacity Settings
* @desc Enable the custom settings for bushes provided by this plugin?
* @type boolean
* @on Enable
* @off Disable
* @default true
*
* @param Bush Opacity
* @parent Bush Depth/Opacity Settings
* @desc Opacity for the character's lower half when walking through bushes (0-255). Default: 128
* @type number
* @min = 0
* @max = 255
* @default 128
*
* @param Bush Depth
* @parent Bush Depth/Opacity Settings
* @desc Height in pixels obscured by bushes.  Default: 12
* @type number
* @min = 0
* @default 12
*
* @help
* For terms of use, see:  https://github.com/Aesica/RMMV/blob/master/README.md
*
* Since this plugin offers so many things, the design is presented in a modular
* format.  Disabling each section in the plugin parameters will prevent any of
* the associated components from even loading, so if you disable something
* like Combat Formulas, none of the functions provided by that section will
* be available.  This is mainly done so that any conflicts with other plugins
* can be resolved by switching that component off here.
*
* The following components are always on and should not have conflicts with 
* other plugins:
* - Note tag parsing functions
* - Plugin command exec function
* - Self switch manipulation
* - Forced vehicle exit
* - Instant Text*
* - Auto Saving
*
* While the Instant Text component is always on, note that instant text
* rendering itself can be disabled by the plugin parameter or via the
* InstantText plugin command
*
* List of crap this plugin can do:
*
* ----------------------------------------------------------------------
*
* Configuration Manager Tweaks
* By default, when your game is opened for the first time, the volumes as well
* as "always dash" and "command remember" are set to specific values and you
* can't control these initial settings.  Now you can.  You can also use this
* to set the volume increment to something other than 20, however a multiple
* of 5 is recommended with 10 being ideal.
*
* ----------------------------------------------------------------------
*
* Auto Saving
* Invoking the AutoSave plugin command will instantly save the game to slot 1.
* Use the Auto Save plugin parameter to customize the name of this slot, or to
* leave it at the default of File 1.
*
* It's up to you, the developer, how frequently or seldom to use the autosave
* feature.  For best results, invoke it when the player touches specific
* waypoints or transitions to certain areas.
*
* Plugin Command:
* AutoSave
*
* ----------------------------------------------------------------------
*
* Battle Command Control
* Allows you to easily prevent the Attack, Guard, and Item commands from showing
* in combat via plugin parameters.  Pretty self-explanatory.
* 
* Also allows the use of a basic limit break system, where upon reaching a
* specified TP threshold, 'Attack' is replaced by a skillType command where
* a character's limit break/ultimate skills can be accessed.
*
* Note that you can put standard Attack in the limit break skillset so players
* can still select it instead of their limit break for that particular turn.
*
* <Replace Attack: n>
* Will replace the Attack command with the skill having id number n.  This note
* tag can be placed on actors, classes, weapons, and states to replace the
* attack command with another skill.
*
* <Guard State: n, n, ...n>
* When a battler uses guard, the target (usually the user) will be affected
* by the specified state(s).  This tag applies to actors/enemies, classes,
* equips, and states.
*
* <Guard State All: n, n, ...n>
* Same as <Guard State> but applies the state(s) to all allies of the target.
*
* ----------------------------------------------------------------------
*
* Damage/Healing Formulas
* Rather than having to manually input your damage formula into every skill
* or item formula box, you can optionally reference these handy functions in
* the formula box instead.  The advantage of this approach is that it lets you
* tweak your formula in one place instead of having to go through every skill
* or item individually.
*
* Minimum and Maximum Damage Caps
* Allows you to set minimum and maximum damage caps.  For example, if you want
* all attacks to deal at least 1 point of damage, but no more than 9999 damage,
* you can use these settings to achieve that.
*
* <Critical Bonus: n>
* In addition to being able to change the default critical modifier, individual
* actors/enemies, classes, equipment, states, or skills can further adjust this
* using note tags.  For example, <Critical Bonus: 1.5> will multiply the damage
* of a critical hit by 1.5 in addition to the default critical bonus.
*
* Unarmed Weapon Value
* This is the value that will be returned by the weaponStat functions described
* below if no weapon is equipped.  Since it gets processed as an eval, it can
* also be a formula.  To reference the battler, use 'this' so for example if the
* actor's atk is 14:
*
* this.atk * 2 // Result: 28
*
* To reference the stat being queried, use 'stat' so if a.weaponAtk() is called,
* the user is unarmed, and their ATK value is 14:
*
* stat + 5 // Result: 19
*
* To make a monk class that gains unarmed strength while other classes do not,
* based on whatever stat is being queried:
*
* this._classId === 4 ? stat : 1 // assuming '4' is the monk class's id, this
* will return whichever character stat is being queried if the actor is 
* class ID 4, and a 1 for everyone else.
* 
* Function Calls:
*
* Aesica.Core.damage(a.value, multiplier, b.value, optionalVariance)
* Where a.value is a.atk, a.mat, etc and b.value is b.def, b.mdf, etc. The
* multiplier value is typically used by various skills to make them stronger
* (or weaker).  If left blank, multiplier defaults to 1 and b.value defaults
* to 0.  The variance value is optional and only really useful if you don't
* intend to use the editor's damage variance field.
*
* Aesica.Core.heal(a.value, multiplier, b.value, optionalVariance)
* Similar to the above, however you may want to use a different unified
* formula for healing.  The variance value is optional and only really useful
* if you don't intend to use the editor's damage variance field.
*
* Aesica.Core.gravity(b, magnitude)
* For FF-style "gravity" attacks which deal a percent of the target's current
* HP based on the specified multiplier.  So Aesica.Core.gravity(b, 0.5) would
* return 50% of the target's current hp.  The <Immunme to Gravity> note tag
* can be used to make the target immune (return value 0). This tag can be
* placed on actors, enemies, classes, states, or equipment.  Note:  Be sure
* to set the damage formula box's "Variance" field to 0%.
*
* Aesica.Core.variance(n)
* Allows you to apply a variance to a damage or healing result, although in 
* most cases, this is done for you via the formula box
*
* Game_BattlerBase.prototype.weaponMhp()
* Game_BattlerBase.prototype.weaponMmp()
* Game_BattlerBase.prototype.weaponAtk()
* Game_BattlerBase.prototype.weaponDef()
* Game_BattlerBase.prototype.weaponMat()
* Game_BattlerBase.prototype.weaponMdf()
* Game_BattlerBase.prototype.weaponAgi()
* Game_BattlerBase.prototype.weaponLuk()
* Retrieves the specified stat from the battler's equipped weapon (or weapons)
* for use in formulas that only factor in weapon strength, which can be used
* in damage formulas.  For example:  a.weaponAtk() * 5 - b.def
* If the battler is an enemy, it returns their associated base parameter 
* instead since enemies don't use weapons
*
* Game_BattlerBase.prototype.weaponStat(statID)
* Same as above, but allows the stat to be referenced by its ID.  Examples:
* a.weaponStat(2) // same as a.weaponAtk()
* a.weaponStat(4) // same as a.weaponMat()
*
* Game_BattlerBase.prototype.tagStat(tag)
* Allows the reading of extra quasi-stats set via note tags.  The following
* note tags are used on enemies, actors, classes, equips, and states:
* <Stat Base x: y>
* <Stat Growth x: y>
* <Stat Bonus x: y>
* Where x is the name of the stat and y is the value.
* - Base: This is a base value, and is added to other base values
* - Growth: This value scales with level to simulate stat growth (y * level)
* - Bonus: This value is a multiplier (1.5, 0.8, etc)
* The formula is (base + growth) * bonus
* Examples:
* <Stat Base Charisma: 10>
* <Stat Growth Charisma: 0.8>
* <Stat Bonus Charisma: 0.5>
*
* Game_BattlerBase.prototype.anyStateAffected(1, 3, 27, ...etc)
* Returns true if the specified battler has ANY of the listed states.  Examples:
* a.anyStateAffected(3, 14)
* b.anyStateAffected(27, 28, 29, 41, 47)
*
* Game_BattlerBase.prototype.allStateAffected(1, 3, 27, ...etc)
* Returns true if the specified battler ALL of the listed states.  Examples:
* a.alltateAffected(3, 14)
* b.allStateAffected(27, 28, 29, 41, 47)
*
* Here's some sample damage formula box applications of these various functions:
*
* Aesica.Core.damage(a.atk, 5, b.def)
* // uses the damage formula from the plugin parameters to check a.atk with
* // a multiplier of 5 vs b.def
*
* Aesica.Core.damage(1000, 1, b.mdf)
* // checks 1000 damage against b.mdf
*
* Aesica.Core.damage(1000)
* // 1000 fixed damage (doing fixed damage this way is not necessary)
* 
* Aesica.Core.heal(a.mat, 3)
* // uses the healing formula from the plugin parameters to combine a.mat with
* // a multiplier of 3
* 
* Aesica.Core.damage(a.weaponAtk(), 10, b.def)
* // Applies a's WEAPON ATK total to a multiplier of 10 and checks it against
* // b.def
*
* Aesica.Core.damage(a.tagStat("Telepathy"), 8, b.tagStat("Willpower"));
* // Deals damage based on the user's Telepathy tag stat with a multiplier of
* // 8 vs the target's Willpower tag stat.  See the tagStat section for
* // additional details
*
* Aesica.Core.gravity(b, 0.5)
* // 50% of the target's hp, or 0 if affected by <Immune to Gravity>
*
* Aesica.Core.gravity(b, 0.75) || Aesica.Core.damage(a.mat, 3, b.mdf, 0.2)
* // 75% of the target's hp, or if <Immune to Gravity, uses the plugin
* // paramter damage formula with a multiplier of 3 and damage variance of
* // 20% (since you want the formula box's varianace set to 0%)
*
* b.anyStateAffected(9, 10) ? 500 : 1
* // If b is affected by either state 9 or state 10, deal 500 damage.  Otherwise
* // only deal 1 damage.
*
* b.allStateAffected(4, 5, 6, 7, 8, 9, 10) ? 5000 : 1
* // If b is affected by state 4, 5, 6, 7, 8, 9, AND 10, deal 5000 damage.
* // Otherwise only deal 1 damage.
*
* ----------------------------------------------------------------------
*
* Instant Text Rendering
* Allows you to remove the typewriter text effect and render text instantly.
* Can also be switched on or off temporarily via Plugin Commands, making it
* a useful alternative to the per-line message parameter for certain event
* sequences.
* 
* Plugin Commands:
*
* InstantText 0
* - Turns off instant text rendering
*
* InstantText 1
* - Turns on instant text rendering
*
* Note that this setting spans ALL saved games since it's handled by the
* config manager.
*
* ----------------------------------------------------------------------
*
* Unified Obtain Item Framework
* Allows you to easily give an item to players and inform them about what
* they got in a consistent way.  This bypasses the need to pop up a message
* window, play a sound, etc in the exact same way every time they open a chest,
* are given something by an npc, etc.
*
* Plugin Commands:
*
* ObtainItem id quantity
* - Gives the player one or more of the specified item and displays a message
*
* ObtainWeapon id quantity
* - Gives the player one or more of the specified weapon and displays a message
*
* ObtainArmor id quantity
* - Gives the player one or more of the specified armor and displays a message
*
* ObtainGold quantity
* - Gives the player the specified amount of gold and displays a message
* ----------------------------------------------------------------------
*
* ForceExitVehicle moveForward (0 or 1)
* This plugin command will force the player out of a vehicle, regardless of
* location or terrain rules.
* - ForceExitVehicle 0:  Player will be ejected from the vehicle without moving.
* - ForceExitVehicle 1:  Player will exit the vehicle and take a step forward
		unless they're on the airship.
*
* ----------------------------------------------------------------------
*
* Shop Item "Possessed" Quantity Patch
* By default, shops don't account for any weapons or armor you have equipped
* when displaying the quantity.  This is not only misleading, but can also cause
* you to lose gear if you are at the max for that item and attempt to unequip 
* what would be an extra.  This is simply a patch to correct that oversight.
*
* ----------------------------------------------------------------------
*
* Plugin Command execution function
* An easy (easier, anyway) way to execute plugin commands via script calls
* using the exact same syntax used in events.  Examples:
*
* Event version:
* Plugin Command : Butts 1 2
*
* Script version:
* Aesica.Core.pluginCommand("Butts 1 2");
*
* ----------------------------------------------------------------------
*
* Note tag parsing functions
* Unlike using the meta property, these are intended to function in a 
* case-insensitive manner, so <butts>, <Butts>, and <BUTTS> would all be
* treated as the same note tag. These are intended to be called by the object
* (items, enemies, actors, etc) that is to be read from, so use the call
* method as shown below:
*
* Aesica.Core.tagExists.call(callingObject, tagName)
* Returns true if the tag exists, false if not
*
* Aesica.Core.getTag.call(callingObject, tagName)
* Returns the contents of the tag
*
* Aesica.Core.getTagFromItemArray.call(callingObject, tagName)
* Returns an array of tag contents from an array of objects, such as all
* equipped items on an actor.
*
* ----------------------------------------------------------------------
*
* Self-Switch Manipulation
* This is a collection of functions for reading or manipulating many self
* switches at once.  With the exception of selfSwitchesOff, they only work for
* events on the current map.
*
* Aesica.Core.selfSwitchesOff(mapID, eventID, switchID)
*	- mapID:    map id number
*	- eventID:  event id number
*	- switchID: Switch ID (A, B, C, D, or  beyond)
* Setting any of these values to 0 will function as a wildcard, so:
* Aesica.Core.selfSwitchesOff(0, 0, "D") // Sets all D self switches to false
* Aesica.Core.selfSwitchesOff(5, 3) // Sets all self switches on the event
*   found on map id 5 with event id 3 to false
* Aesica.Core.selfSwitchesOff(5, 0, "D") // Sets all D switches on map 5
*   to false
* Aesica.Core.selfSwitchesOff(5) // Sets all self switch on map 5 to false
* Aesica.Core.selfSwitchesOff() // Sets ALL self switches to false
*
* Aesica.Core.setSelfSwitchesByTag(switchID, noteTag, newValue)
* Allows you to enable/disable a self switch (switchID) for every event on the 
* current map with the specified note tag (noteTag)
*
* Aesica.Core.getSelfSwitchCountByTag(switchID, noteTag, value)
* Returns a count of every self switch (switchID) on the current map with the
* specified note tag (noteTag) that is either on or off (value)
*
* Aesica.Core.getEventCountByTag(noteTag)
* Returns a count of every event on the current map with the specified noteTag
*/
(function($$)
{
	$$.itemType = {"item":0,"weapon":1,"armor":2,"gold":3};
	$$.pluginParameters = PluginManager.parameters("AES_Core");
	$$.params = {};
	$$.params.section = {};
	$$.params.section.configManager = String($$.pluginParameters["Config Manager"]).toLowerCase() === "false" ? false : true;
	$$.params.section.battleCommands = String($$.pluginParameters["Battle Commands"]).toLowerCase() === "false" ? false : true;
	$$.params.section.combatFormulas = String($$.pluginParameters["Combat Formulas"]).toLowerCase() === "false" ? false : true;
	$$.params.section.universalObtainItem = String($$.pluginParameters["Universal Obtain Item"]).toLowerCase() === "false" ? false : true;
	$$.params.section.battleEndEffects = String($$.pluginParameters["Battle End Effects"]).toLowerCase() === "false" ? false : true;
	$$.params.configManager = {};
	$$.params.configManager.showAlwaysDash = String($$.pluginParameters["Show Always Dash"]).toLowerCase() === "false" ? false : true;
	$$.params.configManager.alwaysDash = String($$.pluginParameters["Always Dash"]).toLowerCase() === "false" ? false : true;
	$$.params.configManager.showCommandRemember = String($$.pluginParameters["Show Command Remember"]).toLowerCase() === "false" ? false : true;
	$$.params.configManager.commandRemember = String($$.pluginParameters["Remember Commands"]).toLowerCase() === "false" ? false : true;
	$$.params.configManager.showInstantText = String($$.pluginParameters["Show Instant Text"]).toLowerCase() === "false" ? false : true;
	$$.params.configManager.instantText = String($$.pluginParameters["Instant Text"]).toLowerCase() === "false" ? false : true;
	$$.params.configManager.masterVolumeLabel = String($$.pluginParameters["Master Volume Label"]);
	$$.params.configManager.masterVolume = +$$.pluginParameters["Default Master Volume"] || 0;
	$$.params.configManager.bgmVolume = +$$.pluginParameters["Default BGM Volume"] || 0;
	$$.params.configManager.bgsVolume = +$$.pluginParameters["Default BGS Volume"] || 0;
	$$.params.configManager.meVolume = +$$.pluginParameters["Default ME Volume"] || 0;
	$$.params.configManager.seVolume = +$$.pluginParameters["Default SE Volume"] || 0;
	$$.params.individualVolumeControls = String($$.pluginParameters["Individual Volume Controls"]).toLowerCase() === "false" ? false : true;
	$$.params.volumeOffset = +$$.pluginParameters["Volume Adjustment Offset"] || 10;
	$$.params.shopPatch = String($$.pluginParameters["Shop Patch"]).toLowerCase() === "false" ? false : true;
	$$.params.shopSellModifier = +$$.pluginParameters["Shop Sell Modifier"] || 0;
	$$.params.limitCommand = +$$.pluginParameters["Limit Break Command"] || 0;
	$$.params.limitThreshold = +$$.pluginParameters["Limit Break Threshold"] || 0;
	$$.params.enableAttack = String($$.pluginParameters["Enable Attack"]).toLowerCase() === "false" ? false : true;
	$$.params.enableGuard = String($$.pluginParameters["Enable Guard"]).toLowerCase() === "false" ? false : true;
	$$.params.enableItem = String($$.pluginParameters["Enable Item"]).toLowerCase() === "false" ? false : true;
	$$.params.damageFormula = String($$.pluginParameters["Damage Formula"]);
	$$.params.healingFormula = String($$.pluginParameters["Healing Formula"]);
	$$.params.minDamage = +$$.pluginParameters["Minimum Damage"] || 0;
	$$.params.maxDamage = +$$.pluginParameters["Maximum Damage"] || 0;
	$$.params.unarmedValue = $$.pluginParameters["Unarmed Weapon Value"];
	$$.params.critMultiplier = +$$.pluginParameters["Critical Hit Multiplier"] || 0;
	$$.params.initialTP = String($$.pluginParameters["Initial TP"]);
	$$.params.battleEndRevive = String($$.pluginParameters["Revive Dead"]).toLowerCase() === "false" ? false : true;
	$$.params.battleEndHeal = String($$.pluginParameters["Heal HP"]);
	$$.params.battleEndRefresh = String($$.pluginParameters["Recover MP"]);
	$$.params.bushSettings = String($$.pluginParameters["Bush Depth/Opacity Settings"]).toLowerCase() === "false" ? false : true;
	$$.params.bushOpacity = +$$.pluginParameters["Bush Opacity"] || 0;
	$$.params.bushDepth = +$$.pluginParameters["Bush Depth"] || 0;
	$$.params.itemObtainText = String($$.pluginParameters["Item Obtain Message"]);
	$$.params.itemObtainSound = String($$.pluginParameters["Item Obtain Sound"]);
	$$.params.itemObtainVolume = +$$.pluginParameters["Item Obtain Volume"] || 0;
	$$.params.itemCurrencyIcon = +$$.pluginParameters["Currency Icon"] || 0;
	$$.params.autoSaveLabel = String($$.pluginParameters["Auto Save"]);
	
	$$.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args)
	{
		$$.Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === "InstantText") $$.setInstantText(args[0]);
		else if (command === "ObtainItem" && $$.params.section.universalObtainItem) $$.obtainItem(0, args[0], args[1]);
		else if (command === "ObtainWeapon" && $$.params.section.universalObtainItem) $$.obtainItem(1, args[0], args[1]);
		else if (command === "ObtainArmor" && $$.params.section.universalObtainItem) $$.obtainItem(2, args[0], args[1]);
		else if (command === "ObtainGold" && $$.params.section.universalObtainItem) $$.obtainItem(3, 0, args[0]);
		else if (command === "ForceExitVehicle") $$.forceExitVehicle(args);
		else if (command === "AutoSave") $$.autoSave();
	}
/**-------------------------------------------------------------------
	ConfigManager tweaks
//-------------------------------------------------------------------*/	
	if ($$.params.section.configManager)
	{
		Object.defineProperty(ConfigManager, "masterVolume",
		{
			get: function(){ return Math.floor(AudioManager.masterVolume * 100).clamp(0, 100); },
			set: function(value){ AudioManager.masterVolume = (value * 0.01).clamp(0, 1); },
			configurable: true
		});
		Object.defineProperty(ConfigManager, "instantText",
		{
			get: function(){ return !!$$.params.configManager.instantText; },
			set: function(value){ $$.params.configManager.instantText = !!value; },
			configurable: true
		});
		$$.Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
		Window_Options.prototype.addGeneralOptions = function()
		{
			if ($$.params.configManager.showAlwaysDash && $$.params.configManager.showCommandRemember) 
				$$.Window_Options_addGeneralOptions.call(this);
			else
			{
				if ($$.params.configManager.showAlwaysDash) this.addCommand(TextManager.alwaysDash, 'alwaysDash');
				if ($$.params.configManager.showCommandRemember) this.addCommand(TextManager.commandRemember, 'commandRemember');
			}			
			if ($$.params.configManager.showInstantText) this.addCommand("Instant Text", "instantText");
		}
		$$.ConfigManager_makeData = ConfigManager.makeData;
		ConfigManager.makeData = function()
		{
			var config = $$.ConfigManager_makeData.call(this);
			config.instantText = this.instantText;
			config.masterVolume = this.masterVolume;
			return config;
		}		
		ConfigManager.applyData = function(config)
		{
			this.alwaysDash = config.alwaysDash === undefined ? $$.params.configManager.alwaysDash : this.readFlag(config, "alwaysDash");
			this.commandRemember = config.commandRemember === undefined ? $$.params.configManager.commandRemember : this.readFlag(config, "commandRemember");
			this.instantText = config.instantText === undefined ? $$.params.configManager.instantText : this.readFlag(config, "instantText");
			this.masterVolume = this.readVolume(config, "masterVolume");
			this.bgmVolume = this.readVolume(config, "bgmVolume");
			this.bgsVolume = this.readVolume(config, "bgsVolume");
			this.meVolume = this.readVolume(config, "meVolume");
			this.seVolume = this.readVolume(config, "seVolume");
		}
		ConfigManager.readVolume = function(config, name)
		{
			var value = config[name];
			if (value !== undefined)
			{
				return Number(value).clamp(0, 100);
			}
			else
			{
				return +$$.params.configManager[name].clamp(0, 100);
			}
		}
		Window_Options.prototype.volumeOffset = function()
		{
			return $$.params.volumeOffset;
		}
		$$.Window_Options_addVolumeOptions = Window_Options.prototype.addVolumeOptions;
		Window_Options.prototype.addVolumeOptions = function()
		{
			if ($$.params.configManager.masterVolumeLabel != "") this.addCommand($$.params.configManager.masterVolumeLabel, 'masterVolume');
			if ($$.params.individualVolumeControls) $$.Window_Options_addVolumeOptions.call(this);
		}		
	}
/**-------------------------------------------------------------------
	Plugin command exec
//-------------------------------------------------------------------*/	
	$$.pluginCommand = function(args)
	{
		args = args.split(" ");
		var command = args.shift();
		Game_Interpreter.prototype.pluginCommand.call(Game_Interpreter, command, args);
	}
/**-------------------------------------------------------------------	
	Autosave functions
//-------------------------------------------------------------------*/
	$$.autoSave = function()
	{
		$gameSystem.onBeforeSave();
		var gameSlot = DataManager._lastAccessedId;
		DataManager.saveGame(1);
		DataManager._lastAccessedId = gameSlot;
	}
	Window_SavefileList.prototype.drawFileId = function(id, x, y)
	{
		if ($$.params.autoSaveLabel != "") this.drawText(id == 1 ? $$.params.autoSaveLabel : TextManager.file + " " + (+id - 1), x, y, 180);
		else this.drawText(TextManager.file + " "  + id, x, y, 180);
	}
/**-------------------------------------------------------------------
	Self-Switch manipulation & event tag counting
//-------------------------------------------------------------------*/	
	$$.selfSwitchesOff = function(mapID, eventID, switchID, ignoreCase=true)
	{
		var curentData, switchKeys = Object.keys($gameSelfSwitches._data);
		var oReturn = {}
		oReturn.changed = 0;
		oReturn.total = switchKeys.length;
		if (ignoreCase && switchID) switchID = switchID.toLowerCase();
		for (i in switchKeys)
		{
			bClearSwitch = false;
			currentData = switchKeys[i].split(",");
			if (ignoreCase) currentData[2] = currentData[2].toLowerCase();
			if ((!mapID || mapID == +currentData[0]) && (!eventID || eventID == +currentData[1]) && (!switchID || switchID == currentData[2]))
			{
				$gameSelfSwitches.setValue(switchKeys[i], false);
				oReturn.changed++;
			}
		}
		return oReturn;
	}
	$$.setSelfSwitchesByTag = function(switchID, tag, newValue)
	{
		var events = $gameMap.events();
		var currentEvent;
		var mapID = $gameMap.mapId();
		var oReturn = {};
		oReturn.changed = 0;
		oReturn.total = events.length;
		switchID = switchID.toUpperCase();
		for (i in events)
		{
			currentEvent = events[i].event();
			if (!tag || $$.tagExists.call(currentEvent, tag))
			{
				$gameSelfSwitches.setValue([mapID, events[i].eventId(), switchID], newValue);
				oReturn.changed++;
			}
		}
		return oReturn;
	}
	$$.getSelfSwitchCountByTag = function(switchID, tag, value)
	{
		var events = $gameMap.events();
		var currentEvent;
		var mapID = $gameMap.mapId();
		var iReturn = 0;
		switchID = switchID.toUpperCase();
		for (i in events)
		{
			currentEvent = events[i].event();
			if ((!tag || $$.tagExists.call(currentEvent, tag)) && $gameSelfSwitches.value([mapID, events[i].eventId(), switchID]) == value) iReturn++;
		}
		return iReturn;
	}
	$$.getEventCountByTag = function(tag)
	{
		var events = $gameMap.events();
		var currentEvent;
		var mapID = $gameMap.mapId();
		var iReturn = 0;
		for (i in events)
		{
			currentEvent = events[i].event();
			if ($$.tagExists.call(currentEvent, tag)) iReturn++;
		}
		return iReturn;
	}
	$$.eventTag = function(tag)
	{
		return $$.getTag.call($gameMap.event(this._eventId).event(), tag);
	}
/**-------------------------------------------------------------------	
	Note tag parsing functions
//-------------------------------------------------------------------*/	
	$$.getTag = function(tag)
	{
		var result = this.note.match(RegExp("<" + tag + "[ ]*:[ ]*([^>]+)>", "is"));
		return result ? result[1] : $$.tagExists.call(this, tag);
	}
	$$.tagExists = function(tag)
	{
		return RegExp("<" + tag + "(?::.*)?>", "is").test(this.note);
	}
	$$.getTagFromItemArray = function(tag)
	{
		var aReturn = [];
		var currentValue;
		for (i in this)
		{
			currentValue = $$.getTag.call(this[i], tag);
			if (currentValue) aReturn.push(currentValue);
		}
		return aReturn;
	}
/**-------------------------------------------------------------------	
	Instant Text Rendering
//-------------------------------------------------------------------*/	
	$$.Window_Message_updateInput = Window_Message.prototype.updateInput;
	Window_Message.prototype.updateInput = function()
	{
		this._showFast = !!$$.params.configManager.instantText ? true : this._showFast;
		return $$.Window_Message_updateInput.call(this);
	}
	$$.setInstantText = function(onOrOff)
	{
		ConfigManager.instantText = !!+onOrOff;
	}
/**-------------------------------------------------------------------	
	ObtainItem/Gold Plugin Commands
//-------------------------------------------------------------------*/	
	if ($$.params.section.universalObtainItem)
	{
		$$.obtainItem = function(itemType, itemID, quantity)
		{
			var failure = false;
			try
			{
				itemType = +itemType || 0;
				itemID = +eval(itemID) || 0;
				quantity = +eval(quantity) || 1;
			}
			catch(e)
			{
				failure = true;
			}
			var item, message = $$.params.itemObtainText;
			var currencyIcon = Imported.YEP_CoreEngine && $$.params.itemCurrencyIcon == 0 ? Yanfly.Icon.Gold : $$.params.itemCurrencyIcon;
			var rxItemIcon = /%i/gi;
			var rxItemName = /%n/gi;
			var rxItemQuantity = /%q/gi;
			var se = {"name":$$.params.itemObtainSound, "pan":0, "pitch":100, "volume":$$.params.itemObtainVolume};
			if (itemType == $$.itemType.gold)
			{
				if (quantity > 0)
				{
					$gameParty.gainGold(quantity);
					message = message.replace(rxItemIcon, "\\I[" + currencyIcon + "]").replace(rxItemName, "\\G").replace(rxItemQuantity, quantity);
				}
				else failure = true;
			}
			else
			{
				if (itemType === $$.itemType.item) item = $dataItems[itemID];
				else if (itemType === $$.itemType.weapon) item = $dataWeapons[itemID];
				else if (itemType === $$.itemType.armor) item = $dataArmors[itemID];
				
				if (item)
				{
					$gameParty.gainItem(item, quantity);
					message = message.replace(rxItemIcon, "\\I[" + item.iconIndex + "]").replace(rxItemName, item.name).replace(rxItemQuantity, quantity);
				}
				else failure = true;
			}
			if (!failure)
			{
				
				AudioManager.playSe(se);
				$gameMessage.add(message);
			}
			else console.log("ObtainItemFramework:  Invalid type/quantity or itemID out of bounds. itemType:[" + itemType + "], itemID:[" + itemID + "], quantity:[" + quantity + "]");
		}
	}
/**-------------------------------------------------------------------	
	Flexible bush height/opacity
//-------------------------------------------------------------------*/	
	if ($$.params.bushSettings)
	{
		Sprite_Character.prototype.createHalfBodySprites = function()
		{
			if (!this._upperBody)
			{
				this._upperBody = new Sprite();
				this._upperBody.anchor.x = 0.5;
				this._upperBody.anchor.y = 1;
				this.addChild(this._upperBody);
			}
			if (!this._lowerBody)
			{
				this._lowerBody = new Sprite();
				this._lowerBody.anchor.x = 0.5;
				this._lowerBody.anchor.y = 1;
				this._lowerBody.opacity = $$.params.bushOpacity;
				this.addChild(this._lowerBody);
			}
		}
		Game_CharacterBase.prototype.refreshBushDepth = function()
		{
			if (this.isNormalPriority() && !this.isObjectCharacter() && this.isOnBush() && !this.isJumping())
			{
				if (!this.isMoving()) this._bushDepth = $$.params.bushDepth;
			}
			else this._bushDepth = 0;
		}
	}
/**-------------------------------------------------------------------	
	Force exit vehicle plugin command/function
//-------------------------------------------------------------------*/	
	$$.forceExitVehicle = function(args)
	{
		var player = $gamePlayer;
		args = !!+args[0];
		if (player.isInVehicle())
		{
			player._followers.synchronize(player.x, player.y, player.direction());
			player.vehicle().getOff();
			player.setTransparent(false);
			player._vehicleGettingOff = true;
			player.setMoveSpeed(4);
			if (args && !player.isInAirship()) player.forceMoveForward();
			player.setThrough(false);
			player.makeEncounterCount();
			player.gatherFollowers();
		}
	}
/**-------------------------------------------------------------------	
	Damage/Healing formulas and Battler functions
//-------------------------------------------------------------------*/	
	if ($$.params.section.combatFormulas)
	{
		$$.damage = function(attack, multiplier=null, defense=null, variance=0)
		{
			var iReturn = 0;
			var userStat = 0;
			var targetStat = 0;
			var iLength;
			if (Array.isArray(attack))
			{
				iLength = attack.length;
				for (i in attack){ userStat += attack[i]; }
				userStat = Math.round(userStat / iLength);
			}
			else userStat = attack;
			if (Array.isArray(defense))
			{
				iLength = defense.length;
				for (i in defense){ targetStat += defense[i]; }
				targetStat = Math.round(targetStat / iLength);
			}
			else targetStat = isNaN(defense) ? 0 : defense;
			multiplier = isNaN(multiplier) ? 1 : multiplier;
			iReturn = eval($$.params.damageFormula) || 0;
			return $$.variance(iReturn, variance);
		}
		$$.heal = function(attack, multiplier=null, defense=null, variance=0)
		{
			var iReturn = 0;
			var userStat = 0;
			var targetStat = 0;
			var i, iLength;
			if (Array.isArray(attack))
			{
				iLength = attack.length;
				for (i in attack){ userStat += attack[i]; }
				userStat = Math.round(userStat / iLength);
			}
			else userStat = attack;
			if (Array.isArray(defense))
			{
				iLength = defense.length;
				for (i in defense){ targetStat += defense[i]; }
				targetStat = Math.round(targetStat / iLength);
			}
			else targetStat = isNaN(defense) ? 0 : defense;
			multiplier = isNaN(multiplier) ? 1 : multiplier;
			iReturn = eval($$.params.healingFormula) || 0;
			return $$.variance(iReturn, variance);
		}
		$$.gravity = function(b, magnitude)
		{
			var tag = "Immune to Gravity";
			var target = b.isEnemy() ? b.enemy() : b.actor();
			var temp;
			var bImmune = false;
			// actor/enemy
			if ($$.tagExists.call(target, "immune to gravity")) bImmune = true;
			// states
			temp = b.states();
			for (i in temp){ if ($$.tagExists.call(temp[i], tag)) bImmune = true; }
			if (b.isActor() && !bImmune)
			{
				// equips
				temp = b.weapons().concat(b.armors());
				for (i in temp){ if ($$.tagExists.call(temp[i], tag)) bImmune = true; }
				// class
				if ($$.tagExists.call($dataClasses[b._classId], tag)) bImmune = true;
			}
			return bImmune ? 0 : b.hp * magnitude;
		}		
		$$.variance = function(damageValue, variance)
		{
			return Math.round(damageValue + damageValue * (Math.random() * variance * 2 - variance));
		}
		$$.Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
		Game_Action.prototype.makeDamageValue = function(target, critical)
		{
			var iReturn = $$.Game_Action_makeDamageValue.call(this, target, critical);
			var cap = $$.params.maxDamage;
			return $$.applyDamageCap(iReturn, cap);
		}
		$$.applyDamageCap = function(damage, customCap)
		{
			var iReturn = Math.max($$.params.minDamage, Math.abs(damage));
			customCap = $$.params.maxDamage;
			if (customCap) iReturn = Math.min(customCap, iReturn);
			if (damage < 0) iReturn *= -1;
			return iReturn;
		}
		Game_Action.prototype.applyCritical = function(damage)
		{
			var iReturn = damage * $$.params.critMultiplier;
			var subject = this.subject();
			var subjectData;
			var equips, states;
			if (subject.isActor())
			{
				iReturn *= +$$.getTag.call($dataClasses[subject._classId], "Critical Bonus") || 1;
				equips = subject.weapons().concat(subject.armors());
				for (i in equips){ iReturn *= +$$.getTag.call(equips[i], "Critical Bonus") || 1; }
				subjectData = subject.actor();
			}
			else subjectData = subject.enemy();
			iReturn *= +$$.getTag.call(subjectData, "Critical Bonus") || 1;
			iReturn *= +$$.getTag.call(this.item(), "Critical Bonus") || 1;
			states = subject.states();
			for (i in states){ iReturn *= +$$.getTag.call(states[i], "Critical Bonus") || 1; }
			return iReturn;
		}
		Game_BattlerBase.prototype.weaponMhp = function(){ return this.weaponStat.call(this, 0); }
		Game_BattlerBase.prototype.weaponMmp = function(){ return this.weaponStat.call(this, 1); }
		Game_BattlerBase.prototype.weaponAtk = function(){ return this.weaponStat.call(this, 2); }
		Game_BattlerBase.prototype.weaponDef = function(){ return this.weaponStat.call(this, 3); }
		Game_BattlerBase.prototype.weaponMat = function(){ return this.weaponStat.call(this, 4); }
		Game_BattlerBase.prototype.weaponMdf = function(){ return this.weaponStat.call(this, 5); }
		Game_BattlerBase.prototype.weaponAgi = function(){ return this.weaponStat.call(this, 6); }
		Game_BattlerBase.prototype.weaponLuk = function(){ return this.weaponStat.call(this, 7); }
		Game_BattlerBase.prototype.weaponStat = function(statId)
		{
			var params = ["mhp","mmp","atk","def","mat","mdf","agi","luk"];
			var weapons, iReturn = 0;
			var stat = this[params[statId]];
			if (this.isActor())
			{
				weapons = this.weapons();
				if (weapons.length < 1) iReturn = eval($$.params.unarmedValue);
				else for (i in weapons){ iReturn += weapons[i].params[statId]; }
			}
			else iReturn = stat;
			return iReturn;
		}
		Game_BattlerBase.prototype.anyStateAffected = function(...states)
		{
			var bReturn = false;
			for (i in states)
			{
				bReturn = this.isStateAffected(states[i]);
				if (bReturn) break;
			}
			return bReturn;
		}
		Game_BattlerBase.prototype.allStateAffected = function(...states)
		{
			var iReturn = 0;
			for (i in states){ if (this.isStateAffected(states[i])) iReturn++; }
			return iReturn == iLength;
		}
		Game_BattlerBase.prototype.tagStat = function(stat)
		{
			var base = 0;
			var growth = 0;
			var bonus = 1;
			var obj = {"base":0,"growth":0,"bonus":1};
			var level;
			var list;
			if (this.isActor())
			{
				level = this.level;
				// actor
				$$.buildTagStatData.call(this.actor(), stat, obj);
				// class
				$$.buildTagStatData.call($dataClasses[this._classId], stat, obj);
				// equips
				list = this.weapons().concat(this.armors());
				for (i in list){ $$.buildTagStatData.call(list[i], stat, obj); }
			}
			else
			{
				level = 1;
				// enemy
				$$.buildTagStatData.call(this.enemy(), stat, obj);
			}
			// states
			list = this.states();
			for (i in list){ $$.buildTagStatData.call(list[i], stat, obj); }
			return Math.floor((obj.base + obj.growth * level) * obj.bonus);
		}
		$$.buildTagStatData = function(statName, statObj)
		{
			statObj.base += +$$.getTag.call(this, "Stat Base " + statName) || 0;
			statObj.growth += +$$.getTag.call(this, "Stat Growth " + statName) || 0;
			statObj.bonus *= $$.tagExists.call(this, "Stat Bonus " + statName) ? +$$.getTag.call(this, "Stat Bonus " + statName) : 1;
		}
		Game_Battler.prototype.initTp = function()
		{
			var tpValue;
			try
			{
				tpValue = +eval($$.params.initialTP) || 0;
			}
			catch(e)
			{
				console.log("Eval error in Aesica.Core - Initial TP Plugin Parameter");
			}
			this.setTp(tpValue);
		}
	}
/**-------------------------------------------------------------------	
	Static command control - Attack, Guard, Item, Limit Breaks,
	Attack replacers, and Guard state bonuses
//-------------------------------------------------------------------*/
	if ($$.params.section.battleCommands)
	{
		Scene_Battle.prototype.createActorCommandWindow = function()
		{
			this._actorCommandWindow = new Window_ActorCommand();
			if ($$.params.enableAttack) this._actorCommandWindow.setHandler("attack", this.commandAttack.bind(this));
			this._actorCommandWindow.setHandler("skill", this.commandSkill.bind(this));
			if ($$.params.enableGuard) this._actorCommandWindow.setHandler("guard", this.commandGuard.bind(this));
			if ($$.params.enableItem) this._actorCommandWindow.setHandler("item", this.commandItem.bind(this));
			this._actorCommandWindow.setHandler("cancel", this.selectPreviousCommand.bind(this));
			this.addWindow(this._actorCommandWindow);
		}
		Window_ActorCommand.prototype.makeCommandList = function()
		{
			if (this._actor)
			{
				if (this._actor.tp >= $$.params.limitThreshold && $$.params.limitCommand > 0 && $$.params.limitCommand < $dataSystem.skillTypes.length) this.addLimitCommand();
				else if ($$.params.enableAttack) this.addAttackCommand();
				this.addSkillCommands();
				if ($$.params.enableGuard) this.addGuardCommand();
				if ($$.params.enableItem) this.addItemCommand();
			}
		}
		$$.Window_ActorCommand_addAttackCommand = Window_ActorCommand.prototype.addAttackCommand;
		Window_ActorCommand.prototype.addAttackCommand = function()
		{
			var battler = this._actor;
			var actor, actorClass, equips, states;
			var tagName = "Replace Attack";
			var attackID = 1;
			if (battler)
			{
				actor = $dataActors[battler._actorId];
				actorClass = $dataClasses[actor.classId];
				equips = battler.weapons().concat(battler.armors());
				states = battler.states();
				attackID = Number($$.getTagFromItemArray.call(states, tagName)[0])
				|| Number($$.getTagFromItemArray.call(equips, tagName)[0])
				|| Number($$.getTag.call(actorClass, tagName))
				|| Number($$.getTag.call($dataActors[battler._actorId], tagName))
				|| 1;
				battler._attackSkillReplaceID = attackID;
				this.addCommand($dataSkills[attackID].name, 'attack', battler.canAttack());
			}
			else $$.Window_ActorCommand_addAttackCommand.call(this);
		}
		Game_BattlerBase.prototype.attackSkillId = function()
		{
			return this._attackSkillReplaceID || 1;
		}
		$$.Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
		Game_Action.prototype.applyItemUserEffect = function(target)
		{
			$$.Game_Action_applyItemUserEffect.call(this, target);
			if (this.isGuard()) $$.applyGuardBonusStates.call(this, target);
		}
		$$.applyGuardBonusStates = function(target)
		{
			var user = this.subject();
			var stateId = "Guard State";
			var stateAllId = "Guard State All";
			var stateList = [];
			var stateListAll = [];
			var equips, states, x, targetParty = target.friendsUnit().members();
			if (user.isActor())
			{
				if ($$.tagExists.call(user.actor(), stateId)) stateList = stateList.concat($$.getTag.call(user.actor(), stateId).split(","));
				if ($$.tagExists.call(user.actor(), stateAllId)) stateListAll = stateListAll.concat($$.getTag.call(user.actor(), stateAllId).split(","));
				if ($$.tagExists.call(user.currentClass(), stateId)) stateList = stateList.concat($$.getTag.call(user.currentClass(), stateId).split(","));
				if ($$.tagExists.call(user.currentClass(), stateAllId)) stateListAll = stateListAll.concat($$.getTag.call(user.currentClass(), stateAllId).split(","));
				equips = user.weapons().concat(user.armors());
				for (i in equips)
				{
					if ($$.tagExists.call(equips[i], stateId)) stateList = stateList.concat($$.getTag.call(equips[i], stateId).split(","));
					if ($$.tagExists.call(equips[i], stateAllId)) stateListAll = stateListAll.concat($$.getTag.call(equips[i], stateAllId).split(","));
				}
			}
			else
			{
				if ($$.tagExists.call(user.enemy(), stateId)) stateList = stateList.concat($$.getTag.call(user.enemy(), stateId).split(","));
				if ($$.tagExists.call(user.enemy(), stateAllId)) stateListAll = stateListAll.concat($$.getTag.call(user.enemy(), stateAllId).split(","));
			}
			states = user.states();
			for (i in states)
			{
				if ($$.tagExists.call(states[i], stateId)) stateList = stateList.concat($$.getTag.call(states[i], stateId).split(","));
				if ($$.tagExists.call(states[i], stateAllId)) stateListAll = stateListAll.concat($$.getTag.call(states[i], stateAllId).split(","));
			}
			for (i in stateList)
			{
				x = +stateList[i];
				if (x) target.addState(x);
			}				
			for (i in stateListAll)
			{
				x = +stateListAll[i];
				if (x) for (j in targetParty) targetParty[j].addState(x);
			}
		}
		Window_ActorCommand.prototype.addLimitCommand = function()
		{
			this.addCommand($dataSystem.skillTypes[$$.params.limitCommand], 'skill', true, $$.params.limitCommand);
		}
	}
/**-------------------------------------------------------------------	
	Battle end effects (revive dead, heal hp/mp, etc
//-------------------------------------------------------------------*/
	if ($$.params.section.battleEndEffects)
	{
		Game_Party.prototype.removeBattleStates = function()
		{
			this.allMembers().forEach(function(actor)
			{
				if ($$.params.battleEndRevive) actor.removeState(1);
				actor.removeBattleStates();
				if (!actor.isStateAffected(1))
				{
					actor.gainHp(Math.floor(eval($$.params.battleEndHeal)));
					actor.gainMp(Math.floor(eval($$.params.battleEndRefresh)));
				}
			});
		}
	}
/**-------------------------------------------------------------------	
	Shop quantity owned patch - now includes equipped items
//-------------------------------------------------------------------*/
	if ($$.params.shopPatch)
	{
		$$.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
		DataManager.isDatabaseLoaded = function()
		{
			var bReturn = $$.DataManager_isDatabaseLoaded.call(this);
			var bYepItemSynthLoaded = false;
			if (bReturn && !Aesica._shopPatchCategorizedItems)
			{
				if (Imported.YEP_ItemSynthesis)
				{
					if (Yanfly._loaded_YEP_ItemSynthesis)
					{
						console.log("AES_Core: Item groupTypes already assigned by YEP_ItemSynthesis");
						bYepItemSynthLoaded = true;
					}
				}
				if (!bYepItemSynthLoaded)
				{
					$$.assignGroupType($dataItems, 0);
					$$.assignGroupType($dataWeapons, 1);
					$$.assignGroupType($dataArmors, 2);
					$$._shopPatchCategorizedItems = true;
				}
			}
			return bReturn;
		}
		$$.assignGroupType = function(group, type)
		{
			var i, iLength = group.length;
			for (i = 1; i < iLength; i++) group[i].groupType = type;
		}
		$$.Game_Party_numItems = Game_Party.prototype.numItems;
		Game_Party.prototype.numItems = function(item, includeEquipped=false)
		{
			var iReturn, container, i, iLength, j, jLength, party, items;
			if (item.groupType > 0 && includeEquipped)
			{
				container = this.itemContainer(item);
				iReturn = container ? container[item.id] || 0 : 0;
				party = $gameParty.members();
				iLength = party.length;
				for (i = 0; i < iLength; i++)
				{
					if (item.groupType == 1) items = party[i].weapons();
					else if (item.groupType == 2) items = party[i].armors();
					jLength = items.length;
					for (j = 0; j < jLength; j++){ if (items[j].id == item.id) iReturn++; }
				}
			}
			else iReturn = $$.Game_Party_numItems.call(this, item);
			return iReturn;
		}
		$$.Game_Party_hasMaxItems = Game_Party.prototype.hasMaxItems;
		Game_Party.prototype.hasMaxItems = function(item)
		{
			return this.numItems(item, true) >= this.maxItems(item);
		}
		$$.Window_ShopStatus_drawPossession = Window_ShopStatus.prototype.drawPossession;
		Window_ShopStatus.prototype.drawPossession = function(x, y)
		{
			var width, possessionWidth;
			width = this.contents.width - this.textPadding() - x;
			possessionWidth = this.textWidth('0000');
			this.changeTextColor(this.systemColor());
			this.drawText(TextManager.possession, x, y, width - possessionWidth);
			this.resetTextColor();
			this.drawText($gameParty.numItems(this._item, true), x, y, width, 'right');
		}
		$$.Scene_Shop_maxBuy = Scene_Shop.prototype.maxBuy;
		Scene_Shop.prototype.maxBuy = function()
		{
			var max, price, iReturn;
			max = $gameParty.maxItems(this._item) - $gameParty.numItems(this._item, true);
			price = this.buyingPrice();
			iReturn = max;
			if (price > 0)
			{
				iReturn = Math.min(max, Math.floor(this.money() / price));
			}
			return iReturn;
		}
		Scene_Shop.prototype.sellingPrice = function()
		{
			return Math.floor(this._item.price * $$.params.shopSellModifier);
		}
	}
})(Aesica.Core);