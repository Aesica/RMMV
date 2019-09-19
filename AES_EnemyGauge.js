var Imported = Imported || {};
Imported.AES_EnemyGauge = true;
var Aesica = Aesica || {};
Aesica.EnemyGauge = Aesica.EnemyGauge || {};
Aesica.EnemyGauge.version = 1;
Aesica.Toolkit = Aesica.Toolkit || {};
Aesica.Toolkit.battleCoreVersion = 1.1;
/*:
* @plugindesc v1.1 Add gauges to enemies during battle
* @author Aesica
*
* @param Gauge Width
* @type number
* @min 1
* @desc The width in pixels for gauges
* @default 100
*
* @param Gauge Height
* @desc The height in pixels for gauges
* @type number
* @min 1
* @default 4
*
* @param Gauge Padding
* @desc Padding in pixels between gauges
* @type number
* @min -50
* @max 50
* @default -1
*
* @param Gauge Line Thickness
* @desc Line thickness of gauge borders
* @type number
* @min 0
* @default 1
*
* @param Back Color
* @desc Color used for "empty" background in gauges
* @default #111111
*
* @param Position
* @desc Position of gauge in relation to enemy sprite
* @type boolean
* @on Top
* @off Bottom
* @default false
*
* @param Y Offset
* @desc Offset of Y position
* @type number
* @default -16
*
* @param Drop Delay
* @desc Delay to show recent damage dealt.  0: disable
* @type number
* @min 0
* @default 30
*
* @param Gauges
* @desc List of Enemy stats to be displayed as gauges
* @type struct<EnemyGauge>[]
* @default ["{\"Current Stat\":\"hp\",\"Max Stat\":\"mhp\",\"Gauge Color 1\":\"20\",\"Gauge Color 2\":\"21\",\"Gauge Color 3\":\"#ff0000\"}","{\"Current Stat\":\"mp\",\"Max Stat\":\"mmp\",\"Gauge Color 1\":\"22\",\"Gauge Color 2\":\"23\",\"Gauge Color 3\":\"#0000ff\"}","{\"Current Stat\":\"tp\",\"Max Stat\":\"100\",\"Gauge Color 1\":\"28\",\"Gauge Color 2\":\"29\",\"Gauge Color 3\":\"#00ff00\"}"]
*
* @param ATB Gauge
* @desc Enable enemy ATB gauge? (YEP_X_BattleSysATB required)
* @type boolean
* @on Enable
* @off Disable
* @default false
*
* @help
* For terms of use, see:  https://github.com/Aesica/RMMV/blob/master/README.md
* Support me on Patreon:  https://www.patreon.com/aesica
*
* ----------------------------------------------------------------------
*
* Adds gauges for hp, mp, tp, or any/all of the above to enemies in battle.
* Custom resources added by other plugins can also be displayed, as long as that
* resource can be accessed on a battler as a property or is a fixed value (such
* as 100 for tp)
*
* So if you added a resource to your game called "skill points" with methods:
*    battler.sp 
*    battler.msp
* a gauge for those could be added using "sp" and "msp" respectively, however:
*    battler.sp()
*    battler.msp()
* cannot be read by this plugin.
*
* Color codes:  All color code plugin paramters can be either a window skin text
* color code, such as 21, or an RGB color code such as #ff8844
*
* ATB gauge:  If using this plugin's ATB gauge for Yanfly's ATB plugin
* (YEP_X_BattleSysATB) you'll need to place this plugin below it in your plugin
* list so it can load the ATB gauge color scheme.  If placed above
* YEP_X_BattleSysATB, or if YEP_X_BattleSysATB is not loaded, then the ATB gauge
* portion will be disabled automatically, regardless of plugin setting.
*
* If an enemy has a zero maximum value for a gauge stat (such as 0 max mp) then
* that gauge will be hidden for that foe.  You can also hide specific gauges on
* foes using the following Enemy note tags:
*
* <Hide Gauge n>
* Hide the specified gauge (0, 1, 2, etc)
* Under the plugin's default gauge settings:
* <Hide Gauge 0> // hides the HP gauge on a foe
* <Hide Gauge 1> // hides the MP gauge on a foe
* <Hide Gauge 2> // hides the TP gauge on a foe
*
* <Hide All Gauges>
* Hide all gauges for this specific enemy
*
* <Hide ATB Gauge>
* Hides the enemy's ATB gauge (YEP_X_BattleSysATB required to use this gauge)
*/
/*~struct~EnemyGauge:
* @param Current Stat
* @desc Current value of stat tied to gauge (hp, mp, tp, etc)
* 
* @param Max Stat
* @desc Max value of stat tied to gauge (hp, mp, 100, etc) can be fixed value or battler stat
* 
* @param Gauge Color 1
* @desc Gauge color 1
*
* @param Gauge Color 2
* @desc Gauge color 2
*
* @param Gauge Color 3
* @desc Gauge color 3, for showing drops in value
* 
*/
(function($$)
{
	$$.initColorParam = (function(value)
	{		
		if (String(value).substr(0, 1) !== "#") value = +value || 0;
		return value;
	})
	$$.pluginParameters = PluginManager.parameters("AES_EnemyGauge");
	$$.params = {};
	$$.params.gaugeWidth = +$$.pluginParameters["Gauge Width"] || 100;
	$$.params.gaugeHeight = +$$.pluginParameters["Gauge Height"] || 1;
	$$.params.gaugePadding = +$$.pluginParameters["Gauge Padding"] || 0;
	$$.params.gaugeLineThickness = +$$.pluginParameters["Gauge Line Thickness"] || 0;
	$$.params.backColor = $$.initColorParam($$.pluginParameters["Back Color"]);
	$$.params.position = String($$.pluginParameters["Position"]).toLowerCase() === "false" ? false : true;
	$$.params.yOffset = +$$.pluginParameters["Y Offset"] || 0;
	$$.params.dropDelay = +$$.pluginParameters["Drop Delay"] || 0;
	$$.params.yepAtbGauge = (function(enableAtb)
	{
		var result = null;
		if (enableAtb)
		{
			result = {};
			result.colorNormal1 = Yanfly.Param.ATBColorAtb1;
			result.colorNormal2 = Yanfly.Param.ATBColorAtb2;
			result.colorSlow1 = Yanfly.Param.ATBColorSlow1;
			result.colorSlow2 = Yanfly.Param.ATBColorSlow2;
			result.colorHaste1 = Yanfly.Param.ATBColorFast1;
			result.colorHaste2 = Yanfly.Param.ATBColorFast2;
			result.colorStop1 = Yanfly.Param.ATBColorStop1;
			result.colorStop2 = Yanfly.Param.ATBColorStop2;
			result.colorFull1 = Yanfly.Param.ATBColorFull1;
			result.colorFull2 = Yanfly.Param.ATBColorFull2;
			result.colorCharge1 = Yanfly.Param.ATBColorChar1;
			result.colorCharge2 = Yanfly.Param.ATBColorChar2;
		}
		return result;
	})(Imported.YEP_X_BattleSysATB && String($$.pluginParameters["ATB Gauge"]).toLowerCase() === "false" ? false : true);
	$$.params.gauges = (function(value)
	{
		var result = [];
		var raw;
		try
		{
			raw = JSON.parse(value);
			for (i in raw)
			{
				raw[i] = JSON.parse(raw[i]);
				result[i] = {};
				result[i].current = raw[i]["Current Stat"];
				result[i].max = +raw[i]["Max Stat"] || raw[i]["Max Stat"];
				result[i].color1 = $$.initColorParam(raw[i]["Gauge Color 1"]);
				result[i].color2 = $$.initColorParam(raw[i]["Gauge Color 2"]);
				result[i].color3 = $$.initColorParam(raw[i]["Gauge Color 3"]);
			}
		}
		catch(e)
		{
			console.log("AES_EnemyGauge: Invalid JSON in Gauges parameter")
			console.log(value);
		}		
		return result;
	})($$.pluginParameters["Gauges"]);	
/**-------------------------------------------------------------------	
	Aesica.Toolkit: Note tag parsing functions
//-------------------------------------------------------------------*/
	if ((Aesica.Toolkit.version || 0) < Aesica.Toolkit.battleCoreVersion)
	{
		Aesica.Toolkit.version = Aesica.Toolkit.battleCoreVersion;
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
	Enemy gauges
//-------------------------------------------------------------------*/
	Game_BattlerBase.prototype.showGauge = function()
	{
		return this.isAlive();
	}
	$$.Sprite_Battler_update = Sprite_Battler.prototype.update;
	Sprite_Battler.prototype.update = function()
	{
		$$.Sprite_Battler_update.call(this);
		this.initGauges();
	}
	Sprite_Battler.prototype.initGauges = function()
	{
		if (this._battler && !this._gaugeExists && this._battler.isEnemy())
		{
			this._EnemyGauge = new Window_EnemyGauge();
			this._EnemyGauge.linkBattler(this._battler);
			this.parent.parent.addChild(this._EnemyGauge);
			this._gaugeExists = true;
		}
	}
	function Window_EnemyGauge()
	{
		this.initialize.apply(this, arguments);
	}
	Window_EnemyGauge.prototype = Object.create(Window_Base.prototype);
	Window_EnemyGauge.prototype.constructor = Window_EnemyGauge;
	Window_EnemyGauge.prototype.initialize = function()
	{
		Window_Base.prototype.initialize.call(this, 0, 0, $$.params.gaugeWidth + this.standardPadding() * 2 + $$.params.gaugeLineThickness * 2, 150);
		this._battler = null;
		this._gauges = [];
		this._atbGauge = null;
		this.setBackgroundType(2);
	}
	Window_EnemyGauge.prototype.parseColor = function(color)
	{
		var result = color;
		if (typeof color === "number") result = this.textColor(color);
		return result;
	}
	Window_EnemyGauge.prototype.linkBattler = function(battler)
	{
		var gauge, stat, max, height = this.standardPadding() * 2;
		this._battler = battler;
		this._gauges = [];
		if (!battler.getTag("Hide All Gauges"))
		{
			this._gaugeBackColor = this.parseColor($$.params.backColor);
			for (i in $$.params.gauges)
			{
				stat = $$.params.gauges[i];
				if ((battler[stat.max] > 0 || stat.max > 0) && !battler.getTag("Hide Gauge " + i))
				{
					gauge = Object.create(stat);
					gauge.dropValue = 0;
					gauge.dropTimer = 0;
					gauge.previousValue = 0;
					gauge.color1 = this.parseColor(gauge.color1);
					gauge.color2 = this.parseColor(gauge.color2);
					gauge.color3 = this.parseColor(gauge.color3);
					this._gauges.push(gauge);
					height += $$.params.gaugeHeight + $$.params.gaugePadding;
				}
			}
			if (Imported.YEP_X_BattleSysATB && $$.params.yepAtbGauge && !battler.getTag("Hide ATB Gauge"))
			{
				this._atbGauge = Object.create($$.params.yepAtbGauge);
				for (i in this._atbGauge) if (typeof this._atbGauge[i] === "number") this._atbGauge[i] = this.parseColor(this._atbGauge[i]);
			}
			this.height = height + this.standardPadding() * 2;
		}
	}
	Window_EnemyGauge.prototype.update = function()
	{
		this.updatePosition();
		this.updateContents();
	}
	Window_EnemyGauge.prototype.updatePosition = function()
	{
		this.x = this._battler.spritePosX() - this.width * 0.5;
		this.y = this._battler.spritePosY() + ($$.params.position ? -this._battler.spriteHeight() - this.height : 0);
	}
	Window_EnemyGauge.prototype.updateContents = function()
	{
		var gauges = this._gauges;
		var x = 0;
		var y = 0;
		var max, current, battler = this._battler;
		if (battler)
		{
			if (battler.isAlive())
			{
				this.contentsOpacity = 255;
				for (i in gauges)
				{
					current = typeof gauges[i].current === "number" ? gauges[i].current : battler[gauges[i].current];
					max = typeof gauges[i].max === "number" ? gauges[i].max : battler[gauges[i].max];
					if ($$.params.dropDelay > 0)
					{
						if (current < gauges[i].previousValue)
						{
							gauges[i].dropTimer = $$.params.dropDelay;
							gauges[i].previousValue = current;
						}
						if (gauges[i].dropTimer > 0) gauges[i].dropTimer--;
						if (gauges[i].dropTimer === 0) gauges[i].previousValue = gauges[i].dropValue = current || 0;
					}
					this.drawGauge(x, y, $$.params.gaugeWidth, $$.params.gaugeHeight, gauges[i].dropValue / max, current / max, gauges[i].color3, gauges[i].color3, gauges[i].color1, gauges[i].color2);
					y += $$.params.gaugeHeight + $$.params.gaugePadding + $$.params.gaugeLineThickness * 2;
				}
				if (this._atbGauge) this.drawAtbGauge(x, y, $$.params.gaugeWidth, $$.params.gaugeHeight);
			}
			else if (this.contentsOpacity > 0) this.contentsOpacity  =- 1;
		}
	}
	Window_EnemyGauge.prototype.drawGauge = function(x, y, width, height, rate1, rate2, color1a, color1b, color2a, color2b)
	{
		var fillW1 = Math.floor(width * rate1);
		var fillW2 = Math.floor(width * rate2);
		var border = $$.params.gaugeLineThickness;
		this.contents.fillRect(x, y, width + border * 2, height + border * 2, $$.params.backColor);
		if (rate1 > rate2) this.contents.gradientFillRect(x + border, y + border, fillW1, height, color1a, color1b);
		this.contents.gradientFillRect(x + border, y + border, fillW2, height, color2a, color2b);
	}
	Window_EnemyGauge.prototype.drawAtbGauge = function(x, y, width, height)
	{
		var battler = this._battler;
		var speedRate = battler.atbSpeedRate();
		var rate1 = battler.atbRate();
		var rate2 = battler._atbCharging ? battler.atbChargeRate() : 0;
		var color1, color2, color3, color4;
		var yepAtbGauge = this._atbGauge;
		if (rate2 === 0)
		{
			if (speedRate === 0)
			{
				color1 = yepAtbGauge.colorStop1;
				color2 = yepAtbGauge.colorStop2;
			}
			else if (speedRate > 1)
			{
				color1 = yepAtbGauge.colorHaste1;
				color2 = yepAtbGauge.colorHaste2;
			}
			else if (speedRate < 1)
			{
				color1 = yepAtbGauge.colorSlow1;
				color2 = yepAtbGauge.colorSlow2;
			}
			else
			{
				color1 = yepAtbGauge.colorNormal1;
				color2 = yepAtbGauge.colorNormal2;
			}
			color3 = color4 = $$.params.backColor;
		}
		else
		{
			color1 = yepAtbGauge.colorFull1;
			color2 = yepAtbGauge.colorFull2;
			color3 = yepAtbGauge.colorCharge1;
			color4 = yepAtbGauge.colorCharge2;
		}
		this.drawGauge(x, y, width, height, rate1, rate2, color1, color2, color3, color4);
	}
})(Aesica.EnemyGauge);