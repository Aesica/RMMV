var Imported = Imported || {};
Imported.AES_ImprovedShop = true;
var Aesica = Aesica || {};
Aesica.ImprovedShop = Aesica.ImprovedShop || {};
Aesica.ImprovedShop.version = 1.21;
Aesica.Toolkit = Aesica.Toolkit || {};
Aesica.Toolkit.improvedShopVersion = 1.5;
/*:
* @plugindesc v1.21 Enhances shops by adding limited quantities, custom buy/sell rates, item relisting, and more
* @author Aesica
*
* @param Default Buy Rate
* @desc Default price adjustment for items bought from all shops
* @type number
* @min 0
* @decimals 5
* @default 1
*
* @param Default Sell Rate
* @desc Default price adjustment for items sold to all shops
* @type number
* @min 0
* @decimals 5
* @default 0.5
*
* @param Possessed Counter
* @desc Determines how "Items Possessed" is displayed in shops
* @type select
* @option 1 Line - Inventory Only (RM Default)
* @option 1 Line - Totaled
* @option 1 Line - Separate
* @option 2 Lines
* @default 1 Line - Separate
*
* @param Equipped Counter Label
* @parent Possessed Counter
* @desc Text to show for the "equipped" portion of the possession counter when applicable
* @default Equipped
*
* @param Infinite Quantity Display
* @desc The symbol used to indicate infinite quantity items
* @default ∞
*
* @param Max Shop Stack Size
* @desc Maximum stack size for items sold by the player or deposited into the item vault.  Preset shop stock can exceed this value
* @type number
* @min 1
* @default 999999999999
*
* @param Limited Shops
* @desc List of limited-inventory shops
* @type struct<ShopData>[]
* @default ["{\"Shop ID\":\"MasterShop\",\"Shop Type\":\"Buy And Sell\",\"Relist Sold Items\":\"true\",\"Auto Sort\":\"true\",\"Buy Multiplier\":\"\",\"Sell Multiplier\":\"\",\"Shop Inventory\":\"[]\",\"Shop Notes\":\"\\\"\\\\\\\"MasterShop\\\\\\\" is a system-reserved Shop ID with an\\\\nivnentory consnisting of every item ever sold by the\\\\nplayer to any shop that doesn't relist items.\\\"\"}","{\"Shop ID\":\"ItemVault\",\"Shop Type\":\"Buy And Sell\",\"Relist Sold Items\":\"true\",\"Auto Sort\":\"true\",\"Buy Multiplier\":\"0\",\"Sell Multiplier\":\"0\",\"Shop Inventory\":\"[]\",\"Shop Notes\":\"\\\"\\\\\\\"ItemVault\\\\\\\" is a system-reserved Shop ID that replaces\\\\nthe Buy and Sell commands with Deposit and Withdraw.  It\\\\notherwise functions like any other shop.  While any shop\\\\nwith relisting enabled can be used as a vault of sorts,\\\\nItemVault is intended specifically for this purpose.\\\\n\\\\nNote that the command replacement may cause conflicts\\\\nwith other shop-based plugins if they rearrange the\\\\nwindows, hence why it's limited to this reserved Shop ID.\\\"\"}"]
* @help
* For terms of use, see:  https://github.com/Aesica/RMMV/blob/master/README.md
* Support me on Patreon:  https://www.patreon.com/aesica
*
* ----------------------------------------------------------------------
* Overview
* 
* With this plugin, you can customize several things about shops.
*
* Global changes that affect both standard and custom shops:
*
* - Change the default buy and sell rates for all shops
* - Customize the "Possessed" counter to display items both owned and equipped
*       instead of just those carried in the inventory.
*
*
* Customizations that apply to shops created via this shop's plugin parameters
* or shops created dynamically ingame:
*
* - Make certain items in shops available in limited quantities
* - Use different markups (or markdowns!) on a per-shop and/or per-item basis
* - Choose to have certain shops can relist any item sold to them in the same
*      quantity (Player sells 3 Elixirs, the shop will then have 3 Elixirs for
*      sale)
* - Dynamically add or remove items from shops
*
* ----------------------------------------------------------------------
* Plugin Commands
* ----------------------------------------------------------------------
* Shop name create nosell=0|1 buyrate=n sellrate=n canrelist=0|1
*
* Creates a new shop using any of the specified optional paramters.
* For example:
* 
* shop Butts create
* Creates a shop named Butts using defaults
*
* shop PawnShop create buyrate=0.85 sellrate=0.70 canrelist=1
* Creates a shop called PawnShop that lets players buy items at 85% of their
* base price, or sell items at 70% of their base price.  any items sold will
* be relisted.
*
* shop RareImports create nosell=1 buyrate=2
* Creates a shop called RareImports that only sells items, and does so at 
* 200% of the item's base value.
* 
* ----------------------------------------------------------------------
* Shop name open
*
* Opens the specified shop, thus:
*
* shop Butts open
*
* ----------------------------------------------------------------------
* Shop name delete
* 
* Deletes the specified shop and all of its contents, thus:
*
* shop Butts delete
*
* Deletes the shop "Butts" and everything it has in its inventory
* 
* ----------------------------------------------------------------------
* Shop name exists switchId
*
* If the shop exists, sets the switch matching switchId to true.  If not,
* it sets the switch to false.
*
* shop Butts exists 1
*
* Will set switch 1 to true if Butts exists, false if not.
*
* Note:  If you'd rather use a script-based function call to check in a
* single step, use:
*
* Aesica.ImprovedShop.exists(shopName)
* 
* So for the above example:
*
* Aesica.ImprovedShop.exists("Butts")
*
* The shop name is case sensitive in both cases.
*
* ----------------------------------------------------------------------
* Shop name add id=n type=item|weapon|armor qty=n markup=n
* 
* Adds an item to the specified shop.  Examples:
*
* shop PawnShop add id=4 type=item
* Adds an item with id 4 of type item to "PawnShop" - this item will be
* unlimited in quantity with no markup (1) since "qty" and markup were
* both omitted.
*
* shop RareImports add id=22 type=weapon qty=2 markup=1.25
* Adds 2 weapons with id 22 to the RareImports shop that will be
* marked up 125% in addition to the shop's innate markup.  Boy, this is
* really expensive!
*
* ----------------------------------------------------------------------
* Shop name remove id=n type=item|weapon|armor qty=n
* 
* Removes an item from the specified shop.  If no more of a given item
* would be left as a result, the item is removed from the shop inventory
* completely.  Examples:
*
* shop PawnShop remove id=3 type=item
* Removes  all items with id 3 from PawnShop's inventory, since omitting
* qty implies the entire stack.

* shop RareImports remove id=21 type=armor qty=1
* Removes a single armor with id 21 from RareImports.  
*
* ----------------------------------------------------------------------
* Shop name sort
*
* Pretty straightforward really.  This will sort a shop's goods based
* on type (item, weapon, armor in that order) followed by item id, so:
*
* armor: 1
* item: 2
* item: 1
* weapon: 2
* armor: 2
* weapon: 1
*
* ...becomes
*
* item: 1
* item: 2
* weapon: 1
* weapon: 2
* armor: 1
* armor: 2
* ----------------------------------------------------------------------
*/
/*~struct~ShopData:
* @param Shop ID
* @desc An ID/name used to identify the shop.  Used by plugin commands to open, add, or remove items from it.
*
* @param Shop Type
* @desc Determines the shop type
* @type select
* @option Buy And Sell
* @option Buy Only
* @option Sell Only
* @option Item Vault 
* @default Buy And Sell
*
* @param Relist Sold Items
* @desc Determines whether or not a shop will relist items sold by the player
* @type boolean
* @on Relist
* @off Do Not Relist
* @default false
*
* @param Auto Sort
* @desc Determines whether a shop's contents are auto-sorted
* @type boolean
* @on Enable
* @off Disable
* @default true
*
* @param Buy Multiplier
* @desc Multiplier applied to all items the player can buy from this shop.  Leave blank to use the global default
*
* @param Sell Multiplier
* @desc Multiplier applied to items the player tries to sell. Leave blank to use the global default
*
* @param Shop Inventory
* @desc list of items sold by this shop
* @type struct<ShopInventory>[]
* @default []
*
* @param Shop Notes
* @desc Personal notes about this shop (ignored by plugin code)
* @type note
*/
/*~struct~ShopInventory:
* @param ID
* @desc ID of item.  You can optionally add the name after the id (1:Potion) for your own ease of reading
*
* @param Type
* @desc Indicates the item type (Item, Weapon, or Armor)
* @type select
* @option Item
* @option Weapon
* @option Armor
* @default Item
*
* @param Quantity
* @desc The amount of this item available for sale in this shop.  Leave blank for unlimited
* 
* @param Price
* @desc Custom price (before modifiers) this item will be listed at.  Leave blank to use the item's default price
*
* @param Markup
* @desc Multiplier applied to item's price.  Default/no change: 1
* @type number
* @decimals 5
* @min 0
* @default 1
*
*/
(function($$)
{
	$$.parseModifier = (function(value){ value = parseFloat(value); return isNaN(value) ? null : value; });
	$$.pluginParameters = PluginManager.parameters("AES_ImprovedShop");
	$$.params = {};
	$$.params.defaultBuyRate = $$.parseModifier($$.pluginParameters["Default Buy Rate"]);
	$$.params.defaultSellRate = $$.parseModifier($$.pluginParameters["Default Sell Rate"]);
	$$.params.possessedCounter = ["1 Line - Inventory Only (RM Default)", "1 Line - Totaled", "1 Line - Separate", "2 Lines"].indexOf($$.pluginParameters["Possessed Counter"]);
	$$.params.maxShopStackSize = +$$.pluginParameters["Max Shop Stack Size"] || 999999999999;
	$$.params.infiniteQuantityDisplay = $$.pluginParameters["Infinite Quantity Display"];
	$$.params.equippedCounterLabel = $$.pluginParameters["Equipped Counter Label"];
	$$.params.shops = (function(data)
	{
		var currentData, currentShop, result;
		var shopTypes = ["Buy And Sell", "Buy Only", "Sell Only", "Item Vault"];
		var parseGoods = (function(shop, goods)
		{
			var isValidItem, itemData, item, dbItem, goodsResult = [];
			try
			{
				goods = JSON.parse(goods);
				
				for (i in goods)
				{
					isValidItem = false;
					itemData = JSON.parse(goods[i]);
					item = [];
					item[0] = ["Item", "Weapon", "Armor"].indexOf(itemData["Type"]);
					item[1] = parseInt(itemData["ID"]) || 0;
					item[3] = +itemData["Price"] || 0;
					item[2] = item[3] > 0 ? 1 : 0;
					item[4] = $$.parseModifier(itemData["Quantity"]);
					item[5] = $$.parseModifier(itemData["Markup"]);
					goodsResult.push(item);
				}
			}
			catch(e)
			{
				console.log("AES_ImprovedShop: Invalid JSON in plugin paramters:")
				console.log(goods);
				console.log(e);
			}
			return goodsResult;
		});
		try
		{
			result = {};
			data = JSON.parse(data);
			for (i in data)
			{
				currentData = JSON.parse(data[i]);
				currentShop = result[currentData["Shop ID"]] = {};
				currentShop.name = currentData["Shop ID"];
				currentShop.canRelist = currentData["Relist Sold Items"].toLowerCase() === "false" ? false : true;
				currentShop.buyRate = $$.parseModifier(currentData["Buy Multiplier"]);
				currentShop.sellRate = $$.parseModifier(currentData["Sell Multiplier"]);
				currentShop.autoSort = currentData["Auto Sort"].toLowerCase() === "false" ? false : true;
				currentShop.type = shopTypes.indexOf(currentData["Shop Type"]);
				currentShop.goods = parseGoods(currentShop, currentData["Shop Inventory"]);
			}
		}
		catch(e)
		{
			console.log("AES_ImprovedShop: Invalid JSON in plugin paramters:")
			console.log(data);
			console.log(e);
		}
		return result;
	})($$.pluginParameters["Limited Shops"]);
	$$.masterShopName = "MasterShop";
	$$.shopTypes = {};
	$$.shopTypes.BUY_AND_SELL = 0;
	$$.shopTypes.BUY_ONLY = 1;
	$$.shopTypes.SELL_ONLY = 2;
	$$.shopTypes.ITEM_VAULT = 3;
	$$.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args)
	{
		$$.Game_Interpreter_pluginCommand.call(this, command, args);
		if (command.match(/^shop/i)) $$.shopPluginCommand(args);
	};
/**-------------------------------------------------------------------	
	Aesica.Toolkit: Note tag parsing & utility functions
//-------------------------------------------------------------------*/
	if ((Aesica.Toolkit.version || 0) < Aesica.Toolkit.improvedShopVersion)
	{
		Aesica.Toolkit.version = Aesica.Toolkit.improvedShopVersion;
		Aesica.Toolkit.debugVersionList = function()
		{
			var result = [];
			for (let i in Aesica.Toolkit) if (typeof Aesica.Toolkit[i] === "number" && i !== "version") result.push({"ver": Aesica.Toolkit[i], "key": i});
			result = result.sort((a, b) => b.ver - a.ver);
			return this.version + ": latest version\n-----\n" + result.reduce(function(r, obj){ return r += obj.ver + ": " + obj.key + "\n"; }, "");
		}
		Aesica.Toolkit.getTag = function(tag, defaultValue)
		{
			var result;
			var note = this.note || "";
			var exists = Aesica.Toolkit.tagExists.call(this, tag);
			if (exists)
			{
				if (Aesica.Toolkit.tagExists.call(this, "\\/" + tag)) result = note.match(RegExp("<" + tag + ">([^]+)<\\/" + tag + ">", "i"));
				else result = note.match(RegExp("<" + tag + ":[ ]*([^>]+)>", "i"));
			}
			return result ? result[1].trim() : (defaultValue !== undefined ? defaultValue : exists);
		};
		Aesica.Toolkit.tagExists = function(tag)
		{
			var note = this.note || "";
			return RegExp("<" + tag + "(?::[^>]+)?>", "i").test(note);
		};
		Aesica.Toolkit.getTagList = function(tag)
		{
			var tagData = Aesica.Toolkit.getTag.call(this, tag)
			var unit, rx, match, result = [];
			if (tagData)
			{
				tagData = tagData.split("\n");
				rx = /([A-Za-z0-9]+):[ ]*"([^"]+)"/gi;
				for (i in tagData)
				{
					unit = {};
					while (match = rx.exec(tagData[i]))
					{
						unit[match[1]] = isNaN(+match[2]) ? match[2].trim() : +match[2];
					}
					result[i] = unit;
				}
			}
			return result;
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
		Aesica.Toolkit.hexColorMath = function(hexColor, mathEval)
		{
			hexColor = hexColor.replace(/[^0-9A-Fa-f]*/gi, "");
			if (hexColor.length < 6) hexColor = hexColor[0] + hexColor[0] + hexColor[1] + hexColor[1] + hexColor[2] + hexColor[2];
			hexColor = hexColor.split("")
			hexColor = [hexColor[0] + hexColor[1], hexColor[2] + hexColor[3], hexColor[4] + hexColor[5]];
			var current, result = "";
			for (i in hexColor)
			{
				current = Math.floor(eval((+("0x" + hexColor[i]) || 0) + mathEval)).toString(16);
				if (current.length < 2) current = "0" + current;
				else if (current.length > 2) current = "ff";
				result += current;
			}
			return "#" + result;
		};
		Aesica.Toolkit.digitGroup = function(value)
		{
			if (typeof value === "number") value.toLocaleString();
			else value = value.toString();
			return value;
		};
	}
