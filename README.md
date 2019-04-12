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

### AES_Core
Note:  This thing's getting pretty beastly, so I may end up splitting the battle functions off into their own plugin.
Info:  Contains quite a few small (but generally useful) improvements to the basic engine, including:
- Config manager initial settings control
- Master volume control added to settings
- Instant text rendering, and option to enable/disable it added to settings
- Self switch management functions for use with event note tags (many are current map only)
- Case-insensitive note tag parsing functions
- A basic "Limit Break" system
- Option to disable Attack, Guard, or Item
- Replace the attack command with a skill via note tags from actors, classes, equips, and states (lowest to highest priority)
- Add states to either the user or entire party via guard with note tags on actors/enemies, classes, equips, and states
- Damage formula functions for use in the formula box, allowing for later tweaks in 1 place instead of in every skill or item
- Adjust the critical hit damage bonus modifier
- Note tags capable of further tweaking the critical hit multiplier on actors/enemies, classes, equips, and states
- Customize the starting TP in battle when TP doesn't carry over
- Methods to access a battler's equipped weapon stats (a.weaponAtk() for example)
- Minimum and/or maximum damage caps
- Plugin commands to give players an item/gold, play a sound, and display a message in a uniform, consistent way
- Execution of plugin commands via script calls using the same syntax format as a standard plugin command
- Patch to fix the "Possessed" counter error in shops by including equipped items
- Customize default multiplier for item sell prices
- Autosaving via plugin command
- Additional/custom stats via note tags
- Control over bush opacity vs the lower half of actors and events
- Final Fantasy "Gravity" (percent-of-hp) formula with immunity available via actor/enemy, class, equip, and state note tags
- Settings to recover hp and/or mp by varying amounts, as well as reviving dead members after battles
- Probably some other things I'm forgetting

### AES_RaceCore
Info:  Adds the ability to assign races to actors and enemies, as well as modifiers vs those races, or modifiers vs attacks coming from those races.  These modifiers can be placed on actors, classes, enemies, items, skills, weapons, and armor.
