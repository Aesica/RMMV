var Imported = Imported || {};
Imported.AES_Core = true;
var Aesica = Aesica || {};
Aesica.Core = Aesica.Core || {};
Aesica.Core.version = 1.30;
/*:
* @plugindesc v1.30 Contains several enhancements for various aspects of RMMV.
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
* @default true
*
* @param Remember Commands
* @parent Config Manager
* @desc Enable 'Remember Commands' by default the first time the game is run?
* @type boolean
* @default false
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
* @param Volume Adjustment Offset
* @parent Config Manager
* @desc Number to increment/decrement by when adjusting volume.  A multiple of 5 is recommended
* @type number
* @default 20
* @min 0
* @max 100
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
* @param Instant Text
* @desc Default setting for instant text rendering.  This can be changed ingame via plugin commands.
* @type boolean
* @on Instant
* @off Standard
* @default true
*
* @param Shop Patch
* @desc Enable the shop 'Quantity Possessed' patch to include equipped weapons and armor?
* @type boolean
* @on Enable
* @off Disable
* @default true
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
* - Self switch manipulation
* - Forced vehicle exit
* - Instant Text*
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
* Aesica.Core.damage(a.value, multiplier, b.value)
* Where a.value is a.atk, a.mat, etc and b.value is b.def, b.mdf, etc. The
* multiplier value is typically used by various skills to make them stronger
* (or weaker).  If left blank, multiplier defaults to 1 and b.value defaults
* to 0.
*
* Aesica.Core.heal(a.value, multiplier, b.value)
* Similar to the above, however you may want to use a different unified
* formula for healing.
*
* Aesica.Core.variance(n)
* Allows you to apply a variance to a damage or healing result, although in 
* most cases, this is done for you via the formula box
*
* Game_Battler.prototype.weaponMhp()
* Game_Battler.prototype.weaponMmp()
* Game_Battler.prototype.weaponAtk()
* Game_Battler.prototype.weaponDef()
* Game_Battler.prototype.weaponMat()
* Game_Battler.prototype.weaponMdf()
* Game_Battler.prototype.weaponAgi()
* Game_Battler.prototype.weaponLuk()
* Retrieves the specified stat from the battler's equipped weapon (or weapons)
* for use in formulas that only factor in weapon strength, which can be used
* in damage formulas.  For example:  a.weaponAtk() * 5 - b.def
* If the battler is an enemy, it returns their associated base parameter 
* instead since enemies don't use weapons
*
* Game_Battler.prototype.weaponStat(statID)
* Same as above, but allows the stat to be referenced by its ID.  Examples:
* a.weaponStat(2) // same as a.weaponAtk()
* a.weaponStat(4) // same as a.weaponMat()
*
* Game_Battler.prototype.anyStateAffected(1, 3, 27, ...etc)
* Returns true if the specified battler has ANY of the listed states.  Examples:
* a.anyStateAffected(3, 14)
* b.anyStateAffected(27, 28, 29, 41, 47)
*
* Game_Battler.prototype.allStateAffected(1, 3, 27, ...etc)
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
* // 1000 fixed damage (not that doing fixed damage this way is necessary)
* 
* Aesica.Core.heal(a.mat, 3)
* // uses the healing formula from the plugin parameters to combine a.mat with
* // a multiplier of 3
* 
* Aesica.Core.damage(a.weaponAtk(), 10, b.def)
* // Applies a's WEAPON ATK total to a multiplier of 10 and checks it against
* // b.def
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
* InstantTextOn
* - Turns on instant text rendering
*
* InstantTextOff
* - Turns off instant text rendering
*
* ----------------------------------------------------------------------
*
* Unified Obtain Item Framework
* Allows you to easily give an item to players and inform them about what
* they got in a unified way.  This bypasses the need to pop up a message window,
* play a sound, etc in the exact same way every time they open a chest, are
* given something by an npc, etc.
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
* Aesica.Core.selfSwitchesOff(0, 0, "B") // Sets all B self switches to false
* Aesica.Core.selfSwitchesOff(5, 0, 0) // Sets all self switch on map 5 to false
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
	$$.values = $$.values || {};
	$$.values.ITEM_TYPE_ITEM = 0;
	$$.values.ITEM_TYPE_WEAPON = 1;
	$$.values.ITEM_TYPE_ARMOR = 2;
	$$.values.ITEM_TYPE_GOLD = 3;
	$$.values.ITEM_TYPES = {"item":$$.values.ITEM_TYPE_ITEM, "weapon":$$.values.ITEM_TYPE_WEAPON, "armor":$$.values.ITEM_TYPE_ARMOR, "gold":$$.values.ITEM_TYPE_GOLD};
	
	$$.pluginParameters = PluginManager.parameters("AES_Core");
	$$.params = {};
	$$.params.section = {};
	$$.params.section.configManager = String($$.pluginParameters["Config Manager"]).toLowerCase() === "false" ? false : true;
	$$.params.section.battleCommands = String($$.pluginParameters["Battle Commands"]).toLowerCase() === "false" ? false : true;
	$$.params.section.combatFormulas = String($$.pluginParameters["Combat Formulas"]).toLowerCase() === "false" ? false : true;
	$$.params.section.universalObtainItem = String($$.pluginParameters["Universal Obtain Item"]).toLowerCase() === "false" ? false : true;
	$$.params.configManager = {};
	$$.params.configManager.alwaysDash = String($$.pluginParameters["Always Dash"]).toLowerCase() === "false" ? false : true;
	$$.params.configManager.commandRemember = String($$.pluginParameters["Remember Commands"]).toLowerCase() === "false" ? false : true;
	$$.params.configManager.masterVolumeLabel = String($$.pluginParameters["Master Volume Label"]);
	$$.params.configManager.masterVolume = +$$.pluginParameters["Default Master Volume"] || 0;
	$$.params.configManager.bgmVolume = +$$.pluginParameters["Default BGM Volume"] || 0;
	$$.params.configManager.bgsVolume = +$$.pluginParameters["Default BGS Volume"] || 0;
	$$.params.configManager.meVolume = +$$.pluginParameters["Default ME Volume"] || 0;
	$$.params.configManager.seVolume = +$$.pluginParameters["Default SE Volume"] || 0;
	$$.params.volumeOffset = +$$.pluginParameters["Volume Adjustment Offset"] || 10;
	$$.params.instantText = String($$.pluginParameters["Instant Text"]).toLowerCase() === "false" ? false : true;
	$$.params.shopPatch = String($$.pluginParameters["Shop Patch"]).toLowerCase() === "false" ? false : true;
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
	$$.params.itemObtainText = String($$.pluginParameters["Item Obtain Message"]);
	$$.params.itemObtainSound = String($$.pluginParameters["Item Obtain Sound"]);
	$$.params.itemObtainVolume = +$$.pluginParameters["Item Obtain Volume"];
	$$.params.itemCurrencyIcon = (function(currencyIcon)
	{
		currencyIcon = isNaN(currencyIcon) ? 0 : currencyIcon;
		if (Imported.YEP_CoreEngine && currencyIcon == 0) currencyIcon = Yanfly.Icon.Gold;
		return currencyIcon;
	})(Number(+$$.pluginParameters["Currency Icon"]));
	
	$$.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args)
	{
		$$.Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === "InstantTextOn") $$.setInstantText(true);
		else if (command === "InstantTextOff") $$.setInstantText(false);
		else if (command === "ObtainItem" && $$.params.section.universalObtainItem) $$.obtainItemPluginCommand(0, args);
		else if (command === "ObtainWeapon" && $$.params.section.universalObtainItem) $$.obtainItemPluginCommand(1, args);
		else if (command === "ObtainArmor" && $$.params.section.universalObtainItem) $$.obtainItemPluginCommand(2, args);
		else if (command === "ObtainGold" && $$.params.section.universalObtainItem) $$.obtainGoldPluginCommand(args);
		else if (command === "ForceExitVehicle") $$.forceExitVehicle(args);
	}
/**-------------------------------------------------------------------
	ConfigManager tweaks
//-------------------------------------------------------------------*/	
	
	if ($$.params.section.configManager)
	{
		Object.defineProperty(ConfigManager, "masterVolume",
		{
			get: function()
			{
				return Math.floor(AudioManager.masterVolume * 100).clamp(0, 100);
			},
			set: function(value)
			{
				AudioManager.masterVolume = (value * 0.01).clamp(0, 1);
			},
			configurable: true
		});
		
		$$.ConfigManager_makeData = ConfigManager.makeData;
		ConfigManager.makeData = function()
		{
			var config = $$.ConfigManager_makeData.call(this);
			config.masterVolume = this.masterVolume;
			return config;
		}		
		
		ConfigManager.applyData = function(config)
		{
			this.alwaysDash = config.alwaysDash === undefined ? $$.params.configManager.alwaysDash : this.readFlag(config, "alwaysDash");
			this.commandRemember = config.commandRemember === undefined ? $$.params.configManager.commandRemember : this.readFlag(config, "commandRemember");
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
			$$.Window_Options_addVolumeOptions.call(this);
		}		
				
	}
	
