# SQUR!

multiplayer animation expressions in a grid

color and sound of each squr is computed by its assigned expression

valid values are between -1 and 1

[try it out](http://domjancik.github.io/squrs)

### local install

1. ```bash
   git clone https://github.com/domjancik/squrs.git && cd squrs
   ```
2. create a [firebase](https://console.firebase.google.com/?pli=1) app
3. copy the provided config into `src/firebaseConfig.ts` (see `src/firebaseConfig.ts.md` for reference)
4. ```bash
   yarn install
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

`sqr(x, [phase])` - ┌┐ square

##### Sequencers

stp(x, ...steps)

#### Example expressions

`sin(t*0.01)` - run a sine wave based on the running time multiplied by a float to control rate

`sqr(stp(t/4, sin(t/2), t*2))` - a square wave with changing speeds

### configuration parameters

#### query parameters

you can set the following parameters as part of the URL in the form of query parameters:

```
http://localhost:3000/squrs?store=local&resolution=1&room=squrland
```

- `store` - `firebase` or `local`, where to persist squr state. Will default to `firebase` on unknown values.
- `room` - which "room" to store in, think of it as different save files
- `resolution` - how many squrs per column and row

#### via console

some parameters can be set at runtime via the JavaScript developer console by running the following functions:

- `squrListScales()` - show available musical scales
- `squrSetScale(index: number)` - change the musical scale used

### where next?

https://discord.gg/Q27rcfd
