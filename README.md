## Aesica's RMMV Plugins - Terms of Use
These terms apply to every RMMV plugin in this repo:
- Free to use in both free and commercial projects as long as I am given credit.
- Forked versions of these plugins are fine as long as I am given credit.
- You may edit the code as needed to fit your game
- You may NOT remove my name from the @author section, you may NOT remove the link to this readme from the @help section, and you may NOT attempt to otherwise pass my work off as your own (come on, we all know that's a dick move, so don't be one~)
- A copy of your game (once completed) would be nice so I can see how my scripts are being used, but it's not required.

## How to Credit Me
- List my name (Aesica) in your game's credits under your scripts/code section, or under "Scripting" if you don't yet have a scripting section.  Easy peasy, right? :D

Unless otherwise noted or unless I missed something, these plugins should be fully compatible with the Yanfly suite.

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
- Autosaving via plugin command
- Control over bush opacity vs the lower half of actors and events
- Probably some other things I'm forgetting

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
- A basic "Limit Break" system
- Option to disable Attack, Guard, or Item
- Replace the attack command with a skill via note tags from actors, classes, equips, and states (lowest to highest priority)
- Add states to either the user or entire party via guard with note tags on actors/enemies, classes, equips, and states
- Damage formula functions for use in the formula box, allowing for later tweaks in 1 place instead of in every skill or item
- Adjust the critical hit damage bonus modifier
- Note tags capable of further tweaking the critical hit multiplier on actors/enemies, classes, equips, and states
- Customize the starting TP in battle when TP doesn't carry over
- Methods to access a battler's equipped weapon stats (a.weaponAtk for example)
- Minimum and/or maximum damage caps
- Additional/custom stats via note tags
- Final Fantasy "Gravity" (percent-of-hp) formula with immunity available via actor/enemy, class, equip, and state note tags
- Settings to recover hp and/or mp by varying amounts, as well as reviving dead members after battles

**5/28/2019 - 1.3**
- Removed the after-battle revive feature, as the death state can be changed to expire after combat innately
- Optimized the after-battle HP/MP recovery functionality somewhat.

**5/8/2019 - 1.1**
- Minor bugfixes

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

**6/4/2019 - 1.2**
- Fixed a bug where AES_Core was being required when it wasn't necessary.

**5/8/2019 - 1.1**
- Added support for the verbose combat messages (which most people turn off anyway, but it's there for those who want it) and the "full" term for MP, accessible by Game_BattlerBase.prototype.mpName
- Added support for customizing enemy MP terms as well, although this is really only relevant if using verbose combat messages or plugins/features that expose enemy MP
- Fixed a bug where Game_BattlerBase.prototype.mpA was set as as function instead of a property.  It should now work according
to the plugin documentation.  (so a.mpA in the damage formula box)

----------------------------------------------------------------------------------------------------------------------

### AES_RaceCore
Info:  Adds races and racial modifiers to your game's battle system
- Add races to enemies and actors
- Damage vs racetype note tags for actors/enemies, classes, skills, equips, and states
- Defense vs racetype note tags for actors/enemies, classes, skills, equips, and states
- Function to retrieve the name of the target's race

**5/8/2019 - 1.5**
- Fixed a bug that was causing crashes in some cases
