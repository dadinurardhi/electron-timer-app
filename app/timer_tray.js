const electron = require('electron');
const { Tray, app, Menu } = electron;

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.on('click', this.onClick.bind(this));
    this.on('right-click', this.onRightClick.bind(this));
    this.mainWindow = mainWindow;
    this.setToolTip('Timer App');
  }

  onClick(event, bounds) {
    // Click Event Bounds
    const { x, y } = bounds;

    // Window Height & Width
    const { height, width } = this.mainWindow.getBounds();

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      const yPosition = process.platform === 'darwin' ? y : y - height;
      this.mainWindow.setBounds({
        x: x - width / 2,
        y: yPosition,
        height,
        width,
      });
      this.mainWindow.show();
    }
  }

  onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit(),
      },
    ]);

    this.popUpContextMenu(menuConfig);
  }
}

module.exports = TimerTray;
