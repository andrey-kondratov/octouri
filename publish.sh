#!/bin/bash

if [ -n "$1" ]
then
  suffix="-$1"
else
  suffix=""
fi

output=octouri-win32-x64
filename=octouri-win32-x64$suffix.zip

npm run electron-package
zip -9DmrT $filename $output
