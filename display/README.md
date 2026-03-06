# Interface of ARI's Display
This part contains the implementation of the User Interface used in ARI's display. The interface is composed of:
* **The start screen:** A simple start screen which contains an image and the title, and when pressed it navigates to the main menu.
* **The main menu:** A menu which displays all the possible actions that the system can perform using the interface.
* **The news list:** A list which displays all the news of the events happening in the University.
* **The list of the points of interest:** A list that displays the possible points of interest to which ARI can go by selecting it.
* **The interactions menu:** A menu that shows the possible interactions that can be done with ARI.
* **The head camera page:** A page displaying a live feed of what the camera on ARI's head is seeing.
* **The torso camera page:** A page displaying a live feed of what the camera on ARI's torso is seeing.

## Structure of every page:
Every page is composed of a `index.html` file and a `js/` directory which contains a `main.js` file. The `index.html` file contains the layout of each page in HTML language. Instead, the `main.js` file contains a script in JavaScript code which handles the navigation in the interface. An exception is made for the `tools/` directory, which contains the assets of the project, some JavaScript libraries and the `style.css` file, which defines the CSS classes used in the entire project.

## Architecture:
```text
.
├── front_cam/                   # Head camera Page
│   ├── index.html
│   └── js/
│       └── main.js
├── interactions /               # Interactions menu
│   ├── index.html
│   └── js/
│       └── main.js
├── menu/                        # Main menu
│   ├── index.html
│   └── js/
│       └── main.js
├── news                         # News list
│   ├── index.html
│   ├── js
│   │   └── main.js
│   └── news_detail.html         # Psge for the news details
├── poi/                         # Points of interest list
│   ├── index.html
│   └── js/
│       └── main.js
├── speech/                      # Speech and dialogue menu
│   ├── index.html
│   └── js/
│       └── main.js
├── start_screen/                # Welcome page
│   ├── index.html
│   └── js/
│       └── main.js
├── tools/                       # Shared resources and core logic
│   ├── assets/
│   ├── js/
│   │   ├── core.js
│   │   └── lib/
│   └── style/                   # CSS Classes
│       └── style.css
└── torso_cam/                   # Torso camera page
    ├── index.html
    └── js/
        └── main.js
```