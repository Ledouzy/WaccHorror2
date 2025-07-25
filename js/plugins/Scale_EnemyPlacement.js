//=============================================================================
// Scale_EnemyPlacement.js
//=============================================================================
/*:
* @target MZ
* @plugindesc v1.0 Scale Enemy Placement
* @author CakeBakeMaker
*
*
* @help Scale_EnemyPlacement.js
*
* This plugin scales enemy placement in the troop window
* to your chosen resolution. Enemies will no longer be stuck
* to the top of the screen.
*/
(() => {
	
Game_Enemy.prototype.screenX = function() {
    return (this._screenX/816) * Graphics.boxWidth;
};

Game_Enemy.prototype.screenY = function() {
	
    return (this._screenY/420) * Graphics.boxHeight;
};

})();
// EOF