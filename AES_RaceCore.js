// Plugin Name: Race Core
// Filename: AES_RaceCore.js

var Aesica = Aesica || {};
Aesica.RaceCore = Aesica.RaceCore || {};
Aesica.RaceCore.version = 1.0;

/*:
* @plugindesc Adds creature/player races, plus ways to deal or receive modified damage based on these races.
*
* @author Aesica
*
* @param Unknown Race Text
* @default Unknown
* 
* @help
* ===================
* Introduction
* ===================
*
* Add races to players and enemies!  This also allows you to assign bonuses or
* penalties to attacks made by or against creatures of specific races.  Ever
* want to create a Dragonslayer sword, a spell which does extra damage against
* undead regardless of elemental affinity, or armor that reduces damage dealt
* by demons?  Now you can!
*
* ===================
* Plugin Parameters
* ===================
* 
* The only plugin parameter to configure is the default race to show for any
* actor/creature without an assigned race.  This is only relevant if you plan
* on displaying races somehow, such as by a libra/scan ability, on status
* screens, in bestiaries, etc
*
* ===================
* Note Tags
* ===================
*
* - Actor/Enemy note tags:
* <Race: RaceType> sets the creature/actor's racetype(s)
*
* - Actor/Enemy/Item/Weapon/Armor/State/Ability note tags:
* <Attack vs RaceType: n> all attacks vs this racetype are multiplied by n
* <Physical Attack vs RaceType: n> physical attacks vs this racetype are multiplied by n
* <Magical Attack vs RaceType: n> magical attacks vs this racetype are multiplied by n
* <Certain Attack vs RaceType: n> certain hit attacks vs this racetype are multiplied by n
* <Defense vs RaceType: n> all incoming attacks from this racetype are multiplied by n
* <Physical Defense vs RaceType: n> physical incoming attacks from this racetype are multiplied by n
* <Magical Defense vs RaceType: n> magical incoming attacks from this racetype are multiplied by n
* <Certain Defense vs RaceType: n> certain hit incoming attacks from this racetype are multiplied by n
* 
* - ALL NOTE TAG SYNTAX IS CASE SENSITIVE.  <attack vs orc: 2> won't work, <Attack vs Orc: 2> will
* - Replace "RaceType" with the desired race (ex: Humanoid, Dragonkin, Celestial, Robot, Potato, etc)
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
* ===================
* Useful Function Calls
* ===================
* 
* - Aesica.RaceCore.getRace(actorOrEnemy);
* Returns the race(es) of the specified database entry (replace actorOrEnemy
* with the desired $dataActors[n] or $dataEnemies[n] entry in the database in
* array format.  Use join(", ") or something similar to make the results
* more presentable.
*
* For example, Aesica.RaceCore.getRace($dataActors[2]).join(", ") will return
* Actor #2's race(es) from the database.  If they have more than 1 race, it
* will be comma-separated.  So with <Race: Beast, Undead>, the return value
* will be this string: "Beast, Undead"
* Otherwise, if they have <Race: Human> the result will be just "Human"
* 
* - Game_Battler.prototype.getRace();
* Same as above, but for the specified battler.  Ideal for your Libra/Scan
* abilities and whatnot! :D
*/

(function($$)
{
	$$.values = $$.values || {};
	
	$$.pluginParameters = PluginManager.parameters("AES_RaceCore");
	$$._defaultUnknown = $$.pluginParameters["Unknown Race Text"];
	
	function trimWhiteSpace(text)
	{
		return text.replace(/^[ ]*/, "").replace(/[ ]*$/, "");
	}
	
	function getRacialBonus(attacker, defender, type)
	{
		var iReturn = 1;
		var defenderRace = defender.getRace();
		var i, iLength = defenderRace.length;
		var j, jLength;
		var attackerData = $dataActors[attacker._actorId] || $dataEnemies[attacker._enemyId];
		var defenderData = $dataActors[defender._actorId] || $dataEnemies[defender._enemyId];
		for (i = 0; i < iLength; i++)
		{
			if (attacker.isActor())
			{
				console.log(attackerData);
				iReturn *= getModifierFromMeta.call(this, defenderRace[i], $dataClasses[attacker._classId].meta, type); // class
				jLength = attacker._states.length;
				for (j = 0; j < jLength; j++) iReturn *= getModifierFromMeta.call(this, defenderRace[i], $dataStates[attacker._states[j]].meta, type); // statelist
				jLength = attacker._equips.length;
				for (j = 0; j < jLength; j++)
				{
					if (attacker._equips[j]._dataClass == "weapon") iReturn *= getModifierFromMeta.call(this, defenderRace[i], $dataWeapons[attacker._equips[j]._itemId].meta, type); // weapons
					else if (attacker._equips[j]._dataClass == "armor") iReturn *= getModifierFromMeta.call(this, defenderRace[i], $dataArmors[attacker._equips[j]._itemId].meta, type); // armors
				}
			}
			iReturn *= getModifierFromMeta.call(this, defenderRace[i], attackerData.meta, type); // battler
			if (this._item._dataClass == "skill") iReturn *= getModifierFromMeta.call(this, defenderRace[i], $dataSkills[this._item._itemId].meta, type); // skill
			else if (this._item._dataClass == "item") iReturn *= getModifierFromMeta.call(this, defenderRace[i], $dataItems[this._item._itemId].meta, type); // skill
		}
		return iReturn;
	}
	
	function getModifierFromMeta(raceName, meta, type)
	{
		var iReturn = 1;
		if (meta[type + " vs " + raceName]) iReturn *= +meta[type + " vs " + raceName];
		if (meta["Physical " + type + " vs " + raceName] && this.isPhysical()) iReturn *= +meta["Physical " + type + " vs " + raceName];
		else if (meta["Magical " + type + " vs " + raceName] && this.isMagical()) iReturn *= +meta["Magical " + type + " vs " + raceName];
		else if (meta["Certain " + type + " vs " + raceName] && this.isCertainHit()) iReturn *= +meta["Certain " + type + " vs " + raceName];
		return iReturn;
	}
	
	$$.getRace = function(actorOrEnemy)
	{
		var aReturn = actorOrEnemy.meta.Race;
		if (!aReturn) aReturn = [$$._defaultUnknown];
		else
		{
			aReturn = aReturn.split(",");
			iLength = aReturn.length;
			for (i = 0; i < iLength; i++)
			{
				aReturn[i] = trimWhiteSpace(aReturn[i]);
			}
		}
		return aReturn;
	}
	
	Game_Battler.prototype.getRace = function()
	{
		var aReturn, i, iLength;
		if (this.isEnemy()) aReturn = $$.getRace($dataEnemies[this._enemyId]);
		else aReturn = $$.getRace($dataActors[this._actorId]);
		return aReturn;
	}
	
	$$.Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
	Game_Action.prototype.makeDamageValue = function(target, critical)
	{
		console.log(this);
		var subject = this.subject();
		var attackMultiplier = getRacialBonus.call(this, subject, target, "Attack");
		var defenseMultiplier = getRacialBonus.call(this, target, subject, "Defense");
		return Math.round($$.Game_Action_makeDamageValue.call(this, target, critical) * attackMultiplier * defenseMultiplier);
	}
	
})(Aesica.RaceCore);






















