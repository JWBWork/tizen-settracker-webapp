# SetTracker
##### Set tracking web-app devloped for tizen 4.0.0 on samsung gear S3
--------
SetTracker is just a simple app I developed to track my sets at the gym so I don't have to worry about it.

##### Current design and future features
-----
I use the app like so:
1. select an excercise plan.
These are currently hardcoded as a js object - but will be provided via a REST API developed in flask once Tizen Power API Issues (TPAI) are resovled. An example of these excercises JSON:
```json
[
  		{
			"id": 0,
			"name": "4x10",
			"moves": [{
				"index": 0,
				"name": "Set 1",
				"type": "set"
			},{
				"index": 1,
				"type": "time",
				"name": "Rest 1",
				"time": [1, 0]
			},{
				"index": 2,
				"name": "Set 2",
				"type": "set"
			}]
  		},{
			"id": 1,
			"name": "3x10",
			"moves": [{
				"index": 0,
				"name": "Set 1",
				"type": "set"
			},{
				"index": 1,
				"type": "time",
				"name": "Rest 1",
				"time": [1, 0]
			},{
				"index": 2,
				"name": "Set 2",
				"type": "set"
			}]
  		},{
  			"id": 3,
  			"name": "1m Rest",
  			"moves": [{
  				"index": 0,
  				"name": "Rest",
  				"type": "time",
  				"time": [1, 0]
  			}]
  		}
]
```
2. The first move of an excercise is displayed.
Currently there are Set moves or Timed moves. Timed moves are currently broken due to TPAI.

3. A user works through the excercises until the list is complete. The user is then returned to the initial list of excercises to select a new excercise and repeat process.

#### Types of Moves
-----
There are currently two types of moves:

| Move Name | Desc. |
| ------ | ------ |
| Set | A collection of reps. "Lift X for Y reps." |
| Timed | A timer for a predertermined period of time. I tend to use these for rests between sets. Currently broken by TPAI when disconnected to tizen studio |
