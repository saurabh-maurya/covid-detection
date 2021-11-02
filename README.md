# COVID Detection
<!-- ABOUT THE PROJECT -->
## About The Project
The application is used to detect level of covid infection based on certain questionnaire using Machine Learning. This application build consist of frontend and backend.
### Built With MERN
* [Python](https://www.python.org/) - ML Implementaion
* [Flask](https://flask.palletsprojects.com/en/2.0.x/) - ML Integration with Node Application
* [Express JS](https://expressjs.com/) - Creating Rest End Point
* [EJS](https://ejs.co/) - Front End
* [Node JS](https://nodejs.org/en/) - Back End 
* [MySQL](https://www.mysql.com/) - Database

<br>
<hr>

<!-- GETTING STARTED -->
## Getting Started
### Prerequisites
1. Python
2. Flask
3. Node JS
4. NPM
5. MySQL
6. Git Bash - if working on windows

### Database - MysSQL
It is used to stroe information reated to the user.
TABLE Creation, run script in sql -
Columns -> CREATE TABLE `covid_user` (
  `phone_no` int NOT NULL,
  `pin` int NOT NULL,
  `full_name` varchar(45) NOT NULL,
  `dob` date DEFAULT NULL,
  `full_address` varchar(200) NOT NULL,
  `covid_status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`phone_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

### Dataset - for model building
In ```/covid_model``` dir, **covid_dataset.csv** is used while building model. For more info related to column see *covid_dataset_readme.txt* in ```/covid_model``` dir.

### Steps to start project
1. Install required prerequisites
2. Create table in mySql using script mentioned above.
3. Update MySQL creditials in ```covid_detection/startup.sh```
4. (only for windows, else continue with #5)To run .sh script you will need git bash.
5. Run command *sh startup.sh* to start node server
6. Start Flask server for interaction between node server and ML
7. In ```/covid_model``` dir, run command python *covid_model.py* 


<br>
<hr>
<br>
***Have a Good Day!***
