#!/bin/bash
# Usage: ./addSpec.sh [labNum]

#runs this script first to make sure all the specs are not being run
./fileNameReset.sh
#Check to make sure there is an arg
if [ "$1" != "" ]; then
  #Check that the specified spec file exists
  if [ -f "specs/lab$1.js" ]; then
    #Rename it so protractor can find it
    mv specs/lab$1.js specs/lab$1.spec.js
  fi
fi
