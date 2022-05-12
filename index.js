const path = require('path');
const electron = require('electron');
const TimerTray = require('./app/timer_tray');
const MainWindow = require('./app/main_window');

const { app } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
  if (process.platform === 'darwin') {
    app.dock.hide();
  }

  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

  const iconName =
    process.platform === 'win32' ? 'windows-icon.png' : 'icon-template.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TimerTray(iconPath, mainWindow);
});