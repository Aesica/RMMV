var Imported = Imported || {};
Imported.AES_CustomMP = true;
var Aesica = Aesica || {};
Aesica.CMP = Aesica.CMP || {};
Aesica.CMP.version = 1.3;
/*:
* @plugindesc v1.3 Adds the ability to customize MP styling and recovery for each class
*
* @author Aesica
*
* @param Default MP Gauge Color 1
* @desc The default color 1 for MP gauges.  Default: 22
* @type number
* @default 22
*
* @param Default MP Gauge Color 2
* @desc The default color 2 for MP gauges.  Default: 23
* @type number
* @default 23
*
* @param Default MP Cost Color
* @desc The default color for the MP cost in skill lists:  Default 23
* @type number
* @default 23
*
* @param Skill Cost Font Size
* @desc Font size for skill costs.  Plugin Default: 20, RM Default: 28
* @type number
* @default 20
*
* @help
* For terms of use, see:  https://github.com/Aesica/RMMV/blob/master/README.md
*
* What this plugin does:
* 
* ----------------------------------------------------------------------
*
* MP Bar Styling
*
* Enables different classes to have different styling for their MP bar,
* such as name and color, via note tags:
* 
* <MP Name: x>
* Changes the abbr. term "MP" into x for a given class.
* <MP Name: EN>
* All instances of "MP" will show as "EN" in the combat window, main window,
* status window, etc for any actor using a class with this note tag.  The term
* can be accessed for other uses using Game_BattlerBase.prototype.mpA (so
* a.mpA in the combat formula box etc).
*
* <MP Full Name: x>
* Allows for renaming the full term for MP into x for a given class.
* <MP Full Name: Energy>
* Will allow the use of Game_BattlerBase.prototype.mpName (so a.mpName in the
* damage formula box, etc) with other functions/plugins/customizations.  Note
* That unlike <MP Name: x>, this won't change anything
* 
* <MP Gauge Color: color1, color2>
* Changes the color1 and color2 of the MP gauge for a given class.  This can
* be an indexed color based on /img/system/Window.png, or it can be a hex
* value in #rrggbb format:
* <MP Gauge Color: 22, 23>
* <MP Gauge Color: #00ffff, #aaffff>
*
* <MP Cost Color: color>
* Changes the color of the skill's MP cost, ideally to match the color of
* the aliased MP gauge.  This can be either an indexed color or a hex
* value like with the MP Gauge Color tag above:
* <MP Cost Color: 23>
* <MP Cost COlor: #00ffff>
*
* ----------------------------------------------------------------------
*
* In-combat MP regen
*
* <Hide MP Regen>
* Setting this tag on a class will prevent any between-rounds MP regen from
* popping up any numbers.  Useful mainly for classes intended to gain decent
* chunks of MP every round innately.  This will not prevent other sources of
* MP recovery from showing up though, such as items and skill effects.
*
* Additionally, Game_Battler.prototype.gainSilentMp(x) can be used to give or
* take MP from a battler without displaying numbers, thus:
* a.gainSilentMp(25)
* In a skill's formula box will give 25 mp to the actor using the skill
* without popping up any numbers.
*
* ----------------------------------------------------------------------
*
* "Recover All" functionality
*
* <Recover All HP: x>
* <Recover All MP: x>
* Affects how "Recover All" sets HP or MP, with x representing a value
* between 0 for 0% (dead) and 1 for 100% (full)
*
* ----------------------------------------------------------------------
*
* Cost Displays
* 
* This plugin also improves the appearance and clarity of skill costs
* by allowing MP and TP costs to display together for skills requiring both.
*
* Note on compatibility with Yanfly's Skill Core:
*
* This plugin overrides how Skill Core displays skill costs in the skill
* menus.  While the two plugins do so similarly, this one does not include
* the option to have icons by each resource type.  The other functionalities
* of Skill Core are unaffected.
*
* If using YEP_SkillCore's ability to give skills HP costs, this plugin 
* will display those costs for the sake of compatibility.  When used, any
* HP cost skills will perform as expected.
*
* This plugin should be placed below YEP_SkilLCore for maximum functionality,
* although if the hp/mp/tp resource icons are preferred, placing it above
* YEP_SkillCore will allow that plugin to render costs its way instead, however
* skill costs will display MP and use the specified MP color regardless of 
* any MP aliasing a given class has.
* 
* ----------------------------------------------------------------------
*
* Rage-like MP gain
*
* Actor, enemy, class, equip, and state note tags
* <Offensive MP Gain: x>
* <Offensive MP Gain: x, ...filters>
* <Defensive MP Gain: x>
* <Defensive MP Gain: x, ...filters>
*
* During battle, either using skills to deal damage or receiving damage can
* also restore X amount of MP.  Note that X is processed as an eval, so it can
* be a fixed amount per hit, vary by damage, or whatever else.  These effects
* are additive, so an actor that gains 5 MP per hit wearing a ring that gains
* 15 MP per magical hit will result in 5 mp per hit and 20 per magical hit.
*
* The eval recognizes the following parameters:  actor, damage
*
* Filters (physical, magical, certain) can be added to only generate mp
* when the matching type of attack is used.  More than one filter can be
* applied at once. (ie, physical, magical in the same tag)
*
* Actor, enemy, class, equip, state, skill, and item note tag:
* <MP Gain Modifier: X>
* 
* Can be added to apply a multiplier to the amount of MP restored.
* 
* Some sample usage:
*
* <Defensive MP Gain: 50 * damage / actor.mhp>
* This is the same formula used for generating TP by default.  The amount
* gained depends on the severity of the hit received in relation to the max
* hp of the actor taking the damage.
* 
* <Offensive MP Gain: 25 * damage / actor.mhp>
* Similar to the above, except the damage dealt by the actor generates mp
* based on how the amount vs the actor's max hp.  Basing it on the enemy's
* hp is generally a bad idea due to balance issues when dealing with really
* low or really high hp foes.
*
* <Defensive MP Gain: 15, magical>
* Gain 15 mp every time the actor takes magical damage
*
* <Defensive MP Gain: Math.randomInt(10) + 1, physical, certain>
* Gain 1-10 mp every time the actor takes physical or certain hit damage.
*
* <MP Gain Modifier: 0>
* Multiplies the result by 0, effectively preventing any mp gains.  This
* is ideal on skills that cost MP so players don't end up abusing endless
* positive-gain loops by spamming powerful skills.
*
* <MP Gain Modifier: 1.5>
* Increases all mp gains by 50%.
*
* ----------------------------------------------------------------------
*
* Recover HP/MP/Revive after each battle
*
* <After Battle Revive>
* Classes with this note tag can auto-revive after battles, regardless of
* whether or not the death state is set to be removed after combat.

* <After Battle Recover HP: x>
* <After Battle Recover MP: x>
* For HP and MP, "x" is processed as an eval so:
* <After Battle Recover MP: actor.mmp * 0.25> 
* will allow the actor affected by this note tag to recover 25% of his/her HP
* after each battle.  
* 
* This value can also be negative to take away HP or MP
* instead:
* <After Battle Recover MP: -actor.mmp>
* will set the actor's mp to 0 after each battle.
*/
(function($$)
{
	$$.pluginParameters = PluginManager.parameters("AES_CustomMP");
	$$.params = {};
	$$.params.mpGaugeColor1Default = +$$.pluginParameters["Default MP Gauge Color 1"] || 22;
	$$.params.mpGaugeColor2Default = +$$.pluginParameters["Default MP Gauge Color 2"] || 23;
	$$.params.mpCostColorDefault = +$$.pluginParameters["Default MP Cost Color"] || 23;
	$$.params.skillCostFontSize = +$$.pluginParameters["Skill Cost Font Size"] || 18;
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
	Game_BattlerBase.prototype.getTag = function(tag, deepScan=false)
	{
		var value = [];
		var isActor = this.isActor();
		var actor = isActor ? this.actor() : this.enemy();
		var equip, state;
		if ($$.tagExists.call(actor, tag)) value.push($$.getTag.call(actor, tag));
		if (deepScan)
		{
			if (isActor)
			{
				if ($$.tagExists.call($dataClasses[this._classId], tag)) value.push($$.getTag.call($dataClasses[this._classId], tag));
				equip = this.weapons().concat(this.armors());
				for (i in equip){ if ($$.tagExists.call(equip[i], tag)) value.push($$.getTag.call(equip[i], tag)); }
			}
			state = this.states();
			for (i in state){ if ($$.tagExists.call(state[i], tag)) value.push($$.getTag.call(state[i], tag)); }
		}
		return deepScan ? value : (value[0] ? value[0] : false);
	}
/**-------------------------------------------------------------------
	MP Aliasing functions
//-------------------------------------------------------------------*/
	Object.defineProperties(Game_BattlerBase.prototype,
	{
		mpName: { get: function()
		{
			var sReturn;
			if (this.isActor()) sReturn = $$.getTag.call($dataClasses[this._classId], "MP Full Name")
			else sReturn = $$.getTag.call(this.enemy(), "MP Full Name");		
			return sReturn || TextManager.mp;
		}, configurable: true },
		mpA: { get: function()
		{
			var sReturn;
			if (this.isActor()) sReturn = $$.getTag.call($dataClasses[this._classId], "MP Name")
			else sReturn = $$.getTag.call(this.enemy(), "MP Name");		
			return sReturn || TextManager.mpA;
		}, configurable: true },
	});
	Game_BattlerBase.prototype.mpCostColor = function()
	{
		var sReturn;
		if (this.isActor()) sReturn = $$.getTag.call($dataClasses[this._classId], "MP Cost Color");
		return sReturn || $$.params.mpCostColorDefault;
	}
	Game_Battler.prototype.gainSilentMp = function(value){ this.setMp(this.mp + value); }
	Game_Battler.prototype.regenerateMp = function()
	{
		var value = Math.floor(this.mmp * this.mrg);
		if (value !== 0)
		{
			if ($$.tagExists.call($dataClasses[this._classId], "Hide MP Regen")) this.gainSilentMp(value);
			else this.gainMp(value);
		}
	}
	Window_Base.prototype.mpGaugeColor1 = function(){ return this.textColor($$.params.mpGaugeColor1Default); }
	Window_Base.prototype.mpGaugeColor2 = function(){ return this.textColor($$.params.mpGaugeColor2Default); }
	Window_Base.prototype.mpGaugeColor = function(index, actor)
	{
		var sReturn = "#ffffff";
		var customColors = $$.getTag.call($dataClasses[actor._classId], "MP Gauge Color");
		var color;
		if (customColors)
		{
			customColors = customColors.split(",")[index];
			if (customColors === undefined) color = this.textColor(0);
			else color = +customColors;
			sReturn = isNaN(color) ? customColors : this.textColor(color);
			if (!sReturn) sReturn = "#000000";
		}
		else if (index == 0) sReturn = this.mpGaugeColor1();
		else if (index == 1) sReturn = this.mpGaugeColor2();
		return sReturn;
	}
	Window_Base.prototype.drawActorMp = function(actor, x, y, width)
	{
		width = width || 186;
		var color1 = this.mpGaugeColor(0, actor);
		var color2 = this.mpGaugeColor(1, actor);
		this.drawGauge(x, y, width, actor.mpRate(), color1, color2);
		this.changeTextColor(this.systemColor());
		this.drawText(actor.mpA, x, y, 44);
		this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width,
		this.mpColor(actor), this.normalColor());
	}
	Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width)
	{
		this.contents.fontSize = $$.params.skillCostFontSize;
		var text, color, dw = width;
		if (this._actor.skillTpCost(skill) > 0)
		{
			this.changeTextColor(this.tpCostColor());
			text = this._actor.skillTpCost(skill) + TextManager.tpA;
			this.drawText(text, x, y, dw, 'right');
			dw = dw - this.textWidth(text) - 4;
		}
		if (this._actor.skillMpCost(skill) > 0)
		{
			color = this._actor.mpCostColor();
			if (!isNaN(+color)) color = this.textColor(color);
			this.changeTextColor(color);
			text = this._actor.skillMpCost(skill) + this._actor.mpA;
			this.drawText(text, x, y, dw, 'right');
			dw = dw - this.textWidth(text) - 4;
		}
		if (Imported.YEP_SkillCore)
		{
			if (this._actor.skillHpCost(skill) > 0)
			{
				this.changeTextColor(this.textColor(Yanfly.Param.SCCHpTextColor));
				text = this._actor.skillHpCost(skill) + TextManager.hpA;
				this.drawText(text, x, y, dw, 'right');
				dw = dw - this.textWidth(text) - 4;
			}
		}
		this.resetFontSettings();
	}
	Window_BattleLog.prototype.makeMpDamageText = function(target)
	{
		var result = target.result();
		var damage = result.mpDamage;
		var isActor = target.isActor();
		var fmt;
		if (damage > 0 && result.drain) {
			fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
			return fmt.format(target.name(), target.mpName || TextManager.mp, damage);
		} else if (damage > 0) {
			fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
			return fmt.format(target.name(), target.mpName || TextManager.mp, damage);
		} else if (damage < 0) {
			fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
			return fmt.format(target.name(), target.mpName || TextManager.mp, -damage);
		} else {
			return '';
		}
	}
