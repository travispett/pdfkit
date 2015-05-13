// Generated by CoffeeScript 1.9.1
(function() {
  var PDFImage;

  PDFImage = require('../image');

  module.exports = {
    initImages: function() {
      this._imageRegistry = {};
      return this._imageCount = 0;
    },
    image: function(src, x, y, options) {
      var base, bh, bp, bw, h, hp, image, ip, name, ref, ref1, ref2, w, wp;
      if (options == null) {
        options = {};
      }
      if (typeof x === 'object') {
        options = x;
        x = null;
      }
      x = (ref = x != null ? x : options.x) != null ? ref : this.x;
      y = (ref1 = y != null ? y : options.y) != null ? ref1 : this.y;
      if (!Buffer.isBuffer(src)) {
        image = this._imageRegistry[src];
      }
      if (!image) {
        image = PDFImage.open(src, 'I' + (++this._imageCount));
        image.embed(this);
        if (!Buffer.isBuffer(src)) {
          this._imageRegistry[src] = image;
        }
      }
      if ((base = this.page.xobjects)[name = image.label] == null) {
        base[name] = image.obj;
      }
      w = options.width || image.width;
      h = options.height || image.height;
      if (options.width && !options.height) {
        wp = w / image.width;
        w = image.width * wp;
        h = image.height * wp;
      } else if (options.height && !options.width) {
        hp = h / image.height;
        w = image.width * hp;
        h = image.height * hp;
      } else if (options.scale) {
        w = image.width * options.scale;
        h = image.height * options.scale;
      } else if (options.fit) {
        ref2 = options.fit, bw = ref2[0], bh = ref2[1];
        bp = bw / bh;
        ip = image.width / image.height;
        if (ip > bp) {
          w = bw;
          h = bw / ip;
        } else {
          h = bh;
          w = bh * ip;
        }
        if (options.align === 'center') {
          x = x + bw / 2 - w / 2;
        } else if (options.align === 'right') {
          x = x + bw - w;
        }
        if (options.valign === 'center') {
          y = y + bh / 2 - h / 2;
        } else if (options.valign === 'bottom') {
          y = y + bh - h;
        }
      }
      if (this.y === y) {
        this.y += h;
      }
      this.save();
      this.transform(w, 0, 0, -h, x, y + h);
      this.addContent("/" + image.label + " Do");
      this.restore();
      return this;
    }
  };

}).call(this);
