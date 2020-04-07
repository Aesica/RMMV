var Imported = Imported || {};
Imported.AES_RaceCore = true;
var Aesica = Aesica || {};
Aesica.RaceCore = Aesica.RaceCore || {};
Aesica.RaceCore.version = 2;
Aesica.Toolkit = Aesica.Toolkit || {};
Aesica.Toolkit.raceCoreVersion = 1.4;
/*:
* @plugindesc v2.0 Adds creature/player races, plus ways to deal or receive modified damage based on these races.
*
* @author Aesica
*
* @param Unknown Race
* @desc The race to return via battler.raceList when none is specified
* @default Unknown
*
* @param Unknown Sex
* @desc The sex to return via battler.sex when none is specified
* @default Unknown
*
* @param Race List
* @desc List of races.  Note that the first race is considered to be at index 1, not 0
* @type text[]
* @default ["Humanoid","Beast","Avian","Aquatic","Dragon","Demon","Undead","Mechanical"]
*
* @param List Delimiter
* @desc Separator used by Game_BattlerBase.prototype.race for multiple races
* @type text
* @default , 
*
* @param Subrace Fallback
* @desc Determines what to show for battlers without subraces when battler.subrace is invoked
* @type boolean
* @on Primary Race(s)
* @off Empty String
* @default true
*
* @param Sex List
* @desc List of sexes.  Note that the first sex is considered to be at index 1, not 0
* @type text[]
* @default ["Female","Male","Other"]
* 
* @help
* For terms of use, see:  https://github.com/Aesica/RMMV/blob/master/README.md
* Support me on Patreon:  https://www.patreon.com/aesica
*
* ===================
* Introduction
* ===================
*
* Add races to players and enemies!  This also allows you to assign bonuses or
* penalties to attacks made by or against creatures of specific races.  Ever
* want to create a Dragonslayer sword, a spell which does extra damage against
* undead regardless of elemental affinity, or armor that reduces damage dealt
* by demons?  Now you can!  This can even be used to cause healing effects
* to damage undead foes, or healing to have no effects on mechanical beings.

*
* ===================
* Note Tags
* ===================
*
* - Actor/Enemy note tags:
* <Subrace: x>
* Specify a subrace for the actor or enemy.  This is for vanity purposes only,
* and is accessible via Game_BattlerBase.prototype.subrace as outlined below.
* If no subrace exists, returns an empty string instead.
*
* - Actor/Enemy, Class, Equip,and State note tags:
* <Race: RaceType> sets the creature/actor's racetype(s)
* Adds the specified race to the battler's race list.
*
* <Sex: n>
* Specfies a sex for the actor/enemy based on priority:
* Actor/Enemy < Class < Equips < States, with Actor/Enemy having the lowest
* priority and states having the highet priority.  So if an actor is set to
* Female, she could equip a ring that changes her to Male.  Please don't be
* gross with this, guys.
*
* - Actor/Enemy, Class, Equip, State, Item/Ability note tags:
* <Attack vs RaceType: n>
* All attacks vs this racetype are multiplied by n
*
* <Physical Attack vs RaceType: n>
* Physical attacks vs this racetype are multiplied by n
* 
* <Magical Attack vs RaceType: n>
* Magical attacks vs this racetype are multiplied by n
* 
* <Certain Attack vs RaceType: n>
* Certain hit attacks vs this racetype are multiplied by n
* 
* <Defense vs RaceType: n>
* All incoming attacks from this racetype are multiplied by n
*
* <Physical Defense vs RaceType: n>
* Physical incoming attacks from this racetype are multiplied by n
*
* <Magical Defense vs RaceType: n>
* Magical incoming attacks from this racetype are multiplied by n
*
* <Certain Defense vs RaceType: n>
* Certain hit incoming attacks from this racetype are multiplied by n
* 
* - Replace "RaceType" with the desired race text (ex: Humanoid, Dragonkin,
* Celestial, Robot, Potato, etc) or race ID pointing to a race defined in the
* plugin parameters.  Be aware that the first race is at index 1, as 0 is
* reserved for the Unknown racial identifier.
* 
* - To assign more than one race to an actor/enemy, separate with commas (ex: <Race: Undead, Plant>
* - Replace "n" with the desired multiplier. (ex: 0.5 for 50% damage, 2.5 for 250% damage, etc)
* - All modifiers are multiplicative with one another.
* - Since this is a battle plugin, place it below other battle plugins, especially if they overwrite Game_Action.prototype.makeDamageValue
*
* ===================
* Note Tag Examples
* ===================
*
* <Race: Aberration> - assigns the race, "Aberration," to an actor or enemy.
* This is pretty straightforward~
* 
* <Physical Attack vs Aberration: 1.5> - 150% damage modifier against
* "Aberration" actors or enemies when using physical attacks.  If assigned to
* a skill or item, the bonus applies only when that skill or item is used.  If
* assigned to a weapon or armor, the bonus applies to every physical attack as
* long as the weapon or armor is equipped.  If assigned to a state, the bonus
* only applies if the attacking actor/enemy is affected by that state.  If
* assigned to a class, any actor of that class gains the bonus.  If assigned
* to an actor or enemy, the bonus is always enabled for that actor/enemy.
*
* <Magical Defense vs Aberration: 0.8> - 80% damage modifier against magical
* attacks from "Aberration" actors or enemies.  Same rules applies per source
* as listed above.
*
* <Certain Attack vs Aberration: 5> - 500% (!) damage with certain hit
* abilities vs "Aberration" actors or enemies.
*
* <Defense vs Aberration: 2> - 200% damage from ALL types of attacks coming
* from "Aberration" actors/enemies
*
* <Attack vs Aberration: 0.01> - 1% (!) damage modifier to ALL attacks made
* against "Aberration" actors or enemies
*
* <Attack vs Undead: -1> - All damage (or healing) vs Undead will be inverted,
* making for an easy solution if you want healing effects to damage undead
*
* ===================
* Useful Function Calls
* ===================
* 
* Game_BattlerBase.prototype.raceList
* Returns array of races associated with the battler.
*
* Game_BattlerBase.prototype.race
* Returns a string of all races associated with the battler.
*
* Game_BattlerBase.prototype.defaultRace
* Returns the name of the race found on the battler or enemy only.  Excludes
* class, equip, and state races.
*
* Game_BattlerBase.prototype.subrace
* Returns the name of the battler's subrace, if any
*
* Game_BattlerBase.prototype.isRace(race)
* Returns true if a battler is associated with the specified race
*  
* Game_BattlerBase.prototype.sex
* Returns the name of the battler's sex, if any
*
* Game_BattlerBase.prototype.sexId
* Returns the ID number of the battler's sex, if any
*
*
*/
(function($$)
{
	function safeJSONParse(jsonData)
	{
		var result;
		try
		{
			result = JSON.parse(jsonData);
		}
		catch(e)
		{
			console.log("AES_RaceCore: Invalid JSON data in plugin paramters");
			console.log(jsonData);
		}
		return result;
	};
	function makeLookupTable(stringArray)
	{
		var result = {};
		for (let [i, obj] of stringArray.entries()) result[obj.toLowerCase()] = i;
		return result;
	}
	$$.pluginParameters = PluginManager.parameters("AES_RaceCore");
	$$.params = {};
	$$.params.defaultUnknownRace = String($$.pluginParameters["Unknown Race"]);
	$$.params.defaultUnknownSex = String($$.pluginParameters["Unknown Sex"]);
	$$.params.subraceFallback = String($$.pluginParameters["Subrace Fallback"]).toLowerCase() === "false" ? false : true;
	$$.params.raceList = (safeJSONParse($$.pluginParameters["Race List"]) || []);
	$$.params.listDelimiter = String($$.pluginParameters["List Delimiter"]);
	$$.params.raceList.splice(0, 0, $$.params.defaultUnknownRace);
	$$.params.raceLookup = makeLookupTable($$.params.raceList);
	$$.params.sexList = (safeJSONParse($$.pluginParameters["Sex List"]) || []);
	$$.params.sexList.splice(0, 0, $$.params.defaultUnknownSex);
/**-------------------------------------------------------------------	
	Aesica.Toolkit: Note tag parsing functions
//-------------------------------------------------------------------*/
	if ((Aesica.Toolkit.version || 0) < Aesica.Toolkit.raceCoreVersion)
	{
		Aesica.Toolkit.version = Aesica.Toolkit.raceCoreVersion;
		Aesica.Toolkit.getTag = function(tag)
		{
			var result;
			var note = this.note || "";
			if (Aesica.Toolkit.tagExists.call(this, "\\/" + tag)) result = note.match(RegExp("<" + tag + ">([^]+)<\\/" + tag + ">", "i"));
			else result = note.match(RegExp("<" + tag + ":[ ]*([^>]+)>", "i"));
			return result ? result[1].trim() : Aesica.Toolkit.tagExists.call(this, tag);
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
	}
/**-------------------------------------------------------------------	
	Race Functions
//-------------------------------------------------------------------*/
	Object.defineProperties(Game_BattlerBase.prototype, 
	{
		race: { get: function(){ return this.raceList.sort().join($$.params.listDelimiter); }, configurable: true },
		raceList: { get: function(){ var result = this.getTag("Race", true).map(x => isNaN(+x) ? x : $$.params.raceList[+x || 0]).reduce(function(r, obj){ return r.indexOf(obj) < 0 ? r.concat(obj) : r; }, []); return result.length > 0 ? result : [$$.params.defaultUnknownRace]; }, configurable: true },
		defaultRace: { get: function(){ return $$.params.raceList[+this.getTag("Race") || 0]; }, configurable: true},
		subrace: { get: function(){ return this.getTag("Subrace") || ($$.params.subraceFallback ? this.raceList.join(", ") : ""); }, configurable: true},
		sex: { get: function(){ var result = this.getTag("Sex", true); return result.length > 0 ? $$.params.sexList[result[result.length - 1]] : $$.params.defaultUnknownSex }, configurable: true},
		sexId: { get: function(){ var result = this.getTag("Sex", true); return result.length > 0 ? +result[result.length - 1] || 0 : 0; }, configurable: true},
	});
	Game_Action.prototype.getRacialBonus = function(attacker, defender, type)
	{
		var result = [];
		var item = this.item();
		for (let race of defender.raceList)
		{
			race = $$.params.raceLookup[race.toLowerCase()];
			result = result.concat(attacker.getTag(type + " vs " + race, true));
			if (this.isPhysical()) result = result.concat(attacker.getTag("Physical " + type + " vs " + race, true));
			else if (this.isMagical()) result = result.concat(attacker.getTag("Magical " + type + " vs " + race, true));
			else if (this.isCertainHit()) result = result.concat(attacker.getTag("Certain " + type + " vs " + race, true));
			if (Aesica.Toolkit.tagExists.call(item, type + " vs " + race)) result.push(Aesica.Toolkit.getTag.call(item, type + " vs " + race));
			if (Aesica.Toolkit.tagExists.call(item, "Physical " + type + " vs " + race) && this.isPhysical()) result.push(Aesica.Toolkit.getTag.call(item, "Physical " + type + " vs " + race));
			else if (Aesica.Toolkit.tagExists.call(item, "Magical " + type + " vs " + race) && this.isPhysical()) result.push(Aesica.Toolkit.getTag.call(item, "Magical " + type + " vs " + race));
			else if (Aesica.Toolkit.tagExists.call(item, "Certain " + type + " vs " + race) && this.isPhysical()) result.push(Aesica.Toolkit.getTag.call(item, "Certain " + type + " vs " + race));
		}
		result = result.reduce(function(acc, cur){ return acc * (isNaN(+cur) ? 1 : +cur ); }, 1);
		return result;
	};
	Game_BattlerBase.prototype.isRace = function(race)
	{
		race = isNaN(+race) ? race : $$.params.raceList[+race];
		return this.raceList.map(x => x.toLowerCase()).indexOf(race.toLowerCase()) !== -1; 
	};
	$$.Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
	Game_Action.prototype.makeDamageValue = function(target, critical)
	{
		var subject = this.subject();
		var attackMultiplier = this.getRacialBonus(subject, target, "attack");
		var defenseMultiplier = this.getRacialBonus(target, subject, "defense");
		var iReturn = Math.round($$.Game_Action_makeDamageValue.call(this, target, critical) * attackMultiplier * defenseMultiplier);
		if (Imported.AES_BattleCore) iReturn = this.applyDamageCap(iReturn);
		return iReturn;
	};
})(Aesica.RaceCore);