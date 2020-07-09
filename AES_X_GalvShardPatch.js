var Imported = Imported || {};
Imported.AES_GalvShardPatch = true;
var Aesica = Aesica || {};
Aesica.Toolkit = Aesica.Toolkit || {};
/*:
* @plugindesc v1.0 Allows all AES_* actor/enemy/class/equip/state iterations to include Galv's magic shards.  Order becomes: actor/enemy, class, equip, shard, state
* @author Aesica
*
* @help
* For terms of use, see:  https://github.com/Aesica/RMMV/blob/master/README.md
* Support me on Patreon:  https://www.patreon.com/aesica
*
* ----------------------------------------------------------------------
* Overview
* Place below all other AES_* plugins
*/
Game_BattlerBase.prototype.getTag = function(tag, deepScan=false)
{
	var value = [];
	var isActor = this.isActor();
	var actor = isActor ? this.actor() : this.enemy();
	var equip, state, shard;
	if (Aesica.Toolkit.tagExists.call(actor, tag)) value.push(Aesica.Toolkit.getTag.call(actor, tag));
	if (deepScan)
	{
		if (isActor)
		{
			if (Aesica.Toolkit.tagExists.call($dataClasses[this._classId], tag)) value.push(Aesica.Toolkit.getTag.call($dataClasses[this._classId], tag));
			equip = this.weapons().concat(this.armors());
			for (i in equip){ if (Aesica.Toolkit.tagExists.call(equip[i], tag)) value.push(Aesica.Toolkit.getTag.call(equip[i], tag)); }
			shard = this._shards || {};
			for (i in shard){ if (Aesica.Toolkit.tagExists.call(shard[i].object(), tag)) value.push(Aesica.Toolkit.getTag.call(shard[i].object(), tag)); }
		}
		state = this.states();
		for (i in state){ if (Aesica.Toolkit.tagExists.call(state[i], tag)) value.push(Aesica.Toolkit.getTag.call(state[i], tag)); }
	}
	return deepScan ? value : (value[0] ? value[0] : false);
};
