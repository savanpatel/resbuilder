import re
import urllib
from bs4 import BeautifulSoup
import sys


#r = urllib.urlopen("https://boards.greenhouse.io/endurance/jobs/645924#.WOL6CxLyto4").read()

r = urllib.urlopen(sys.argv[1]).read()

soup = BeautifulSoup(r,"html.parser")

words = ["Agile","Applications","ASP.NET","Build","C#","HTML","CSS","Mongodb","AngularJS","NodeJS","ExpressJS","MEAN","ASP.NET","MySQL","Oracle","ADO.NET","Script",
"Code",
"CoffeeScript",
"TypeScript",
"Ruby",
"Python",
"Flask",
"Rails",
"Rest API",
"API",
"Collaborate",
"Data",
"Design",
"Development",
"Engineering",
"Environment",
"Java",
"Javascript",
"Knowledge",
"Mobile",
".NET",
"Product",
"Projects",
"Software",
"Solutions",
"SQL",
"Team",
"Technologies",
"Testing",
"Tools",
"Bootsrap",
"C++",
"C",
"Web"]

list_tags = soup.findAll('li')
words = [item.lower() for item in words]
output = ""
for a in list_tags:
	text = a.text
	textList = text.split(" ")
	
	for one in textList:
		
		regex = re.compile('[^a-zA-Z]')
		#First parameter is the replacement, second parameter is your input string
		one = regex.sub('', one)
		if one.lower() in words:
			output += " " + one.lower()


print output

