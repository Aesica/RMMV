var Imported = Imported || {};
Imported.AES_CommandControl = true;
var Aesica = Aesica || {};
Aesica.CommandControl = Aesica.CommandControl || {};
Aesica.CommandControl.version = 1.25;
Aesica.Toolkit = Aesica.Toolkit || {};
Aesica.Toolkit.commandControlVersion = 1.1;
/*:
* @plugindesc v1.25 Gain a greater level of control over actor battle commands.
*
* @author Aesica
*
* @param Limit Break Command
* @desc This is a skillType ID.  When TP reaches specified threshold, replace "Attack" with this command.  0: Disable
* @type number
* @min 0
* @default 0
*
* @param Limit Break Threshold
* @desc If a limit break command is specfied above, this is the TP threshold required to enable it.
* @type number
* @min 0
* @default 100
*
* @param Single Skill Command Order
* @desc Sets whether single skill commands appear before or after skill category commands (Magic, Special, etc)
* @type boolean
* @on Before
* @off After
* @default true
*
* @param Enable Attack
* @desc Shows or hides the "Attack" command in battle.
* @type boolean
* @on Show
* @off Hide
* @default true
*
* @param Enable Guard
* @desc Shows or hides the "Guard" command in battle.
* @type boolean
* @on Show
* @off Hide
* @default true
*
* @param Enable Item
* @desc Shows or hides the "Item" command in battle.
* @type boolean
* @on Show
* @off Hide
* @default true
*
* @param Left Command List
* @desc List of commands to be shown when the player presses left in the actor command window
* @type text[]
* @default []
*
* @param Right Command List
* @desc List of commands to be shown when the player presses right in the actor command window
* @type text[]
* @default []
*
* @param Hidden Skill Commands
* @desc List of skill command IDs that won't be displayed in combat, each separated by a space
* @type text
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
* There's also a parameter-based note tag syntax used by some functions that's
* formatted similarly to standard HTML parameters:
* <Note: name="Aesica" class="Programmer">
*
* Multiple groups of parameter sets in this format are separated by a
* semicolon.  Also, the order each parameter appears in does not matter, and
* certain parameters can be omitted entirely when specified:
* <Note: name="Fido" pet="Dog"; pet="Cat" name="Socks"; pet="Potato">
* 
* Double-quotes are required for parameter values, thus:
* <Note: name="Aesica"> // Good
* <Note: name='Aesica'> // Bad and will probably vomit errors
* <Note: name=Aesica>   // Bad and will probably vomit errors
*
* This plugin can do several things related to battle commands:
*
* ----------------------------------------------------------------------
* Hide Attack/Guard/Item
* ----------------------------------------------------------------------
* Allows you to easily prevent the Attack, Guard, and Item commands from showing
* in combat via plugin parameters.  Pretty self-explanatory.
*
* Additionally, these commands can be enabled (or disabled) on an individual
* basis using note tags:
*
* <Attack Command: Show>
* <Guard Command: Hide>
* <Item Command: Hide>
* ...etc
*
* These tags can be added to actors, classes, equips, and states in that order.
* Thus, an actor with <Guard Command: Hide> won't have the guard command 
* available even if it's enabled on everyone else by default.  He can, however,
* equip a shield with <Guard Command: Show> and gain access to guard.  He can
* even use guard if guard is disabled by default for everyone else.
* 
* ----------------------------------------------------------------------
* Relocate commands to left/right submenus
* ----------------------------------------------------------------------
* Allows certain commands to be moved to a special sub-command menu, accessed
* when the player presses left or right on their keyboard/controller.  These
* commands can be set in either the plugin parameters or, for single skill
* commands, the following note tag can be placed directly on the skill itself:
*
* <Command Page: Left>
* <Command Page: Right>
*
* Note 1:  Attack and Guard count as single skill commands and thus can make
* use of this note tag.
*
* Note 2:  This system is currently NOT touch-friendly, so any game intended
* for touch devices should probably not make use of this feature.
*
* ----------------------------------------------------------------------
* Limit Breaks
* ----------------------------------------------------------------------
* Allows for the use of a basic limit break system, where upon reaching a
* specified TP threshold, 'Attack' is replaced by a skillType command where
* a character's limit break/ultimate skills can be accessed.
*
* Note that you can put standard Attack in the limit break skillset and teach it
* to each character so players can still select it instead of their limit break
* for that particular turn.
* 
* To use:
*
* 1. Create a "Limit" skill type, but don't teach it to anyone
* 2. Set it in the plugin parameters
* 3. Create some skills of type "Limit" and teach them to characters who should
*      be able to use them
* 4. You're good to go!
*
* ----------------------------------------------------------------------
* Replace the Attack command
* ----------------------------------------------------------------------
* <Replace Attack: skillId>
* <Replace Attack: skillId, condition>
* <Replace Attack>skillId, condition</Replace Attack>
* 
* Will replace the Attack command with the skill matching skillId.  The
* condition is an optional eval that can be used to determine whether or not
* the replacement takes place.  The "user" property is accessible for this.
* For example, <Replace Attack: 25, user.isStateAffected(30)> will only replace
* Attack with Skill#25 if the user is affected by state 30.  If no condition is
* specified, the replacement will always occur.  This note tag can be placed on
* actors, classes, weapons, and states to replace the attack command with
* another skill.
*
* <Replace Attack: 4>
* Replace the attack command with skill 4
*
* <Replace Attack: 4, user.isStateAffected(25)>
* Replaces the attack command with skill 4 if the user is affected by
*   state 25
*
* <Replace Attack>4, user.hp / user.mhp > 0.5</Replace Attack>
* Replaces the attack command with skill 4 if the user's HP is above 50%
*   Note that you need to use the <x></x> note tag format to prevent the
*   greater-than sign from breaking the tag.
*
* ----------------------------------------------------------------------
* Add single skill commands
* ----------------------------------------------------------------------
* <Single Skill Command: x>
* <Single Skill Command: x, y, z, etc>
* Adds one or more skills with the specified skill id directly to the actor
* command list.  For example, if skill 13 is Wind Slash, which deals wind
* damage to all foes and the following tag is placed on default Harold:
* <Single Skill Command: 13>
* Harold's commands will be: Attack, Wind Slash, Magic, Guard, Item
* Note that whether these single skill commands appear before or after the
* skill category commands (ie, Magic) can be set in the plugin parameters.
* This tag can be placed on actors, classes, equips, and states.
*
* ----------------------------------------------------------------------
* Attack unleashes
* ----------------------------------------------------------------------
* Note:  I realize Yanfly already has a plugin for this.  It's been added
* here anyway due to conflicts this plugin can have with his weapon unleash
* plugin.
* 
* <Unleash Attack: x, y>
* <Unleash Attack>
* x, y
* x2, y2
* </Unleash Attack>
* Using a basic attack has a chance to use the specified skill.
* x represent a skill id and y represent the chance for that skill to activate
* instead of the normal attack skill.  This chance is a value between 0
* (0% chance) and 1 (100% chance) and can be expressed as an eval.  The eval
* code has acces to the user and any related stats (user.hp, etc).  Multiple
* unleash skills can be set by separating id/chance pairs with a linebreak.
* A few examples:
* <Unleash Attack: 7, 0.3>                     // 30% chance to use skill 7
* <Unleash Attack>                             // 10%: skill 5, 25%: skill 9
* 5, 0.1                                       // skills are checked from
* 9, 0.25                                      // first to last until
* </Unleash Attack>                            // successful 
* <Unleash Attack: 15, 1 - user.hp / user.mhp> // higher chance with lower hp
* <Unleash Attack: 17, 50 <= user.tp>          // used if user's tp is 50+
* <Unleash Attack: 21, user.hp < 20 ? 1 : 0>   // 100% if user hp below 20
* Priority is, from lowest to highest: actor/enemy, class, equip, state
*
* <Unleash Modifier: x>
* This is a multiplier applied to the chance for unleash attacks to trigger.
* So <Unleash Modifier: 2> will double the chance of unleashing a special
* attack.  This can be placed on actors/enemies, classes, equips, and states.
*
* ----------------------------------------------------------------------
* Bonus states applied by guarding
* ----------------------------------------------------------------------
* <Guard State: x, y, ...z>
* When a battler uses guard, the target (usually the user) will be affected
* by the specified state(s) in addition to the normal Guard state.  This tag
* applies to actors/enemies, classes, equips, and states.
*
* <Guard State All: x, y, ...z>
* Same as <Guard State> but applies the bonus state(s) to all allies of the
* target.  So someone equipped with the Improved Fire Shield can apply a fire
* resist barrier to his/her entire party by guarding.
*/
(function($$)
{
	function processList(args)
	{
		var result;
		args = args.toLowerCase();
		try
		{
			result = JSON.parse(args);
		}
		catch(e)
		{
			result = [];
			console.log("AES_CommandContro:  Error parsing plugin paramters:")
			console.log(args);
		}
		return result;
	}
	$$.pluginParameters = PluginManager.parameters("AES_CommandControl");
	$$.params = {};
	$$.params.limitCommand = +$$.pluginParameters["Limit Break Command"] || 0;
	$$.params.limitThreshold = +$$.pluginParameters["Limit Break Threshold"] || 0;
	$$.params.singleSkillCommandOrder = String($$.pluginParameters["Single Skill Command Order"]).toLowerCase() === "false" ? false : true;
	$$.params.enableAttack = String($$.pluginParameters["Enable Attack"]).toLowerCase() === "false" ? false : true;
	$$.params.enableGuard = String($$.pluginParameters["Enable Guard"]).toLowerCase() === "false" ? false : true;
	$$.params.enableItem = String($$.pluginParameters["Enable Item"]).toLowerCase() === "false" ? false : true;
	$$.params.leftCommandList = processList(String($$.pluginParameters["Left Command List"])) || [];
	$$.params.rightCommandList = processList(String($$.pluginParameters["Right Command List"])) || [];
	$$.params.hiddenSkillCommands = String($$.pluginParameters["Hidden Skill Commands"]).split(" ").map(x => +x || 0);
/**-------------------------------------------------------------------	
	Aesica.Toolkit: Note tag parsing functions
//-------------------------------------------------------------------*/
	if ((Aesica.Toolkit.version || 0) < Aesica.Toolkit.commandControlVersion)
	{
		Aesica.Toolkit.version = Aesica.Toolkit.commandControlVersion;
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
				while (match = rx.exec(tagData[i])) oUnit[match[1]] = match[2];
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
	Static command control - Attack, Guard, Item, Limit Breaks,
	Attack replacers, and Guard state bonuses
//-------------------------------------------------------------------*/
	Scene_Battle.prototype.createActorCommandWindow = function()
	{
		this._actorCommandWindow = new Window_ActorCommand();
		this._actorCommandWindow.setHandler("attack", this.commandAttack.bind(this));
		this._actorCommandWindow.setHandler("skill", this.commandSkill.bind(this));
		this._actorCommandWindow.setHandler("singleSkill", this.commandSingleSkill.bind(this));
		this._actorCommandWindow.setHandler("guard", this.commandGuard.bind(this));
		this._actorCommandWindow.setHandler("item", this.commandItem.bind(this));
		this._actorCommandWindow.setHandler("cancel", this.selectPreviousCommand.bind(this));
		this.addWindow(this._actorCommandWindow);
	}
	$$.Window_ActorCommand_createAllParts = Window_ActorCommand.prototype._createAllParts;
	Window_ActorCommand.prototype._createAllParts = function()
	{
		$$.Window_ActorCommand_createAllParts.call(this);
		this._leftArrowSprite = new Sprite();
		this._rightArrowSprite = new Sprite();
		this.addChild(this._leftArrowSprite);
		this.addChild(this._rightArrowSprite);
	}
	Scene_Battle.prototype.commandSingleSkill = function()
	{
		var skill = $dataSkills[this._actorCommandWindow.currentExt()];
		BattleManager.inputtingAction().setSkill(skill.id);
		BattleManager.actor().setLastBattleSkill(skill);
		this.onSelectAction();
	}
	$$.Window_ActorCommand_setup = Window_ActorCommand.prototype.setup;
	Window_ActorCommand.prototype.setup = function(actor)
	{
		this._commandPage = 0;
		this._leftCommandMax = 0;
		this._rightCommandMax = 0;
		$$.Window_ActorCommand_setup.call(this, actor);
	}
	Window_ActorCommand.prototype.makeCommandList = function()
	{
		var attackMode, guardMode, itemMode;
		var activeList = [];
		var inactiveList = [];
		if (this._actor)
		{
			attackMode = this._actor.commandEnabled("attack", $$.params.enableAttack) && this.commandListId(this._actor.attackSkillId()) === this._commandPage;
			guardMode = this._actor.commandEnabled("guard", $$.params.enableGuard) && this.commandListId(this._actor.guardSkillId()) === this._commandPage;
			itemMode = this._actor.commandEnabled("item", $$.params.enableItem) && this.commandListId(TextManager.item) === this._commandPage;
			if (this._actor.tp >= $$.params.limitThreshold && $$.params.limitCommand > 0 && $$.params.limitCommand < $dataSystem.skillTypes.length && this._actor.hasLimitSkill() && this.commandListId(this._actor.attackSkillId()) === this._commandPage) this.addLimitCommand();
			else if (attackMode) this.addAttackCommand();
			if ($$.params.singleSkillCommandOrder)
			{
				this.addSingleSkillCommands();
				this.addSkillCommands();
			}
			else
			{
				this.addSkillCommands();
				this.addSingleSkillCommands();
			}
			if (guardMode) this.addGuardCommand();
			if (itemMode) this.addItemCommand();
		}
	}
	Window_ActorCommand.prototype.commandListId = function(skillId)
	{
		var result = 0;
		var skill = typeof skillId === "number" ? $dataSkills[skillId] : null;
		var skillName = (skill ? skill.name : skillId).toLowerCase();
		var skillTag;
		if (skillName)
		{
			if ($$.params.rightCommandList.contains(skillName)) result = 1;
			else if ($$.params.leftCommandList.contains(skillName)) result = -1;
			if (skill)
			{
				skillTag = Aesica.Toolkit.getTag.call(skill, "Command Page");
				if (String(skillTag).toLowerCase() === "right") result = 1;
				else if (String(skillTag).toLowerCase() === "left") result = -1;
			}
			if (!this._leftCommandMax && result === -1) this._leftCommandMax = -1;
			if (!this._rightCommandMax && result === 1) this._rightCommandMax = 1;
		}
		return result;
	}
	$$.Window_ActorCommand_refreshArrows = Window_ActorCommand.prototype._refreshArrows;
	Window_ActorCommand.prototype._refreshArrows = function()
	{
		$$.Window_ActorCommand_refreshArrows.call(this);
		var w = this._width;
		var h = this._height;
		var rect = {"x":119, "y":39, "width":16, "height":30, "halfWidth": 8};		
		this._leftArrowSprite.bitmap = this._windowskin;
		this._leftArrowSprite.anchor.x = 0.5;
		this._leftArrowSprite.anchor.y = 0.5;
		this._leftArrowSprite.setFrame(rect.x, rect.y, rect.width, rect.height);
		this._leftArrowSprite.move(rect.halfWidth, h * 0.5);
		this._rightArrowSprite.bitmap = this._windowskin;
		this._rightArrowSprite.anchor.x = 0.5;
		this._rightArrowSprite.anchor.y = 0.5;
		this._rightArrowSprite.setFrame(rect.x + 34, rect.y, rect.width, rect.height);
		this._rightArrowSprite.move(w - rect.halfWidth, h * 0.5);
	}
	$$.Window_ActorCommand_updateArrows = Window_ActorCommand.prototype._updateArrows;
	Window_ActorCommand.prototype._updateArrows = function()
	{
		$$.Window_ActorCommand_updateArrows.call(this);
		this._leftArrowSprite.visible = this.isOpen() && this.leftArrowVisible;
		this._rightArrowSprite.visible = this.isOpen() && this.rightArrowVisible;
	}
	$$.Window_Selectable_drawAllItems = Window_Selectable.prototype.drawAllItems;
	Window_Selectable.prototype.drawAllItems = function()
	{
		this.leftArrowVisible = this._commandPage > this._leftCommandMax;
		this.rightArrowVisible = this._commandPage < this._rightCommandMax;
		$$.Window_Selectable_drawAllItems.call(this);
	}
	$$.Window_ActorCommand_addAttackCommand = Window_ActorCommand.prototype.addAttackCommand;
	Window_ActorCommand.prototype.addAttackCommand = function()
	{
		var battler = this._actor;
		var tagName = "Replace Attack";
		var attackId = 1;
		var tagData, canReplace, tag;
		var user = battler;
		if (battler)
		{
			tagData = battler.getTag(tagName, true).reverse();
			for (i in tagData)
			{
				tag = tagData[i].split(",");
				try
				{
					canReplace = tag[1] ? eval(tag[1]) : true;
				}
				catch(e)
				{
					console.log("AES_CommandControl: Eval error in <Replace Attack> => " + tagData[1]);
				}
				if (canReplace)
				{
					attackId = +tag[0] || 1;
					break;
				}
			}
			battler._attackSkillReplaceID = attackId;
			this.addCommand($dataSkills[attackId].name, "attack", battler.canAttack());
		}
		else $$.Window_ActorCommand_addAttackCommand.call(this);
	}
	Window_ActorCommand.prototype.addSingleSkillCommands = function()
	{
		var battler = this._actor;
		var tagName = "Single Skill Command";
		var commandList, canUse, skillId; 
		if (battler)
		{
			commandList = battler.getTag(tagName, true).join(",").split(",");
			for (i in commandList)
			{
				skillId = +commandList[i]
				if (skillId && this.commandListId(skillId) === this._commandPage)
				{
					canUse = battler.canUse($dataSkills[skillId]);
					this.addCommand($dataSkills[skillId].name, "singleSkill", canUse, skillId);
				}
			}
		}
	}
	Window_ActorCommand.prototype.addSkillCommands = function()
	{
		var skillTypes = this._actor.addedSkillTypes();
		skillTypes.sort(function(a, b) {
			return a - b;
		});
		skillTypes.forEach(function(stypeId)
		{
			var name = $dataSystem.skillTypes[stypeId];
			if (this.commandListId(name) === this._commandPage && !$$.params.hiddenSkillCommands.contains(stypeId)) this.addCommand(name, 'skill', true, stypeId);
		}, this);
	}	
	Window_ActorCommand.prototype.addLimitCommand = function()
	{
		this.addCommand($dataSystem.skillTypes[$$.params.limitCommand], 'skill', true, $$.params.limitCommand);
	}
	Window_ActorCommand.prototype.cursorLeft = function()
	{
		this._commandPage--;
		if (this._commandPage < this._leftCommandMax) this._commandPage = this._leftCommandMax;
		else
		{		
			SoundManager.playCursor();
			this.updateCommandList();
		}
	}
	Window_ActorCommand.prototype.cursorRight = function()
	{
		this._commandPage++;
		if (this._commandPage > this._rightCommandMax) this._commandPage = this._rightCommandMax;
		else
		{		
			SoundManager.playCursor();
			this.updateCommandList();
		}
	}	
	Window_ActorCommand.prototype.updateCommandList = function()
	{
		this.clearCommandList();
		this.refresh();
		this.select(0);
		this.activate();		
	}
	Game_Actor.prototype.commandEnabled = function(command, enabledByDefault) 
	{
		var result = this.getTag(command + " command", true);
		result = result.length > 0 ? result[result.length - 1] : (enabledByDefault ? "show" : "hide");
		return result.match(/hide/i) ? false : true;
	}

	Game_BattlerBase.prototype.attackSkillId = function()
	{
		return this._attackSkillReplaceID || 1;
	}
	$$.Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
	Game_Action.prototype.applyItemUserEffect = function(target)
	{
		$$.Game_Action_applyItemUserEffect.call(this, target);
		if (this.isGuard()) this.applyGuardBonusStates(target);
	}
	Game_Actor.prototype.hasLimitSkill = function()
	{
		var skills = this.skills();
		var bReturn = false;
		for (i in skills)
		{
			if (skills[i].stypeId == $$.params.limitCommand)
			{
				bReturn = true;
				break;
			}
		}
		return bReturn;
	}
	Game_Action.prototype.applyGuardBonusStates = function(target)
	{
		var user = this.subject();
		var stateList = user.getTag("Guard State", true);
		var stateListAll = user.getTag("Guard State All", true);
		var x, targetParty = target.friendsUnit().members();
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
						current = unleashList[i].split(/[\r\n]+/);
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
								console.log("AES_CommandControl: Eval error in <Unleash Attack> => " + rawEval);
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
})(Aesica.CommandControl);