
  var GoTop = (function(){
    function _GoTop($ct){
      this.$ct = $ct;
      this.init();
      this.createNode();
      this.bindEvent();
    }

    _GoTop.prototype.init = function(){
      this.$target = $('<a href="#">返回顶部</a>');
      this.$target.css({
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        'text-decoration': 'none',
        background: '#fec503',
        color: '#fff',
        display: 'block',
        padding: '10px 20px',
        'border-radius': '3px'
      });
    }
    _GoTop.prototype.bindEvent = function(){
      var cur = this;
        $(window).scroll(function(){
          if($(window).scrollTop() > 300){
            cur.$target.show();
          }
        })
    }
    _GoTop.prototype.createNode = function(){
      this.$ct.append(this.$target);
      this.$target.hide();
    }

    return {
      init: function($ct){
        new _GoTop($ct);
      }
    }
  })();