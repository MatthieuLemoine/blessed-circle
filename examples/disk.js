const blessed = require('blessed');
const Circle  = require('../lib');

// Setup blessed screen
const screen = blessed.screen();
screen.title = 'Disk example';

const disk = new Circle({
  top      : 'center',
  left     : 'center',
  diameter : 100,
  color    : 'white',
  fill     : true,
  screen,
});

// Append our disk to the screen.
screen.append(disk);

// Close keys
screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

// Render
screen.render();
