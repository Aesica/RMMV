var Imported = Imported || {};
Imported.AES_BattleCore = true;
var Aesica = Aesica || {};
Aesica.BattleCore = Aesica.BattleCore || {};
Aesica.BattleCore.version = 2.2;
Aesica.Toolkit = Aesica.Toolkit || {};
Aesica.Toolkit.battleCoreVersion = 1.4;
/*:
* @plugindesc v2.1 Contains several enhancements for various combat aspects of RMMV.
*
* @author Aesica
*
* @param Improved Skill Sorting
* @desc Enable the sorting of temporary skills (added by equips, states, etc) in with baseline skills?
* @type boolean
* @on Enable
* @off Disable
* @default false
*
* @param Skill Sort Property
* @parent Improved Skill Sorting
* @desc Skill property (id, name, etc) used to determine sort order.  Default: id
* @default id
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
* @desc Damage formula eval used by Aesica.BattleCore.damage().  See plugin description for more info.
* @type text
* @default userStat * multiplier - targetStat * 2
*
* @param Healing Formula
* @parent Combat Formulas
* @desc Healing formula eval used by Aesica.BattleCore.heal().  See plugin description for more info.
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
* @decimals 2
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
* @param Extra Death States
* @desc List of "game over" states besides 1.  Separate multiple state IDs with a comma:  42, 43, 666
* @type text
*
* @param Auto-Apply Zone Effects
* @desc If enabled, automatically applies Zone Effects (if any) to targets each turn during battle.
* @type boolean
* @on Enable
* @off Disable
* @default true
* 
* @param Battle Log Customization
* @desc Enable the battle log customizations provided by this plugin?
* @type boolean
* @on  Enable
* @off Disable
* @default true
*
* @param Battle Log BG Color
* @parent Battle Log Customization 
* @desc Customize the color of the battle log window: #RRGGBB
* @type text
* @default #000000
*
* @param Battle Log BG Opacity
* @parent Battle Log Customization 
* @desc Customize the color of the battle log window: 0-255
* @type number
* @default 64
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
* There's also a list-based note tag syntax used by some functions that
* consists of key/value pairs and multiple lines:
* <People>
* name: "Aesica" job: "Programmer"
* name: "Acisea" job: "Evil Twin"
* </People>
*
* Multiple groups of parameter sets in this format are separated by a
* linebreak.  Also, the order each parameter appears in does not matter, and
* certain parameters can be omitted entirely when specified:
* <Pets>
* name: "Fido" pet: "Dog"
* pet: "Cat" name: "Socks"
* pet: "Potato"
* </Pets>
*
* Double quotes are required for parameter values, thus:
* name: "Aesica"> // Good
* name: 'Aesica'> // Not parsed
* name: Aesica>   // not parsed
*
* List of crap this plugin can do:
*
* ----------------------------------------------------------------------
*
* Zone Effects
* Certain zones can have effects associated with them that can be applied to
* the party, the enemies, or both indiscriminately.  They can be set to either
* be applied automatically each turn during battle or applied manually in or
* out of battle by using the following plugin command:
*
* ApplyZoneEffects
* 
* This applies zone-specific effects to the target group, optionally filtered
* by custom note tags present on each target.  Tags such as <Metal Armor> can
* be used to apply a state like "Magnetize" and deal damage to each target the
* tag is found on.  Tags are searched for in actors, enemies, classes, weapons,
* armors, and states.
*
* Note that each zone can have multiple effects, with each group of effects
* being separated by a line break.  The value for each property must be 
* enclosed in double quotes (")
*
* To set zone effects for a particular zone, apply the following note tag
* to the zone's note box:
*
* <Zone Effect>
* paramSet1
* paramSet2
* ...etc
* </Zone Effect>
*
* Replace "paramSetn" with one or more of the following parameters:
*
* state:  The list of state IDs to apply.  Separate multiple states with
* commas.  If omitted, no states are applied
*
* damage:  Deals a specified amount of damage to each affected target.  This
* is processed as an eval.  The value "target" references the current target,
* so target.mdf or target.mhp etc.  If omitted, no damage is dealt.  You can
* give this damage elemental properties by adding target.elementRate(elementId)
* an/dor physical/magical damage properties by adding target.pdr or
* target.mdr, to your equation respectively.  See the examples below for details.
*
* animation:  The animation effect to apply, if any.  Omit this property
* for no animation.  Note that damage, states, and animations are all applied
* instantly at the same time, so keep your animations short.
* 
* target:  This can be either "party" or "troop" to specifically target
* one side or the other, or it can be omitted to target all sides.  If
* invoked outside of battle, obviously the troop portion will be ignored.
*
* weakness:  A note tag that must be present on a target before the effect
* can be applied to them.  This note tag can be placed on actors, enemies,
* classes, equips, and states.  If omitted, every unit in the target
* party/parties will be affected.
*
* immune:  A note tag that cannot be present on a target for the effect
* to be applied to them.  This note tag can be placed on actors, enemies,
* classes, equips, and states.  This property can be omitted if no special
* immunity effects/items/etc apply.
*
* Multiple groups of states/conditions/animations can be separated by a
* line break
*
* Example uses:
*
* <Zone Effect>
* damage: "(500 - target.mdf) * target.elementRate(2)"
* </Zone Effect>
* Deals 500 damage to all targets, reduced by their mdf and adjusted by
* their element rate for element ID 2.
*
* <Zone Effect>
* damage: "100 * target.mdr"
* </Zone Effect>
* Deals 100 damage to the target that is modified by the target's magical
* damage rate.
*
* <Zone Effect>
* state: "5"
* </Zone Effect>
* Applies state 5 to all targets.
*
* <Zone Effect>
* state: "5" target: "party"
* </Zone Effect>
* Applies state 5 to the party side only.
*
* <Zone Effect>
* state: "1" immune: "Oxygen Tank">
* </Zone Effect>
* Kills all target without an <Oxygen Tank> note tag.
*
* <Zone Effect>
* animation: "23" target:"party"
* </Zone Effect>
* Plays animation 23 on the party when invoked, nothing more.
*
* <Zone Effect>
* state: "5, 6" weakness: "Metallic Armor"
* </Zone Effect>
* Applies states 5 and 6 to any target with the <Metallic Armor> tag.
*
* <Zone Effect
* state: "5" animation: "23"
* state: "7" immune: "Blessing"
* </Zone Effect>
* Applies state 5 to all targets and plays animation 23 on each, and any
* target without the <Blessing> note tag will also be affected by state 7.
* 
* <Zone Effect
* state: "5" target: "troop"
* </Zone Effect>
*   -or-
* <Zone Effect
* target: "troop" states: "5"
* </Zone Effect>
* Both are exactly the same and will apply state 5 to the enemy side only.
* 
* ----------------------------------------------------------------------
*
* <Hide Combat Text>
* This note tag can be added to skills to hide the initial-use combat text,
* or the skill name if using a plugin like YEP_BattleEngineCore.  Pretty
* straightforward.
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
* <Damage Min: x>
* <Damage Max: x>
* <Break Damage Cap>
* Allows you to set minimum and maximum damage caps.  For example, if you want
* all attacks to deal at least 1 point of damage, but no more than 9999 damage,
* you can use these settings and note tags to achieve that.  The note tags can
* be placed on actors/enemies, classes, equips, and states.  The highest value
* for min and max gets priority... xxx
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
* Aesica.BattleCore.damage(a.value, multiplier, b.value, optionalVariance)
* Where a.value is a.atk, a.mat, etc and b.value is b.def, b.mdf, etc. The
* multiplier value is typically used by various skills to make them stronger
* (or weaker).  If left blank, multiplier defaults to 1 and b.value defaults
* to 0.  The variance value is optional and only really useful if you don't
* intend to use the editor's damage variance field.
*
* Aesica.BattleCore.heal(a.value, multiplier, b.value, optionalVariance)
* Similar to the above, however you may want to use a different unified
* formula for healing.  The variance value is optional and only really useful
* if you don't intend to use the editor's damage variance field.
*
* Aesica.BattleCore.gravity(b, magnitude)
* For FF-style "gravity" attacks which deal a percent of the target's current
* HP based on the specified multiplier.  So Aesica.BattleCore.gravity(b, 0.5) would
* return 50% of the target's current hp.  The <Immunme to Gravity> note tag
* can be used to make the target immune (return value 0). This tag can be
* placed on actors, enemies, classes, states, or equipment.  Note:  Be sure
* to set the damage formula box's "Variance" field to 0%.
*
* Aesica.BattleCore.variance(n)
* Allows you to apply a variance to a damage or healing result, although in 
* most cases, this is done for you via the formula box
*
* Game_BattlerBase.prototype.incrementState(n)
* If the target is affected by state n, it will be switched to the state specified
* in the note tag <Next State: x> if it exists.
* 
* Game_BattlerBase.prototype.incrementStates(...stateIds)
* Cycles through a battler's states, and any specified in the stateIds list with
* the note tag <Next State: x> will be switched to the specified state.  If no
* stateids are specified, then all states currently on the battler will be checked.
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
* Game_Unit.prototype.numAnyStateAffected(1, 2, 3, 27, ...etc)
* Returns the number of battlers in the specified unit affected by any of the
* listed states.  Examples:
* $gameParty.numAnyStateAffected(2, 3, 5)
* $gameTroop.numAnyStateAffected(8, 9)
*
* Game_Unit.prototype.numAllStateAffected(1, 2, 3, 27, ...etc)
* Returns the number of battlers in the specified unit affected by all of the
* listed states.  Examples:
* $gameParty.numAllStateAffected(2, 3, 5)
* $gameTroop.numAllStateAffected(8, 9)
*
* Here's some sample damage formula box applications of these various functions:
*
* Aesica.BattleCore.damage(a.atk, 5, b.def)
* // uses the damage formula from the plugin parameters to check a.atk with
* // a multiplier of 5 vs b.def
*
* Aesica.BattleCore.damage(1000, 1, b.mdf)
* // checks 1000 damage against b.mdf
*
* Aesica.BattleCore.damage(1000)
* // 1000 fixed damage (doing fixed damage this way is not necessary)
* 
* Aesica.BattleCore.heal(a.mat, 3)
* // uses the healing formula from the plugin parameters to combine a.mat with
* // a multiplier of 3
* 
* Aesica.BattleCore.damage(a.weaponAtk, 10, b.def)
* // Applies a's WEAPON ATK total to a multiplier of 10 and checks it against
* // b.def
*
* Aesica.BattleCore.damage(a.tagStat("Telepathy"), 8, b.tagStat("Willpower"));
* // Deals damage based on the user's Telepathy tag stat with a multiplier of
* // 8 vs the target's Willpower tag stat.  See the tagStat section for
* // additional details
*
* Aesica.BattleCore.gravity(b, 0.5)
* // 50% of the target's hp, or 0 if affected by <Immune to Gravity>
*
* Aesica.BattleCore.gravity(b, 0.75) || Aesica.BattleCore.damage(a.mat, 3, b.mdf, 0.2)
* // 75% of the target's hp, or if <Immune to Gravity>, uses the plugin
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
*
* b.incrementStates()
* // Cycles through b's states, and if any have a note tag indicating a next state:
* // <Next State: n>
* // Then that state will be removed and replaced by state n.
*
* b.incrementStates(12, 13)
* // States 12 and 13 (if either or both are present) will be replaced by whatever
* // state is specified in their note tags:
* // <Next State: 22> (on state 12, will be replaced by state 22)
* // <Next State: 23> (on state 13, will be replaced by state 23)
* // <Next State: 24> (on state 14, will not be replaced since it wasn't in the 
* //   stateIds list)
*/
(function($$)
{
	$$.pluginParameters = PluginManager.parameters("AES_BattleCore");
	$$.params = {};
	$$.params.section = {};
	$$.params.section.combatFormulas = String($$.pluginParameters["Combat Formulas"]).toLowerCase() === "false" ? false : true;
	$$.params.section.battleEndEffects = String($$.pluginParameters["Battle End Effects"]).toLowerCase() === "false" ? false : true;
	$$.params.section.battleLogCustomization = String($$.pluginParameters["Battle Log Customization"]).toLowerCase() === "false" ? false : true;
	$$.params.damageFormula = String($$.pluginParameters["Damage Formula"]);
	$$.params.healingFormula = String($$.pluginParameters["Healing Formula"]);
	$$.params.minDamage = +$$.pluginParameters["Minimum Damage"] || 0;
	$$.params.maxDamage = +$$.pluginParameters["Maximum Damage"] || 0;
	$$.params.unarmedValue = $$.pluginParameters["Unarmed Weapon Value"];
	$$.params.critMultiplier = +$$.pluginParameters["Critical Hit Multiplier"] || 0;
	$$.params.initialTP = String($$.pluginParameters["Initial TP"]);
	$$.params.battleEndHeal = String($$.pluginParameters["Heal HP"]);
	$$.params.battleEndRefresh = String($$.pluginParameters["Recover MP"]);
	$$.params.improvedSkillSorting = String($$.pluginParameters["Improved Skill Sorting"]).toLowerCase() === "false" ? false : true;
	$$.params.skillSortProperty = String($$.pluginParameters["Skill Sort Property"]);
	$$.params.extraDeathStates = (function(s){ return s.replace(/ /g, "") == "" ? [] : s.split(",").map(x => +x || 1); })(String($$.pluginParameters["Extra Death States"]));
	$$.params.autoApplyZoneEffects = String($$.pluginParameters["Auto-Apply Zone Effects"]).toLowerCase() === "false" ? false : true;
	$$.params.battleLogBackgroundColor = String($$.pluginParameters["Battle Log BG Color"]);
	$$.params.battleLogBackgroundOpacity = +String($$.pluginParameters["Battle Log BG Opacity"]);
	
	$$.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args)	
	{
		$$.Game_Interpreter_pluginCommand.call(this, command, args);
		if (command.match(/^ApplyZoneEffects/i)) $$.applyZoneEffects();
	}
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
		}		
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
			var isImmune = b.getTag("Immune to Gravity", true).length > 0;
			return isImmune ? 0 : b.hp * magnitude;
		}		
		$$.variance = function(damageValue, variance)
		{
			return Math.round(damageValue + damageValue * (Math.random() * variance * 2 - variance));
		}
		$$.Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
		Game_Action.prototype.makeDamageValue = function(target, critical)
		{
			var iReturn = $$.Game_Action_makeDamageValue.call(this, target, critical);
			return this.applyDamageCap(iReturn);
		}
		Game_Action.prototype.applyDamageCap = function(damage)
		{
			var subject = this.subject();
			var minOverride = subject.minDamage;
			var maxOverride = subject.maxDamage;
			minOverride = Math.max(+Aesica.Toolkit.getTag.call(this.item(), "Damage Min") || 0, minOverride);
			maxOverride = Math.max(+Aesica.Toolkit.getTag.call(this.item(), "Damage Max") || 0, maxOverride);
			var min = minOverride || $$.params.minDamage;
			var max = maxOverride || $$.params.maxDamage;
			var breakMaxCap = Aesica.Toolkit.getTag.call(this.item(), "Break Damage Cap") || subject.getTag("Break Damage Cap", true).length > 0 || max === 0;
			if (breakMaxCap) max = Infinity;
			var iReturn = Math.abs(damage).clamp(min, max);
			if (damage < 0) iReturn *= -1;
			return iReturn;
		}
		Game_Action.prototype.applyCritical = function(damage)
		{
			var iReturn = damage * $$.params.critMultiplier;
			var subject = this.subject();
			var current;
			var modifiers = subject.getTag("Critical Bonus", true);
			for (i in modifiers)
			{
				current = +modifiers[i];
				if (isNaN(current)) current = 1;
				iReturn *= current;
			}
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
			unarmedMhp: { get: function(){ return this.mhp - this.weaponStat(0); }, configurable: true },
			unarmedMmp: { get: function(){ return this.mmp - this.weaponStat(1); }, configurable: true },
			unarmedAtk: { get: function(){ return this.atk - this.weaponStat(2); }, configurable: true },
			unarmedDef: { get: function(){ return this.def - this.weaponStat(3); }, configurable: true },
			unarmedMat: { get: function(){ return this.mat - this.weaponStat(4); }, configurable: true },
			unarmedMdf: { get: function(){ return this.mdf - this.weaponStat(5); }, configurable: true },
			unarmedAgi: { get: function(){ return this.agi - this.weaponStat(6); }, configurable: true },
			unarmedLuk: { get: function(){ return this.luk - this.weaponStat(7); }, configurable: true },
			minDamage: { get: function(){ return this.getTag("Damage Min", true).reduce((a, b) => Math.max(+a || 0, +b || 0), 0) || $$.params.minDamage; }, configurable: true },
			maxDamage: { get: function(){ return this.getTag("Damage Max", true).reduce((a, b) => Math.max(+a || 0, +b || 0), 0) || $$.params.maxDamage || Infinity; }, configurable: true }
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
			for (i in weapons) iReturn += +Aesica.Toolkit.getTag.call(weapons[i], "Stat Base " + tag) || 0;
			return iReturn;
		}
		Game_BattlerBase.prototype.unarmedTagStat = function(tag)
		{
			return this.tagStat(tag) - this.weaponTagStat(tag);
		}
		Game_BattlerBase.prototype.anyStateAffected = function(...states)
		{
			var bReturn = false;
			var stateList = [];
			for (i in states) stateList = stateList.concat(states[i]);
			for (i in stateList)
			{
				bReturn = this.isStateAffected(stateList[i]);
				if (bReturn) break;
			}
			return bReturn;
		}
		
		Game_Unit.prototype.numAnyStateAffected = function(...states)
		{
			var iReturn = 0;
			var party = this.members();
			var stateList = [];
			for (i in states) stateList = stateList.concat(states[i]);
			for (i in party) iReturn += party[i].anyStateAffected(stateList) ? 1 : 0;
			return iReturn;
		}
		Game_Unit.prototype.numAllStateAffected = function(...states)
		{
			iReturn = 0;
			var party = this.members();
			var stateList = [];
			for (i in states) stateList = stateList.concat(states[i]);
			for (i in party) iReturn += party[i].allStateAffected(stateList) ? 1 : 0;
			return iReturn;
		}
		Game_BattlerBase.prototype.allStateAffected = function(...states)
		{
			var iReturn = 0;
			var stateList = [];
			for (i in states) stateList = stateList.concat(states[i]);
			for (i in stateList){ if (this.isStateAffected(stateList[i])) iReturn++; }
			return iReturn == iLength;
		}
		Game_BattlerBase.prototype.tagStat = function(stat)
		{
			var statData = {"base":0,"growth":0,"bonus":1};
			var baseList = this.getTag("Stat Base " + stat, true);
			var growthList = this.getTag("Stat Growth " + stat, true);
			var bonusList = this.getTag("Stat Bonus " + stat, true);
			var bonus, level = this.isActor() ? this.level : 1;
			for (i in baseList) statData.base += +baseList[i] || 0;
			for (i in growthList) statData.growth += +growthList[i] || 0;
			for (i in bonusList)
			{
				bonus = +bonusList[i];
				if (isNaN(bonus)) bonus = 1;
				statData.bonus *= bonus;
			}
			return Math.round((statData.base + statData.growth * level) * statData.bonus);
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
				console.log("AES_BattleCore: Eval error in Initial TP Plugin Parameter");
			}
			this.setTp(tpValue);
		}
	}
