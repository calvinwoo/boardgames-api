# boardgames-api

How the API currently works:
There is a list of board games, similar to the one in your code, that's stored in memory.
https://github.com/calvinwoo/boardgames-api/blob/master/src/boardgames/index.js
Each board game contains an additional ID, which is just an arbitrary number.

There is one routes, which responds with a list of recommended games, based on one that is provided. Currently, it just finds any other games with the same category. You can also provide an optional "count" query parameter, which sets a limit to the number games to respond with. The default value of count is 1.

Here is an example call: https://boardgames-api.herokuapp.com/recommend/base-game/1?count=2

And here is the code: https://github.com/calvinwoo/boardgames-api/blob/master/src/routes/index.js