/**-------------------------------------------------------------------
	Self-Switch manipulation & event tag counting
//-------------------------------------------------------------------*/	
	
	$$.selfSwitchesOff = function(mapID, eventID, switchID, ignoreCase=true)
	{
		var curentData, switchKeys = Object.keys($gameSelfSwitches._data);
		var i, iLength = switchKeys.length;
		var oReturn = {}
		oReturn.changed = 0;
		oReturn.total = iLength;
		if (ignoreCase) switchID = switchID.toLowerCase();
		for (i = 0; i < iLength; i++)
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
		var i, iLength = events.length;
		var currentEvent;
		var mapID = $gameMap.mapId();
		var oReturn = {};
		oReturn.changed = 0;
		oReturn.total = iLength;
		switchID = switchID.toUpperCase();
		for (i = 0; i < iLength; i++)
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
		var i, iLength = events.length;
		var currentEvent;
		var mapID = $gameMap.mapId();
		var iReturn = 0;
		switchID = switchID.toUpperCase();
		for (i = 0; i < iLength; i++)
		{
			currentEvent = events[i].event();
			if ((!tag || $$.tagExists.call(currentEvent, tag)) && $gameSelfSwitches.value([mapID, events[i].eventId(), switchID]) == value) iReturn++;
		}
		return iReturn;
	}
	
	$$.getEventCountByTag = function(tag)
	{
		var events = $gameMap.events();
		var i, iLength = events.length;
		var currentEvent;
		var mapID = $gameMap.mapId();
		var iReturn = 0;
		for (i = 0; i < iLength; i++)
		{
			currentEvent = events[i].event();
			if ($$.tagExists.call(currentEvent, tag)) iReturn++;
		}
		return iReturn;
	}
	

