var Imported = Imported || {};
Imported.AES_ActSeqEx = true;
var Aesica = Aesica || {};
Aesica.ASEX = Aesica.ASEX || {};
Aesica.ASEX.version = 1.3;
/*:
* @plugindesc v1.3 Adds a few extra features to the yanfly action sequence system
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
* Adds the following features to the action sequence system:
* - Random target(s) selection
* - Previously selected target(s) selection
* - Displaying custom text in the battle log window
* - Instantly kill target/targets/user/etc
* - Attempt to apply a state to target(s), taking resistances into account
*
* ----------------------------------------------------------------------
* Kill Targets
*
* KILL: targets
*
* Kills the specified target(s).  This is intended to be an unresistable
* kill that disregards resistances, state rates, and immortal flags.
*
* Examples:
* kill: targets
* kill: user
* kill: random 1 everybody
* ----------------------------------------------------------------------
* Apply State vs State Rates
*
* APPLY STATE X: targets
*
* Attempts to apply a state to the targets, making a random check against
* their state rate.  This differs from Yanfly's "ADD STATE x: targets"
* action sequence because his version ignores state rates and applies the
* state 100% of the time.
*
* Examples:
* apply state 5: opponents
* apply state 1: targets
* ----------------------------------------------------------------------
* Custom Battle Log Text
*
* TEXT: Your text here
*
* Displays "Your Text Here" in the battle log, pretty straightforward
* 
* Example action sequence:
*
* <Target Action>
* perform action
* action animation: target
* wait for animation
* action effect: target
* clear battle log
* text: Hahaha, I just hit you!
* wait: 120
* death break
* perform finish
* <Target Action>
*
* Tips:
* - Text codes like \i[25], \v[3] etc can be used
* - Use clear battle log or the text will be drawn beneath the previous line
*
* ----------------------------------------------------------------------
* Random Target Selection
*
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
* Special Filters:
*
* NOT USER
* Excludes the user from the selection
* 
* NOT FOCUS
* Excludes the current target(s) from the selection
*
* DRAWABLE
* If included, random targeting is influenced by target rate (tgr) instead
* of general random selection.
*
* TAUNTABLE
* Requires YEP_Taaunt to work.  If included, will prioritize targets affected
* by physical taunt, magical taunt, or certain taunt if the skill type matches.
* Note that when working with multiple random targets, normal targets will be
* selected once all available taunters have been selected.
* 
* If selecting more than one random target, note that the same target will not
* be selected twice.  Trying to select more random targets than are available
* will result in all available targets being used up.
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
* action animation: random 3 opponents tauntable drawable
* wait for animation
* action effect: same
*
*/

