ig.module
( 
	'game.gamestates.game' 
)
.requires
(
	'impact.game',
	'game.global',
	'game.message-system',
	'game.levels.X0Y0',
	'game.levels.X1Y0',
	'game.levels.X2Y0',
	'game.levels.X3Y0',
	'game.levels.X4Y0',
	'game.levels.X2Y1',
	'game.levels.X3Y1',
	'game.levels.WizardsCellar',
	'game.levels.GrassDungeon',
	'game.levels.DarkCellar',	
	'game.levels.DarkCellar2',	
	'game.levels.DarkCellar3',	
	'game.levels.OldPassage'
)
.defines(function()
{
	TWWS_LEVELS =
	[
		{ level: LevelX2Y0, id: "X2Y0", name: "Wizard's Home" },
		{ level: LevelX0Y0, id: "X0Y0", name: "Desert" },
		{ level: LevelX1Y0, id: "X1Y0", name: "Forest" },
		{ level: LevelX3Y0, id: "X3Y0", name: "Coast" },
		{ level: LevelX4Y0, id: "X4Y0", name: "Snow Islands" },
		{ level: LevelX2Y1, id: "X2Y1", name: "The Old Huts" },
		{ level: LevelX3Y1, id: "X3Y1", name: "Coast" },
		{ level: LevelWizardsCellar, id: "wizards_cellar", name: "Wizard's Cellar" },
		{ level: LevelGrassDungeon, id: "grass_dungeon", name: "Grass Dungeon" },
		{ level: LevelDarkCellar, id: "dark_cellar", name: "Dark Cellar" },
		{ level: LevelDarkCellar2, id: "dark_cellar2", name: "Dark Cellar" },
		{ level: LevelDarkCellar3, id: "dark_cellar3", name: "Dark Cellar" },
		{ level: LevelOldPassage, id: "old_passage", name: "Old Passage" },
	];

	TWWS_REGEX_LEVELID = /^X(\d)Y(\d)$/;

	Game = ig.Game.extend(
	{
		gravity: 0,
		clearColor: null,
		autoSort: true,
		sortBy: ig.Game.SORT.Z_INDEX,

		_paused: false,
		_dialog_open: false,

		_level_id: null,
		_level_nr: -1,

		_next_level_id: null,
		_next_level_res: null,

		_gui_font: new ig.Font('media/fonts/pf_ronda_seven-8.font.png'),
		_gui_img_bg: new ig.Image('media/gui/gui-bg.png'),
		_gui_img_bg2: new ig.Image('media/gui/gui-bg2.png'),
		_gui_img_hearts: new ig.Image('media/gui/hearts.png'),
		_gui_sprites: new ig.Image('media/gui/gui_sprites.png'),

		_music_loop_1: new ig.Sound('media/music/twws-music-1-loop1.*'),
		_music_loop_2: new ig.Sound('media/music/twws-music-1-loop2.*'),

		PARTICLES_MAX: 512,
		_particle_emitters: [ ],

		SPELLS_MAX: 512,
		_spells: [ ],

		_entities: [ [ ] ],

		messages: null,

		create_entity_data: function(id, removed, recreate, data)
		{
			return {
				id: id,
				removed: removed,
				recreate: recreate,
				data: data
			};
		},
	
		init: function()
		{
			ig.music.stop();
			ig.music.tracks.length = 0;
			ig.music.add(this._music_loop_1);
			ig.music.add(this._music_loop_2);
			ig.music.volume = 0.3;
			ig.music.random = true;
			ig.music.next();

			twws_init_player_data();

			this._entities.length = TWWS_LEVELS.length;
			for (var i = 0, l = this._entities.length; i < l; ++i)
			{
				this._entities[i] = [ ];
			}

			this.load_level_nr(0);

			this._new_level_timer = new ig.Timer(0);

			twws_piwik_track('Game');
		},

		register_entity: function(id, recreate, data)
		{
			for (var i = 0, l = this._entities[this._level_nr].length; i < l; ++i)
				if (this._entities[this._level_nr][i].id == id)
					return this._entities[this._level_nr][i].removed;

			this._entities[this._level_nr].push(this.create_entity_data(id, false, recreate, data));

			return false;
		},

		remove_entity: function(id)
		{
			for (var i = 0, l = this._entities[this._level_nr].length; i < l; ++i)
			{
				if (this._entities[this._level_nr][i].id == id)
				{
					this._entities[this._level_nr][i].removed = true;
					return;
				}
			}
		},

		get_particle_emitter: function(type, max)
		{
			for (var i = 0, l = this._particle_emitters.length; i < l; ++i)
				if (this._particle_emitters[i]._type == type)
					return this._particle_emitters[i];

			return this._particle_emitters[this._particle_emitters.push(new ParticleEmitter(type, (max ? max : this.PARTICLES_MAX)))-1];
		},

		get_spells_manager: function(type, max)
		{
			for (var i = 0, l = this._spells.length; i < l; ++i)
				if (this._spells[i]._type == type)
					return this._spells[i];

			return this._spells[this._spells.push(new SpellsManager(type, (max ? max : this.SPELLS_MAX)))-1];
		},

		load_level_nr_deferred: function(nr)
		{
			this._level_nr = nr;
			this._level_id = TWWS_LEVELS[nr].id;
			this.loadLevelDeferred(TWWS_LEVELS[nr].level);
		},

		load_level_nr: function(nr)
		{
			this._level_nr = nr;
			this._level_id = TWWS_LEVELS[nr].id;
			this.loadLevel(TWWS_LEVELS[nr].level);
		},

		load_level_id_deferred: function(id)
		{
			for (var i = 0, l = TWWS_LEVELS.length; i < l; ++i)
			{
				if (TWWS_LEVELS[i].id == id)
				{
					this.load_level_nr_deferred(i);
					return;
				}
			}
		},

		load_level_id: function(id)
		{
			for (var i = 0, l = TWWS_LEVELS.length; i < l; ++i)
			{
				if (TWWS_LEVELS[i].id == id)
				{
					this.load_level_nr(i);
					return;
				}
			}
		},

		loadLevel: function(levelObject)
		{
			this._particle_emitters.length = 0;
			this._spells.length = 0;

			this.messages = new MessageSystem();

			twws_piwik_track('Game/Level/' + TWWS_LEVELS[this._level_nr].name);

			this.parent(levelObject);

			this.messages.scrolling_msg(TWWS_LEVELS[this._level_nr].name);

			for (var i = 0, l = this._entities[this._level_nr].length; i < l; ++i)
			{
				if (!this._entities[this._level_nr][i].removed && this._entities[this._level_nr][i].recreate)
				{
					var e = this._entities[this._level_nr][i];
					this.spawnEntity(e.data.type, e.data.pos.x, e.data.pos.y, e.data.settings);
				}
			}
		},

		teleport_in_map: function(x, y)
		{
			twws_player.pos.x = x;
			twws_player.pos.y = y;
		},

		teleport_to_map: function(x, y, id)
		{
			if (x && y)
				twws_player_data.teleport_pos = { x: x, y: y };
			else
				twws_player_data.teleport_pos = null;

			twws_player_data.teleport_direction = twws_player.direction;
			
			this.load_level_id(id);
		},

		goto_map: function(dir)
		{
			this._next_level_res = TWWS_LEVELS[this._level_nr].id.match(TWWS_REGEX_LEVELID);
			if (!this._next_level_res || this._next_level_res.length != 3)
				return;

			this._next_level_id = "X";

			twws_player_data.teleport_pos = twws_player.pos;
			twws_player_data.teleport_direction = twws_player.direction;

			switch(dir)
			{
				case DIRECTION.LEFT:
				{
					twws_player_data.teleport_pos.x = this.backgroundMaps[0].width * this.backgroundMaps[0].tilesize - twws_player.size.x;
					this._next_level_id += (parseInt(this._next_level_res[1], 10)-1).toString() + "Y" + this._next_level_res[2];
					break;
				}
				case DIRECTION.RIGHT:
				{
					twws_player_data.teleport_pos.x = 0;
					this._next_level_id += (parseInt(this._next_level_res[1], 10)+1).toString() + "Y" + this._next_level_res[2];
					break;
				}
				case DIRECTION.UP:
				{
					twws_player_data.teleport_pos.y = this.backgroundMaps[0].height * this.backgroundMaps[0].tilesize - twws_player.size.y;
					this._next_level_id += this._next_level_res[1] + "Y" + (parseInt(this._next_level_res[2], 10)+1).toString();
					break;
				}
				case DIRECTION.DOWN:
				{
					twws_player_data.teleport_pos.y = 0;
					this._next_level_id += this._next_level_res[1] + "Y" + (parseInt(this._next_level_res[2], 10)-1).toString();
					break;
				}
			}

			ig.log(this._next_level_id);
			
			this.load_level_id(this._next_level_id);
		},

		dialog_start: function()
		{
			this._dialog_open = true;
			twws_player.can_attack = false;
		},

		dialog_end: function()
		{
			this._dialog_open = false;
			twws_player.can_attack = true;
		},
	
		update: function()
		{
			if (ig.input.pressed('back'))
			{
				if (this._paused)
				{
					this._paused = false;
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
					ig.system.setGame(Menu);
				}
			}
			else
			{
				if (!this._dialog_open)
					this.parent();
				else
				{
					if (ig.input.pressed('fire'))
						this.messages.dialog_next();
				}

				this.messages.update();
			}

			if (twws_player)
			{
				if (twws_player.pos.x < 0)
				{
					twws_player.pos.x = 0;
					this.goto_map(DIRECTION.LEFT);
				}
				else if (twws_player.pos.x + twws_player.size.x > this.backgroundMaps[0].width * this.backgroundMaps[0].tilesize)
				{
					twws_player.pos.x = this.backgroundMaps[0].width * this.backgroundMaps[0].tilesize - twws_player.size.x;
					this.goto_map(DIRECTION.RIGHT);
				}
				else if (twws_player.pos.y < 0)
				{
					twws_player.pos.y = 0;
					this.goto_map(DIRECTION.UP);
				}
				else if (twws_player.pos.y + twws_player.size.y > this.backgroundMaps[0].height * this.backgroundMaps[0].tilesize)
				{
					twws_player.pos.y = this.backgroundMaps[0].height * this.backgroundMaps[0].tilesize - twws_player.size.y;
					this.goto_map(DIRECTION.DOWN);
				}

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
				this._gui_font.draw("Character Info / Inventory is WIP\n\nUse number keys to select spells\n\nPress h for health potion\n\nPaused\n\nESC to continue\nSpace/Enter to quit", 200, 100, ig.Font.ALIGN.CENTER);

				this.player_gui();
			}
			else
			{
				this.messages.draw();
			}
		},		

		player_gui: function()
		{
			this._gui_img_bg.draw(0, 0);

			for (var i = 0; i < twws_player_data.health; ++i)
				this._gui_img_hearts.drawTile(4 + i*18, 0, 0, 16);

			for (var i = twws_player_data.health; i < twws_player_data.max_health; ++i)
				this._gui_img_hearts.drawTile(4 + i*18, 0, 2, 16);

			// TODO: Text rendern zu viele Draw Calls, nach Partikel Update nochmal überprüfen
			//this._gui_font.draw("Score: " + twws.stats.score, 200, 6, ig.Font.ALIGN.CENTER);
			
			this._gui_img_bg.draw(0, 16);
			this._gui_sprites.drawTile(180, 16, 0, 16);
			this._gui_font.draw(twws_player_data.coins, 200, 20, ig.Font.ALIGN.LEFT);

			this._gui_font.draw("Health potions: " + twws_player_data.health_potions, 4, 20, ig.Font.ALIGN.LEFT);
			this._gui_font.draw(SPELLS[twws_player_data.current_spell_nr].name + (twws_player_data.spell_scrolls[twws_player_data.current_spell_nr] != -1 ? " x " + twws_player_data.spell_scrolls[twws_player_data.current_spell_nr] : ''), 396, 20, ig.Font.ALIGN.RIGHT);

			/*switch (this._current_spell_id)
			{
				case 0: this._gui_font.draw("Fireball", 396, 6, ig.Font.ALIGN.RIGHT); break;
				case 1: this._gui_font.draw("Bomb (x " + this._spells_mana[this._current_spell_id] + ")", 396, 6, ig.Font.ALIGN.RIGHT); break;
				case 2: this._gui_font.draw("Shield (x " + this._spells_mana[this._current_spell_id] + ")", 396, 6, ig.Font.ALIGN.RIGHT); break;
				default: this._gui_font.draw("No Spell", 396, 6, ig.Font.ALIGN.RIGHT); break;
			}*/

	/*		switch (twws_player._current_spell_id)
			{
				case 0: this._gui_sprites.drawTile(380, 2, 1, 16); break;
				case 1: this._gui_sprites.drawTile(380, 2, 3, 16); break;
				case 2: this._gui_sprites.drawTile(380, 2, 2, 16); break;
				default: break;
			}*/
		},
	});
});