# packet-loss-testing-tools

## Description

- Nowaday, packet loss finder is hard with using command line. Playing game and using internet with the problems. 

- Track the network where is packet loss problem.

## Tools

- React as frontend
- Node as backend, api

## Environment

- we developed this application in OSX. So, we are not sure that windows will work correctly.

## TO RUN THIS PROJECT

```clone this project by $ git clone https://github.com/ziveso/packet-loss-testing-tool```

open 2 terminals

<b>first terminal run</b>

```$ cd api```

```$ yarn start```

<b>second terminal run</b>

```$ cd frontend```

```$ yarn start```

After you run the second terminal it will open http://localhost:3000 automaticly to access the application

## Contributors

- Thitiwat Thongbor 5910546384
- Sirasath Piyapootinun 5910546465
- Pawan Intawongsa 5910545752

## Task

 - [x] find router route // node
 - [x] ping on router route or custom URL // node and react (input)
 - [x] record how many packet loss in one minute or custom time
 - [x] show how many packet loss from record
 - [x] init database
 - [x] add stats to database
 - [x] show stats in graph in minute
