ig.module
( 
	'game.gamestates.intro' 
)
.requires
(
	'impact.game',
	'game.gamestates.game'
)
.defines(function()
{
	Intro = ig.Game.extend(
	{
		_img_bg: new ig.Image('media/intro.png'),

		_intro_timer: null,

		init: function()
		{
			this._intro_timer = new ig.Timer(0);
		},
	
		update: function()
		{		
			// Update all entities and backgroundMaps
			this.parent();
			
			// Add your own, additional update code here

			// TODO: Hier Intro Film abspielen, dann automatisch zum Spiel
			if (ig.input.pressed('fire') || this._intro_timer.delta() > 2)
				ig.system.setGame(Game);
		},
	
		draw: function()
	 	{
			// Draw all entities and backgroundMaps
			this.parent();		
		
			// Add your own drawing code here
			this._img_bg.draw(0, 0);
		}
	});
});