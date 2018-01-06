#Chris Vos
#2016-06-14
#Turning goodreads into bibtex
#Things that stilll have to be done
#	1)Several authers
#	2)work around for unicode stuff
#	3)Insert errors at start in less crude way

import os
import csv
import re
import time

#getting the library
locat ="C:/Users/..." #File location
filen = "goodreadslib.txt" #Name of goodreads file
bib = locat+"/"+filen
reas = open(bib,encoding="utf8")

#Creating Bibtex file
tex = filen.split(".")[0]
grbib = locat+"/"+tex+"out.bib"
reasout = open(grbib,"w")
#start of file
reasout.write("%Bibtex file from "+filen+"\n")
reasout.write("%File created at "+time.strftime("%d/%m/%Y")+"\n")
pos = reasout.tell()
reasout.write("%\n                                                                                                               \n")#Ads some spaace to display errors at beginning of file


#Disecting the library
Errors=[]
i=0
reascsv = csv.reader(reas)
for line in reascsv:
	try:
		#Rem0ving clutter
		del(line[7:9])#Delete rating
		del(line[8])#Binding
		del(line)[11:15]#Reading date, date read, shelve
		del(line)[12:24]#My review,spoiler, notes, read count, rec,rec,own, purch,purch,cond,cond,bcid: 0 till 10 stilla vailable
		print(i,line)
		
		#Writing bibtex
		if line[0] != "Book Id":
			reasout.write("\n@book{"+line[0]+",\n")
			reasout.write("  Title                    = {"+line[1]+"},\n")
			reasout.write("  Author                   = {"+line[3]+"},\n") #Only main author
			reasout.write("  Publisher                = {"+line[7]+"},\n")
			reasout.write("  Year                     = {"+line[10]+"},\n") #original year
			reasout.write("}\n")
		i+=1
	except:
		print("Error in line",i)
		Errors.append(i)
		i+=1
		continue
		
print(len(Errors)," errors where found, namely in the lines ",Errors)

Errorz = ", ".join([str(i) for i in Errors])
reasout.seek(pos,0)
reasout.write("%"+str(len(Errors))+" errors where found, namely in lines: "+Errorz)

reas.close()
reasout.close()