ig.module
( 
	'game.gamestates.game' 
)
.requires
(
	'impact.game',
	'game.levels.snowmountains1',
	'game.levels.snowmountains2',
	'game.levels.snowmountains3',
	'game.levels.dungeon1',
	'game.levels.dungeon2',
	'game.levels.dungeon3',
	'game.levels.dungeon4',
	'game.levels.grasslands1',
	'game.levels.grasslands2',
	'game.levels.grasslands3',
	'game.levels.grasslands4',
	'game.levels.forest1',
	'game.levels.desert1'
)
.defines(function()
{
	TWWS_LEVELS =
	[
		{ level: LevelSnowmountains1, name: "Level 1: The Snow Mountain" },
		{ level: LevelDungeon1, name: "Level 2: Castle Entrance" },
		{ level: LevelDungeon2, name: "Level 3: Abandoned Castle" },
		{ level: LevelDungeon3, name: "Level 4: Magic Chamber" },
		{ level: LevelDungeon4, name: "Hidden Level: Treasure Room" },
		{ level: LevelSnowmountains2, name: "Level 5: Outside Castle" },
		{ level: LevelSnowmountains3, name: "Level 6: Frozen Lake" },
		{ level: LevelGrasslands1, name: "Level 7: Snow Is Gone" },
		{ level: LevelGrasslands2, name: "Level 8: Narrow Green" },
		{ level: LevelGrasslands3, name: "Level 9: The Fields" },
		{ level: LevelGrasslands4, name: "Level 10: Lost Village" },
		{ level: LevelForest1, name: "Level 11: Forest Wandering" },
		{ level: LevelDesert1, name: "Level 12: Just Sand (Beta)" }
	];

	Game = ig.Game.extend(
	{
		gravity: 0,
		clearColor: null,
		autoSort: true,
		sortBy: ig.Game.SORT.Z_INDEX,

		_paused: false,
		_new_level: false,
		_new_level_id: 0,
		_new_level_timer: null,
		_new_level_name_visible: false,
		_gui_font: new ig.Font('media/della_respira-20-red.font.png'),
	
		init: function()
		{		
			twws_reset_stats();

			this.my_load_level(0);

			this._new_level_timer = new ig.Timer(0);
		},

		my_load_level: function(id)
		{
			this._new_level_id = id;
			this._new_level = true;

			this.loadLevelDeferred(TWWS_LEVELS[id].level);
		},

		loadLevel: function(levelObject)
		{
			for (var i = 0, n = TWWS_LEVELS.length; i < n; ++i)
			{
				if (TWWS_LEVELS[i].level == levelObject)
				{
					this._new_level_id = i;
					this._new_level = true;
					break;
				}
			}

			this.parent(levelObject);
		},
	
		update: function()
		{
			if (ig.input.pressed('cheat_level'))
			{
				this.my_load_level((this._new_level_id+1)%TWWS_LEVELS.length);
			}

			if (ig.input.pressed('back'))
			{
				if (this._paused)
				{
					ig.system.setGame(Menu);
				}
				else
				{
					this._paused = true;
				}
			}

			if (this._paused)
			{
				if (ig.input.pressed('fire'))
				{
					this._paused = false;
				}
			}
			else
			{
				this.parent();
			}

			if (this._new_level)
			{
				this._new_level_timer.set(5);
				this._new_level = false;
			}

			if (this._new_level_timer.delta() < 0)
			{
				this._new_level_name_visible = true;
			}
			else
			{
				this._new_level_name_visible = false;
			}

			if (twws_player)
			{
				if (twws_player.pos.x < 0)
					twws_player.pos.x = 0;
				else if (twws_player.pos.x + twws_player.size.x > this.backgroundMaps[0].width * this.backgroundMaps[0].tilesize)
					twws_player.pos.x = this.backgroundMaps[0].width * this.backgroundMaps[0].tilesize - twws_player.size.x;

				if (twws_player.pos.y < 0)
					twws_player.pos.y = 0;
				else if (twws_player.pos.y + twws_player.size.y > this.backgroundMaps[0].height * this.backgroundMaps[0].tilesize)
					twws_player.pos.y = this.backgroundMaps[0].height * this.backgroundMaps[0].tilesize - twws_player.size.y;

				this.screen.x = twws_player.pos.x - ig.system.width/2;
				this.screen.y = twws_player.pos.y - ig.system.height/2;

				if (this.screen.x < 0)
					this.screen.x = 0;
				else if (this.screen.x + ig.system.width > this.backgroundMaps[0].width * this.backgroundMaps[0].tilesize)
					this.screen.x = this.backgroundMaps[0].width * this.backgroundMaps[0].tilesize - ig.system.width;

				if (this.screen.y < 0)
					this.screen.y = 0;
				else if (this.screen.y + ig.system.height > this.backgroundMaps[0].height * this.backgroundMaps[0].tilesize)
					this.screen.y = this.backgroundMaps[0].height * this.backgroundMaps[0].tilesize - ig.system.height;
			}
		},

		draw: function()
		{
			this.parent();

			if (this._paused)
			{
				this._gui_font.draw("Paused\nESC to quit, Space/Enter to continue", 200, 150, ig.Font.ALIGN.CENTER);
			}
			else if (this._new_level_name_visible)
			{
				this._gui_font.draw(TWWS_LEVELS[this._new_level_id].name, 200, 100, ig.Font.ALIGN.CENTER);
			}
		}
	});
});