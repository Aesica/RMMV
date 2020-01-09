var Imported = Imported || {};
Imported.AES_MessageExt = true;
var Aesica = Aesica || {};
Aesica.MessageExt = Aesica.MessageExt || {};
Aesica.MessageExt.version = 1.0;
Aesica.Toolkit = Aesica.Toolkit || {};
Aesica.Toolkit.messageExtVersion = 1.1;
/*:
* @plugindesc v1.0 Adds eval, plugin command, etc functionality to the messaging system
*
* @author Aesica
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
* <Note>value > 5</Note>  Eval:  "value > 5" (good)
* <Note: value > 5>       Eval:  "value "    (bad)
*
* This plugin adds the following escape codes to RMMV's messaging system:
*
* Code                          Function
*   \eval<<<code>>>               Runs a javascript snippet
*   \plugincommand<<<cmd>>>       Executes a plugin command
*   \name[x] or \name             Copy/paste name, for speaking events
*   \face[name, index] or \face   Copy/paste face, for speaking events
*   \et[eid, tag]                 Note tag contents of event x
*
* ----------------------------------------------------------------------
*
* \eval<<<code>>>
* 
* Allows javascript snippets to be used in message text.
*
* Example uses:
* 
* Hello, \eval<<<$gameParty.members()[0].name()>>>.
* I see you gave me a \eval<<<$dataItems[$gameVariables.value(1)].name>>>.
* 
* // [Explanation]
* // Hello, (first party member's name).
* // I see you gave me a (name of whatever item id is stored in variable 1).
* // [Output]
* // Hello, Harold.
* // I see you gave me a Phoenix Down.
*
* Its description is as follows:
* \eval<<<$dataItems[$gameVariables.value(1)].description>>>
*
* // [Explanation]
* // Its description is as follows:
* // (description of whatever item id is stored in variable 1).
* // [Output]
* // Its description is as follows:
* // Revives target party member from KO.
*
* You can also use it to execute code without displaying anything.  Any null or
* undefined results will be displayed as an empty string:
*
* I am executing code directly from this message!
* \eval<<<console.log("hello world")>>>
*
* //[Explanation]
* // I am executing code directly from this message!
* // (result returns undefined, so nothing appears here)
* // [Output)
* // I am executing code directly from this message!
* //
* 
* ----------------------------------------------------------------------
*
* \plugincommand<<<Command arg1 arg2 etc>>>
*
* Executes the specified plugin command (if possible)
*
* Example:
* \plugincommand<<<SomeCommand 1 2 3>>>
*
* ----------------------------------------------------------------------
*
* \name[x]
*
* Displays "x" (or whatever name you set) and saves it for later use
*
* \name
*
* Displays the name last set by \name[x]
*  
* ----------------------------------------------------------------------
*
* \face[imageName, index]
*
* Sets the current face and saves it for later use
* - imageName:  Name of the image file to use, such as Actor1, People3, etc
* - index:  Index (0-7) of the image
*
* \face
*
* Displays the face last set by \face[x]
*  
* ----------------------------------------------------------------------
*
* \et[eventId, tag]
*
* Displays the contents of the specified note tag in the specified event on
* the current map.  Outside battle only.
*
* Examples:
* - Event's notebox:  <Race: Elf><Name: Galadriel>
* - Event's id:  5
*
* Text Box:  Hey, I heard that \et[5, name] over there is a(n) \et[5, race]!
* Ingame:  Hey, I heard that Galadriel over there is a(n) Elf!
*
* --------------------------------------------------------------------
*
* These can be used anywhere escape codes (\n[1], etc) are parsed
* For best results, place below other message-related plugins.  Enjoy!
*/
(function($$)
{
/**-------------------------------------------------------------------	
	Aesica.Toolkit: Note tag parsing functions
//-------------------------------------------------------------------*/
	if ((Aesica.Toolkit.version || 0) < Aesica.Toolkit.messageExtVersion)
	{
		Aesica.Toolkit.version = Aesica.Toolkit.improvedShopVersion;
		Aesica.Toolkit.getTag = function(tag)
		{
			var result;
			var note = this.note || "";
			if (Aesica.Toolkit.tagExists.call(this, "\\/" + tag)) result = note.match(RegExp("<" + tag + ">([^]+)<\\/" + tag + ">", "i"));
			else result = note.match(RegExp("<" + tag + ":[ ]*([^>]+)>", "i"));
			return result ? result[1].trim() : Aesica.Toolkit.tagExists.call(this, tag);
		}
		Aesica.Toolkit.tagExists = function(tag)
		{
			var note = this.note || "";
			return RegExp("<" + tag + "(?::[^>]+)?>", "i").test(note);
		}
		Aesica.Toolkit.parseTagData = function(tagData)
		{
			tagData = tagData.split(";");
			var oUnit, aList = [];
			var match, rx = /([A-Za-z0-9]+)="([^"]+)"/gi;
			for (i in tagData)
			{
				oUnit = {};
				while (match = rx.exec(tagData[i]))
				{
					oUnit[match[1]] = match[2];
				}
				aList[i] = oUnit;
			}
			return aList;
		}	
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
		}
	}	
	/**-------------------------------------------------------------------	
		Aesica.MessageExt...and other things
	//-------------------------------------------------------------------*/
	$$.Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
	Window_Base.prototype.convertEscapeCharacters = function(text)
	{
		text = text.replace(/\\eval<<<(.*?)>>>/gi, function()
		{
			var result;
			try
			{
				result = eval(arguments[1]);
				if (result === undefined || result === null) result = "";
			}
			catch(e)
			{
				result = "EVAL ERROR";
				console.log("AES_MessageEval: Eval Error:");
				console.log(arguments[1]);
			}
			return result;
		}.bind(this));
		text = text.replace(/\\plugincommand<<<(.*?)>>>/gi, function()
		{
			var args = arguments[1].split(" ");
			if ($gameMap) $gameMap._interpreter.pluginCommand(args.shift(), args);
			return "";
		}.bind(this));
		text = text.replace(/\\et\[(.*?)\]/gi, function()
		{
			var data = arguments[1].split(",");
			var eId = +data.shift() || null;
			var tag = data.join(",").trim();
			var evt, result = "";
			if (!$gameParty.inBattle() && $gameMap && $gameMap._events[eId])
			{
				evt = $gameMap._events[eId];
				if (evt) result = Aesica.Toolkit.getTag.call(evt.event(), tag) || "";
			}
			return result;
		}.bind(this));
		text = text.replace(/\\name\[(.*?)\]/gi, function()
		{
			$gameMessage._savedName = arguments[1];
			return arguments[1];
		}.bind(this));
		text = text.replace(/\\name/gi, function()
		{
			return $gameMessage._savedName || "";
		}.bind(this));
		text = text.replace(/\\face\[(.*?)\]/gi, function()
		{
			var data = arguments[1].split(",");
			var name = (data[0] || "").trim();
			var index = +data[1] || 0;
			$gameMessage._faceName = $gameMessage._customFaceName = name;
			$gameMessage._faceIndex = $gameMessage._customFaceIndex = index;
			return "";
		}.bind(this));
		text = text.replace(/\\face/gi, function()
		{
			$gameMessage._faceName = $gameMessage._customFaceName || "";
			$gameMessage._faceIndex = $gameMessage._customFaceIndex || 0;
			return "";
		}.bind(this));
		return 	$$.Window_Base_convertEscapeCharacters.call(this, text);		
	}
})(Aesica.MessageExt);