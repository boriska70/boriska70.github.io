#! /bin/bash

# CURL does nothing with javascript so this script does not generate Google Analytics data

while [ true ]; do
  echo $(date -Iseconds)
  fakeip=12.14.16.$(( RANDOM % 255 ))
  echo $fakeip
  curl --head --header "X-Forwarded-For: $fakeip" http://boriska70.github.io 2>/dev/null | grep HTTP
  sleep $(( RANDOM % 60 ))
done
