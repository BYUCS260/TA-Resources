#!/bin/bash
#To Use:
#Create a file named "sample.txt" in this folder, making sure it is of the form:
#First Last URL\n (at least 1 space between each - tabs work as well if copying from a spreadsheet it should work)
#Ensure that the URLs all have the protocol before pasting them in!
#Make sure you have the correct spec added (utilize ./addSpec.sh)
#Start up your selenium server (webdriver-manager start)
#Run this: ./runTests.sh

#you'll want to watch it and give design points as you go (the tests should cover most everything else)

#Output: A file (in a folder called testResults) for each line in sample.txt that has the results of running protractor
if [ -f "sample.txt" ]; then
  echo "file exists!"
  mkdir -p testResults
  IFS=$'\n'
  #^ sets the new line character as the delimiter
  for line in $(cat sample.txt); 
  do
      echo -e "\n\n\nNEXT STUDENT"
      echo "line: $line"
      unset IFS
      #^ sets it back to whitespace to allow for breaking up the line
      arr=($line)
      echo "Name: ${arr[0]} ${arr[1]}"
      filename="testResults/${arr[0]}_${arr[1]}_feedback.txt"
      touch $filename
      echo "See $filename for results"
      echo ${#arr[@]}
      if [ ${#arr[@]} -eq 3 ]; then
        echo "URL: ${arr[2]}"
        echo "Starting tests!"
        protractor conf.js --baseUrl="${arr[2]}" >& $filename
      else
        echo "No URL, aborting!?"
      fi
      cat $filename
      IFS=$'\n'
      #^ sets it back to the newline character for grabbing the next line
  done
  unset IFS
  #^ make sure to reset it before you quit
else
  echo "You've got the wrong file!"
fi
