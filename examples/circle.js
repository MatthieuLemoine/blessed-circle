const blessed = require('blessed');
const Circle  = require('../lib');

// Setup blessed screen
const screen = blessed.screen();
screen.title = 'Circle example';

const circle = new Circle({
  top      : 'center',
  left     : 'center',
  diameter : 100,
  color    : 'white',
});

// Append our circle to the screen.
screen.append(circle);

// Close keys
screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

// Render
screen.render();
