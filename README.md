If you find these helpful, feel free to support me on Patreon:
https://www.patreon.com/aesica

## Aesica's RMMV Plugins - Terms of Use
These terms apply to every RMMV plugin in this repo:
- Free to use in both free and commercial projects as long as I am given credit.
- Forked versions of these plugins are fine as long as I am given credit.
- You may edit the code as needed to fit your game
- You may NOT remove my name from the @author section, you may NOT remove the link to this readme from the @help section, and you may NOT attempt to otherwise pass my work off as your own (come on, we all know that's a dick move, so don't be one~)
- A copy of your game (once completed) would be nice so I can see how my scripts are being used, but it's not required.

## How to Credit Me
- List my name (Aesica) in your game's credits under your scripts/code section, or under "Scripting" if you don't yet have a scripting section.  Easy peasy, right? :D

## Compatibility with Yanfly's plugins

For the most part, these plugins are made to be compatible, however there are a few exceptions:
- YEP_WeaponUnleash:  Incompatible with various things in AES_CommandControl.  To compensate, I've added my own version of skill unleash so that functionality isn't lost.  For the most part.

## Features and Changelog

### AES_Core
Info:  Contains quite a few small (but generally useful) improvements to the basic engine, including:
- Config manager initial settings control
- Master volume control added to settings
- Instant text rendering, and option to enable/disable it added to settings
- Self switch management functions for use with event note tags (many are current map only)
- Case-insensitive note tag parsing functions
- Plugin commands to give players an item/gold, play a sound, and display a message in a uniform, consistent way
- Execution of plugin commands via script calls using the same syntax format as a standard plugin command
- Patch to fix the "Possessed" counter error in shops by including equipped items
- Customize default multiplier for item sell prices
- Control over bush opacity vs the lower half of actors and events
- Probably some other things I'm forgetting

**8/20/2019 - 2.7**
- Added version control for Aesica.Toolkit (mostly notetag processing functions) so that multiple plugins using it won't overwrite it unless their version is newer.  In light of this change, it is strongly recommened that you update to this version or later if using more than one of my plugins.

**8/1/2019 - 2.6**
- Removed AutoSave functionality.  It is now its own plugin
- Plugin commands used by this plugin are no longer case sensitive

**6/20/2019 - 2.5**
- Expanded note tag functionality to include support for both <tag: x> and <tag>x</tag> formats

**5/28/2019 - 2.4**
- Moved the MP Aliasing functionality into its own plugin - AES_CustomMP

**5/26/2019 - 2.3**
- Added MP Aliasing functionality, enabling different classes to display MP in different ways--class specific names, gauge colors, etc.
- MP Aliasing also updates how skill costs are displayed, similar to how YEP_SkillCore displays them.  This is due mostly to this plugin needing to overwrite YEP_SkillCore's MP display functions in order to display aliased MP correctly.
- MP Aliasing also allows classes to hide between-round MP regen

**5/8/2019 - 2.1**
- Added plugin commands to allow for mass-removing abilities on actors, skipping abilities with the \<Permanent Skill\> note tag.
- Added function to characters/events that allows their image to be set based on a specified actor ID.  So in event move sequences, this.setImageByActorId(2) will set that event's image to the second actor's walk-around sprite

----------------------------------------------------------------------------------------------------------------------

### AES_BattleCore
Info: The contents of this plugin were split off from AES_Core.  Includes various battle system improvements and features:
- Damage formula functions for use in the formula box, allowing for later tweaks in 1 place instead of in every skill or item
- Adjust the critical hit damage bonus modifier
- Note tags capable of further tweaking the critical hit multiplier on actors/enemies, classes, equips, and states
- Customize the starting TP in battle when TP doesn't carry over
- Methods to access a battler's equipped weapon stats (a.weaponAtk for example)
- Minimum and/or maximum damage caps
- Additional/custom stats via note tags
- Final Fantasy "Gravity" (percent-of-hp) formula with immunity available via actor/enemy, class, equip, and state note tags
- Settings to recover hp and/or mp by varying amounts, as well as reviving dead members after battles
- Can sort equip/state-added skills in with baseline skills and sort via various skill parameters
- Can add zone-based effects to battles, so that being deep in a volcano burns everybody every turn, etc
- Able to alter the color and opacity of the battle log window
- Certain skills can be set to not display action text (or their name if using YEP_BattleEngineCore) via note tag

