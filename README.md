# Aesica's RMMV Plugins - Terms of Use
This is the dumping ground for my (small) collection of JavaScript Plugins for RMMV.
- Anything hosted here is free to use in both free and commercial projects as long as you give me credit.
- You may edit the code as needed to fit your game
- A copy of your game (once completed) would be nice so I can see how my scripts are being used, but isn't required.

Unless otherwise noted, these plugins are fully compatible with the Yanfly suite.

## AES_Core
Contains several small (but useful) improvements to the basic engine, including:
- A basic "Limit Break" system
- Option to disable Attack, Guard, or Item
- Damage formula functions for use in the formula box, allowing for later tweaks in 1 place instead of in every skill or item
- Methods to access a battler's equipped weapon stats (a.weaponAtk() for example)
- Minimum and/or maximum damage caps
- Plugin commands to give players an item/gold, play a sound, and display a message in a unified way
- Instant text rendering
- Patch to fix the "Possessed" counter error in shops by including equipped weapons and armor

## AES_RaceCore
Adds the ability to assign races to actors and enemies, as well as modifiers vs those races, or modifiers vs attacks coming from those races.  These modifiers can be placed on actors, classes, enemies, items, skills, weapons, and armor.
