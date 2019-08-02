var Imported = Imported || {};
Imported.AES_Autosave = true;
var Aesica = Aesica || {};
Aesica.Autosave = Aesica.Autosave || {};
Aesica.Autosave.version = 1.0;
Aesica.Toolkit = Aesica.Toolkit || {};
/*:
* @plugindesc v1.0 Enables autosaving in games via plugin command
*
* @author Aesica
* @param Slot Name
* @desc Text displayed (instead of File n) for the autosave slot.  Leave blank for no change.
* @type text
* @default Auto Save
*
* @param Lock Auto Save Slot
* @parent Auto Save
* @desc This plugin uses slot 1 for autosaving.  Locking prevents manual saving in that slot
* @type boolean
* @on Locked
* @off Unlocked
* @default true
*
* @help
* For terms of use, see:  https://github.com/Aesica/RMMV/blob/master/README.md
*
* ----------------------------------------------------------------------
*
* Auto Saving
* 
* The following plugin commands can be used to save without accessing the
* menu:
*
* AutoSave (recommended)
* SaveGame
* SaveInSlot
*
* AutoSave
* Saves the game in slot 1 (which can be renamed to something else more
* fitting, like "Auto Save" in the plugin parameters.  This is the 
* recommended method for autosaving in most games.
*
* SaveGame
* Saves the game in the last-accessed slot, so if you loaded your game from
* slot 3, or saved your game into slot 3 via the menu, this command will save
* it in slot 3.  This command cannot be invoked in a brand new game until the
* player has either manually saved their game into a specific slot, or until
* you have invoked the SaveInSlot command to save to a specific slot.
*
* SaveInSlot n
* Saves the game in the specified slot, where n is the slot number: 1, 2, etc.
* The primary purpose of this is for setting an initial save slot for use with
* the SaveGame command. (see notes below)
*
* Notes:
*
* - When creating your game, it's best to decide which autosave method you
* want to use (AutoSave vs SaveGame) and use that method only.  Loading
* from the autosave slot, followed by SaveGame will cause SaveGame to write
* in slot 1, regardless of whatever slot was used prior to autosaving.
*
* - SaveInSlot is primarily intended for those who want to create an 
* alternative save system, such as one similar to the NES Dragon Quest games.
* This command is experimental and using it isn't recommended unless you know
* what you're doing with your save system.
*/

(function($$)
{
	$$.pluginParameters = PluginManager.parameters("AES_Autosave");
	$$.params = {};
	$$.params.autoSaveLabel = String($$.pluginParameters["Slot Name"]);
	$$.params.autoSaveLock = String($$.pluginParameters["Lock Auto Save Slot"]).toLowerCase() === "false" ? false : true;
	$$.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args)
	{
		$$.Game_Interpreter_pluginCommand.call(this, command, args);
		if (command.match(/^AutoSave/i)) $$.autoSave(false);
		else if (command.match(/^SaveGame/i)) $$.autoSave(true);
		else if (command.match(/^SaveToSlot/i)) $$.saveToSlot(+args[0] || 0); 
	}
/**-------------------------------------------------------------------	
	Autosave functions
//-------------------------------------------------------------------*/
	$$.DataManager_setupNewGame = DataManager.setupNewGame;
	DataManager.setupNewGame = function()
	{
		$$.DataManager_setupNewGame.call(this);
		$gameTemp._unsavedNewGame = true;
	}
	$$.DataManager_saveGameWithoutRescue = DataManager.saveGameWithoutRescue;
	DataManager.saveGameWithoutRescue = function(savefileId)
	{
		var result = $$.DataManager_saveGameWithoutRescue.call(this, savefileId);
		$gameTemp._unsavedNewGame = false;
		return result;
	}
	$$.saveToSlot = function(slot)
	{
		if (slot > 0 && slot <= DataManager.maxSavefiles())
		{
			$gameSystem.onBeforeSave();
			DataManager.saveGame(slot);
		}
		else
		{
			console.log("AES_Autosave:  Save slot " + slot + " out of bounds (1-" + DataManager.maxSavefiles() + ")");
		}
	}
	$$.autoSave = function(useLastSlot)
	{
		var gameSlot = DataManager._lastAccessedId;
		if (!$gameTemp._unsavedNewGame || !useLastSlot)
		{
			$$.saveToSlot(useLastSlot ? gameSlot : 1);
			DataManager._lastAccessedId = gameSlot;
		}
		else
		{
			console.log("AES_Autosave:  Before using SaveGame, the SaveToSlot n plugin command must be used or the player must save the game manually.")
		}
	}
	Window_SavefileList.prototype.drawFileId = function(id, x, y)
	{
		if (id == 1)
		{
			if ($$.params.autoSaveLock) this.changePaintOpacity(this._mode != "save" || Imported.YEP_SaveCore);
			if ($$.params.autoSaveLabel != "") this.drawText($$.params.autoSaveLabel, x, y, 180);
		}
		else this.drawText(TextManager.file + " " + (+id - 1), x, y, 180);
		this.changePaintOpacity(true);
	}

	if (Imported.YEP_SaveCore)
	{
		Window_SaveAction.prototype.makeCommandList = function()
		{
			var id = this.savefileId();
			var enabled = DataManager.isThisGameFile(id);
			var valid = DataManager.loadSavefileInfo(id);
			this.addCommand(this.getCommandName("load"), "load", valid);
			this.addCommand(this.getCommandName("save"), "save", this.isSaveEnabled() && (id > 1 || !$$.params.autoSaveLock));
			this.addCommand(this.getCommandName("delete"), "delete", enabled && (id > 1 || !$$.params.autoSaveLock));
		}
	}
	else
	{
		Window_SavefileList.prototype.isCurrentItemEnabled = function()
		{
			return this._mode != "save" || this.index() > 0 || !$$.params.autoSaveLock;
		}
	}
})(Aesica.Autosave)