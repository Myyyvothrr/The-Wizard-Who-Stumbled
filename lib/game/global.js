ig.module
( 
	'game.global' 
)
.requires
(
)
.defines(function()
{
	TWWS_VERSION = "v0.2.0";

	twws_player = null;

	twws_stats = 
	{
		score: 0,
		coins: 0,
		kills: 0,
		_wizard_killed: false
	};

	twws_reset_stats = function()
	{
		twws_stats.score = 0;
		twws_stats.coins = 0;
		twws_stats.kills = 0;
		twws_stats._wizard_killed = false;
	};

	twws_calc_final_score = function()
	{
		return (twws_stats.score) + (twws_stats.coins * 100) + (twws_stats.kills * 10);
	};

	twws_send_highscore = function()
	{

	};

	twws_get_highscores = function()
	{

	};

	twws_get_version = function()
	{
		return "The Wizard Who Stumbled " + TWWS_VERSION + "\n(c) 2012 Daniel Baumartz\nwww.the-wizard-who-stumbled.de";
	};

	is_on_screen = function(pos)
	{
		return (pos.x > ig.game.screen.x) && (pos.x < ig.game.screen.x + ig.system.width) &&  (pos.y > ig.game.screen.y) && (pos.y < ig.game.screen.y + ig.system.height);
	};

	DIRECTION =
	{
		LEFT: 0,
		RIGHT: 1,
		UP: 2,
		DOWN: 3
	};

	opposite_direction = function(direction)
	{
		switch(direction)
		{
			case DIRECTION.LEFT: return DIRECTION.RIGHT;
			case DIRECTION.RIGHT: return DIRECTION.LEFT;
			case DIRECTION.UP: return DIRECTION.DOWN;
			case DIRECTION.DOWN: return DIRECTION.UP;
		}
	};

	is_max = function(v, v1, v2, v3)
	{
		return (v > v1) && (v > v2) && (v > v3);
	};
});