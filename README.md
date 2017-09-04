# CS 260 TA Resources

### Lab Test Scripts
The lab test scripts were written utilizing the [Protractor Framework](http://protractortest.org). 
To get setup, check that out. 
The [configuration file]() will run anything in the specs folder of the form *.spec.js - 
to make it easy to only run a single lab, I created the [./addSpec.sh]() script that will do it for you. Make sure that all the .sh files have execute permissions (addSpec.sh, fileNameReset.sh, and runTests.sh). 

The [page objects]() have been copied over to the lab starter code repositories - so if you change them here make sure that they get updated there. 
For more information about the page object pattern, check out [this article](). If a lab changes requirements, you'll likely need to update the tests, so you might want to read through them and get familiar with the ideas and concepts presented. 
The tests are written as End to End tests, which focus on testing user flows. Make sure to check out the [protractor documentation](http://www.protractortest.org/#/api) before you try to change them too much...

[runTests.sh]() was created to allow mass grading of a single lab to occur. In order to use it, check out the file itself, as well as [sample.txt](). If you can't figure it out from those two, ask me.
I would typically have a spreadsheet up with all the students, 
and fill in which tests passed and how many design/TA points they got while the tests were running. 
Most of the tests should take long enough for you to decide those things.

To actually run a test script, make sure that you have your selenium server up 
(by running:

 `webdriver-manager start`
 
in a terminal window) and then in a different terminal window make sure you've added the correct spec (
  
`./addSpec.sh 5`
  
 for example).
**To run a single url at a time** you can just do: 

`protractor conf.js --baseUrl="http://url.com"`

and it should run the test. 
**To run multiple urls in a row** (like for grading a whole set of lab submissions at once), utilize runTests.sh as described previously.



### Spreadsheet Parsing Scripts
[parseEvals.py](https://github.com/jnielson94/test201/blob/master/parseEvals.py) Is utilized to parse the responses to the creative evaluation form shown below:

![Creative Evaluation Form](https://github.com/jnielson94/test201/blob/master/sampleEvaluations.png)

It will ask for the name of the excel file, used as $1 in this description, (I typically change it to something like 1W17.xlsx to make it easy to type), then later it will ask for the folder name that you want to put the generated files into. Some things to note:
- Make sure that there is only the 1 sheet in the excel file
- The file and directory names should not be in quotes, and shouldn't have spaces and the directory must be a new one (sorry!)

The parseEvals script will output:
- A file named Parsed$1, which should have the first sheet adjusted to no longer have the names of the evaluators and a sheet for each group's evaluations
- A file named evaluators$1, which should contain the set of people who were in the evaluator name column when the sheet was downloaded
- A file named averages$1, which should contain a row for each group and the averages from the form number inputs for an easy copy/paste to the google doc the TAs use for evaluating projects
- A folder named whatever you told it to, which contains a file for each group with their evaluations. I typically uploaded this to google drive and sent out the link to the folks (all the evaluator names should be gone, and there are no grades on the sheets)

[parseAct.py](https://github.com/jnielson94/test201/blob/master/parseACT.py) Is utilized to parse and sort the names from a class activity spreadsheet:

![Class Activity Spreadsheet](https://github.com/jnielson94/test201/blob/master/sampleActivity.png)

If will ask for the name of the excel file - $1 - (I typically change it to something like 1.xlsx for the first one and so on) and will spit out a file called activity$1 (if you leave off the .xlsx when inputting the path it will add it on for you).

