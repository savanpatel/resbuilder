## Resume Builder ##
Parse job description url and tailor resume for user from profile.

## Link to website ##
http://ec2-52-34-186-114.us-west-2.compute.amazonaws.com/#/


## Motivation ##
Tailoring resume for each job can be pain consuming lot of time. What if there was a system that would do it for us by just giving a job description url?


As Job Seeker,
Resume builder helps you to tailor resume based on job description url. Create your profile once including education, work experience, achievements, projects, and skills. Just type in the job description url and it shall tailor you resumes picking up most relevant project and skills.

As a recruiter you can search candidates based on skill set and initiate conversation.


### Installation ###
Python

 1. Install Pyhton.
 2. Install pip if not present.
 3. Install BeautifulSoup for crawler in python.
    `pip install beautifulsoup4`
 
NodeJS
 Install node js and then to install required npm packages,
 

     cd resbuilder/src/backend
     npm install

Mongo


Environment Variables
set environment variables on your server.

    export PORT=80
    export LINKEDIN_API_KEY=your_linkedin_api_key
    export LINKED_SECRET_KEY=your_linkedin_secret_key


### To Run Server ###

    nodejs resbuilder/scr/backend/server.js


## Architecture ##
The web app is divided into largely following components
#### Server  ####
 Server runs on nodejs express environment. Additionally we have a python script crawler.py to analyze the job description and extract out keywords.

#### Frontend ####
The frontend is in AngulaJS 1.


## Contribution Guide ##
Does this project sounds ***interesting*** to you? Well you can contribute in following manner

 - Check out issues/ feature request. You have one in mind? Great!
 - Contact us on savanpatel3@gmail.com or panktibhalani@gmail.com to discuss task or feature you have on mind.
 - Fork the project, work on issue and create a pull request.


  
 ### Contributors ###
 Savan Patel (savanpatel3@gmail.com, http://www.savanpatel.in)
 Pankti Bhalani (panktibhalani@gmail.com)
