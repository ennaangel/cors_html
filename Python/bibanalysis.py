#Chris Vos
#9 - apr - 2016
#Creating a dict from .bib files

#TODO:  dynamic size for figures, multiple graph styles, network put in seperate function,(SO(N) thing dissapered?)

#--------------Libraries--------------
import os
print("Currently running: ",os.path.basename(__file__))
print("Importing Libraries")
import pickle #To save the dict
import re
import matplotlib.pyplot as plt
import numpy as np


#--------------To fill in--------------
#Choose file and location
#max number of displayed histogram things
#Ignore list


fn = "..." #Name of the bib file
bib = "C:/Users/.../"+fn+".bib" #location of bib file

max = 50 #Max in histogram

#Define Ignore list
ignlist = ['the','of','a','and','in','for','with','on','by','an','at','to','from','or','as','have','is','was','it','can','this',"be",'also','these','that','we','which',"has",'find','all','using','between','such','are']



#--------------Create file to write dict--------------
print("Opening File "+fn)
infile = open(bib,encoding="utf-8",errors="ignore")
analyses = dict()

#--------------Creating list of entries--------------
print("Creating list of entries")
i=0
j=0
er1 = 0
entries=["0"]
for line in infile:
	j+=1 #keeps tracks of lines
	try:
		if line.startswith("@"): #creates new entrie at every @
			i+=1 #keeps track of number of entries
			entries.append(line)
		else:
			entries[i]+= line  #If line does not start iwht @, it ads the next line to current entrie
	except:
		print("Some error occured")
		er1 += 1 #Number of errors
		continue

#Delete empy entrie
if not entries[0].startswith("@"):
	del(entries[0])


#--------------Empty lists for errors--------------
nauthor = 0
nlauthor = []
ntitle = 0
nltitle = []
nyear = 0
nlyear = []
nabstract = 0
nlabstract = []
entrynum = 0
nentrie = []

#--------------Functions--------------
#Does word count on strings
#Count words
def counter(line):
	counts = dict()
	
	words = line.replace(",","").lower().split()# splits the input "line"
	#print("Counting words...")
	for word in words: #Goes trough words
		if word not in ignlist:
			counts[word] = counts.get(word,0)+1 #gets the word, makes 0 if not found else ad +1
	return counts #returns the dict

#Create plots	
def leplot(counts,d):
	counts.reverse()
	words = [item[1] for item in counts]
	times = [item[0] for item in counts]

	y_pos = np.arange(len(words))+0.5
	
	print("Creating the plot")
	fig = plt.figure(d,figsize=(10,9))
	ax = fig.add_subplot(111)
	
	#colors
	ax.set_axis_bgcolor("0.3") #Change facecolor
	fig.patch.set_facecolor("0.3") #Change bg color
	fig.subplots_adjust(left=0.15,right = 0.95,top=0.93,bottom=0.07)
	ax.spines['bottom'].set_color('0.3')
	ax.spines['top'].set_color('0.3') 
	ax.spines['right'].set_color('0.3')
	ax.spines['left'].set_color('0.3')
	ax.yaxis.label.set_color('0.7')
	ax.xaxis.label.set_color('0.7')
	ax.tick_params(axis='x', colors='0.7',top='off',labelsize = 10)
	ax.tick_params(axis='y', left='off',right="off")
	ax.grid(axis='x',which='major',color='0.6')
	
	plt.barh(y_pos,times,color = "palegoldenrod",align="center") #plot
	plt.yticks(y_pos,words,color="0.7",size=10)
	plt.xlabel("Counts",color="0.7")
	if d != "year" and d != "authors": 
		plt.title("Histogram of words in "+d,color="0.7")
	else:
		plt.title("Histogram of publication "+str(d),color="0.7")
	fig.savefig("Inoutput/"+fn+d+'analyses.png',facecolor="0.3")
	return 
	
#Creates Histogram
def Histo(counts,d):
	
	print("Creating histogram of the ",max, " most counted words in ", d)
	print("From a list of ",len(counts)," different words")
	if d == "year":
		t = sorted([ (k,v) for k,v in counts.items()])
		t = [(v,k) for k,v in t]
	else:
		t = sorted([ (v,k) for k,v in counts.items()])
	t.reverse()
	#Sending to plot
	if len(t) > max:
		leplot(t[0:max-1],d)
	else:
		leplot(t,d)
	i=0
	words = []
	times = []
	for v,k in t:
		#if i < max - 1: #Goes till max number of words is reahced
		#if v > 12: #Goes till counts is larger than 10, chnging this has major influences of speed of the network loop
		
		try: 
			#print(k,": ",v)
			words.append(k)#appends the word to word list
			times.append(v)#appends the time the word was used to list
			i+=1
		except:
			print("---Error on printing the word---")

		return  [words,times]

			