/**-------------------------------------------------------------------	
	Skill sorting
//-------------------------------------------------------------------*/
$$.Game_Actor_skills = Game_Actor.prototype.skills;
Game_Actor.prototype.skills = function()
{
    var list = $$.Game_Actor_skills.call(this);
    return $$.params.improvedSkillSorting ? list.sort($$.sortSkills) : list;
};
$$.sortSkills = function(a, b)
{
	var iReturn = 0;
	var param = $$.params.skillSortProperty;
	if (a[param] < b[param]) iReturn = -1;
	else if (a[param] > b[param]) iReturn = 1;
	return iReturn;
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
/**-------------------------------------------------------------------	
	Multiple Death States
//-------------------------------------------------------------------*/
	$$.Game_Party_isAllDead = Game_Party.prototype.isAllDead;
	Game_Party.prototype.isAllDead = function()
	{
		var bReturn = $$.Game_Party_isAllDead.call(this);
		return bReturn || this.numAnyStateAffected($$.params.extraDeathStates) == this.aliveMembers().length;
	}
/**-------------------------------------------------------------------	
	Battle Log Adjustments
//-------------------------------------------------------------------*/
	if ($$.params.section.battleLogCustomization)
	{
		Window_BattleLog.prototype.backColor = function(){ return $$.params.battleLogBackgroundColor; }
		Window_BattleLog.prototype.backPaintOpacity = function() { return $$.params.battleLogBackgroundOpacity; }
		$$.Window_BattleLog_displayAction = Window_BattleLog.prototype.displayAction;
		Window_BattleLog.prototype.displayAction = function(subject, item){ if (!Aesica.Toolkit.tagExists.call(item, "Hide Combat Text")) $$.Window_BattleLog_displayAction.call(this, subject, item); }
	}
/**-------------------------------------------------------------------	
	State Incrementation
//-------------------------------------------------------------------*/
	Game_BattlerBase.prototype.incrementStates = function(...stateIds)
	{
		var nextState;
		var states = this._states.map(x => x);
		var checkAll = stateIds.length === 0;
		for (i in states)
		{
			if (this.isStateAffected(states[i]) && (checkAll || stateIds.contains(states[i])))
			{
				nextState = +Aesica.Toolkit.getTag.call($dataStates[states[i]], "Next State");
				if (nextState)
				{
					this.removeState(states[i]);
					this.addState(nextState);
				}
			}
		}
	}
/**-------------------------------------------------------------------	
	Zone Effects
//-------------------------------------------------------------------*/
	$$.BattleManager_endTurn = BattleManager.endTurn;
	BattleManager.endTurn = function()
	{
		$$.BattleManager_endTurn.call(this);
		// Needed to include a hackish workaround for YEP_BattleEngineCore 
		// needlessly spamming the crap out of BattleManager.endTurn...
		if ($$.params.autoApplyZoneEffects)
		{
			if (!Imported.YEP_BattleEngineCore || Imported.YEP_BattleEngineCore && this._enteredEndPhase) $$.applyZoneEffects();
		}
	}
	$$.applyZoneEffects = function()
	{
		var tagName = "Zone Effect";
		var tagData, members, target, inBattle, isImmune, isWeak, damageValue, affectedCount = 0;
		var effectId, animId, damage, immune, weakness, targetGroup;
		if ($dataMap && Aesica.Toolkit.tagExists.call($dataMap, tagName))
		{
			tagData = Aesica.Toolkit.getTagList.call($dataMap, tagName);
			console.log(tagData);
			inBattle = $gameParty.inBattle();
			for (i in tagData)
			{
				effects = (String(tagData[i].state) || "").split(",").map(x => +x || 0);
				animId = +tagData[i].animation || 0;
				weakness = tagData[i].weakness;
				immune = tagData[i].immune;
				targetGroup = tagData[i].target || "";
				damage = tagData[i].damage;
				if (targetGroup.match(/party|allies/i)) members = $gameParty.aliveMembers();
				else if (targetGroup.match(/troop|enemies/i)) members = $gameTroop.aliveMembers();
				else members = $gameParty.aliveMembers().concat($gameTroop.aliveMembers());
				for (j in members)
				{
					target = members[j];
					isImmune = target.getTag(immune, true).length > 0;
					isWeak = target.getTag(weakness, true).length > 0;
					if (weakness ? isWeak && !isImmune : !isImmune)
					{
						try
						{
							damageValue = Math.floor(+eval(damage)) || 0;
						}
						catch(e)
						{
							console.log("AES_BattleCore: Eval error in ZoneState damage formula for Map ID (" + $gameMap.mapId() + ")\n" + damage);
						}						
						if (damageValue)
						{
							target.gainHp(-damageValue);
							target.startDamagePopup();
							target.refresh();
							if (target.isDead()) target.performCollapse();
						}
						if (animId > 0 && inBattle) target.startAnimation(animId);
						for (k in effects) if (effects[k] > 0) if (Math.random() < target.stateRate(effects[k])) target.addState(effects[k]);
						affectedCount++;
					}
				}
				if (!inBattle && animId > 0 && affectedCount > 0) $gamePlayer.requestAnimation(animId);
			}
		}
	}
})(Aesica.BattleCore);