/**-------------------------------------------------------------------	
	Note tag parsing functions
//-------------------------------------------------------------------*/	
	$$.getTag = function(tag)
	{
		var result = this.note.match(RegExp("<" + tag + "[ ]*:[ ]*(.+)>", "i"));
		return result ? result[1] : $$.tagExists.call(this, tag);
	}
	
	$$.tagExists = function(tag)
	{
		return RegExp("<" + tag + "(?::.*)?>", "i").test(this.note);
	}
	
	$$.getTagFromItemArray = function(tag)
	{
		var aReturn = [];
		var i, currentValue, iLength = this.length;
		for (i = 0; i < iLength; i++)
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
		this._showFast = $$.instantText() ? true : this._showFast;
		return $$.Window_Message_updateInput.call(this);
	}
	
	$$.setInstantText = function(onOrOff)
	{
		$$.params.instantText = onOrOff;
	}
	
	$$.instantText = function()
	{
		if ($$.params.instantText === undefined) $$.params.instantText = false;
		return $$.params.instantText;
	}

/**-------------------------------------------------------------------	
	ObtainItem/Gold Plugin Commands
//-------------------------------------------------------------------*/	

	if ($$.params.section.universalObtainItem)
	{
		$$.obtainGoldPluginCommand = function(args)
		{
			args[0] = +args[0];
			if (isNaN(args[0]) || args[0] < 1) console.log("ObtainGold requires 1 positive integer argument (goldAmount)");
			else $$.obtainItem($$.values.ITEM_TYPE_GOLD, 0, args[0]);
		}
		
		$$.obtainItemPluginCommand = function(type, args)
		{
			var itemID = +args[0];
			var quantity = +args[1] || 1;
			if (isNaN(itemID) || itemID < 1)
			{
				console.log("ObtainItem/ObtainWeapon/ObtainArmor: requires at least 1 non-zero integer argument (itemID, quantity?=1");
			}
			else
			{
				$$.obtainItem(type, itemID, quantity);
			}
		}
		
		$$.obtainItem = function(itemType, itemID, quantity)
		{
			if (typeof itemType === "string") itemType = $$.values.ITEM_TYPES[itemType];
			var item, message = $$.params.itemObtainText;
			var rxItemIcon = /%i/gi;
			var rxItemName = /%n/gi;
			var rxItemQuantity = /%q/gi;
			var se = {"name":$$.params.itemObtainSound, "pan":0, "pitch":100, "volume":$$.params.itemObtainVolume};
			if (!isNaN(itemType) && quantity > 0 && itemType >= 0)
			{
				if (itemType === $$.values.ITEM_TYPE_ITEM) item = $dataItems[itemID];
				else if (itemType === $$.values.ITEM_TYPE_WEAPON) item = $dataWeapons[itemID];
				else if (itemType === $$.values.ITEM_TYPE_ARMOR) item = $dataArmors[itemID];
				
				if (itemType === $$.values.ITEM_TYPE_GOLD)
				{
					$gameParty.gainGold(quantity);
					message = message.replace(rxItemIcon, "\\I[" + $$.params.itemCurrencyIcon + "]").replace(rxItemName, "\\G").replace(rxItemQuantity, quantity);
				}
				else
				{
					$gameParty.gainItem(item, quantity);
					message = message.replace(rxItemIcon, "\\I[" + item.iconIndex + "]").replace(rxItemName, item.name).replace(rxItemQuantity, quantity);
				}
			}
			else
			{
				console.log("Invalid Parameters: Aesica.Core.obtainItem(itemType=" + itemType + ", itemID=" + itemID + ", quantity?=" + quantity + ")");
				message = message.replace(rxItemIcon, "\\I[0]").replace(rxItemName, "Invalid Item").replace(rxItemQuantity, "0") + "\n";
			}
			AudioManager.playSe(se);
			$gameMessage.add(message);
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
		$$.damage = function(attack, multiplier=null, defense=null)
		{
			var iReturn = 0;
			var userStat = 0;
			var targetStat = 0;
			var i, iLength;
			if (Array.isArray(attack))
			{
				iLength = attack.length;
				for (i = 0; i < iLength; i++) userStat += attack[i];
				userStat = Math.round(userStat / iLength);
			}
			else userStat = attack;
			if (Array.isArray(defense))
			{
				iLength = defense.length;
				for (i = 0; i < iLength; i++) targetStat += defense[i];
				targetStat = Math.round(targetStat / iLength);
			}
			else targetStat = isNaN(defense) ? 0 : defense;
			multiplier = isNaN(multiplier) ? 1 : multiplier;
			iReturn = eval($$.params.damageFormula) || 0;
			return iReturn;
		}
		
		$$.heal = function(attack, multiplier=null, defense=null)
		{
			var iReturn = 0;
			var userStat = 0;
			var targetStat = 0;
			var i, iLength;
			if (Array.isArray(attack))
			{
				iLength = attack.length;
				for (i = 0; i < iLength; i++) userStat += attack[i];
				userStat = Math.round(userStat / iLength);
			}
			else userStat = attack;
			if (Array.isArray(defense))
			{
				iLength = defense.length;
				for (i = 0; i < iLength; i++) targetStat += defense[i];
				targetStat = Math.round(targetStat / iLength);
			}
			else targetStat = isNaN(defense) ? 0 : defense;
			multiplier = isNaN(multiplier) ? 1 : multiplier;
			iReturn = eval($$.params.healingFormula) || 0;
			return iReturn;
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
			
		Game_Battler.prototype.weaponMhp = function()
		{
			return this.weaponStat.call(this, 0);
		}	

		Game_Battler.prototype.weaponMmp = function()
		{
			return this.weaponStat.call(this, 1);
		}	

		Game_Battler.prototype.weaponAtk = function()
		{
			return this.weaponStat.call(this, 2);
		}	

		Game_Battler.prototype.weaponDef = function()
		{
			return this.weaponStat.call(this, 3);
		}	

		Game_Battler.prototype.weaponMat = function()
		{
			return this.weaponStat.call(this, 4);
		}	

		Game_Battler.prototype.weaponMdf = function()
		{
			return this.weaponStat.call(this, 5);
		}	

		Game_Battler.prototype.weaponAgi = function()
		{
			return this.weaponStat.call(this, 6);
		}	

		Game_Battler.prototype.weaponLuk = function()
		{
			return this.weaponStat.call(this, 7);
		}	

		Game_Battler.prototype.weaponStat = function(statId)
		{
			var params = ["mhp","mmp","atk","def","mat","mdf","agi","luk"];
			var weapons, i, iLength, iReturn = 0;
			var stat = this[params[statId]];
			if (this.isActor())
			{
				weapons = this.weapons();
				iLength = weapons.length;
				if (iLength < 1)
					iReturn = eval($$.params.unarmedValue);
				else
				{
					for (i = 0; i < iLength; i++)
					{
						iReturn += weapons[i].params[statId];
					}
				}
			}
			else
			{
				iReturn = stat;
			}
			return iReturn;
		}
		
		Game_Battler.prototype.anyStateAffected = function(...states)
		{
			var bReturn = false;
			var i, iLength = states.length;
			for (i = 0; i < iLength; i++)
			{
				bReturn = this.isStateAffected(states[i]);
				if (bReturn) break;
			}
			return bReturn;
		}

		Game_Battler.prototype.allStateAffected = function(...states)
		{
			var iReturn = 0;
			var i, iLength = states.length;
			for (i = 0; i < iLength; i++)
			{
				if (this.isStateAffected(states[i])) iReturn++;
			}
			return iReturn == iLength;
		}
	}
	
/**-------------------------------------------------------------------	
	Static command control - Attack, Guard, Item, Limits, and
	Attack replacers
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
		
		
		Window_ActorCommand.prototype.addLimitCommand = function()
		{
			this.addCommand($dataSystem.skillTypes[$$.params.limitCommand], 'skill', true, $$.params.limitCommand);
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
					for (j = 0; j < jLength; j++)
					{
						if (items[j].id == item.id) iReturn++;
					}
				}
			}
			else
			{
				iReturn = $$.Game_Party_numItems.call(this, item);
			}
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
	}

})(Aesica.Core);