**8/20/2019 - 2.0**
- Added version control for Aesica.Toolkit (mostly notetag processing functions) so that multiple plugins using it won't overwrite it unless their version is newer.
- Removed all of the "command control" functions (unleash, attack replace, guard state, disable attack/guard/item, etc).  Those effects now have their own plugin.
- In light of this change, it is strongly recommened that you update to this version or later.
- Added support for death/game over states in addition to the default death (1) state
- Can now use zone-based effects (damage, state applications, etc) that can be auto-applied every turn in battle, as well as manually by plugin command

**8/1/2019 - 1.95**
- Bugfix for single skill commands.  There was heinous fuckery afoot, but this is no longer the case.

**7/26/2019 - 1.9**
- Added functionality which allows one or more individual skills to be added to an actor's command window via note tags, such as FF6 Terra's Morph ability.  <Single Skill Command: x, ...etc>  Usable on actors, classes, equips, and states

**7/14/2019 - 1.8**
- Fixed a problem where the Limit command was appearing for characters without any Limit skills learned. Now, it will only appear when the TP threshold is reached AND only if the character has at least one Limit skill learned.
- Added a means to sort temporary skills (acquired from equips, states, etc) in with baseline skills.  By default, temporary skills appear after baseline skills, regardless of skill id.
- When the improved sorting system is enabled, skills can be sorted by other crtieria besides skill id--alphabetically by name, by mp cost, alphabetically by note field, etc

**6/20/2019 - 1.7**
- Expanded note tag functionality to include support for both <tag: x> and <tag>x</tag> formats

**6/20/2019 - 1.6**
- Fixed a bug where <Replace Attack: x> was reading an actor's default/initial class instead of their current class
- <Replace Attack: x> now correctly prioritizes last-to-first, meaning when multiple equips or states try to replace attack with something, the last equip or the most recently applied state will take priority
- Made several minor, behind-the-scenes adjustments and optimizations, resulting in a slightly smaller file

**6/18/2019 - 1.5**
- Added an unleash system, similar to Yanfly's.  This is mostly due to certain features of this plugin being incompatible with yanfly's unleash plugin.
- Added support to the weaponStat functions for Yanfly's equip core and custom eval parameters.

**6/4/2019 - 1.4**
- Added plugin parameters to customize the color/opacity of the combat log window.
- Added a note tag for skills and items <Hide Combat Text> that can be used to suppress the initial use text from the combat log.  (Harold attacks! for example)

**5/28/2019 - 1.3**
- Removed the after-battle revive feature, as the death state can be changed to expire after combat innately
- Optimized the after-battle HP/MP recovery functionality somewhat.

**5/8/2019 - 1.1**
- Minor bugfixes

----------------------------------------------------------------------------------------------------------------------

### AES_CommandControl
Info:  Gives you more control over the various actor commands and such
- Can enable/disable Attack/Guard/Item, both by default and individually by note tags
- Can replace basic attack with another skill, optionally with conditional requirements
- Allows for condition-based attack unleash effects
- In addition to the default Guard state, guarding can grant additional states to either the user, their party, or both
- Can add individual skills as actor commands
- Features a basic limit break system that utilizes TP

----------------------------------------------------------------------------------------------------------------------

### AES_BattlerGauge (formerly AES_EnemyGauge)
Info:  Adds gauges above/beneath actors/enemies for various stats (hp, mp, tp, etc)
- Hide specific gauges for specific foes
- Can display different gauge widths for normal foes, bosses, and actors
- Supports custom stats/resources added by other plugins (see plugin documentation for details)
- When dealing damage/expending HP/MP/TP/etc, can display the before/after difference briefly
- Fully customizable gauge width, height, line thickness, padding, Y offset, etc
- Compatible with YEP_X_BattleSysATB and can be used to display battler ATB gauges if that plugin is used

