var Imported = Imported || {};
Imported.AES_Core = true;
var Aesica = Aesica || {};
Aesica.Core = Aesica.Core || {};
Aesica.Core.version = 2.85;
Aesica.Toolkit = Aesica.Toolkit || {};
Aesica.Toolkit.coreVersion = 1.0;
/*:
* @plugindesc v2.85 Contains several enhancements for various aspects of RMMV.
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
* @param Screen Mode Label
* @parent Config Manager
* @desc Label for screen mode setting.  Leave blank to disable.
* @type text
* @default Screen Mode
*
* @param Screen Mode Options
* @parent Config Manager
* @desc Options for screen mode setting.
* @type text[]
* @default ["Windowed","Fullscreen","Fullscreen (Fit)"]
*
* @param Default Screen Mode
* @parent Config Manager
* @desc Set screen mode default for the first time the game is run
* @type select
* @option Windowed (Default)
* @option Fullscreen
* @option Fullscreen (Fit)
* @default Windowed (Default)
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
* Support me on Patreon:  https://www.patreon.com/aesica
*
* IMPORTANT - NOTE TAGS: The note tags used by this plugin are flexible,
* allowing for two different interchangeable formats:
* Format 1: <Note Tag: x>
* Format 2: <Note Tag>x</Note Tag>
* When using eval in note tags (specifically the > sign) the second format is
* necessary if you want to avoid closing the tag prematurely.
* 
* <Note>value > 5</Note>    Eval:  "value > 5" (good)
* <Note: value > 5>			Eval:  "value "    (bad)
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
*
* The components for Instant Text is always on, however it can be switched
* off and ignored if their effects aren't wanted/needed.
*
* List of crap this plugin can do:
*
* ----------------------------------------------------------------------
*
* Configuration Manager Tweaks
* By default, when your game is opened for the first time, the volumes as well
* as "always dash" and "command remember" are set to specific values and you
* can't control these initial settings.  Now you can.  You can also use this
* to customize what shows and what doesn't, as well as setting the volume
* increment to something other than 20, however a multiple of 5 is recommended
* with 10 being ideal.
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
* Uniform Obtain Item Framework
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
* Mass-Forget Skills
* This is a way to remove every skill on an actor with a single plugin command
* Note that certain skills can be locked (and thus, not removed) using the
* <Permanent Skill> note tag.  Here are the various ways this plugin command
* can be used:
*
* ForgetSkills variable actorIdVariable removedSkillCountVariable
* This version removes all the skills from the actor id contained in the
* specified variable
*
* ForgetSkills actor actorId removedSkillCountVariable
* This version removes all the skills from the specified actor id

* ForgetSkills party removedSkillCountVariable
* This version removes all skills from the entire party (!)
*
* Unless omitted, the number of skills removed will be stored in 
* removedSkillCountVariable.  Examples of use:
*
* ForgetSkills party 5
* All skills are removed and the number removed is stored in variable 5
*
* ForgetSkills actor 1
* Remove all skills from actor 1, but don't bother storing the results in
* a variable
*
* ForgetSkills variable 4 5
* Remove all skills from the actor id stored in variable 4, then save the
* number of skills removed in variable 5
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
	$$.params.section.universalObtainItem = String($$.pluginParameters["Universal Obtain Item"]).toLowerCase() === "false" ? false : true;
	$$.params.configManager = {};
	$$.params.configManager.showAlwaysDash = String($$.pluginParameters["Show Always Dash"]).toLowerCase() === "false" ? false : true;
	$$.params.configManager.alwaysDash = String($$.pluginParameters["Always Dash"]).toLowerCase() === "false" ? false : true;
	$$.params.configManager.showCommandRemember = String($$.pluginParameters["Show Command Remember"]).toLowerCase() === "false" ? false : true;
	$$.params.configManager.commandRemember = String($$.pluginParameters["Remember Commands"]).toLowerCase() === "false" ? false : true;
	$$.params.configManager.showInstantText = String($$.pluginParameters["Show Instant Text"]).toLowerCase() === "false" ? false : true;
	$$.params.configManager.instantText = String($$.pluginParameters["Instant Text"]).toLowerCase() === "false" ? false : true;
	$$.params.configManager.screenModeLabel = String($$.pluginParameters["Screen Mode Label"]);
	$$.params.configManager.screenModeOptions = JSON.parse($$.pluginParameters["Screen Mode Options"]);
	$$.params.configManager.screenMode = ["windowed (default)", "fullscreen", "fullscreen (fit)"].indexOf(String($$.pluginParameters["Default Screen Mode"]).toLowerCase()) || 0;
	$$.params.configManager.masterVolumeLabel = String($$.pluginParameters["Master Volume Label"]);
	$$.params.configManager.masterVolume = +$$.pluginParameters["Default Master Volume"] || 0;
	$$.params.configManager.bgmVolume = +$$.pluginParameters["Default BGM Volume"] || 0;
	$$.params.configManager.bgsVolume = +$$.pluginParameters["Default BGS Volume"] || 0;
	$$.params.configManager.meVolume = +$$.pluginParameters["Default ME Volume"] || 0;
	$$.params.configManager.seVolume = +$$.pluginParameters["Default SE Volume"] || 0;
	$$.params.individualVolumeControls = String($$.pluginParameters["Individual Volume Controls"]).toLowerCase() === "false" ? false : true;
	$$.params.volumeOffset = +$$.pluginParameters["Volume Adjustment Offset"] || 10;
	$$.params.bushSettings = String($$.pluginParameters["Bush Depth/Opacity Settings"]).toLowerCase() === "false" ? false : true;
	$$.params.bushOpacity = +$$.pluginParameters["Bush Opacity"] || 0;
	$$.params.bushDepth = +$$.pluginParameters["Bush Depth"] || 0;
	$$.params.itemObtainText = String($$.pluginParameters["Item Obtain Message"]);
	$$.params.itemObtainSound = String($$.pluginParameters["Item Obtain Sound"]);
	$$.params.itemObtainVolume = +$$.pluginParameters["Item Obtain Volume"] || 0;
	$$.params.itemCurrencyIcon = +$$.pluginParameters["Currency Icon"] || 0;
	
	$$.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args)
	{
		$$.Game_Interpreter_pluginCommand.call(this, command, args);
		if (command.match(/^InstantText/i)) $$.setInstantText(args[0]);
		else if (command.match(/^ObtainItem/i) && $$.params.section.universalObtainItem) $$.obtainItem(0, args[0], args[1]);
		else if (command.match(/^ObtainWeapon/i) && $$.params.section.universalObtainItem) $$.obtainItem(1, args[0], args[1]);
		else if (command.match(/^ObtainArmor/i) && $$.params.section.universalObtainItem) $$.obtainItem(2, args[0], args[1]);
		else if (command.match(/^ObtainGold/i) && $$.params.section.universalObtainItem) $$.obtainItem(3, 0, args[0]);
		else if (command.match(/^ForceExitVehicle/i)) $$.forceExitVehicle(args);
		else if (command.match(/^ForgetSkills/i)) $$.forgetSkillsCommand(args);
		else if (command.match(/^UseItem/i)) $$.useItem(args);
	};
/**-------------------------------------------------------------------	
	Aesica.Toolkit: Note tag parsing functions
//-------------------------------------------------------------------*/	
	if ((Aesica.Toolkit.version || 0) < Aesica.Toolkit.coreVersion)
	{
		Aesica.Toolkit.version = Aesica.Toolkit.coreVersion;
		Aesica.Toolkit.getTag = function(tag)
		{
			var result;
			var note = this.note || "";
			if (Aesica.Toolkit.tagExists.call(this, "\\/" + tag)) result = note.match(RegExp("<" + tag + ">([^]+)<\\/" + tag + ">", "i"));
			else result = note.match(RegExp("<" + tag + ":[ ]*([^>]+)>", "i"));
			return result ? result[1].trim() : Aesica.Toolkit.tagExists.call(this, tag);
		};
		Aesica.Toolkit.tagExists = function(tag)
		{
			var note = this.note || "";
			return RegExp("<" + tag + "(?::[^>]+)?>", "i").test(note);
		};
		Game_BattlerBase.prototype.getTag = function(tag, deepScan=false)
		{
			var value = [];
			var isActor = this.isActor();
			var actor = isActor ? this.actor() : this.enemy();
			var equip, state;
			if (Aesica.Toolkit.tagExists.call(actor, tag)) value.push(Aesica.Toolkit.getTag.call(actor, tag));
			if (deepScan)
			{
				if (isActor)
				{
					if (Aesica.Toolkit.tagExists.call($dataClasses[this._classId], tag)) value.push(Aesica.Toolkit.getTag.call($dataClasses[this._classId], tag));
					equip = this.weapons().concat(this.armors());
					for (i in equip){ if (Aesica.Toolkit.tagExists.call(equip[i], tag)) value.push(Aesica.Toolkit.getTag.call(equip[i], tag)); }
				}
				state = this.states();
				for (i in state){ if (Aesica.Toolkit.tagExists.call(state[i], tag)) value.push(Aesica.Toolkit.getTag.call(state[i], tag)); }
			}
			return deepScan ? value : (value[0] ? value[0] : false);
		};
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
		Object.defineProperty(ConfigManager, "screenMode",
		{
			get: function(){ return +$$.params.fullscreenMode || 0; },
			set: function(value)
			{
				$$.params.fullscreenMode = value.clamp(0, $$.params.configManager.screenModeOptions.length - 1);
				if (value > 0)
				{
					if (value === 1) Graphics._stretchEnabled = false;
					else if (value === 2) Graphics._stretchEnabled = true;
					Graphics._updateAllElements();
					Graphics._requestFullScreen();
				}
				else Graphics._cancelFullScreen();
			},
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
			if ($$.params.configManager.screenModeLabel !== "") this.addCommand($$.params.configManager.screenModeLabel, "screenMode");
		};
		$$.ConfigManager_makeData = ConfigManager.makeData;
		ConfigManager.makeData = function()
		{
			var config = $$.ConfigManager_makeData.call(this);
			config.instantText = this.instantText;
			config.masterVolume = this.masterVolume;
			config.screenMode = this.screenMode;
			return config;
		};
		ConfigManager.applyData = function(config)
		{
			this.alwaysDash = config.alwaysDash === undefined ? $$.params.configManager.alwaysDash : this.readFlag(config, "alwaysDash");
			this.commandRemember = config.commandRemember === undefined ? $$.params.configManager.commandRemember : this.readFlag(config, "commandRemember");
			this.instantText = config.instantText === undefined ? $$.params.configManager.instantText : this.readFlag(config, "instantText");
			this.screenMode = config.screenMode === undefined ? $$.params.configManager.screenMode : (+config.screenMode).clamp(0, 2);
			this.masterVolume = this.readVolume(config, "masterVolume");
			this.bgmVolume = this.readVolume(config, "bgmVolume");
			this.bgsVolume = this.readVolume(config, "bgsVolume");
			this.meVolume = this.readVolume(config, "meVolume");
			this.seVolume = this.readVolume(config, "seVolume");
		};
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
		};
		Window_Options.prototype.volumeOffset = function()
		{
			return $$.params.volumeOffset;
		};
		$$.Window_Options_addVolumeOptions = Window_Options.prototype.addVolumeOptions;
		Window_Options.prototype.addVolumeOptions = function()
		{
			if ($$.params.configManager.masterVolumeLabel != "") this.addCommand($$.params.configManager.masterVolumeLabel, 'masterVolume');
			if ($$.params.individualVolumeControls) $$.Window_Options_addVolumeOptions.call(this);
		};
		Window_Options.prototype.screenModeText = function(value)
		{
			return $$.params.configManager.screenModeOptions[value] || "???";
		};
		$$.Window_Options_statusText = Window_Options.prototype.statusText;
		Window_Options.prototype.statusText = function(index)
		{
			var result;
			var symbol = this.commandSymbol(index);
			var value = this.getConfigValue(symbol);
			if (symbol === "screenMode")
			{
				result = this.screenModeText(value);
			}
			else result = $$.Window_Options_statusText.call(this, index);
			return result;
		};
		$$.Window_Options_processOk = Window_Options.prototype.processOk;
		Window_Options.prototype.processOk = function()
		{
			var symbol = this.commandSymbol(this.index());
			var value = this.getConfigValue(symbol);
			if (symbol === "screenMode")
			{
				value++;
				if (value > $$.params.configManager.screenModeOptions.length) value = 0;
				value = value.clamp(0, $$.params.configManager.screenModeOptions.length - 1);
				this.changeValue(symbol, value);
			}
			else $$.Window_Options_processOk.call(this);
		};
		$$.Window_Options_cursorRight = Window_Options.prototype.cursorRight;
		Window_Options.prototype.cursorRight = function(wrap)
		{
			var symbol = this.commandSymbol(this.index());
			var value = this.getConfigValue(symbol);
			if (symbol === "screenMode")
			{
				value++;
				value = value.clamp(0, $$.params.configManager.screenModeOptions.length - 1);
				this.changeValue(symbol, value);
			}
			else $$.Window_Options_cursorRight.call(this, wrap);
		};
		$$.Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
		Window_Options.prototype.cursorLeft = function(wrap)
		{
			var symbol = this.commandSymbol(this.index());
			var value = this.getConfigValue(symbol);
			if (symbol === "screenMode")
			{
				value--;
				value = value.clamp(0, $$.params.configManager.screenModeOptions.length - 1);
				this.changeValue(symbol, value);
			}
			else $$.Window_Options_cursorLeft.call(this, wrap);
			var index = this.index();
		};	
		$$.Graphics__switchFullScreen = Graphics._switchFullScreen;
		Graphics._switchFullScreen = function()
		{
			$$.Graphics__switchFullScreen.call(this);
			if (this._isFullScreen()) ConfigManager.screenMode = this._stretchEnabled ? 2 : 1;
			else ConfigManager.screenMode = 0;
			ConfigManager.save();
		};
		$$.Graphics__switchStretchMode = Graphics._switchStretchMode;
		Graphics._switchStretchMode = function()
		{
			$$.Graphics__switchStretchMode.call(this);
			if (this._isFullScreen) ConfigManager.screenMode = this._stretchEnabled ? 2 : 1;
			ConfigManager.save();
		};
	}
