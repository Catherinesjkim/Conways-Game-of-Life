# Conways-Game-of-Life
Implementation of Conway's Game of Life built using React


# React Cellular Automata

### Rules

#### Internet Explanations of The Game Of Life
- http://www.scholarpedia.org/article/Game_of_Life
- https://www.youtube.com/watch?v=ouipbDkwHWA

#### Classic Rules (Rule 3):
- Any live cell with fewer than two live neighbours dies, as if by underpopulation.
- Any live cell with two or three live neighbours lives on to the next generation.
- Any live cell with more than three live neighbours dies, as if by overpopulation.
- Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

#### Rule Numbers

The rules are defined in terms of a number.

A cell must have exactly that number of neighbours (either including or excluding itself) 
to either survive or be born into the next generation.

To give Rule 3 as an example, a dead cell needs exactly 3 neighbours to be born, 
whilst a live cell needs either 2 or 3 neighbours to survive. All other combinations 
of neighbours result in a dead cell.  

This is the Conway's Game of Life Blinker (period 2 - 3rd generations) that I implemented with Go:

![Blinker](https://user-images.githubusercontent.com/17114008/90703148-d73be600-e241-11ea-88c0-947eae277148.jpg)
