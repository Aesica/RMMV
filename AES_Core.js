var Imported = Imported || {};
Imported.AES_Core = true;
var Aesica = Aesica || {};
Aesica.Core = Aesica.Core || {};
Aesica.Core.version = 1.21;
/*:
* @plugindesc Contains several enhancements for various aspects of RMMV.
*
* @author Aesica
*
* @param ---Battle Commands---
* @default  
*
* @param Limit Break Command
* @parent ---Battle Commands---
* @desc This is a skillType ID.  When TP reaches specified threshold, replace "Attack" with this command.  0: Disable
* @type number
* @min 0
* @default 0
*
* @param Limit Break Threshold
* @parent ---Battle Commands---
* @desc If a limit break command is specfied above, this is the TP threshold required to enable it.
* @type number
* @min 0
* @default 100
*
* @param Enable Attack
* @parent ---Battle Commands---
* @desc Shows or hides the "Attack" command in battle.
* @type boolean
* @on Show
* @off Hide
* @default true
*
* @param Enable Guard
* @parent ---Battle Commands---
* @desc Shows or hides the "Guard" command in battle.
* @type boolean
* @on Show
* @off Hide
* @default true
*
* @param Enable Item
* @parent ---Battle Commands---
* @desc Shows or hides the "Item" command in battle.
* @type boolean
* @on Show
* @off Hide
* @default true
*
* @param ---Combat Formulas---
* @default
*
* @param Damage Formula
* @parent ---Combat Formulas---
* @desc Damage formula eval used by Aesica.Core.damage().  See plugin description for more info.
* @type text
* @default userStat * multiplier - targetStat * 2
*
* @param Healing Formula
* @parent ---Combat Formulas---
* @desc Healing formula eval used by Aesica.Core.heal().  See plugin description for more info.
* @type text
* @default userStat * multiplier + targetStat
*
* @param Minimum Damage
* @parent ---Combat Formulas---
* @desc Minimum damage an attack can inflict.
* @type number
* @default 0
*
* @param Maximum Damage
* @parent ---Combat Formulas---
* @desc Maximum damage an attack can inflict.  0: Disable
* @type number
* @default 0
*
* @param Unarmed Weapon Value
* @parent ---Combat Formulas---
* @desc The value to be returned by weapon stat functions if no weapon is equipped.  This is processed as an eval.
* @default 1
*
* @param ---Obtain Item Plugin Command---
* @default  
*
* @param Currency Icon
* @parent ---Obtain Item Plugin Command---
* @desc Icon displayed with "ObtainGold" command.  0 = no icon or YEP_CoreEngine default (if installed)
* @type number
* @min 0
* @default 314
*
* @param Item Obtain Message
* @parent ---Obtain Item Plugin Command---
* @desc i% = item icon, n% = item name, %q = item quantity
* @default Obtained %i%n x%q
*
* @param Item Obtain Sound
* @parent ---Obtain Item Plugin Command---
* @desc Sound effect to play when obtaining an item
* @default Sword1
*
* @param Item Obtain Volume
* @parent ---Obtain Item Plugin Command---
* @desc Volume for item obtain sound effect
* @type number
* @min 0
* @max 100
* @default 70
*
* @param ---Other---
* @default  
*
* @param Instant Text
* @parent ---Other---
* @desc Default setting for instant text rendering.  This can be changed ingame via plugin commands.
* @type boolean
* @on Instant
* @off Standard
* @default true
*
* @param Shop Patch
* @parent ---Other---
* @desc Enable the shop 'Quantity Possessed' patch, which includes equipped weapons and armor
* @type boolean
* @on Enable
* @off Disable
* @default true
* @help
* List of things this plugin does:
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
* you can adjust these.
*
* Unarmed Weapon Value
* This is the value that will be returned by the weaponStat functions described
* below.  Since it gets processed as an eval, it can also be a formula.  To
* reference the battler, use 'this' so for example if the actor's atk is 14:
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
* // 1000 fixed damage
* 
* Aesica.Core.heal(a.mag, 3)
* // uses the healing formula from the plugin parameters to combine a.mag with
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
*
* ----------------------------------------------------------------------
*
* Shop Item "Possessed" Quantity Patch
* By default, shops don't account for any weapons or armor you have equipped
* when displaying the quantity.  This is not only misleading, but can also cause
* you to lose gear if you are at the max for that item and attempt to unequip 
* what would be an extra.  This is simply a patch to correct that oversight.
*
* This can be disabled in case it conflicts with other shop plugins.
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
	$$.params = $$.params || {};
	$$.params.instantText = String($$.pluginParameters["Instant Text"]).toLowerCase() === "false" ? false : true;
	$$.params.shopPatch = String($$.pluginParameters["Shop Patch"]).toLowerCase() === "false" ? false : true;
	$$.params.limitCommand = Number($$.pluginParameters["Limit Break Command"]) || 0;
	$$.params.limitThreshold = Number($$.pluginParameters["Limit Break Threshold"]) || 0;
	$$.params.enableAttack = String($$.pluginParameters["Enable Attack"]).toLowerCase() === "false" ? false : true;
	$$.params.enableGuard = String($$.pluginParameters["Enable Guard"]).toLowerCase() === "false" ? false : true;
	$$.params.enableItem = String($$.pluginParameters["Enable Item"]).toLowerCase() === "false" ? false : true;
	$$.params.damageFormula = String($$.pluginParameters["Damage Formula"]);
	$$.params.healingFormula = String($$.pluginParameters["Healing Formula"]);
	$$.params.minDamage = Number($$.pluginParameters["Minimum Damage"]) || 0;
	$$.params.maxDamage = Number($$.pluginParameters["Maximum Damage"]) || 0;
	$$.params.unarmedValue = $$.pluginParameters["Unarmed Weapon Value"];
	$$.params.itemObtainText = String($$.pluginParameters["Item Obtain Message"]);
	$$.params.itemObtainSound = String($$.pluginParameters["Item Obtain Sound"]);
	$$.params.itemObtainVolume = parseInt($$.pluginParameters["Item Obtain Volume"]);
	$$.params.itemCurrencyIcon = (function(currencyIcon)
	{
		currencyIcon = isNaN(currencyIcon) ? 0 : currencyIcon;
		if (Imported.YEP_CoreEngine && currencyIcon == 0) currencyIcon = Yanfly.Icon.Gold;
		return currencyIcon;
	})(Number($$.pluginParameters["Currency Icon"]));
	
	$$.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args)
	{
		$$.Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === "InstantTextOn") $$.setInstantText(true);
		if (command === "InstantTextOff") $$.setInstantText(false);
		if (command === "ObtainItem") $$.obtainItemPluginCommand(0, args);
		if (command === "ObtainWeapon") $$.obtainItemPluginCommand(1, args);
		if (command === "ObtainArmor") $$.obtainItemPluginCommand(2, args);
		if (command === "ObtainGold") $$.obtainGoldPluginCommand(args);
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

	$$.obtainGoldPluginCommand = function(args)
	{
		args = String(args).split(" ");
		args[0] = parseInt(args[0]);
		if (isNaN(args[0]) || args[0] < 1) console.log("Aesica.Core: Plugin Command 'ObtainGold' requires 1 positive integer argument (goldAmount)");
		else $$.obtainItem($$.values.ITEM_TYPE_GOLD, 0, args[0]);
	}
	
	$$.obtainItemPluginCommand = function(type, args)
	{
		args = String(args).split(" ");
		if (isNaN(parseInt(args[0])) || parseInt(args[0]) < 1)
		{
			console.log("Aesica.Core: Plugin Commands 'ObtainItem/ObtainWeapon/ObtainArmor' requires at least 1 integer argument (itemID, quantity?=1");
		}
		else
		{
			args[0] = parseInt(args[0]);
			args[1] = (isNaN(parseInt(args[1])) || parseInt(args[1]) < 1) ? 1 : parseInt(args[1]);
			$$.obtainItem(type, args[0], args[1]);
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
	
/**-------------------------------------------------------------------	
	Damage/Healing formulas and Battler functions
//-------------------------------------------------------------------*/	
	
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
		return $$.applyDamageCap(iReturn);
	}
	
	$$.applyDamageCap = function(damage)
	{
		var iReturn = Math.max($$.params.minDamage, Math.abs(damage));
		if ($$.params.maxDamage > 0) iReturn = Math.min($$.params.maxDamage, iReturn);
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

	
/**-------------------------------------------------------------------	
	Static command control - Attack, Guard, and Item
//-------------------------------------------------------------------*/

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
	
	Window_ActorCommand.prototype.addLimitCommand = function()
	{
		this.addCommand($dataSystem.skillTypes[$$.params.limitCommand], 'skill', true, $$.params.limitCommand);
	}	
		
/**-------------------------------------------------------------------	
	Shop quantity owned patch - now includes equipped items
//-------------------------------------------------------------------*/	

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
		if (item.groupType > 0 && includeEquipped && $$.params.shopPatch)
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
		var bReturn;
		if ($$.params.shopPatch) bReturn = this.numItems(item, true) >= this.maxItems(item);
		else bReturn = $$.Game_Party_hasMaxItems.call(this, item);
		return bReturn;
	}
	
	$$.Window_ShopStatus_drawPossession = Window_ShopStatus.prototype.drawPossession;
	Window_ShopStatus.prototype.drawPossession = function(x, y)
	{
		var width, possessionWidth;
		if ($$.params.shopPatch)
		{
			width = this.contents.width - this.textPadding() - x;
			possessionWidth = this.textWidth('0000');
			this.changeTextColor(this.systemColor());
			this.drawText(TextManager.possession, x, y, width - possessionWidth);
			this.resetTextColor();
			this.drawText($gameParty.numItems(this._item, true), x, y, width, 'right');
		}
		else $$.Window_ShopStatus_drawPossession.call(this, x, y);
	}

	$$.Scene_Shop_maxBuy = Scene_Shop.prototype.maxBuy;
	Scene_Shop.prototype.maxBuy = function()
	{
		var max, price, iReturn;
		if ($$.params.shopPatch)
		{
			max = $gameParty.maxItems(this._item) - $gameParty.numItems(this._item, true);
			price = this.buyingPrice();
			iReturn = max;
			if (price > 0)
			{
				iReturn = Math.min(max, Math.floor(this.money() / price));
			}
		}
		else
		{
			iReturn = $$.Scene_Shop_maxBuy.call(this);
		}
		return iReturn;
	}

})(Aesica.Core);