/**-------------------------------------------------------------------
	Plugin command exec
//-------------------------------------------------------------------*/	
	$$.pluginCommand = function(args)
	{
		args = args.split(" ");
		var command = args.shift();
		Game_Interpreter.prototype.pluginCommand.call(Game_Interpreter, command, args);
	};
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
	};
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
			if (!tag || Aesica.Toolkit.tagExists.call(currentEvent, tag))
			{
				$gameSelfSwitches.setValue([mapID, events[i].eventId(), switchID], newValue);
				oReturn.changed++;
			}
		}
		return oReturn;
	};
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
			if ((!tag || Aesica.Toolkit.tagExists.call(currentEvent, tag)) && $gameSelfSwitches.value([mapID, events[i].eventId(), switchID]) == value) iReturn++;
		}
		return iReturn;
	};
	$$.getEventCountByTag = function(tag)
	{
		var events = $gameMap.events();
		var currentEvent;
		var mapID = $gameMap.mapId();
		var iReturn = 0;
		for (i in events)
		{
			currentEvent = events[i].event();
			if (Aesica.Toolkit.tagExists.call(currentEvent, tag)) iReturn++;
		}
		return iReturn;
	};
	$$.eventTag = function(tag)
	{
		return Aesica.Toolkit.getTag.call($gameMap.event(this._eventId).event(), tag);
	};
