var Imported = Imported || {};
Imported.AES_Autosave = true;
var Aesica = Aesica || {};
Aesica.Autosave = Aesica.Autosave || {};
Aesica.Autosave.version = 1.0;
Aesica.Toolkit = Aesica.Toolkit || {};
/*:
* @plugindesc v2.5 Contains several enhancements for various aspects of RMMV.
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
* There are two different plugin commands that can be used to autosave, based
* on whichever best fits your game:
*
* AutoSave
* SaveGame
*
* The AutoSave plugin command will instantly save the game to slot 1.
* Use the Auto Save plugin parameter to customize the name of this slot, or to
* leave it at the default of File 1.
*
* The SaveGame plugin command will instantly save the game in whichever slot
* was last accessed, so if you loaded a game from slot 3, this will save the
* game in slot 3 without prompt.  If saving a new game for the first time, an
* open slot will be chosen automatically if available.
*
* Note that SaveGame is somewhat experimental and is really only intended to
* be used in games where you want to handle saving in a way similar to NES
* era Dragon Quest.  If also using the AutoSave command and the player loads
* their game from the auto save slot, then SaveGame will write into the
* auto save slot instead of their actual save slot.
*
* It's up to you, the developer, to control how frequently or seldom to use
* the autosave feature.  For best results, invoke it when the player touches
* specific waypoints or transitions to certain areas.  If you don't want to
* use the auto save feature, set the Auto Save plugin parameter to an empty
* value and then, just never call the AutoSave plugin command.
*
* Plugin Command:
* AutoSave
*
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