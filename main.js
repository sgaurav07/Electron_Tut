const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addNewWindow;
// listen for app to be ready
app.on('ready',function(){
    //create new window
     mainWindow = new BrowserWindow({});
    // load HTML file into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'mainWindow.html'),
        protocol:'file',
        slashes: true
    }));

    //Close all window on Quit
    mainWindow.on('closed', function(){
        app.quit();
    });

    // build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert Menu into mainWindow
    Menu.setApplicationMenu(mainMenu);
});

//Add new Window
function createAddWindow(){
    addNewWindow  = new BrowserWindow({
        width: 500,
        height:350,
        title:'New Window Testing!'
    });
    // load HTML file into window
    addNewWindow.loadURL(url.format({
        pathname: path.join(__dirname,'addWindow.html'),
        protocol:'file',
        slashes: true
    }));
    // Set addWindow to Null on Close for Garbage Collection
    addNewWindow.on('closed', function(){
        addNewWindow = null;
    });
}

// create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add',
                accelerator: process.platform == 'darwin' ? 'Command+A':
                'Ctrl+A',
                click(){
                    createAddWindow();
                }
            },
            {
                label: 'Delete'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q':
                'Ctrl+Q',
                click(){
                    app.quit(); 
                }
            }
        ]
    }
];

if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label:'Toogle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I': 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                        }
                    },
                    {
                        role: 'reload'
                    }
            ]   
    });
}








