var Imported = Imported || {};
Imported.AES_LootBox = true;
var Aesica = Aesica || {};
Aesica.LootBox = Aesica.LootBox || {};
Aesica.LootBox.version = 1.0;
/*:
* @plugindesc v1.0 Retrieves a random item from a specified list
*
* @author Aesica
*
* @param Optional Variable Settings
* @desc Variables that can be used to save lootbox results to.  Set to 0 to disable
*
* @param Item Type Variable
* @parent Optional Variable Settings
* @type number
* @min 0
* @default 0
* @desc Variable to save item type to.  Result IDs:  0=Gold, 1=Item, 2=Weapon, 3=Armor, 4=Common Event
*
* @param Item ID Variable
* @parent Optional Variable Settings
* @type number
* @min 0
* @default 0
* @desc Variable to save item ID to.  Gold returns an ID of 0.
*
* @param Quantity Variable
* @parent Optional Variable Settings
* @type number
* @min 0
* @default 0
* @desc Variable to save quantity recieved to
*
* @param Use Obtain Item Framework
* @desc Uses the Obtain Item framework found in AES_Core (Requires AES_Core)
* @type boolean
* @on Enable
* @off Disable
* @default false
*
* @param Reward Text
* @desc If not using AES_Core's Obtain Item framework, customize notification:  %n: item name, %i: icon, %q: quantity
* @type text
* @default %i%n x%q was found
*
* @param Empty Text
* @desc If no item is found during a lootbox open attempt, display this text
* @type text
* @default Empty
*
* @param Gold Icon
* @desc If not using AES_Core's Obtain Item framework, set gold icon ID
* @type number
* @min 0
* @default 314
*
* @param Loot Boxes
* @desc Define loot boxes and their contents, weightings, etc
* @type struct<LootBox>[]
* @default []
*
* @help
* For terms of use, see:  https://github.com/Aesica/RMMV/blob/master/README.md
* Support me on Patreon:  https://www.patreon.com/aesica
*
* ----------------------------------------------------------------------
*
* Summary:  This plugin allows you to create "loot boxes," or objects that that
* award random items to players.  These items can be weighted so that some are
* more common than others, can award more than one item (of the same type) at
* a time (3-5 potions, 100-200 gold, etc), or even trigger common events.
* These items can be either unlimited (always in the loot box) or limited (once
* a specific number has been given out, the item is removed from the prize pool).
*
* List of Plugin Commands
*
* All plugin commands for this plugin follow a base format, with one exception
* noted further down:
*
* LootBox <BoxName> command <...misc args>
*
* Note that the loot box identifier is case sensitive even
* though the rest of the commands are not.
*
* LootBox MyBox Open
* Awards a random item from MyBox and announces the result to the player
*
* LootBox OtherBox OpenSilent
* Awards a random item from OtherBox, but doesn't announce it
*
* LootBox NewBox Create
* Creates an empty loot box named NewBox
*
* LootBox OldBox Delete
* Deletes a loot box named OldBox
*
* LootBox SomeBox New type id min max total weight
* Adds a new item to SomeBox:
* - type:  gold, item, weapon, armor, commonevent
* - id:  id of specified item/weapon/armor/common event - use 0 for gold
* - min: minimum number of this item to award at a time
* - max: maximum number of thsi item to award at a time
* - total:  Total number available in the pool.  use 0 for unlimited
* - weight:  Higher number = greater chance of awarding this item
*
* LootBox SomeBox Add type id total
* Adjusts the total of the specified item entry
* - type: gold, item, weapon, armor, commonevent
* - id: id of specified item/weapon/armor/common event - use 0 for gold
* - total:  Total to add to the currenet total.  Some notes:
*    - positive adds to the total
*       - if used on an unlimited item, it will become limited by the
*         number specified
*    - negative subtracts from the total
*       - if this results in 0 or less, the item is removed
*    - a value of 0 will set the total to 0 (unlimited)
*
* LootBox AnyBox LimitedItemCount variable
* Counts the number of limited-quantity items in AnyBox and stores it in
* the specified variable.
* - variable:  Variable id to store the grand total in
*
* LootBoxReset
* Resets all loot boxes to their plugin paramter defaults.  This will refill
* any depleted limited-quantity items, but will remove any dynamically-
* created or modified loot boxes (via the create, new, add, etc commands)
*
* ----------------------------------------------------------------------
*/
/*~struct~LootBox:
* @param Name
* @desc Name/id of loot box.  Names are case sensitive.  Do not use spaces.
* @type text
* @default NewLootBox
*
* @param Contents
* @desc Loot box contents
* @type struct<LootItem>[]
* @default []
*/
/*~struct~LootItem:
* @param Item Type
* @desc Type of item
* @type select
* @option Gold
* @option Item
* @option Weapon
* @option Armor
* @option Common Event
*
* @param Item ID
* @desc Item ID (not required for gold)
* @type number
* @min 1
* 
* @param Min Quantity
* @desc Minimum quantity awarded
* @type number
* @min 1
* @default 1
*
* @param Max Quantity
* @desc Maximum quantity awarded
* @type number
* @min 1
* @default 1
*
* @param Total Available
* @desc Total quantity available (0: unlimited)
* @type number
* @min 0
* @default 0
*
* @param Weight
* @desc How likely this item is to be selected compared to other items in this box
* @type number
* @min 1
* @default 1
*/
(function($$)
{
	$$.pluginParameters = PluginManager.parameters("AES_LootBox");
	$$.params = {};
	$$.params.section = {};
	$$.params.variableType = +$$.pluginParameters["Item Type Variable"] || 0;
	$$.params.variableId = +$$.pluginParameters["Item ID Variable"] || 0;
	$$.params.variableQuantity = +$$.pluginParameters["Quantity Variable"] || 0;
	$$.params.lootBoxList = String($$.pluginParameters["Loot Boxes"]);
	$$.params.useObtainItemFramework = String($$.pluginParameters["Use Obtain Item Framework"]).toLowerCase() === "false" ? false : true;
	$$.params.rewardText = String($$.pluginParameters["Reward Text"]);
	$$.params.emptyText = String($$.pluginParameters["Empty Text"]);
	$$.params.goldIcon = +$$.pluginParameters["Gold Icon"] || 0;
	
	Object.defineProperties($$, 
	{
		box:
		{
			get: function(){ $gameSystem.aesLootBoxes = $gameSystem.aesLootBoxes || $$.initLootBoxes(); return $gameSystem.aesLootBoxes; },
			set: function(value){ $gameSystem.aesLootBoxes = value; },
			configurable: true
		},
	});
/**-------------------------------------------------------------------
	Plugin Commands
//-------------------------------------------------------------------*/	
	$$.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args)
	{
		$$.Game_Interpreter_pluginCommand.call(this, command, args);
		if (command.match(/^LootBoxReset/i)) $$.initLootBoxes();
		else if (command.match(/^LootBox/i)) $$.lootBoxCommand(args);
	};
	$$.lootBoxCommand = function(args)
	{
		var box, command;
		if (args.length === 0)
		{
			console.log("AES_LootBox: plugin command format is:  LootBox <BoxName> <command> [Additional args]");
		}
		else if (args.length === 1)
		{
			box = args.shift().trim();
			console.log($$.getBoxByName(box));
			console.log("AES_LootBox: available commands for this box are: Open, OpenSilent, Create, Delete, New, and Add");
			console.log("See plugin help for details on how to use these commands.");
		}
		else
		{
			box = args.shift().trim();
			command = args.shift().trim()
			if (command.match(/^opensilent$/i)) $$.getItem(box, true);
			else if (command.match(/^open$/i)) $$.getItem(box);
			else if (command.match(/^create$/i)) $$.createBox(box);
			else if (command.match(/^delete$/i)) $$.deleteBox(box);
			else if (command.match(/^new$/i)) $$.newItem(box, args[0], args[1], args[2], args[3], args[4], args[5]); // type, id, min, max, total, weight
			else if (command.match(/^add$/i)) $$.addItem(box, args[0], args[1], args[2]); // type, id, total?
			else if (command.match(/^limiteditemcount$/i) && +args[0]) $gameVariables.setValue(+args[0], $$.limitedItemCount(box));
		}
	};
/**-------------------------------------------------------------------
	Lootbox setup
//-------------------------------------------------------------------*/	
	$$.DataManager_setupNewGame = DataManager.setupNewGame;
	DataManager.setupNewGame = function()
	{
		$$.DataManager_setupNewGame.call(this);
		$$.initLootBoxes();
	};
	$$.initLootBoxes = function()
	{
		function parseBox(box)
		{
			var result = {};
			try
			{
				box = JSON.parse(box);
				result.id = box["Name"].replace(/ /g, "");
				result.contents = JSON.parse(box["Contents"]).map(x => parseItem(x));
			}
			catch(e)
			{
				console.log("AES_LootBox: Failed to parse loot box data");
				console.log(box);
			}
			return result;
		};
		function parseItem(item)
		{
			var result = {};
			try
			{
				item = JSON.parse(item);
				result.type = item["Item Type"];
				result.id = +item["Item ID"] || 0;
				result.min = +item["Min Quantity"] || 1;
				result.max = +item["Max Quantity"] || 1;
				result.total = +item["Total Available"] || 0;
				result.weight = +item["Weight"] || 1;
			}
			catch(e)
			{
				console.log("AES_LootBox: Failed to parse loot box item data");
				console.log(item);
			}
			return result;
		};
		var result;
		try
		{
			result = JSON.parse($$.params.lootBoxList).map(box => parseBox(box));
		}
		catch(e)
		{
			result = [];
			console.log("AES_LootBox: Failed to parse loot box list");
			console.log($$.params.lootBoxList);
		}
		$$.box = result;
	};
/**-------------------------------------------------------------------
	Lootbox logic
//-------------------------------------------------------------------*/	
	$$.getBoxByName = function(boxName)
	{
		var result;
		for (let box of $$.box)
		{
			if (boxName == box.id)
			{
				result = box;
				break;
			}
		}
		return result;
	};
	$$.totalWeight = function(box)
	{
		return box.contents.reduce((acc, cur) => cur.weight + acc, 0);
	};
	$$.createBox = function(box)
	{
		$$.box.push({"id": box, "contents":[]});
	};
	$$.deleteBox = function(box)
	{
		for (let [index, currentBox] of $$.box.entries())
		{
			if (currentBox.id === box)
			{
				$$.box.splice(index, 1);
				break;
			}
		}
	};
	$$.newItem = function(box, type, id, min, max, total, weight)
	{
		var box = $$.getBoxByName(box);
		var item = {};
		if (type.match(/item/i)) item.type = "Item";
		else if (type.match(/weapon/i)) item.type = "Weapon";
		else if (type.match(/armor/i)) item.type = "Armor";
		else if (type.match(/commonevent/i)) item.type = "Common Event";
		else item.type = "Gold";
		item.id = +id || 0;
		item.min = +min || 1;
		item.max = +max || 1;
		item.total = +total || 0;
		item.weight = +weight || 1;
		if (box) box.contents.push(item);
	};
	$$.addItem = function(box, type, id, total)
	{
		var box = $$.getBoxByName(box);
		id = +id || 0;
		type = type.toLowerCase();
		total = +total || 0;
		var item;
		if (box)
		{
			for (let [index, item] of box.contents.entries())
			{
				if (item.id === id && item.type.toLowerCase().replace(/ /g, "") === type)
				{
					if (total)
					{
						item.total += total;
						if (item.total < 1) box.contents.splice(index, 1);
					}
					else
					{
						item.total = 0;
					}
					break;
				}
			}
		}
	};
	$$.getItem = function(box, silent=false)
	{
		box = typeof box === "string" ? $$.getBoxByName(box) : box;
		var count = 0;
		var total = box ? $$.totalWeight(box) : 0;
		var result, roll, amount, resultText = $$.params.rewardText;
		if (total)
		{
			roll = Math.floor(Math.random() * total);
			for (let [index, item] of box.contents.entries())
			{
				count += item.weight;
				if (roll < count)
				{
					result = item;
					amount = Math.floor(Math.random() * Math.abs(item.max - item.min) + item.min);
					if (item.total !== 0)
					{
						if (amount > item.total) amount = item.total;
						item.total -= amount;
						if (item.total < 1) box.contents.splice(index, 1);
					}
					if (Imported.AES_Core && Aesica.Core.params.section.universalObtainItem && $$.params.useObtainItemFramework && !silent)
					{
						if (result.type === "Gold") Aesica.Core.pluginCommand("ObtainGold " + amount);
						else if (result.type === "Item") Aesica.Core.pluginCommand("ObtainItem " + item.id + " " + amount);
						else if (result.type === "Weapon") Aesica.Core.pluginCommand("ObtainWeapon " + item.id + " " + amount);
						else if (result.type === "Armor") Aesica.Core.pluginCommand("ObtainArmor " + item.id + " " + amount);
						else if (result.type === "Common Event") $gameTemp.reserveCommonEvent(item.id);
					}
					else
					{
						var dbItem;
						if (result.type === "Gold")
						{
							resultText = resultText.replace(/%n/gi, "\\G");
							if ($$.params.goldIcon) resultText = resultText.replace(/%i/gi, "\\I[" + $$.params.goldIcon + "]");
							else resultText = resultText.replace(/%i/gi, "");
							$gameParty.gainGold(amount);
						}
						else if (result.type === "Common Event") $gameTemp.reserveCommonEvent(item.id);
						else
						{
							if (result.type === "Item") dbItem = $dataItems[item.id];
							else if (result.type === "Weapon") dbItem = $dataWeapons[item.id];
							else if (result.type === "Armor") dbItem = $dataArmors[item.id];
							if (dbItem)
							{
								resultText = resultText.replace(/%i/gi, "\\I[" + dbItem.iconIndex + "]").replace(/%n/gi, dbItem.name);
								$gameParty.gainItem(dbItem, amount);
							}
						}
						if (!silent && result.type !== "Common Event")
						{
							resultText = resultText.replace(/%q/gi, amount);
							$gameMessage.add(resultText);
							if ($gameMap && $gameMap._interpreter) $gameMap._interpreter.setWaitMode("message");
						}
					}
					if ($$.params.variableType) $gameVariables.setValue($$.params.variableType, ["Gold", "Item", "Weapon", "Armor", "Common Event"].indexOf(result.type));
					if ($$.params.variableId) $gameVariables.setValue($$.params.variableId, result.id);
					if ($$.params.variableQuantity)
					{
						$gameVariables.setValue($$.params.variableQuantity, amount);
					}
					break;
				}
			}
		}
		else if (!silent)
		{
			$gameMessage.add($$.params.emptyText);
			if ($gameMap && $gameMap._interpreter) $gameMap._interpreter.setWaitMode("message");
		}		
	};
	$$.limitedItemCount = function(box)
	{
		box = typeof box === "string" ? $$.getBoxByName(box) : box;
		var result = box ? box.contents.reduce((acc, cur) => acc += cur.total, 0) : 0;
		return result;
	};
})(Aesica.LootBox);