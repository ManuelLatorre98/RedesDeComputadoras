#!/bin/bash
#Ejecutar con sudo, si da problemas puede ser que sea necesario hacerlo desde root
#traceroute 198.143.164.252 (para ver routers USA)
#traceroute 109.201.154.129 (para ver routers EU)
program(){
   while true
   do
      for ((j=0; j<3; j++))
      do
         if [[ $j -eq 0 ]]; then
            echo "cubic" > /proc/sys/net/ipv4/tcp_congestion_control
         elif [[ $j -eq 1 ]]; then
            echo "reno" > /proc/sys/net/ipv4/tcp_congestion_control
         #elif [[ $j -eq 2 ]]; then
         #  echo "vegas" > /proc/sys/net/ipv4/tcp_congestion_control
         
         fi

         echo "HOST 1" >> data.log
         host=1
         makeTCPRequest
         wait
         echo "HOST 2" >> data.log
         host=2
         makeTCPRequest
      done
      sleep 60m #Test cada 60 minutos
   done
}


makeTCPRequest(){ 
   
   for ((i=0; i<3; i++))
   do
      if [[ $host -eq 1 ]];
      then
         { time downloadHostOne 2> download.txt;}  2> time.txt
      else
         { time downloadHostTwo 2> download.txt;}  2> time.txt
      fi
      sysctl net.ipv4.tcp_congestion_control >> data.log
      grep -o '2023-.*' download.txt >> data.log
      sed -n '2,4p' time.txt >> data.log
      echo " " >> data.log
      rm trashFile.zip
   done
}

downloadHostOne(){
   wget -O trashFile.zip https://wordpress.org/latest.zip
}

downloadHostTwo(){
   wget -O trashFile.zip https://www63.uptobox.com/dl/5-PrzAB5ZKO49AcslkuZViQFcI_bDzUjWn44qudW5l-20k_QIppDUFtmasqgebK1v0Doo0Tr2P4VecpmYeqCmGh_rp16tna0GMfXlGh9qt9gErtSuAZ5Twr9J2GV9GOV3O8IeR9Lhjxi60hNXYiKPA/Undertale.zip
   #wget -O trashFile.zip https://www34.zippyshare.com/d/KF4kFwyM/38320/Undertale.zip #Este link se pierde :c
}
#makeTCPRequest
program

