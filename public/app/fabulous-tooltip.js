(function(Snap) {
  var defaultSelector = 'svg .fabulous-tooltip';
  
  // keep a reference
  var activeTooltips = [];

  // fill template with content (this could be declared in the html template as well)
  var $svg = $('#tooltip');
  $svg.css({
    position: 'absolute',
    display: 'inline-block'
  });
  $svg.addClass('hide');
  
  var template = Snap($svg.get(0));
  var shape = template
    .rect(0, 0, 160, 40)
    .attr({
      fill: '#fff',
      stroke: '#26a69a',
      rx: '15px'
    });

  var text = template
    .text(8, 25, '')
    .attr({
      fontSize: '15px',
      opacity: 1,
      fill: '#26a69a'
    });

  template.g(shape, text);

  // manipulate template directly (no clone needed)
  var tooltip = template.select('g');
  var tooltipText = template.select('text');


  function displayTooltip() {
    var message = this.attr('data-tooltip');
    var elPosition = this.node.getBoundingClientRect();
    
    // reset transformations if any
    tooltip.attr({
      transform: 's0.2t0,250'
    });

    // set text
    tooltipText.attr({
      text: message
    });

    // position svg above target element and show
    $svg.css({
      top: elPosition.top - 50,
      left: elPosition.left + (this.getBBox().width / 2) - 80
    });
    $svg.removeClass('hide');

    // translate up
    tooltip.animate({
      transform: 's0.3t0,0'
    }, 250, mina.easein, function() {
      // scale up
      tooltip.animate({
        transform: 's1t0,0'
      }, 750, mina.bounce);
    });

  }

  function hideTooltip() {
    tooltip.animate({
      transform: 's0'
    }, 150, function() {
      // poof and it's gone!
      $svg.addClass('hide');
    });
  }

  // search for a tooltips
  function init(selector) {
    selector = selector || defaultSelector;

    var $tooltipedElements = $(selector);
    $tooltipedElements.toArray().forEach(function(tooltiped) {

      var el = Snap(tooltiped);
      //el.mouseover(displayTooltip, hideTooltip);
      el.drag(hideTooltip);
      var displayed = false;
      el.click(function() {
        if (!displayed) {
          displayTooltip.call(this);
        } else {
          hideTooltip.call(this);
        }
        displayed = !displayed;
      });
      activeTooltips.push(el);
    });
  }

  function destroy() {
    activeTooltips.forEach(function(el) {
      // TODO: do we need to pass the handlers?
      el.unhover();
      el.undrag();
    });
  }

  // exports
  tooltips = {
    init: init,
    destroy: destroy
  };

})(Snap);