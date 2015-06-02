# Class used to lock and unlock the Main map
# @example
#   (new MapLoader).lock()
#   (new MapLoader).unlock()
class window.MapLoader
  constructor: ->
    # Whole loader container
    @loader = '#map-loader'
    # Loading bar
    @bar    = @loader + ' .bar'
    # How often (in miliseconds) we move loading bar
    @timer  = 10
    @step   = 10
    # Init value for progress bar (5%)
    @init   = 5

  # Add overlay layer over the whole Google Map to lock it until unlocked
  # @example
  #   (new MapLoader).lock()
  lock: ->
    $(@loader).show()
    this.animate()

  # Unlocks the Google Map (hides the overlay layer)
  # @example
  # (new MapLoader).unlock()
  unlock: ->
    $(@loader).hide();

  # Animates the progress bar
  # It will initialize progress bar with @init value at the beginning
  # This should be only used internally
  animate: ->
    bar = $(@bar);
    bar.css('width', @init+'%')

    timer_id = window.setInterval =>
        per = parseInt(bar[0].style.width)
        bar.css('width', (per+@step)+'%')
        clearInterval(timer_id) if per >= 100
    , @timer