**11/7/2019 - 1.4**
- Fixed a bug that allowed actor gauges to show in the side view locations when using front view
- Fixed a bug where this plugin was unintentionally dependent on YEP_BattleCore.  Oops!

**9/26/2019 - 1.3**
- Fixed an obscure bug that could cause a crash when fleeing a battle when an enemy (and/or possibly actor) is charging a skill.  Only applies to the ATB gauge.

----------------------------------------------------------------------------------------------------------------------

### AES_CustomMP
Info:  Allows extra customizations for MP
- Allows for coloring the MP bar as well as the skill MP cost display on a per-class basis.
- Can rename MP on a per-class basis
- Note tags can be used to customize how HP/MP recovers (or is lost) after each battle - can also auto-revive after combat via note tags.  These tags can be placed on actors, classes, equips, and states
- Can customize what HP/MP is set to when "Recover All" is invoked
- Improves the skill cost display to show both TP and MP for skills which cost both, similar to how YEP_SkillCore does it.
- Can hide between-rounds MP regen on certain classes with note tags.  Other forms of MP regen show normally
- Added a gainSilentMp function for restoring MP without displaying any numbers in combat.

**9-25-2019 - 1.7**
- Added internal functionality for use with AES_BattlerGauge.  This version (or later) is required for displaying custom MP colors with that plugin

**8/20/2019 - 1.6**
- Added version control for Aesica.Toolkit (mostly notetag processing functions) so that multiple plugins using it won't overwrite it unless their version is newer.  In light of this change, it is strongly recommened that you update to this version or later if using more than one of my plugins.

**6/20/2019 - 1.5**
- Expanded note tag functionality to include support for both <tag: x> and <tag>x</tag> formats
- Added additional information about the <After Battle ...> note tags to make them (hopefully) easier to understand

**6/18/2019 - 1.4**
- Added a note about eval in note tags <After Battle Recover HP/MP> and <Offensive/Defensive MP Gain> and how using greater-than signs will close the tag prematurely.  An alternate note tag format <Note Tag>Stuff</Note Tag> will probably be introduced in the future, when I'm not feeling lazy.
- Fixed an issue where invalid eval in these note tags was crashing the game.  Now it sends an error and dumps the offending eval to the debug console.

**6/14/2019 - 1.3**
- Added note tags for recovering MP when dealing or receiving physical, magical, and/or certain hit damage as well as ways of applying modifiers to these effects

**6/4/2019 - 1.2**
- Fixed a bug where AES_Core was being required when it wasn't necessary

**5/8/2019 - 1.1**
- Added support for the verbose combat messages (which most people turn off anyway, but it's there for those who want it) and the "full" term for MP, accessible by Game_BattlerBase.prototype.mpName
- Added support for customizing enemy MP terms as well, although this is really only relevant if using verbose combat messages or plugins/features that expose enemy MP
- Fixed a bug where Game_BattlerBase.prototype.mpA was set as as function instead of a property.  It should now work according
to the plugin documentation.  (so a.mpA in the damage formula box)

----------------------------------------------------------------------------------------------------------------------

### AES_Autosave
Info:  Adds autosaving to your game via plugin command
- Can use the AutoSave plugin command to save automatically into slot 1
- Can use the SaveGame plugin command to save into the last used slot
- Can relabel the autosave slot (1) as "Auto Save"
- Can lock slot 1 to prevent the player from manually saving data in that slot
- Fully compatible with YEP_SaveCore--locking slot 1 will also prevent deletion
- Can save into a specific slot using the SaveInSlot plugin command (advanced)

Note:  If using YEP_SaveCore, this plugin needs to be placed below it in order for slot 1 locking to work properly!

**8/20/2019 -1.1**
- Just a few minor changes nobody will care about.  I don't even remember, actually!

----------------------------------------------------------------------------------------------------------------------

### AES_RaceCore
Info:  Adds races and racial modifiers to your game's battle system
- Add races to enemies and actors
- Damage vs racetype note tags for actors/enemies, classes, skills, equips, and states
- Defense vs racetype note tags for actors/enemies, classes, skills, equips, and states
- Function to retrieve the name of the target's race

**5/8/2019 - 1.5**
- Fixed a bug that was causing crashes in some cases
