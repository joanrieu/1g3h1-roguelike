var game = {
  div: $("#game"),
  w: 16,
  h: 12,
  ww: 800,
  hh: 600,
  walls: 8,
  tiles: {
    grass: { name: "grass" },
    wall: { name: "wall" }
  },
  floor: [],
  player: {},
  init: function() {
    this.div.css("width", this.ww);
    this.div.css("height", this.hh);
    var self = this;
    $(document).keydown(function(e) {
      var kc = e.keyCode;
      var k = {
        left: 37,
        up: 38,
        right: 39,
        down: 40
      };
      if (kc == k.up) {
        self.move(0, -1);
      } else if (kc == k.down) {
        self.move(0, 1);
      } else if (kc == k.left) {
        self.move(-1, 0);
      } else if (kc == k.right) {
        self.move(1, 0);
      }
    });
    for (var i = 0; i < this.w * this.h; ++i) {
      var tile = new Object;
      for (key in this.tiles.grass) {
        tile[key] = this.tiles.grass[key];
      }
      tile.x = i % this.w;
      tile.y = (i - tile.x) / this.w;
      this.floor[i] = tile;
    }
    for (var i = 0; i < this.walls; ++i) {
      var x = parseInt(Math.random() * this.w);
      var y = parseInt(Math.random() * this.h);
      var w = parseInt((Math.random() * 2 - 1) * Math.min(x, this.w - x));
      var h = parseInt((Math.random() * 2 - 1) * Math.min(y, this.h - y));
      for (j in this.floor) {
        var tile = this.floor[j];
        if (tile.x >= x && tile.y >= y && tile.x <= x + w && tile.y <= y + h) {
          for (key in this.tiles.grass) {
            tile[key] = this.tiles.wall[key];
          }
        }
      }
      //console.log("building wall:", x, y, w, h);
    }
    for (i in this.floor) {
      var tile = this.floor[i];
      if (tile.name == "grass") {
        this.player.x = tile.x;
        this.player.y = tile.y;
        break;
      }
    }
    this.draw();
  },
  draw: function() {
    this.div.empty();
    for (i in this.floor) {
      var tile = this.floor[i];
      var dom = $('<div class="tile" />');
      dom.addClass(tile.name);
      dom.css('left', tile.x * this.ww / this.w);
      dom.css('top', tile.y * this.hh / this.h);
      this.div.append(dom);
      //console.log("drawing tile:", tile.x, tile.y, tile.name);
    }
    {
      var dom = $('<div class="tile player" />');
      dom.css('left', this.player.x * this.ww / this.w);
      dom.css('top', this.player.y * this.hh / this.h);
      this.div.append(dom);
    }
  },
  move: function(dx, dy) {
    var nx = this.player.x + dx;
    var ny = this.player.y + dy;
    for (i in this.floor) {
      var tile = this.floor[i];
      if (tile.x == nx && tile.y == ny && tile.name != "wall") {
        this.player.x = nx;
        this.player.y = ny;
        break;
      }
    }
    this.draw();
    //console.log("move", dx, dy);
  }
};

game.init();
