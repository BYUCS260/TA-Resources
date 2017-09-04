#!/bin/bash
#Usage ./fileNameReset.sh 
#resets all the specs to not be run
#Is run as part of ./addSpec.sh (therefore both need execute permissions)
if [ -f "specs/lab2.spec.js" ]; then
mv specs/lab2.spec.js specs/lab2.js
fi
if [ -f "specs/lab3.spec.js" ]; then
mv specs/lab3.spec.js specs/lab3.js
fi
if [ -f "specs/lab4.spec.js" ]; then
mv specs/lab4.spec.js specs/lab4.js
fi
if [ -f "specs/lab5.spec.js" ]; then
mv specs/lab5.spec.js specs/lab5.js
fi
if [ -f "specs/lab6.spec.js" ]; then
mv specs/lab6.spec.js specs/lab6.js
fi
