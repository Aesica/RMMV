## Aesica's RMMV Plugins - Terms of Use
These terms apply to everything
- Anything hosted here is free to use in both free and commercial projects as long as you give me credit.
- Forked versions of these plugins are fine, provided you give me credit.
- You may edit the code as needed to fit your game
- A copy of your game (once completed) would be nice so I can see how my scripts are being used, but isn't required.

Unless otherwise noted, these plugins are fully compatible with the Yanfly suite.

### AES_Core
Contains several small (but useful) improvements to the basic engine, including:
- Config manager initial settings control
- Self switch management functions for use with event note tags (many are current map only)
- Master volume control added to settings
- Note tag parsing functions
- A basic "Limit Break" system
- Option to disable Attack, Guard, or Item
- Replace the attack command via note tags from actors, classes, equips, and states (lowest to highest priority)
- Add states to either the user or entire party via guard with note tags on actors/enemies, classes, equips, and states
- Damage formula functions for use in the formula box, allowing for later tweaks in 1 place instead of in every skill or item
- Adjust the critical hit damage bonus modifier
- Customize the starting TP in battle when TP doesn't carry over
- Methods to access a battler's equipped weapon stats (a.weaponAtk() for example)
- Minimum and/or maximum damage caps
- Plugin commands to give players an item/gold, play a sound, and display a message in a unified, consistent way via plugin commands
- Instant text rendering
- Execution of plugin commands via script calls using the same syntax format as a standard plugin command
- Patch to fix the "Possessed" counter error in shops by including equipped weapons and armor
- Probably some other things I'm forgetting

### AES_RaceCore
Adds the ability to assign races to actors and enemies, as well as modifiers vs those races, or modifiers vs attacks coming from those races.  These modifiers can be placed on actors, classes, enemies, items, skills, weapons, and armor.
