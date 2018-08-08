### `ABOUT THE MERN STACK APP`

First I installed the create-react-app
$ npm i -g create-react-app

Then I created the app
$ create-react-app expense-manager

I installed dependencies
$ npm i axios babel-cli body-parser express mongoose nodemon react-bootstrap react-modal react-router-dom --SAVE

axios --> fetch or insert data/to from server by using REST API and returns Promises
body-parser --> parses bodies so request can be reached by req.body
babel-cli --> compile files into bundle.js
express --> is one of the most popular web application framework written with JS for NodeJS.
mongoose --> is also a famous framework for MongoDB.
nodemon --> watches changes and restarts the app 
react-bootstrap --> bootstrap for react
react-modal --> I used this dialog in email and login part of the app
react-router-dom --> lets us use React router.

I seperated files into two parts: client and server
In index.ejs folder of the client you can see all application bundles in root div.

Server-side configurations handled with easy to use express framework build-up and APIS using express router inside the routes file of server folder

@ /getAll  ---> gets all the data in database
@ /delete  ---> delete the corresponding data from database
@ /update  ---> update the corresponding data in database
@ /updateAll  ---> updates all the data in database
@ /insert  ---> insert a new json object model Track into database
@ /login   ---> completely dummy data does not return any token. Once you enter the correct informations you get logged in with 'authenticated' data sits in the browser local storage.

authentication ---> username: baturay  password: 123456

I used mongodb for creating the database. And I used docker for database.
db connection  ---> var dbConnectionURL = 'mongodb://baturay:123456@localhost:27017';

Created configuration file into bin folder ---> www file listens via 8000 port of your localhost.

Webpack config file in the root directory.


### `NPM START`

npm start runs these commands, and app starts in http://localhost:8000

{
    "start": "npm run webpack && nodemon --exec babel-node -- bin/www"
}


### `HOW TO START THE APP`

Download the app by typing: 

$ git clone https://github.com/karadumanb/track-manager.git

Or from the zip file extract the app.

After you download the app, change your directory to the related folder. Then to install dependencies.

$ cd track-manager
$ sudo npm i

If you have not install the docker. Install it by typing:

$ sudo apt install docker-compose

And also install mongodb in your computer. After that stop other services to prevent conflicts.

$ sudo service mongod stop 
$ sudo service apache2 stop

Run commands below to run the database and server. "up" to run the server up, "logs" to see logs, and other command to execute mongodb with admin user

$ sudo docker-compose up -d
$ sudo docker-compose logs -f
$ sudo docker-compose exec mongoDb mongo -u baturay -p 123456 --authenticationDatabase "admin"

When you start the up, make sure your docker-compose up. It generally listens with the port 27017. *If it does not change dbConnectionURL in server.js file.

$ sudo service mongod stop 
$ sudo docker-compose up -d

When you open the containing folder 'track-manager', you can type:

$ npm start.

### `HOW DID THE DEVELOPMENT PROCESS GO`

I did have such a fun during the development of this task. However, I am much more used to Angular 2+. Creating React App from scratch took some time but I will get used to it as soon as possible. Also I wrote node.js using express before for trials. But, have I never done both of client and server side in the same folder. Seperating them well structured was hard to me as well. However, It is easy to figure out. I believe there are much better solutions for structuring the app, I could not have time think more or search through stackoverflow.
Also, at the end of day I realized there is no pagination in the app. I could not find time to handle. I am sorry for that.


### `HOW WILL YOU PLAY WITH`

- Do not panic that, if you do not have any data in database, app will automatically generate two tracks.

- You can stop and start the clock. Since you are dealing with clock, updatedDate will be updated. Also when you create the app, updatedDate will get that date.

- You can add, delete, edit the tracks. You can apply filters, search in title with case insensivity. Also you can see stopped times only. You can list the tracks and start or stop any time you want.

-Any time you can leave the app, and you will see that everything is there and timers you didnot stop will be still running.

- You can email me with evaluation at the top and left. You can login and logout with the dummy account:

username: baturay
pwd: 123456