/**-------------------------------------------------------------------
	Recovery functions
//-------------------------------------------------------------------*/
	Game_BattlerBase.prototype.recoverAll = function()
	{
		this.clearStates();
		this._hp = $$.tagExists.call($dataClasses[this._classId], "Recover All HP") ? Math.floor(+$$.getTag.call($dataClasses[this._classId], "Recover All HP") * this.mhp) : this.mhp;
		this._mp = $$.tagExists.call($dataClasses[this._classId], "Recover All MP") ? Math.floor(+$$.getTag.call($dataClasses[this._classId], "Recover All MP") * this.mmp) : this.mmp;
		this.refresh();
	}
	$$.Game_Battler_removeBattleStates = Game_Battler.prototype.removeBattleStates;
	Game_Battler.prototype.removeBattleStates = function()
	{
		var hpFormulaList, mpFormulaList;
		var actor = this;
		if (actor.isDead() && actor.getTag("After Battle Revive", true).length > 0) actor.removeState(1);
		$$.Game_Battler_removeBattleStates.call(this);
		hpFormulaList = actor.getTag("After Battle Recover HP", true);
		mpFormulaList = actor.getTag("After Battle Recover MP", true);
		if (!actor.isStateAffected(1))
		{
			for (i in hpFormulaList) actor.gainHp(Math.floor(+eval(hpFormulaList[i])) || 0);
			for (i in mpFormulaList) actor.gainMp(Math.floor(+eval(mpFormulaList[i])) || 0);
			actor.refresh();
		}
	}
