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
      "title":"Cardápios ",
      "payload":"action?WeekMenuAction"
    },
    {
      "type":"postback",
      "title":"Ajuda",
      "payload":"action?HelpAction"
    }
  ]
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=$pagetoken"