#--------------Finding titles and building the Dictionary--------------
print("Entries are seperated, time to disect")
for entrie in entries:
	entrynum += 1
	erors = False
	
	#Entrie Title
	tit = re.search("Title(.)+?},\n",entrie,re.DOTALL)
	if tit != None:
		tit = str(tit.group()).replace("\n","").strip("Title").strip(" ").strip("= ").replace("{","").replace("},","").replace("}","")#Tidy up strings
		print(tit.encode("utf8","ignore"))
		
	else:
		ntitle += 1
		nltitle.append(entrynum)
		nentrie.append(["Entrie: "+str(entrynum),entrie])
		erors = True
	analyses[entrynum] = {}
	analyses[entrynum]["Title"] = tit
	if tit != None:
		analyses[entrynum]["Titcounts"] = counter(tit)
	
	#Type of entrie
	type = re.search("@(.)+{",entrie)
	if type != None:
		type = str(type.group()).replace("@","").replace("{","")
		#print(type)
	analyses[entrynum]["Type"] = type

	#Authors
	authors = re.search("Author(.)+?},\n",entrie,re.DOTALL)
	if authors != None:
		authors = str(authors.group()).strip("Author").strip("\n").strip(" ").strip("= ").replace("{","").strip("},").replace("}","")
		authors = authors.split(" and ")
		#print(authors)
	else:
		nauthor += 1
		nlauthor.append(entrynum)
		if erors == False :
			erors = True
			nentrie.append(["Entrie: "+str(entrynum),entrie])
	analyses[entrynum]["Authors"] = authors
			
	#Year
	year = re.search("Year(.)+?}",entrie)
	if year != None :
		year = str(year.group()).strip("\n").strip("Year").strip(" ").strip("= ").replace("{","").strip("},").replace("}","")
		year = int(year.strip())
		#print(year)
	else:
		nyear += 1
		nlyear.append(entrynum)
		if erors == False :
			erors = True
			nentrie.append(["Entrie: "+str(entrynum),entrie])		
	analyses[entrynum]["Year"] = year
	
	#Abstract
	abstract = re.search("Abstract(.)+?},\n",entrie,re.DOTALL)
	
	
	if abstract != None :
		abstract = str(abstract.group()).strip("\n").strip("Abstract").strip(" ").strip("= ").replace("{","").strip("},").replace("}","")
		analyses[entrynum]["Abscounts"] = counter(abstract)
	else: #Not added to nentrie, becaus many articles don't have an Abstract
		nabstract += 1
		nlabstract.append(entrynum)
			
	analyses[entrynum]["Abstract"] = abstract

	
#--------------Errors	in turning bibtex to dictionary--------------
print("Number of errors occuring in first chek is ",er1)
print("Number of articles that returned None for title is ", ntitle)
#print("In entries:",nltitle)
print("Number of articles that returned None for authors is ", nauthor)
#print("In entries:",nlauthor)
print("Number of articles that returned None for year is ", nyear)
#print("In entries:",nlyear)
print("Number of articles that returned None for Abstract is ", nabstract)
#print("In entries:",nlabstract)
#print(nentrie)
print("Number of initial entries = ",len(entries))
print("Number of looped entries = ",entrynum)
print("Length of dictionary = ",len(analyses))



#--------------Analyzing the dictionary--------------
#Can be put in 1 for loop if prefered
#on Titles
print("---------------------")
print("Analyses")
print("---------------------")
print("Titles")
ftitcount = dict() 
for entrie in analyses:
	if "Titcounts" in analyses[entrie]:
		for key in analyses[entrie]["Titcounts"]:
			ftitcount[key] = ftitcount.get(key,0)+1
#print(ftitcount)		
Tithis = Histo(ftitcount,"titles")#Creates histogram, and returns list with [words,number,plut]
print("---------------------")
#On Abstracts
print("Abstracts")
fabscount = dict()
for entrie in analyses:
	if "Abscounts" in analyses[entrie]:
		for key in analyses[entrie]["Abscounts"]:
			fabscount[key] = fabscount.get(key,0)+1
#print(ftitcount)		
Abshis = Histo(fabscount,"abstracts")	#Creates histogram, and returns list with [words,number,plut]
print("---------------------")
#On years
print("year")
ycount = dict()
for entrie in analyses:
	if "Year" in analyses[entrie] and analyses[entrie]["Year"]!=None:
		key = analyses[entrie].get("Year")
		#print(key)
		ycount[key] = ycount.get(key,0)+1		
#print(ycount)		
Yhis = Histo(ycount,"year")	#Creates histogram, and returns list with [year,number,plut]
print("---------------------")
#On Authors
print("Authors")
fautscount = dict()
for entrie in analyses:
	if "Authors" in analyses[entrie] and analyses[entrie]["Authors"]!=None:
		for key in analyses[entrie]["Authors"]:
			fautscount[key] = fautscount.get(key,0)+1		
#print(fautcount)		
Abshis = Histo(fautscount,"authors")	#Creates histogram, and returns list with [words,number,plut]

#start of network: remove and put seperate for optimalizaziotn
#Creating Author list
"""
lstauthor = []
for aut in Abshis[0]:
	#print(aut)
	if aut != None :
		lstauthor.append(aut)
numb = len(lstauthor)
autnet = np.zeros((numb,numb),dtype=np.int)
entryn = 0
for entrie in analyses:
	print("Currently in entrie ",entryn)
	entryn +=1
	if "Authors" in analyses[entrie] and analyses[entrie]["Authors"]!=None:
		for key in analyses[entrie]["Authors"]:
			if key != None and key in lstauthor:
				i = lstauthor.index(key)
				for key2 in analyses[entrie]["Authors"]:
					if key2 != None and key2 in lstauthor :
						j = lstauthor.index(key2)
						autnet[i][j] +=1
print("Number of authors in network is ",numb)
"""


#--------------Finishing script--------------
print("Show plots")
plt.show()	#Displays plots
	
#Saving the Dictionary
file = os.path.join("Inoutput", fn+"bibanalyses.p")
pickle.dump(analyses, open(file, "wb" ))

infile.close()