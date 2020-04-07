/*:
* @plugindesc v1.0 Adds dice-rolling functions for use in damage formulas
*
* @author Aesica
*
* @help
* This is a bonus, 1 minute throwtogether plugin!
*
* For terms of use, see:  https://github.com/Aesica/RMMV/blob/master/README.md
* Support me on Patreon:  https://www.patreon.com/aesica
*
* For use in damage formulas:
*
* d4(n)   // roll a d4 n times
* d6(n)   // roll a d6 n times
* d8(n)   // roll a d8 n times
* d10(n)  // roll a d10 n times
* d12(n)  // roll a d12 n times
* d20(n)  // roll a d20 n times
* d100(n) // roll a d100 n times
* dice(sides, times) // custom dice roll
*
* Example formulas:
* a.atk + d6(4) - b.def + d6(2)
* d20(a.level) - b.def
* dice(3, a.level) - b.def
*
* ...etc
*/
function dice(sides, times=1)
{
	var result = 0;
	for (var i = 0; i < times; i++)	result += Math.floor(Math.random() * sides) + 1;
	return result;
}
function d4(times=1){ return dice(4, times); }
function d6(times=1){ return dice(6, times); }
function d8(times=1){ return dice(8, times); }
function d10(times=1){ return dice(10, times); }
function d12(times=1){ return dice(12, times); }
function d20(times=1){ return dice(20, times); }
function d100(times=1){ return dice(100, times); }