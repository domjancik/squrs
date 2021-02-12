

# SQUR!


multiplayer animation expressions in a grid  

color of a squere is computed by its assigned expression. the color is normlized between 0-1

### install
you first need to generate a [firebase](https://console.firebase.google.com/?pli=1) app and adapt `src/firebaseconfig.ts` to the values you will be provided  
see template at  `src/firebaseconfig.ts.md`

``` bash
git clone https://github.com/domjancik/squrs.git && cd squrs
yarn install
yarn start
```



#### Expression variables

`t` - running time, aliases `time`  
`lt` - local time, aliases `localTime`, `local_time`, `uptime`, `ut`  
`index` - ??  
`x` - position of current squere x axis (starting from 1)  
`y` - position of current squere y axis (starting from 1)

#### Expression functions
all expressions are normlized (input 0-1, output 0-1)  

`sin(x)` - sine of the angle given in radians  
`qsr(x)` - square root of the given number  
'tri(x)` = ??  

#### fun expressions
`sin(t*0.01)` - run a sin wave based on the running time multiplied by a float to control rate

