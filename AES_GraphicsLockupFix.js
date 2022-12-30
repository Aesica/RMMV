/*:
* @plugindesc v1.0 Fix for MV's graphics rendering softlock bug
*
* @author Aesica
*
* @help Just add the plugin and you're good to go.  No configuration required!
*
* Details:  Occasionally, RMMV's graphics rendering will stop while the rest of
* the game continues to function normally.  This is due to Graphics._skipCount
* potentially being a negative value when the render function is only looking
* for a value of 0.  This updates the function to also check for potential
* negative values.
*/
Graphics.render = function(stage)
{
	if (this._skipCount <= 0) // <-- bugfix
	{
		var startTime = Date.now();
		if (stage)
		{
			this._renderer.render(stage);
			if (this._renderer.gl && this._renderer.gl.flush) this._renderer.gl.flush();
		}
		var endTime = Date.now();
		var elapsed = endTime - startTime;
		this._skipCount = Math.min(Math.floor(elapsed / 15), this._maxSkip);
		this._rendered = true;
	}
	else
	{
		this._skipCount--;
		this._rendered = false;
	}
	this.frameCount++;
};