/**-------------------------------------------------------------------	
	Improved Shop
//-------------------------------------------------------------------*/
	Object.defineProperties($$,
	{
		isItemVault: { get: function(){ return !!$$._isItemVault; }, set: function(value){ $$._isItemVault = !!value; } },
		isCustomShop: { get: function(){ return !!$$._isCustomShop; }, set: function(value){ $$._isCustomShop = !!value; } },
		currentShop: { get: function(){ return $$._currentShop || null; }, set: function(value){ $$._currentShop = value || null; } },
		shopList:
		{
			get: function()
			{
				if (!$gameSystem._shopList) $gameSystem._shopList = JSON.parse(JSON.stringify($$.params.shops)) || {};
				return $gameSystem._shopList;
			},
			set: function(value){ $gameSystem._shopList = value; }
		}
	});
	$$.shopPluginCommand = function(args)
	{
		var shopName = args.shift();
		var shop = $$.shopList[shopName] || null;
		var command = args.shift();
		args = args.map(x => x.split("="));
		var data = {};
		for (i in args) data[args[i][0].toLowerCase()] = args[i][1];
		if (command.match(/^exists/i))
		{
			let gameSwitch = +args[0][0] || 0;
			if (gameSwitch) $gameSwitches.setValue(gameSwitch, $$.exists(shopName));
		}
		else if (shop)
		{
			if (command.match(/^open/i))
			{
				SceneManager.push(Scene_Shop);
				if (shop.autoSort) $$.sortShopItems(shop.name);
				SceneManager.prepareNextScene(shop.goods, shop.type === $$.shopTypes.BUY_ONLY, shopName, shop.buyRate, shop.sellRate);
			}
			// params:  id:n type:type qty:n price:n markup:n
			else if (command.match(/^add/i))
			{
				$$.addItemToShop(shopName, data.id || 0, data.type || "item", data.qty || null, data.price || null, data.markup || 1);
			}
			// params: id:n type:type qty:n
			else if (command.match(/^remove/i))
			{
				$$.removeItemFromShop(shopName, data.id, data.type, data.qty);
			}
			else if (command.match(/^sort/i))
			{
				$$.sortShopItems(shopName);
			}
			else if (command.match(/^delete/i))
			{
				$$.deleteShop(shopName);
			}
		}
		// params: nosell:true|false buyrate:1 sellrate:0.5
		else if (command.match(/^create/i))
		{
			$$.createShop(shopName, data.nosell, data.buyrate, data.sellrate, data.canrelist);
		}
	};
	$$.createShop = function(shopName, type=false, buyRate=null, sellRate=null, canRelist=false)
	{
		var shop = {};
		shop.name = shopName;
		shop.buyRate = $$.parseModifier(buyRate) || null;
		shop.sellRate = $$.parseModifier(sellRate) || null;
		shop.canRelist = !!+canRelist;
		shop.type = +type || 0;
		shop.goods = [];
		$$.shopList[shopName] = shop;
		return shop;
	};
	$$.deleteShop = function(shopName)
	{
		
		delete $$.shopList[shopName];
	};
	$$.exists = function(shopName)
	{
		return !!$$.shopList[shopName];
	};
	$$.addItemToShop = function(shop, itemId, itemType, qty=null, itemCost=null, markUp=1)
	{
		var itemExists = false;
		var result = qty || 0;
		shop = typeof shop === "object" ? shop : $$.shopList[shop];
		itemType = typeof itemType === "string" ? ["item", "weapon", "armor"].indexOf(itemType.toLowerCase()) : +itemType;
		if (shop && itemType >= 0 && itemType <= 2)
		{
			for (i in shop.goods)
			{
				if (shop.goods[i][0] === itemType && shop.goods[i][1] === itemId)
				{
					if (shop.goods[i][4] !== null)
					{
						qty = +qty || 0;
						if (shop.goods[i][4] + qty > $$.params.maxShopStackSize) qty = Math.max(0, $$.params.maxShopStackSize - shop.goods[i][4]);
						shop.goods[i][4] += qty;
					}
					else if ($$.shopList[$$.masterShopName]) $$.addItemToShop($$.shopList[$$.masterShopName], itemId, itemType, qty);
					if (itemCost !== null)
					{
						shop.goods[i][2] = 1;
						shop.goods[i][3] = itemCost;
					}
					itemExists = true;
					break;
				}
			}
			if (!itemExists)
			{
				shop.goods.push([itemType, +itemId, (itemCost == null ? 0 : 1), +itemCost, $$.parseModifier(qty), $$.parseModifier(markUp)]);
				if (shop.autoSort) $$.sortShopItems(shop.name);
			}
		}
		else result = 0;
		return result;
	};
	$$.removeItemFromShop = function(shop, itemId, itemType, qty=null)
	{
		shop = typeof shop === "object" ? shop : $$.shopList[shop];
		itemType = typeof itemType === "string" ? ["item", "weapon", "armor"].indexOf(itemType.toLowerCase()) : +itemType;
		itemId = +itemId || 0;
		if (shop && itemType >= 0 && itemType <= 2)
		{
			for (i in shop.goods)
			{
				if (shop.goods[i][0] === itemType && shop.goods[i][1] === itemId)
				{
					if (+qty) shop.goods[i][4] -= +qty;
					else shop.goods[i][4] = 0;
					if (shop.goods[i][4] < 1) shop.goods.splice(i, 1);
					break;
				}
			}
		}
	};
	$$.sortShopItems = function(shopName)
	{
		var shop = $$.shopList[shopName];
		var sorter = (function(a, b)
		{
			var result = 0;
			if (a[0] < b[0]) result = -1;
			else if (a[0] > b[0]) result = 1;
			else
			{
				if (a[1] < b[1]) result = -1;
				else if (a[1] > b[1]) result = 1;
			}
			return result;
		});
		if (shop)
		{
			shop.goods.sort(sorter);
		}
	};
	$$.getQuantityInShop = function(shopName, itemId, itemType)
	{
		var shop = $$.shopList[shopName];
		var result = 0;
		if (shop)
		{
			for (i in shop.goods)
			{
				if (shop.goods[i][0] == itemType && shop.goods[i][1] == itemId)
				{
					result = shop.goods[i][4];
					break;
				}
			}
		}
		return result;
	};
	$$.DataManager_setupNewGame = DataManager.setupNewGame;
	DataManager.setupNewGame = function()
	{
		$$.DataManager_setupNewGame.call(this);
		$$.shopList = JSON.parse(JSON.stringify($$.params.shops));
	};
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
					console.log("AES_ImprovedShop: Item groupTypes already assigned by YEP_ItemSynthesis");
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
	};
	$$.assignGroupType = function(group, type)
	{
		var i, iLength = group.length;
		for (i = 1; i < iLength; i++) group[i].groupType = type;
	};
	Game_Party.prototype.numItemsEquipped = function(item)
	{
		var actors = this.members();
		var items, result = 0;
		for (i in actors)
		{
			if (item.groupType === 1) items = actors[i].weapons();
			else if (item.groupType === 2) items = actors[i].armors();
			for (j in items) if (items[j].id === item.id) result++;
		}
		return result;
	};
	Game_Party.prototype.hasMaxItems = function(item)
	{
		return this.numItems(item) + this.numItemsEquipped(item) >= this.maxItems(item);
	};
	Game_Interpreter.prototype.command302 = function()
	{
		if (!$gameParty.inBattle())
		{
			var buyOnly = this._params[4];
			this._params.splice(4, 1);
			var goods = [this._params.concat(null, 1)];
			while (this.nextEventCode() === 605)
			{
				this._index++;
				goods.push(this.currentCommand().parameters.concat(null, 1));
			}
			SceneManager.push(Scene_Shop);
			SceneManager.prepareNextScene(goods, buyOnly);
		}
		return true;
	};
	$$.Scene_Shop_prepare = Scene_Shop.prototype.prepare;
	Scene_Shop.prototype.prepare = function(goods, purchaseOnly, shopName=null, buyRate=null, sellRate=null)
	{
		this._shop = shopName ? $$.shopList[shopName] : null;
		$$.isItemVault = this._shop ? this._shop.type === $$.shopTypes.ITEM_VAULT : false;
		$$.isCustomShop = shopName;
		$$.currentShop = this._shop;
		$$.Scene_Shop_prepare.call(this, goods, purchaseOnly)
		this._item = null;
		this._itemQuantityLimit = null;
		this._buyRate = buyRate == null ? $$.params.defaultBuyRate : buyRate;
		this._sellRate = sellRate == null ? $$.params.defaultSellRate : sellRate;
	};
	Scene_Shop.prototype.onBuyOk = function()
	{
		this._item = this._buyWindow.item();
		this._itemQuantityLimit = this._buyWindow.itemQuantity();
		this._buyWindow.hide();
		this._numberWindow.setup(this._item, this.maxBuy(), this.buyingPrice(), this._itemQuantityLimit);
		this._numberWindow.setCurrencyUnit(this.currencyUnit());
		this._numberWindow.show();
		this._numberWindow.activate();
	};
	Scene_Shop.prototype.onSellOk = function() {
		this._item = this._sellWindow.item();
		this._categoryWindow.hide();
		this._sellWindow.hide();
		this._numberWindow.setup(this._item, this.maxSell(), this.sellingPrice(), this.maxSell());
		this._numberWindow.setCurrencyUnit(this.currencyUnit());
		this._numberWindow.show();
		this._numberWindow.activate();
		this._statusWindow.setItem(this._item);
		this._statusWindow.show();
	};
	$$.Scene_Shop_createBuyWindow = Scene_Shop.prototype.createBuyWindow;
	Scene_Shop.prototype.createBuyWindow = function()
	{
		$$.Scene_Shop_createBuyWindow.call(this);
		this._buyWindow._buyRate = this._buyRate;
	};
	$$.Scene_Shop_maxBuy = Scene_Shop.prototype.maxBuy;
	Scene_Shop.prototype.maxBuy = function()
	{
		var maxBuyable = $$.Scene_Shop_maxBuy.call(this);
		var maxStackable = $gameParty.maxItems(this._item) - $gameParty.numItems(this._item) - $gameParty.numItemsEquipped(this._item);
		var maxQuantity = Math.min(this._itemQuantityLimit !== null ? this._itemQuantityLimit : Infinity);
		var result;
		if ($$.isItemVault) result = Math.min(maxStackable, maxQuantity);
		else result = Math.min(maxBuyable, maxStackable, maxQuantity);
		return result;
	};
	$$.Scene_Shop_maxSell = Scene_Shop.prototype.maxSell;
	Scene_Shop.prototype.maxSell = function()	
	{
		var result = $$.Scene_Shop_maxSell.call(this);
		var item = this._item;
		if ($$.isItemVault && item)
		{
			result = Math.min(result, Math.max(0, result - $$.getQuantityInShop(this._shop.name, item.id, item.groupType)));
		}
		return result;
	};
	Scene_Shop.prototype.sellingPrice = function()
	{
		var result = Math.floor(this._sellRate * this._item.price);
		return $$.isItemVault ? -Math.max(1, result) : result;
	};
	$$.Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
	Scene_Shop.prototype.doBuy = function(number)
	{
		$$.Scene_Shop_doBuy.call(this, number);
		if (this._shop && this._itemQuantityLimit !== null) $$.removeItemFromShop(this._shop.name, this._item.id, this._item.groupType, number);
	};
	$$.Scene_Shop_doSell = Scene_Shop.prototype.doSell;
	Scene_Shop.prototype.doSell = function(number)
	{
		$$.Scene_Shop_doSell.call(this, number);
		if (this._shop && this._shop.canRelist) $$.addItemToShop(this._shop, this._item.id, this._item.groupType, number);
		else if ($$.shopList[$$.masterShopName]) $$.addItemToShop($$.shopList[$$.masterShopName], this._item.id, this._item.groupType, number);
	};
	$$.Window_ShopCommand_makeCommandList = Window_ShopCommand.prototype.makeCommandList;
	Window_ShopCommand.prototype.makeCommandList = function()
	{
		if ($$.isItemVault)
		{
			this.addCommand("Deposit", "sell");
			this.addCommand("Withdraw", "buy");
			this.addCommand(TextManager.cancel, 'cancel');
		}
		else $$.Window_ShopCommand_makeCommandList.call(this);
	};
	$$.Window_ShopStatus_drawPossession = Window_ShopStatus.prototype.drawPossession;
	Window_ShopStatus.prototype.drawPossession = function(x, y)
	{
		var width, possessionWidth;
		if ($$.params.possessedCounter === 0) $$.Window_ShopStatus_drawPossession.call(this, x, y);
		else if ($$.params.possessedCounter === 1)
		{
			width = this.contents.width - this.textPadding() - x;
			possessionWidth = this.textWidth("0000");
			this.changeTextColor(this.systemColor());
			this.drawText(TextManager.possession, x, y, width - possessionWidth);
			this.resetTextColor();
			this.drawText($gameParty.numItems(this._item) + $gameParty.numItemsEquipped(this._item), x, y, width, 'right');
			this.resetTextColor();
			this.changeTextColor(this.systemColor());
		}
		else if ($$.params.possessedCounter === 2)
		{
			width = this.contents.width - this.textPadding() - x;
			possessionWidth = this.textWidth("0000");
			this.changeTextColor(this.systemColor());
			this.drawText(TextManager.possession + "/" + $$.params.equippedCounterLabel, x, y, width - possessionWidth);
			this.resetTextColor();
			this.drawText($gameParty.numItems(this._item) + "/" + $gameParty.numItemsEquipped(this._item), x, y, width, 'right');
			this.resetTextColor();
			this.changeTextColor(this.systemColor());
		}
		else if ($$.params.possessedCounter === 3)
		{
			width = this.contents.width - this.textPadding() - x;
			possessionWidth = this.textWidth("0000");
			this.changeTextColor(this.systemColor());
			this.drawText(TextManager.possession, x, y, width - possessionWidth);
			this.resetTextColor();
			this.drawText($gameParty.numItems(this._item), x, y, width, 'right');
			this.resetTextColor();
			this.changeTextColor(this.systemColor());
			y += this.lineHeight();
			this.drawText($$.params.equippedCounterLabel, x, y, width - possessionWidth);
			this.resetTextColor();
			this.drawText($gameParty.numItemsEquipped(this._item), x, y, width, "right");
			this.resetTextColor();
		}
		y += this.lineHeight();		
	};
	$$.Window_ShopNumber_setup = Window_ShopNumber.prototype.setup;
	Window_ShopNumber.prototype.setup = function(item, max, price, quantity=null)
	{
		this._quantity = quantity;
		$$.Window_ShopNumber_setup.call(this, item, max, price);
	};
	Window_ShopNumber.prototype.maxDigits = function()
	{
		return 8;
	};
	Window_ShopNumber.prototype.cursorWidth = function() {
		var digitWidth = this.textWidth('0');
		return this.maxDigits() * digitWidth + this.textPadding() * 2;
	};
	Window_ShopNumber.prototype.drawNumber = function()
	{
		var x = this.cursorX();
		var y = this.itemY();
		var width = this.cursorWidth() - this.textPadding();
		this.resetTextColor();
		this.drawText(this._number + "/" + (this._quantity !== null ? this._quantity : $$.params.infiniteQuantityDisplay), x, y, width, "right");
	};
	$$.Window_ShopBuy_initialize = Window_ShopBuy.prototype.initialize;
	Window_ShopBuy.prototype.initialize = function(x, y, height, shopGoods, buyRate=null)
	{
		$$.Window_ShopBuy_initialize.call(this, x, y, height, shopGoods);
		this._buyRate = buyRate == null ? $$.params.defaultBuyRate : buyRate;
	};
	if (Imported.YEP_ShopMenuCore)// && !Imported.YEP_X_MoreCurrencies)
	{
		$$.Window_ShopNumber_drawTotalCost = Window_ShopNumber.prototype.drawTotalCost;
		Window_ShopNumber.prototype.drawTotalCost = function(ww, wy)
		{
			var value = this._price * this._number;
			if (!this.isSelling()) value *= -1;
			value = Yanfly.Util.toGroup(value);
			if (value > 0) value = '+' + value;
			this.drawCurrencyValue(value, this._currencyUnit, 0, wy, ww);
		};
		$$.Window_ShopBuy_drawItem = Window_ShopBuy.prototype.drawItem;
		Window_ShopBuy.prototype.drawItem = function(index)
		{
			if ($$.isCustomShop)
			{
				var item = this._data[index];
				var rect = this.itemRect(index);
				rect.width -= this.textPadding();
				this.changePaintOpacity(this.isEnabled(item));
				if (Imported.YEP_CoreEngine) this.contents.fontSize = Yanfly.Param.GoldFontSize;
				var qtyRect = { x: rect.x, y: rect.y, width: this.textWidth("0000"), height: this.lineHeight() };
				rect.width -= qtyRect.width;
				qtyRect.x += rect.width;
				this.drawBuyQuantity(index, qtyRect);
				this.resetFontSettings();			
				this.drawBuyItem(item, rect);
				this.drawBuyPrice(item, rect);
				this.changePaintOpacity(true);
				this.resetFontSettings();			
			}
			else $$.Window_ShopBuy_drawItem.call(this, index);
		};
		Window_ShopBuy.prototype.drawBuyQuantity = function(index, rect)
		{
			var qty = this._quantity[index];
			var text;
			if (qty !== null) text = "\u00d7" + qty;
			else text = $$.params.infiniteQuantityDisplay;
			this.drawText(text, rect.x, rect.y, rect.width, "right");
		};
	}
	else if (Imported.YEP_CoreEngine)
	{
		$$.Window_ShopBuy_drawItem = Window_ShopBuy.prototype.drawItem;
		Window_ShopBuy.prototype.drawItem = function(index)
		{
			if ($$.isCustomShop)
			{
				var item = this._data[index];
				var rect = this.itemRect(index);
				var priceWidth = 96;
				var qtyRect = { x: rect.x, y: rect.y, width: this.textWidth("0000"), height: this.lineHeight() };
				rect.width -= qtyRect.width + this.textPadding();
				qtyRect.x += rect.width + this.textPadding();
				var qty = this._quantity[this._data.indexOf(item)]
				this.changePaintOpacity(this.isEnabled(item));
				this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);
				this.contents.fontSize = Yanfly.Param.GoldFontSize;
				if (this.price(item) > 0) this.drawText(this.price(item), rect.x + rect.width - priceWidth, rect.y, priceWidth, "right");
				this.drawText(qty !== null ? "\u00d7" + qty : $$.params.infiniteQuantityDisplay, qtyRect.x, qtyRect.y, qtyRect.width, "right");
				this.changePaintOpacity(true);			
				this.resetFontSettings();
			}
			else $$.Window_ShopBuy_drawItem.call(this, index);
		};
	}
	else
	{
		$$.Window_ShopBuy_drawItem = Window_ShopBuy.prototype.drawItem;
		Window_ShopBuy.prototype.drawItem = function(index)
		{
			if ($$.isCustomShop)
			{
				var item = this._data[index];
				var rect = this.itemRect(index);
				var priceWidth = 96;
				var qtyRect = { x: rect.x, y: rect.y, width: this.textWidth("0000"), height: this.lineHeight() };
				rect.width -= qtyRect.width + this.textPadding();
				qtyRect.x += rect.width + this.textPadding();
				var qty = this._quantity[this._data.indexOf(item)]
				this.changePaintOpacity(this.isEnabled(item));
				this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);
				if (+this.price(item)) this.drawText(this.price(item), rect.x + rect.width - priceWidth, rect.y, priceWidth, "right");
				this.drawText(qty !== null ? "\u00d7" + qty : $$.params.infiniteQuantityDisplay, qtyRect.x, qtyRect.y, qtyRect.width, "right");
				this.changePaintOpacity(true);
			}
			else $$.Window_ShopBuy_drawItem.call(this, index);
		};
	}
	Window_ShopBuy.prototype.itemQuantity = function()
	{
		return this._quantity[this.index()];
	};
	Window_ShopBuy.prototype.makeItemList = function() {
		this._data = [];
		this._price = [];
		this._quantity = [];
		this._shopGoods.forEach(function(goods)
		{
			var item = null;
			if (goods[0] === 0) item = $dataItems[goods[1]];
			else if (goods[0] === 1) item = $dataWeapons[goods[1]];
			else if (goods[0] === 2) item = $dataArmors[goods[1]];
			if (item)
			{
				this._data.push(item);
				this._price.push(Math.ceil((goods[2] === 0 ? item.price : goods[3]) * goods[5] * this._buyRate));
				this._quantity.push(goods[4]);
			}
		}, this);
	};
	$$.Window_ShopSell_isEnabled = Window_ShopSell.prototype.isEnabled;
	Window_ShopSell.prototype.isEnabled = function(item)
	{
		var vaultable = true;
		if ($$.isItemVault) vaultable = $$.getQuantityInShop($$.currentShop.name, item.id, item.groupType) < $$.params.maxShopStackSize;
		return $$.Window_ShopSell_isEnabled.call(this, item) && vaultable;
	};
	// Misc YEP patchy stuff~
	if (Imported.YEP_ShopMenuCore)
	{
		$$.Window_ShopBuy_drawBuyPrice = Window_ShopBuy.prototype.drawBuyPrice;
		Window_ShopBuy.prototype.drawBuyPrice = function(item, rect)
		{			
			if (this.price(item) !== 0 || Imported.YEP_X_MoreCurrencies) $$.Window_ShopBuy_drawBuyPrice.call(this, item, rect);
		};
	}
	// Anti-Fuckery patch for YEP_X_MoreCurrencies and the item vault feature~
	if (Imported.YEP_X_MoreCurrencies)
	{
		$$.Window_Gold_drawItemCurrencies = Window_Gold.prototype.drawItemCurrencies;
		Window_Gold.prototype.drawItemCurrencies = function(wx, ww)
		{
			if (!$$.isItemVault) $$.Window_Gold_drawItemCurrencies.call(this, wx, ww);
		};
		$$.Scene_Shop_doSellGold = Scene_Shop.prototype.doSellGold;
		Scene_Shop.prototype.doSellGold = function(number)
		{
			if ($$.isItemVault) Yanfly.MC.Scene_Shop_doSellGold.call(this, number);
			else $$.Scene_Shop_doSellGold.call(this, number);
		};
		$$.Scene_Shop_doBuyGold = Scene_Shop.prototype.doBuyGold;
		Scene_Shop.prototype.doBuyGold = function(number)
		{
			if ($$.isItemVault) Yanfly.MC.Scene_Shop_doBuyGold.call(this, number);		
			else $$.Scene_Shop_doBuyGold.call(this, number);
		};
		$$.Window_Base_drawAltCurrency = Window_Base.prototype.drawAltCurrency;
		Window_Base.prototype.drawAltCurrency = function(value, unit, wx, wy, ww)
		{
			if (!$$.isItemVault) $$.Window_Base_drawAltCurrency.call(this, value, unit, wx, wy, ww);
		};
	}
})(Aesica.ImprovedShop);