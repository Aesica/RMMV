var Imported = Imported || {};
Imported.AES_BattleCore = true;
var Aesica = Aesica || {};
Aesica.BattleCore = Aesica.BattleCore || {};
Aesica.BattleCore.version = 1.5;
/*:
* @plugindesc v1.5 Contains several enhancements for various combat aspects of RMMV.
*
* @author Aesica
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
* @param Critical Hit Multiplier
* @parent Combat Formulas
* @desc Critical hit multiplier.  Default: 3
* @type number
* @min 0
* @default 3
*
* @param Initial TP
* @parent Combat Formulas
* @desc Initial TP on battle start when TP is not preserved.  Processed as an eval.  Default: Math.randomInt(25)
* @type text
* @default Math.randomInt(25)
*
* @param Battle End Effects
* @desc Use after-battle effects provided by this plugin?
* @type boolean
* @on Enable
* @off Disable
* @default true
*
* @param Heal HP
* @parent Battle End Effects
* @desc HP healed to living members after each battle.  This is an eval (actor.mhp, etc).  Default: 0
* @type text
* @default 0
*
* @param Recover MP
* @parent Battle End Effects
* @desc MP recovered for living members after each battle.  This is an eval (actor.mmp * 0.25, etc).  Default: 0
* @type text
* @default 0
*
* @help
* For terms of use, see:  https://github.com/Aesica/RMMV/blob/master/README.md
*
* IMPORTANT NOTE: A few note tags in this plugin allow you to use eval formulas.
* Using greater-than (>) will close the tag, ignoring the rest of your formula. 
* So instead of something like user.tp > 50, use 50 < user.tp which is
* fundamentally the same thing.
*
* Affected note tags:  <Unleash Attack: x, y>
*
* List of crap this plugin can do:
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
* <Replace Attack: x>
* Will replace the Attack command with the skill having id number x.  This note
* tag can be placed on actors, classes, weapons, and states to replace the
* attack command with another skill.
*
* <Unleash Attack: x, y // x2, y2 // ...etc>
* Using a basic attack has a chance to use the specified skill.
* x represent a skill id and y represent the chance for that skill to activate
* instead of the normal attack skill.  This chance is a value between 0
* (0% chance) and 1 (100% chance) and can be expressed as an eval.  The eval
* code has acces to the user and any related stats (user.hp, etc).  Multiple
* unleash skills can be set by separating id/chance pairs with a double-slash.
* A few examples:
* <Unleash Attack: 5, 0.1 // 9, 0.25>          // 10%: skill 5, 25%: skill 9
* <Unleash Attack: 15, 1 - user.hp / user.mhp> // higher chance with lower hp
* <Unleash Attack: 17, 50 <= user.tp>          // used if user's tp is 50+
* <Unleash Attack: 21, user.hp < 20 ? 1 : 0>   // 100% if user hp below 20
*
* <Unleash Modifier: x>
* This is a multiplier applied to the chance for unleash attacks to trigger.
* So <Unleash Modifier: 2> will double the chance of unleashing a special
* attack.  This can be placed on actors/enemies, classes, equips, and states.
*
* <Guard State: x, y, ...z>
* When a battler uses guard, the target (usually the user) will be affected
* by the specified state(s).  This tag applies to actors/enemies, classes,
* equips, and states.
*
* <Guard State All: x, y, ...z>
* Same as <Guard State> but applies the state(s) to all allies of the target.
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
* <Critical Bonus: n>
* In addition to being able to change the default critical modifier, individual
* actors/enemies, classes, equipment, states, or skills can further adjust this
* using note tags.  For example, <Critical Bonus: 1.5> will multiply the damage
* of a critical hit by 1.5 in addition to the default critical bonus.
*
* Unarmed Weapon Value
* This is the value that will be returned by the weaponStat functions described
* below if no weapon is equipped.  Since it gets processed as an eval, it can
* also be a formula.  To reference the battler, use 'this' so for example if the
* actor's atk is 14:
*
* this.atk * 2 // Result: 28
*
* To reference the stat being queried, use 'stat' so if a.weaponAtk is called,
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
* Aesica.Core.damage(a.value, multiplier, b.value, optionalVariance)
* Where a.value is a.atk, a.mat, etc and b.value is b.def, b.mdf, etc. The
* multiplier value is typically used by various skills to make them stronger
* (or weaker).  If left blank, multiplier defaults to 1 and b.value defaults
* to 0.  The variance value is optional and only really useful if you don't
* intend to use the editor's damage variance field.
*
* Aesica.Core.heal(a.value, multiplier, b.value, optionalVariance)
* Similar to the above, however you may want to use a different unified
* formula for healing.  The variance value is optional and only really useful
* if you don't intend to use the editor's damage variance field.
*
* Aesica.Core.gravity(b, magnitude)
* For FF-style "gravity" attacks which deal a percent of the target's current
* HP based on the specified multiplier.  So Aesica.Core.gravity(b, 0.5) would
* return 50% of the target's current hp.  The <Immunme to Gravity> note tag
* can be used to make the target immune (return value 0). This tag can be
* placed on actors, enemies, classes, states, or equipment.  Note:  Be sure
* to set the damage formula box's "Variance" field to 0%.
*
* Aesica.Core.variance(n)
* Allows you to apply a variance to a damage or healing result, although in 
* most cases, this is done for you via the formula box
*
* Game_BattlerBase.prototype.weaponMhp
* Game_BattlerBase.prototype.weaponMmp
* Game_BattlerBase.prototype.weaponAtk
* Game_BattlerBase.prototype.weaponDef
* Game_BattlerBase.prototype.weaponMat
* Game_BattlerBase.prototype.weaponMdf
* Game_BattlerBase.prototype.weaponAgi
* Game_BattlerBase.prototype.weaponLuk
* Retrieves the specified stat from the battler's equipped weapon (or weapons)
* for use in formulas that only factor in weapon strength, which can be used
* in damage formulas.  For example:  a.weaponAtk * 5 - b.def
* If the battler is an enemy, it returns their associated base parameter 
* instead since enemies don't use weapons
*
* Game_BattlerBase.prototype.weaponStat(statID)
* Same as above, but allows the stat to be referenced by its ID.  Examples:
* a.weaponStat(2) // same as a.weaponAtk
* a.weaponStat(4) // same as a.weaponMat
*
* Game_BattlerBase.prototype.tagStat(tag)
* Allows the reading of extra quasi-stats set via note tags.  The following
* note tags are used on enemies, actors, classes, equips, and states:
* <Stat Base x: y>
* <Stat Growth x: y>
* <Stat Bonus x: y>
* Where x is the name of the stat and y is the value.
* - Base: This is a base value, and is added to other base values
* - Growth: This value scales with level to simulate stat growth (y * level)
* - Bonus: This value is a multiplier (1.5, 0.8, etc)
* The formula is (base + growth) * bonus
* Examples:
* <Stat Base Charisma: 10>
* <Stat Growth Charisma: 0.8>
* <Stat Bonus Charisma: 0.5>
*
* Game_BattlerBase.prototype.anyStateAffected(1, 3, 27, ...etc)
* Returns true if the specified battler has ANY of the listed states.  Examples:
* a.anyStateAffected(3, 14)
* b.anyStateAffected(27, 28, 29, 41, 47)
*
* Game_BattlerBase.prototype.allStateAffected(1, 3, 27, ...etc)
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
* // 1000 fixed damage (doing fixed damage this way is not necessary)
* 
* Aesica.Core.heal(a.mat, 3)
* // uses the healing formula from the plugin parameters to combine a.mat with
* // a multiplier of 3
* 
* Aesica.Core.damage(a.weaponAtk, 10, b.def)
* // Applies a's WEAPON ATK total to a multiplier of 10 and checks it against
* // b.def
*
* Aesica.Core.damage(a.tagStat("Telepathy"), 8, b.tagStat("Willpower"));
* // Deals damage based on the user's Telepathy tag stat with a multiplier of
* // 8 vs the target's Willpower tag stat.  See the tagStat section for
* // additional details
*
* Aesica.Core.gravity(b, 0.5)
* // 50% of the target's hp, or 0 if affected by <Immune to Gravity>
*
* Aesica.Core.gravity(b, 0.75) || Aesica.Core.damage(a.mat, 3, b.mdf, 0.2)
* // 75% of the target's hp, or if <Immune to Gravity, uses the plugin
* // paramter damage formula with a multiplier of 3 and damage variance of
* // 20% (since you want the formula box's varianace set to 0%)
*
* b.anyStateAffected(9, 10) ? 500 : 1
* // If b is affected by either state 9 or state 10, deal 500 damage.  Otherwise
* // only deal 1 damage.
*
* b.allStateAffected(4, 5, 6, 7, 8, 9, 10) ? 5000 : 1
* // If b is affected by state 4, 5, 6, 7, 8, 9, AND 10, deal 5000 damage.
* // Otherwise only deal 1 damage.
*/
(function($$)
{
	$$.pluginParameters = PluginManager.parameters("AES_BattleCore");
	$$.params = {};
	$$.params.section = {};
	$$.params.section.battleCommands = String($$.pluginParameters["Battle Commands"]).toLowerCase() === "false" ? false : true;
	$$.params.section.combatFormulas = String($$.pluginParameters["Combat Formulas"]).toLowerCase() === "false" ? false : true;
	$$.params.section.battleEndEffects = String($$.pluginParameters["Battle End Effects"]).toLowerCase() === "false" ? false : true;
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
	$$.params.critMultiplier = +$$.pluginParameters["Critical Hit Multiplier"] || 0;
	$$.params.initialTP = String($$.pluginParameters["Initial TP"]);
	$$.params.battleEndHeal = String($$.pluginParameters["Heal HP"]);
	$$.params.battleEndRefresh = String($$.pluginParameters["Recover MP"]);
/**-------------------------------------------------------------------	
	Note tag and utility functions
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
	Damage/Healing formulas and Battler functions
//-------------------------------------------------------------------*/	
	if ($$.params.section.combatFormulas)
	{
		$$.damage = function(attack, multiplier=null, defense=null, variance=0)
		{
			var iReturn = 0;
			var userStat = 0;
			var targetStat = 0;
			var iLength;
			if (Array.isArray(attack))
			{
				iLength = attack.length;
				for (i in attack){ userStat += attack[i]; }
				userStat = Math.round(userStat / iLength);
			}
			else userStat = attack;
			if (Array.isArray(defense))
			{
				iLength = defense.length;
				for (i in defense){ targetStat += defense[i]; }
				targetStat = Math.round(targetStat / iLength);
			}
			else targetStat = isNaN(defense) ? 0 : defense;
			multiplier = isNaN(multiplier) ? 1 : multiplier;
			iReturn = eval($$.params.damageFormula) || 0;
			return $$.variance(iReturn, variance);
		}
		$$.heal = function(attack, multiplier=null, defense=null, variance=0)
		{
			var iReturn = 0;
			var userStat = 0;
			var targetStat = 0;
			var i, iLength;
			if (Array.isArray(attack))
			{
				iLength = attack.length;
				for (i in attack){ userStat += attack[i]; }
				userStat = Math.round(userStat / iLength);
			}
			else userStat = attack;
			if (Array.isArray(defense))
			{
				iLength = defense.length;
				for (i in defense){ targetStat += defense[i]; }
				targetStat = Math.round(targetStat / iLength);
			}
			else targetStat = isNaN(defense) ? 0 : defense;
			multiplier = isNaN(multiplier) ? 1 : multiplier;
			iReturn = eval($$.params.healingFormula) || 0;
			return $$.variance(iReturn, variance);
		}
		$$.gravity = function(b, magnitude)
		{
			var tag = "Immune to Gravity";
			var target = b.isEnemy() ? b.enemy() : b.actor();
			var temp;
			var bImmune = false;
			// actor/enemy
			if ($$.tagExists.call(target, "immune to gravity")) bImmune = true;
			// states
			temp = b.states();
			for (i in temp){ if ($$.tagExists.call(temp[i], tag)) bImmune = true; }
			if (b.isActor() && !bImmune)
			{
				// equips
				temp = b.weapons().concat(b.armors());
				for (i in temp){ if ($$.tagExists.call(temp[i], tag)) bImmune = true; }
				// class
				if ($$.tagExists.call($dataClasses[b._classId], tag)) bImmune = true;
			}
			return bImmune ? 0 : b.hp * magnitude;
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
		Game_Action.prototype.applyCritical = function(damage)
		{
			var iReturn = damage * $$.params.critMultiplier;
			var subject = this.subject();
			var subjectData;
			var equips, states;
			if (subject.isActor())
			{
				iReturn *= +$$.getTag.call($dataClasses[subject._classId], "Critical Bonus") || 1;
				equips = subject.weapons().concat(subject.armors());
				for (i in equips){ iReturn *= +$$.getTag.call(equips[i], "Critical Bonus") || 1; }
				subjectData = subject.actor();
			}
			else subjectData = subject.enemy();
			iReturn *= +$$.getTag.call(subjectData, "Critical Bonus") || 1;
			iReturn *= +$$.getTag.call(this.item(), "Critical Bonus") || 1;
			states = subject.states();
			for (i in states){ iReturn *= +$$.getTag.call(states[i], "Critical Bonus") || 1; }
			return iReturn;
		}
		Object.defineProperties(Game_BattlerBase.prototype,
		{
			weaponMhp: { get: function(){ return this.weaponStat(0); }, configurable: true },
			weaponMmp: { get: function(){ return this.weaponStat(1); }, configurable: true },
			weaponAtk: { get: function(){ return this.weaponStat(2); }, configurable: true },
			weaponDef: { get: function(){ return this.weaponStat(3); }, configurable: true },
			weaponMat: { get: function(){ return this.weaponStat(4); }, configurable: true },
			weaponMdf: { get: function(){ return this.weaponStat(5); }, configurable: true },
			weaponAgi: { get: function(){ return this.weaponStat(6); }, configurable: true },
			weaponLuk: { get: function(){ return this.weaponStat(7); }, configurable: true },
		});		
		Game_BattlerBase.prototype.weaponStat = function(statId)
		{
			var params = ["mhp","mmp","atk","def","mat","mdf","agi","luk"];
			var weapons, iReturn = 0;
			var stat = this[params[statId]];
			if (this.isActor())
			{
				weapons = this.weapons();
				if (weapons.length < 1) iReturn = eval($$.params.unarmedValue);
				else
				{
					for (i in weapons)
					{
						iReturn += weapons[i].params[statId];
						if (Imported.YEP_EquipCore) iReturn += this.evalParamPlus(weapons[i], statId);
					}
				}
			}
			else iReturn = stat;
			return Math.round(iReturn);
		}
		Game_BattlerBase.prototype.weaponTagStat = function(tag)
		{
			var iReturn = 0;
			var weapons = this.weapons();
			for (i in weapons) iReturn += +$$.getTag.call(weapons[i], tag) || 0;
			return iReturn;
		}
		Game_BattlerBase.prototype.anyStateAffected = function(...states)
		{
			var bReturn = false;
			for (i in states)
			{
				bReturn = this.isStateAffected(states[i]);
				if (bReturn) break;
			}
			return bReturn;
		}
		Game_BattlerBase.prototype.allStateAffected = function(...states)
		{
			var iReturn = 0;
			for (i in states){ if (this.isStateAffected(states[i])) iReturn++; }
			return iReturn == iLength;
		}
		Game_BattlerBase.prototype.tagStat = function(stat)
		{
			var base = 0;
			var growth = 0;
			var bonus = 1;
			var obj = {"base":0,"growth":0,"bonus":1};
			var level;
			var list;
			if (this.isActor())
			{
				level = this.level;
				// actor
				$$.buildTagStatData.call(this.actor(), stat, obj);
				// class
				$$.buildTagStatData.call($dataClasses[this._classId], stat, obj);
				// equips
				list = this.weapons().concat(this.armors());
				for (i in list){ $$.buildTagStatData.call(list[i], stat, obj); }
			}
			else
			{
				level = 1;
				// enemy
				$$.buildTagStatData.call(this.enemy(), stat, obj);
			}
			// states
			list = this.states();
			for (i in list){ $$.buildTagStatData.call(list[i], stat, obj); }
			return Math.floor((obj.base + obj.growth * level) * obj.bonus);
		}
		$$.buildTagStatData = function(statName, statObj)
		{
			statObj.base += +$$.getTag.call(this, "Stat Base " + statName) || 0;
			statObj.growth += +$$.getTag.call(this, "Stat Growth " + statName) || 0;
			statObj.bonus *= $$.tagExists.call(this, "Stat Bonus " + statName) ? +$$.getTag.call(this, "Stat Bonus " + statName) : 1;
		}
		Game_Battler.prototype.initTp = function()
		{
			var tpValue;
			try
			{
				tpValue = +eval($$.params.initialTP) || 0;
			}
			catch(e)
			{
				console.log("Eval error in Aesica.Core - Initial TP Plugin Parameter");
			}
			this.setTp(tpValue);
		}
	}
/**-------------------------------------------------------------------	
	Static command control - Attack, Guard, Item, Limit Breaks,
	Attack replacers, and Guard state bonuses
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
		$$.Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
		Game_Action.prototype.applyItemUserEffect = function(target)
		{
			$$.Game_Action_applyItemUserEffect.call(this, target);
			if (this.isGuard()) $$.applyGuardBonusStates.call(this, target);
		}
		$$.applyGuardBonusStates = function(target)
		{
			var user = this.subject();
			var stateId = "Guard State";
			var stateAllId = "Guard State All";
			var stateList = [];
			var stateListAll = [];
			var equips, states, x, targetParty = target.friendsUnit().members();
			if (user.isActor())
			{
				if ($$.tagExists.call(user.actor(), stateId)) stateList = stateList.concat($$.getTag.call(user.actor(), stateId).split(","));
				if ($$.tagExists.call(user.actor(), stateAllId)) stateListAll = stateListAll.concat($$.getTag.call(user.actor(), stateAllId).split(","));
				if ($$.tagExists.call(user.currentClass(), stateId)) stateList = stateList.concat($$.getTag.call(user.currentClass(), stateId).split(","));
				if ($$.tagExists.call(user.currentClass(), stateAllId)) stateListAll = stateListAll.concat($$.getTag.call(user.currentClass(), stateAllId).split(","));
				equips = user.weapons().concat(user.armors());
				for (i in equips)
				{
					if ($$.tagExists.call(equips[i], stateId)) stateList = stateList.concat($$.getTag.call(equips[i], stateId).split(","));
					if ($$.tagExists.call(equips[i], stateAllId)) stateListAll = stateListAll.concat($$.getTag.call(equips[i], stateAllId).split(","));
				}
			}
			else
			{
				if ($$.tagExists.call(user.enemy(), stateId)) stateList = stateList.concat($$.getTag.call(user.enemy(), stateId).split(","));
				if ($$.tagExists.call(user.enemy(), stateAllId)) stateListAll = stateListAll.concat($$.getTag.call(user.enemy(), stateAllId).split(","));
			}
			states = user.states();
			for (i in states)
			{
				if ($$.tagExists.call(states[i], stateId)) stateList = stateList.concat($$.getTag.call(states[i], stateId).split(","));
				if ($$.tagExists.call(states[i], stateAllId)) stateListAll = stateListAll.concat($$.getTag.call(states[i], stateAllId).split(","));
			}
			for (i in stateList)
			{
				x = +stateList[i];
				if (x) target.addState(x);
			}				
			for (i in stateListAll)
			{
				x = +stateListAll[i];
				if (x) for (j in targetParty) targetParty[j].addState(x);
			}
		}
		Window_ActorCommand.prototype.addLimitCommand = function()
		{
			this.addCommand($dataSystem.skillTypes[$$.params.limitCommand], 'skill', true, $$.params.limitCommand);
		}
	}
/**-------------------------------------------------------------------	
	Skill Unleash
//-------------------------------------------------------------------*/
	$$.BattleManager_startAction = BattleManager.startAction;
	BattleManager.startAction = function()
	{
		var subject = this._subject;
		var action = subject ? subject.currentAction() : null;
		if (action) action.attemptUnleash();
		$$.BattleManager_startAction.call(this);
	}
	Game_Battler.prototype.unleashModifier = function()
	{
		var result = 1;
		var modifierList = this.getTag("Unleash Modifier", true);
		for (i in modifierList) result *= +modifierList[i] || 1;
		return result;
	}
	Game_Action.prototype.attemptUnleash = function()
	{
		var user = this.subject();
		var item = this.item();
		var id, newId, unleashList, current, pair, modifier, rng, rawEval, currentId, currentEval;
		if (user && item && this.isSkill())
		{
			if (user && item)
			{
				id = newId = item.id;
				if (id === user.attackSkillId())
				{
					unleashList = user.getTag("Unleash Attack", true);
					unleashList.reverse();
					modifier = user.unleashModifier();
					rng = Math.random();
					for (i in unleashList)
					{
						current = unleashList[i].split("//");
						console.log(current);
						for (j in current)
						{
							pair = current[j].split(",");
							currentId = +pair.shift() || 1;
							rawEval = pair.join(",");
							try
							{
								currentEval = +eval(rawEval) || 0;
							}
							catch(e)
							{
								console.log("AES_BattleCore: Eval error in <Unleash Attack> => " + rawEval);
								currentEval = 0;
							}
							newId = (rng < currentEval * modifier) ? currentId : id;
							if (newId !== id) break;
						}
						if (newId !== id) break;
					}
					this.setSkill(newId);
				}
			}
		}
	}
/**-------------------------------------------------------------------	
	Battle end effects (heal hp/mp)
//-------------------------------------------------------------------*/
	if ($$.params.section.battleEndEffects)
	{
		$$.Game_Battler_removeBattleStates = Game_Battler.prototype.removeBattleStates;
		Game_Battler.prototype.removeBattleStates = function()
		{
			$$.Game_Battler_removeBattleStates.call(this);
			var actor = this;
			if (!actor.isStateAffected(1))
			{
				actor.gainHp(Math.floor(+eval($$.params.battleEndHeal)) || 0);
				actor.gainMp(Math.floor(+eval($$.params.battleEndRefresh)) || 0);
			}
			actor.refresh();
		}
	}
})(Aesica.BattleCore);