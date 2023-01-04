#!/bin/bash
makeTCPRequest(){ 
   for ((i=0; i<3; i++))
   do
      { time download 2> download.txt;}  2> time.txt
      #grep -o '=.*' download.txt | perl -ne 'print "test $_"'>> bueno.txt
      #sed -n '485p' download.txt > bueno.txt
      grep -o '2023-.*' download.txt >> data.log
      sed -n '2,4p' time.txt >> data.log
      echo " " >> data.log
      rm latest.zip
   done
}

download(){
   wget https://wordpress.org/latest.zip 
}
makeTCPRequest