/**-------------------------------------------------------------------
	Action-based MP gain functions
//-------------------------------------------------------------------*/
	Game_Battler.prototype.chargeMpByDamage = function(damage, gainTypeTag, hitType, skillModifier=1)
	{
		var offensiveGainList = this.getTag(gainTypeTag, true);
		var modifierList = this.getTag("MP Gain Modifier", true);
		var result = 0;
		var multiplier = 1;
		var actor = this;
		var hitList = ["certain", "physical", "magical"];
		var current, formula;
		for (i in offensiveGainList)
		{
			current = offensiveGainList[i].split(",");
			formula = current.shift();
			if (current.length === 0 || current.join(" ").search(hitList[hitType]) > -1)
			{
				result += +eval(formula) || 0;
				console.log(actor.name() + " - " + gainTypeTag + ": " + result);
			}
		}
		for (i in modifierList)
		{
			multiplier = +eval(modifierList[i]);
			if (isNaN(multiplier)) multiplier = 1;
			result *= multiplier;
		}
		result = Math.floor(result * skillModifier);
		if (result)
		{
			if (this.isActor())
			{
				if ($$.tagExists.call($dataClasses[this._classId], "Hide MP Regen")) this.gainSilentMp(result);
				else this.gainMp(result);
			}
			else
			{
				if ($$.tagExists.call(this.enemy(), "Hide MP Regen")) this.gainSilentMp(result);
				else this.gainMp(result);
			}
		}
	}
	$$.Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage
	Game_Action.prototype.executeHpDamage = function(target, value)
	{
		$$.Game_Action_executeHpDamage.call(this, target, value);
		var item = this.item();
		var subject = this.subject();
		var skillModifier = $$.tagExists.call(item, "MP Gain Modifier") ? +eval($$.getTag.call(item, "MP Gain Modifier")) : 1;
		if (isNaN(skillModifier)) skillModifier = 1;
		if (value > 0)
		{
			subject.chargeMpByDamage(value, "Offensive MP Gain", item.hitType, skillModifier);
			target.chargeMpByDamage(value, "Defensive MP Gain", item.hitType, skillModifier);
		}
	}	
})(Aesica.CMP);