/**-------------------------------------------------------------------	
	Instant Text Rendering
//-------------------------------------------------------------------*/	
	$$.Window_Message_updateInput = Window_Message.prototype.updateInput;
	Window_Message.prototype.updateInput = function()
	{
		this._showFast = !!$$.params.configManager.instantText ? true : this._showFast;
		return $$.Window_Message_updateInput.call(this);
	};
	$$.setInstantText = function(onOrOff)
	{
		ConfigManager.instantText = !!+onOrOff;
	};
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
				if ($gameMap && $gameMap._interpreter) $gameMap._interpreter.setWaitMode("message");
			}
			else console.log("AES_Core:  Invalid item type/quantity or itemID out of bounds. itemType:[" + itemType + "], itemID:[" + itemID + "], quantity:[" + quantity + "]");
		};
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
		};
		Game_CharacterBase.prototype.refreshBushDepth = function()
		{
			if (this.isNormalPriority() && !this.isObjectCharacter() && this.isOnBush() && !this.isJumping())
			{
				if (!this.isMoving()) this._bushDepth = $$.params.bushDepth;
			}
			else this._bushDepth = 0;
		};
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
	};
/**-------------------------------------------------------------------	
	Skill mass-unlearn functions
//-------------------------------------------------------------------*/
	$$.forgetSkillsCommand = function(args)
	{
		var result = 0;
		var party;
		args[0] = args[0].toLowerCase();
		args[2] = +args[2] || 0;
		if (args[0] === "variable") result = $gameActors.actor($gameVariables.value(args[1])).forgetSkills();
		else if (args[0] === "actor") result = $gameActors.actor(args[1]).forgetSkills();
		else if (args[0] === "party")
		{
			result = 0;
			party = $gameParty.members();
			args[2] = +args[1] || 0;
			for (i in party) result += party[i].forgetSkills();
		}
		else console.log("AES_Core: Invalid parameters in ForgetSkills plugin command");
		if (args[2]) $gameVariables.setValue(args[2], result);
	};
	Game_Actor.prototype.forgetSkills = function()
	{
		var i, iLength = this._skills.length;
		var counter = 0;
		for (i = iLength - 1; i >= 0; i--)
		{
			if (!Aesica.Toolkit.tagExists.call($dataSkills[this._skills[i]], "permanent skill"))
			{
				this.forgetSkill(this._skills[i]);
				counter++;
			}
		}
		return counter;
	};
