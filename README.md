# Battleship
A classic battleship game app.

## Overview
Battleship is a strategy guessing game which involves 2 players. The game involves both players to have a board in which each player has their own fleet of ships placed on the board. Each player alternates turns at guessing their shot at the opposing player's ship. The objective of the game is to destroy the opposing player's fleet.

## How It Works
This game app is played against a computer. Each player has a 10x10 board in which both players are given a random allocation of ships.

Each player has a fleet consisting of:

|  Ship Type  | Size  |
|:------------|:-----:|
| Carrier     |   5   |
| Battleship  |   4   |
| Cruiser     |   3   |
| Destroyer 1 |   2   |
| Destroyer 2 |   2   |
| Submarine 1 |   1   |
| Submarine 2 |   1   |

The player may call their shot by clicking a plot on the computer's board. The computer calls their shot by choosing a random legal plot on the player's board. 

Each players' board is marked after each shot from the opposing player:
  - Red mark = hit
  - Gray mark = miss

Once all ships have been sunk, the game is over and the game will end.

## Things to work on
- 2 player mode
- reset
- drag and drop ships
- Add names