printf "\n\nCHECKSUM STARTED\n\n" && 
printf "Linting ts code...\n" && npm run tslint &> /dev/null && 
printf "Testing ts code...\n" && npm test &> /dev/null &&  
printf "Building ts code...\n" && npm run build &> /dev/null &&
printf "Testing js code...\n" && npm run test:prod &> /dev/null &&
printf "\n✔ ALL OK\n" || printf "\n✖ AN ERROR STOPED THE CHECKSUM\nRun the latest command manually for get error details\n"