/**-------------------------------------------------------------------	
	NPC/Event functions
//-------------------------------------------------------------------*/
	Game_CharacterBase.prototype.setImageByActorId = function(actorId)
	{
		var actor = $dataActors[actorId];
		if (actor) this.setImage(actor.characterName, actor.characterIndex);
		else this.setImage("", 0);
	};
/**-------------------------------------------------------------------	
	Force Use Item
//-------------------------------------------------------------------*/
	$$.useItem = function(args)
	{
		var item = $dataItems[+args[0] || 0];
		var target, action, canBeApplied, user, j;
		var inBattle = $gameParty.inBattle();
		if (item)
		{
			user = $gameParty.members()[+args[1] || 0];
			action = new Game_Action(user);
			action.setItemObject(item);
			target = item.scope == 7 ? [user] : action.makeTargets();
			for (i in target) canBeApplied = action.testApply(target[i]) || canBeApplied; // test use
			if (user.canUse(item) && canBeApplied)
			{
				user.useItem(item);
				for (i in target)
				{
					if (item.animationId)
					{
						if (inBattle) target[i].startAnimation(item.animationId);
						else $gamePlayer.requestAnimation(item.animationId);
					}
					for (j = action.numRepeats(); j--;) action.apply(target[i]);
					action.applyGlobal();
				}
			}
		}
	};
})(Aesica.Core);