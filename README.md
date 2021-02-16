

# SQUR!


multiplayer animation expressions in a grid  

color and sound of each squr is computed by its assigned expression

valid values are between -1 and 1

[try it out](http://domjancik.github.io/squrs)


### local install

``` bash
git clone https://github.com/domjancik/squrs.git && cd squrs
yarn install
yarn start
```

1. ``` bash
    git clone https://github.com/domjancik/squrs.git && cd squrs
    ```
2. create a [firebase](https://console.firebase.google.com/?pli=1) app
3. copy the provided config into `src/firebaseConfig.ts` (see `src/firebaseConfig.ts.md` for reference)
4. yarn install
    yarn start
    ```


#### Expression variables

`t` - running time in seconds, aliases `time`
`i` - index of squr (starting from 1, row by row)
`x` - position of current squr x axis (starting from 1)  
`y` - position of current squr y axis (starting from 1)

#### Expression functions
all expressions are normlized (input 0-1, output 0-1)  

##### Wave generators

x 0-1 for full cycle, output between 0-1

`sin(x)` - ~ sine
'tri(x)` - /\ triangle
`sqr(x)` - ┌┐ square

#### Example expressions
`sin(t*0.01)` - run a sin wave based on the running time multiplied by a float to control rate

