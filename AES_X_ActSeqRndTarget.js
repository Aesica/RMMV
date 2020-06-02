var Imported = Imported || {};
Imported.AES_ActSeqRndTarget = true;
var Aesica = Aesica || {};
Aesica.ASRT = Aesica.ASRT || {};
/*:
* @plugindesc v1.0 Adds random targeting functionality to Yanfly's action sequence packs
* @author Aesica
*
* @help
* For terms of use, see:  https://github.com/Aesica/RMMV/blob/master/README.md
* Support me on Patreon:  https://www.patreon.com/aesica
*
* ----------------------------------------------------------------------
* Overview
* - Requires YEP_BattleEngineCore
* - You should probably have one or more action sequence packs, too
* - Place below YEP_BattleEngineCore
*
* Adds the following selectors to action sequences:
* 
* ----------------------------------------------------------------------
* RANDOM n [condition] group [exclude]
* Selects n number of random targets from the specified group.
*
* Conditions:
*
* DEAD
* Selects only dead targets from the selected group
*
* ALL 
* Selects both dead and alive targets from the selected group
*
* ALIVE
* Selects only living targets from the selected group
* 
* If no condition is specified, defaults to ALIVE
*
* Groups:
*
* TARGET, TARGETS
* Selects from the current target selection.  Primarily useful for special
* targeting, such as what's provided by Yanfly's selection control plugin.
* This selector ignores the DEAD, ALL, and ALIVE conditions, as that's
* left up to the selection-based targeting.
*
* OPPONENT, OPPONENTS
* Selects from the user's opponents list.  Enemies select actors, actors
* select enemies.
*
* FRIEND, FRIENDS
* Selects from the user's friends list.  Actors select actors, enemies
* select enemies.
*
* ACTOR, ACTORS
* Selects actors
*
* ENEMY, ENEMIES
* Selects enemies
*
* EVERYONE, EVERYBODY
* Selects both actors and enemies
*
* Excludes:
*
* NOT USER
* Excludes the user from the selection
* 
* NOT FOCUS
* Excludes the current target(s) from the selection
* 
* If selecting more than one random target, note that the same target will not
* be selected twice.  Trying to select more random targets than are available
* will result in all available targets being selected.
*
* ----------------------------------------------------------------------
* SAME
* Used to acquire the same list of targets from the last action sequence 
* target selection.  The main purpose of this is to allow animations and
* effects to be executed on the same group of targets.  In most cases,
* this is needed to make sure animations and effects play out on the same
* group of randomly-selected targets.
*
* ----------------------------------------------------------------------
* Example uses:
*
* action animation: random 3 opponents
* wait for animation
* action effect: same
*
* action animation: random 5 everyone not user
* wait for animation
* action effect: same
*
* action animation: random 1 dead friend
* wait for animation
* action effect: same
*
* ...and this one will play the animation on a random target, but will apply
* the effect to another.  This is why the SAME selector is so important when
* using this  plugin's random selections:
*
* action animation: random 1 opponent
* wait for animation
* action effect: random 1 opponent
*/

(function($$)
{
	$$.BattleManager_makeActionTargets = BattleManager.makeActionTargets;
	BattleManager.makeActionTargets = function(string)
	{
		var targets = [];
		if (string.match(/^random/i))
		{
			string = string.toUpperCase();
			let targetPool = [];
			let group = string.match(/TARGET|TARGETS|ENEMY|ENEMIES|ACTOR|ACTORS|FRIEND|FRIENDS|OPPONENT|OPPONENTS|EVERYONE|EVERYBODY/);
			let status = string.match(/DEAD|ALL|ALIVE/);
			let exclude = string.match(/NOT USER|NOT FOCUS/);
			let qty = +string.match(/[0-9]+/) || 1;
			group = group ? group[0] : "TARGET";
			status = status ? status[0] : "ALIVE";
			exclude = exclude ? exclude[0] : null;
			if (status === "DEAD")
			{
				if (group === "TARGET" || group === "TARGETS") targetPool = this._targets.slice();
				else if (group === "ENEMY" || group === "ENEMIES") targetPool = $gameTroop.deadMembers().slice();
				else if (group === "ACTOR" || group === "ACTORS") targetPool = $gameParty.deadMembers().slice();
				else if (group === "FRIEND" || group === "FRIENDS") targetPool = this._action.friendsUnit().deadMembers().slice();
				else if (group === "OPPONENT" || group === "OPPONENTS") targetPool = this._action.opponentsUnit().deadMembers().slice();
				else if (group === "EVERYBODY" || group === "EVERYONE") targetPool = $gameParty.deadMembers().concat($gameTroop.deadMembers());
			}
			else if (status === "ALL")
			{
				if (group === "TARGET" || group === "TARGETS") targetPool = this._targets.slice();
				else if (group === "ENEMY" || group === "ENEMIES") targetPool = $gameTroop.members().slice();
				else if (group === "ACTOR" || group === "ACTORS") targetPool = $gameParty.members().slice();
				else if (group === "FRIEND" || group === "FRIENDS") targetPool = this._action.friendsUnit().members().slice();
				else if (group === "OPPONENT" || group === "OPPONENTS") targetPool = this._action.opponentsUnit().members().slice();
				else if (group === "EVERYBODY" || group === "EVERYONE") targetPool = $gameParty.members().concat($gameTroop.members());
			}
			else if (status === "ALIVE")
			{
				if (group === "TARGET" || group === "TARGETS") targetPool = this._targets.slice();
				else if (group === "ENEMY" || group === "ENEMIES") targetPool = $gameTroop.aliveMembers().slice();
				else if (group === "ACTOR" || group === "ACTORS") targetPool = $gameParty.aliveMembers().slice();
				else if (group === "FRIEND" || group === "FRIENDS") targetPool = this._action.friendsUnit().aliveMembers().slice();
				else if (group === "OPPONENT" || group === "OPPONENTS") targetPool = this._action.opponentsUnit().aliveMembers().slice();
				else if (group === "EVERYBODY" || group === "EVERYONE") targetPool = $gameParty.aliveMembers().concat($gameTroop.aliveMembers());
			}
			if (exclude === "NOT USER" && targetPool.indexOf(this._subject) >= 0) targetPool.splice(targetPool.indexOf(this._subject), 1);
			else if (exclude === "NOT FOCUS")
			{
				for (let i = targetPool.length - 1; i >= 0; i--)
					if (this._targets.contains(targetPool[i])) targetPool.splice(i, 1);
			}
			targetPool = targetPool.filter(x => x.isAppeared());
			if (qty >= targetPool.length) targets = targetPool;
			else
			{
				for (let i = 0; i < qty; i++)
					targets.push(targetPool.splice(Math.floor(Math.random() * targetPool.length), 1)[0]);
			}
		}
		else if (string.match(/^same/i)) targets = this._action._aesLastASTargets || [];
		else targets = $$.BattleManager_makeActionTargets.call(this, string);
		this._action._aesLastASTargets = targets;
		return targets;
	}
})(Aesica.ASRT);

