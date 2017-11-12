#!/bin/bash

if [ -n "$1" ]; then
  pagetoken=$1
  echo "Page token: $pagetoken"
else
  echo "You need to pass the page token as parameter"
  exit
fi


curl -X DELETE -H "Content-Type: application/json" -d '{
  "setting_type":"call_to_actions",
  "thread_state":"existing_thread"
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=$pagetoken"

curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type" : "call_to_actions",
  "thread_state" : "existing_thread",
  "call_to_actions":[
    {
      "type":"postback",
      "title":"Configurar Alertas",
      "payload":"action?SubscriptionsAction"
    },
    {
      "type": "postback",
      "title":"Ver Cardápios",
      "payload":"action?WeekMenuAction"
    },
    {
      "type":"postback",
      "title":"Ver Ajuda",
      "payload":"action?HelpAction"
    }
  ]
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=$pagetoken"

curl -X DELETE -H "Content-Type: application/json" -d '{
  "setting_type":"call_to_actions",
  "thread_state":"new_thread"
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=$pagetoken"

curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type" : "call_to_actions",
  "thread_state" : "new_thread",
  "call_to_actions":[
    {
      "payload":"action?GreetingsAction"
    }
  ]
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=$pagetoken"

curl -X DELETE -H "Content-Type: application/json" -d '{
  "setting_type":"greeting"
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=$pagetoken"

curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type" : "greeting",
  "greeting": {
  "text":"Olá {{user_first_name}}! Estou aqui para lhe dar informações e notificações dos cardápios do RU-UFSC (por @brunoluiz)"
  }
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=$pagetoken"

