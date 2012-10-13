ig.module
(
	'game.message-system'
)
.requires
(
	'impact.entity',
	'game.global'
)
.defines(function()
{
	MessageSystem = ig.Class.extend(
	{
		_fonts: [
			new ig.Font('media/fonts/pf_ronda_seven-8.font.png'),
			new ig.Font('media/fonts/pf_ronda_seven-8-red.font.png'),
			new ig.Font('media/fonts/pf_ronda_seven-8-green.font.png')
		],

		_gui_img_bg: new ig.Image('media/gui/gui-bg.png'),
		_gui_img_box: new ig.Image('media/gui/gui-dialog-box.png'),

		_scrolling_buffer: [ ],

		_dialog_buffer: [ ],
		_current_dialog: null,

		_frame_dialog: null,

		init: function()
		{
		},

		scrolling_msg: function(message, type)
		{
			this._scrolling_buffer.push({ msg: message, type: type | MESSAGE_TYPE.NORMAL, time: 5 });
		},

		add_dialog: function(name, text, align)
		{//50 Zeichen pro Zeile, Name + 3 Zeilen Test
			this._dialog_buffer.push({ name: name, text: text, align: align | ig.Font.ALIGN.LEFT, time: 5 });
		},

		show_dialog: function(name, text, align)
		{
			this._frame_dialog = { name: name, text: text, align: align | ig.Font.ALIGN.LEFT };
		},

		show_status: function(line)
		{
			this._status_buffer = line;
		},

		dialog_next: function()
		{
			if (this._dialog_buffer.length > 0)
			{
				this._current_dialog = this._dialog_buffer.shift();
				ig.game.dialog_start();
			}
			else
			{
				this._current_dialog = null;
				ig.game.dialog_end();
			}
		},

		update: function()
		{
			for (var i = 0, l = this._scrolling_buffer.length; i < l; ++i)
			{
				this._scrolling_buffer[i].time -= ig.system.tick;
			}

			if(this._scrolling_buffer.length > 0 && this._scrolling_buffer[0].time <= 0)
				this._scrolling_buffer.shift();

			if (this._frame_dialog == null)
			{				
				if (this._current_dialog)
				{
					this._current_dialog.time -= ig.system.tick;
					if (this._current_dialog.time <= 0)
					{
						this._current_dialog = null;
						ig.game.dialog_end();
					}
				}
				else
				{				
					if (this._dialog_buffer.length > 0)
					{
						this._current_dialog = this._dialog_buffer.shift();
						ig.game.dialog_start();
					}
				}
			}
		},

		draw: function()
		{
			for (var i = this._scrolling_buffer.length-1; i >= 0; --i)
			{				
				this._gui_img_bg.draw(-392 + this._fonts[this._scrolling_buffer[i].type].widthForString(this._scrolling_buffer[i].msg), 200+i*16);
				this._fonts[this._scrolling_buffer[i].type].draw(this._scrolling_buffer[i].msg, 4, 204+i*16, ig.Font.ALIGN.LEFT);
			}

			if (this._status_buffer != null)
			{
				this._gui_img_bg.draw(0, 0);
				this._fonts[0].draw(this._status_buffer, 200, 4, ig.Font.ALIGN.CENTER);
				this._status_buffer = null;
			}

			if (this._frame_dialog != null)
			{
				if (this._frame_dialog.align == ig.Font.ALIGN.RIGHT)
				{
					this._gui_img_box.draw(140, 20);
					this._fonts[0].draw(this._frame_dialog.name, 260, 26, ig.Font.ALIGN.CENTER);
					this._fonts[0].draw(this._frame_dialog.text, 374, 44, ig.Font.ALIGN.RIGHT);
				}
				else if (this._frame_dialog.align == ig.Font.ALIGN.CENTER)
				{
					this._gui_img_box.draw(80, 20);
					this._fonts[0].draw(this._frame_dialog.name, 200, 26, ig.Font.ALIGN.CENTER);
					this._fonts[0].draw(this._frame_dialog.text, 200, 44, ig.Font.ALIGN.CENTER);
				}
				else
				{
					this._gui_img_box.draw(20, 20);
					this._fonts[0].draw(this._frame_dialog.name, 140, 26, ig.Font.ALIGN.CENTER);
					this._fonts[0].draw(this._frame_dialog.text, 26, 44, ig.Font.ALIGN.LEFT);
				}

				this._frame_dialog = null;
			}
			else
			{
				if (this._current_dialog)
				{
					if (this._current_dialog.align == ig.Font.ALIGN.RIGHT)
					{
						this._gui_img_box.draw(140, 20);
						this._fonts[0].draw(this._current_dialog.name, 260, 26, ig.Font.ALIGN.CENTER);
						this._fonts[0].draw(this._current_dialog.text, 374, 44, ig.Font.ALIGN.RIGHT);
					}
					else if (this._current_dialog.align == ig.Font.ALIGN.CENTER)
					{
						this._gui_img_box.draw(80, 20);
						this._fonts[0].draw(this._current_dialog.name, 200, 26, ig.Font.ALIGN.CENTER);
						this._fonts[0].draw(this._current_dialog.text, 200, 44, ig.Font.ALIGN.CENTER);
					}
					else
					{
						this._gui_img_box.draw(20, 20);
						this._fonts[0].draw(this._current_dialog.name, 140, 26, ig.Font.ALIGN.CENTER);
						this._fonts[0].draw(this._current_dialog.text, 26, 44, ig.Font.ALIGN.LEFT);
					}
				}
			}
		},
	});
});