(function($$)
{
	$$.BattleManager_processActionSequence = BattleManager.processActionSequence;
	BattleManager.processActionSequence = function(actionName, actionArgs)
	{
		var result = false;
		if (actionName === "TEXT") result = this.actionText(actionArgs);
		else if (actionName.match(/APPLY STATE[ ](\d+(?:\s*,\s*\d+)*)/i)) result = this.actionApplyState(actionName, actionArgs);
		else if (actionName === "KILL") result = this.actionKill(actionArgs);
		else result = $$.BattleManager_processActionSequence.call(this, actionName, actionArgs);
		return result;
	};
	BattleManager.actionText = function(actionArgs)
	{
		BattleManager._logWindow.push("addText", "<CENTER>" + actionArgs.join(","));
		return false;
	};
	BattleManager.actionKill = function(actionArgs)
	{
		var targets = this.makeActionTargets(actionArgs[0]);
		var result = false;
		for (let target of targets)
		{
			target.removeImmortal();
			target._hp = 0;
			target.refresh();
			target.performCollapse();
		}
		return result;
	};	
	BattleManager.actionApplyState = function(actionName, actionArgs)
	{
		var targets = this.makeActionTargets(actionArgs[0]);
		var result = false;
		var show = false;
		var states;
		if (targets.length > 0)
		{
			show = actionArgs.some(x => x.match(/show/i));
			if (actionName.match(/APPLY STATE[ ](\d+(?:\s*,\s*\d+)*)/i))
			{
				try
				{
					states = JSON.parse("[" + RegExp.$1.match(/\d+/g) + "]");
				}
				catch(e)
				{
					console.log("AES_X_ActSeqEx: Apply State has invalid parameters on " + this._action._item._dataClass + " id " + this._action._item._itemId);
				}
				targets.forEach(function(target)
				{
					for (let i of states)
					{
						if (Math.random() < target.stateRate(i))
						{
							if (target.deathStateId() === i && !target._prevImmortalState)
							{
								target.removeImmortal();
								target.addState(i);
								target.performCollapse();
							}
							else target.addState(i);
							if (show) this._logWindow.displayActionResults(this._subject, target);
						}
					}
				}, this);
				result = true;
			}
			else console.log("AES_X_ActSeqEx: Apply State has invalid parameters on " + this._action._item._dataClass + " id " + this._action._item._itemId);
		}
		return result;
	};
	$$.BattleManager_makeActionTargets = BattleManager.makeActionTargets;
	BattleManager.makeActionTargets = function(string)
	{
		var targets = [];
		if (string.match(/^random/i))
		{
			string = string.toUpperCase();
			let targetPool = [];
			let tauntPool = [];
			let group = string.match(/TARGET|TARGETS|ENEMY|ENEMIES|ACTOR|ACTORS|FRIEND|FRIENDS|OPPONENT|OPPONENTS|EVERYONE|EVERYBODY/);
			let status = string.match(/DEAD|ALL|ALIVE/);
			let excludeFocus = string.match(/NOT FOCUS/);
			let excludeUser = string.match(/NOT USER/);
			let canTaunt = string.match(/TAUNTABLE/);
			let canDraw = string.match(/DRAWABLE/);
			let qty = +string.match(/[0-9]+/) || 1;
			let tgrSum, tgrRandom, target, currentPool;
			group = group ? group[0] : "TARGET";
			status = status ? status[0] : "ALIVE";
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
			if (canTaunt && this._action.isRandomTargetTauntable())
			{
				if (this._action.isPhysical()) tauntPool = targetPool.filter(x => x.tauntPhysical());
				else if (this._action.isMagical()) tauntPool = targetPool.filter(x => x.tauntMagical());
				else if (this._action.isCertainHit()) tauntPool = targetPool.filter(x => x.tauntCertain());
			}
			if (excludeUser && targetPool.indexOf(this._subject) >= 0) targetPool.splice(targetPool.indexOf(this._subject), 1);
			if (excludeFocus)
			{
				for (let i = targetPool.length - 1; i >= 0; i--)
					if (this._targets.contains(targetPool[i])) targetPool.splice(i, 1);
				for (let i = tauntPool.length - 1; i >= 0; i--)
					if (this._targets.contains(tauntPool[i])) tauntPool.splice(i, 1);
			}
			tauntPool = tauntPool.filter(x => x.isAppeared());
			targetPool = targetPool.filter(x => x.isAppeared());
			if (qty >= targetPool.length) targets = targetPool;
			else
			{
				for (let i = 0; i < qty; i++)
				{
					target = null;
					if (tauntPool.length > 0) currentPool = tauntPool;
					else currentPool = targetPool;
					if (canDraw)
					{
						tgrSum = currentPool.reduce((s, obj) => s + obj.tgr, 0);
						tgrRandom = Math.random() * tgrSum;
						currentPool.forEach(function(member)
						{
							tgrRandom -= member.tgr;
							if (tgrRandom <= 0 && !target) target = member;
						});
					}
					else target = currentPool[Math.floor(Math.random() * currentPool.length)];
					if (target)
					{
						if (tauntPool.contains(target)) tauntPool.splice(tauntPool.indexOf(target), 1);
						if (targetPool.contains(target)) targetPool.splice(targetPool.indexOf(target), 1);
						targets.push(target);
					}
				}
			}
		}
		else if (string.match(/^same/i)) targets = this._action._aesLastASTargets || [];
		else targets = $$.BattleManager_makeActionTargets.call(this, string);
		this._action._aesLastASTargets = targets;
		return targets;
	};
	Game_Action.prototype.isRandomTargetTauntable = function()
	{
		var result;
		if (!Imported.YEP_Taunt) result = false;
		else if (this.isPhysical() && this.subject().ignoreTauntPhysical()) result = false;
		else if (this.isMagical() && this.subject().ignoreTauntMagical()) result = false;
		else if (this.isCertainHit() && this.subject().ignoreTauntCertain()) result = false;
		else result = true;
		return result;
	};
		
})(Aesica.ASEX);