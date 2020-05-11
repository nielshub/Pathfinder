import React from "react";
import "./Pathfinder.css";
import { Dijkstra, getNodesInShortestPathOrder } from "../Algorithm/Dijkstra";
import { Aplus } from "../Algorithm/Aplus";
import Node from "./node";

export default class Pathfinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
      movingStartPoint: false,
      movingFinishtPoint: false,
      start_node: {
        row: 10,
        col: 15,
      },
      finish_node: {
        row: 10,
        col: 35,
      },
    };
  }

  componentDidMount = () => {
    const grid = this.getInitGrid();
    this.setState({ grid: grid });
  };
  handleMouseDown = (row, col) => {
    if (
      row === this.state.start_node.row &&
      col === this.state.start_node.col
    ) {
      const newGrid = this.state.grid;
      newGrid[row][col].isStart = false;
      this.setState({
        grid: newGrid,
        mouseIsPressed: true,
        movingStartPoint: true,
      });
    } else if (
      row === this.state.finish_node.row &&
      col === this.state.finish_node.col
    ) {
      const newGrid = this.state.grid;
      newGrid[row][col].isFinish = false;
      this.setState({
        grid: newGrid,
        mouseIsPressed: true,
        movingFinishPoint: true,
      });
    } else {
      const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  };
  handleMouseEnter = (row, col) => {
    if (!this.state.mouseIsPressed) return;
    if (this.state.movingStartPoint) return;
    if (this.state.movingFinishPoint) return;
    const newGrid = this.getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  };
  handleMouseUp = (row, col) => {
    if (this.state.movingStartPoint) {
      const newGrid = this.state.grid;
      const startNode = {
        row: row,
        col: col,
      };
      newGrid[row][col].isStart = true;
      this.setState({
        grid: newGrid,
        mouseIsPressed: false,
        movingStartPoint: false,
        start_node: startNode,
      });
    } else if (this.state.movingFinishPoint) {
      const newGrid = this.state.grid;
      const finishNode = {
        row: row,
        col: col,
      };
      newGrid[row][col].isFinish = true;
      this.setState({
        grid: newGrid,
        mouseIsPressed: false,
        movingFinishPoint: false,
        finish_node: finishNode,
      });
    } else {
      this.setState({ mouseIsPressed: false });
    }
  };

  getInitGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentrow = [];
      for (let col = 0; col < 50; col++) {
        currentrow.push(this.createNode(col, row));
      }
      grid.push(currentrow);
    }
    return grid;
  };

  createNode = (col, row) => {
    return {
      col,
      row,
      isStart:
        row === this.state.start_node.row && col === this.state.start_node.col,
      isFinish:
        row === this.state.finish_node.row &&
        col === this.state.finish_node.col,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  //Visual && Computing
  animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      } else if (i === 0 /* || i === visitedNodesInOrder.length - 1*/) {
        continue;
      } else {
        setTimeout(() => {
          const node = visitedNodesInOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }, 10 * i);
      }
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }
  //Djikstra
  VisualDijkstra = () => {
    const { grid } = this.state;
    const start_node =
      grid[this.state.start_node.row][this.state.start_node.col];
    const finish_node =
      grid[this.state.finish_node.row][this.state.finish_node.col];
    const visitedNodesInOrder = Dijkstra(grid, start_node, finish_node);
    for (let node of visitedNodesInOrder) {
      grid[node.row][node.col].isVisited = true;
    }
    this.setState({ grid });
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish_node);
    this.animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  //Aplus
  Aplus = () => {
    const { grid } = this.state;
    const start_node =
      grid[this.state.start_node.row][this.state.start_node.col];
    const finish_node =
      grid[this.state.finish_node.row][this.state.finish_node.col];
    const visitedNodesInOrder = Aplus(grid, start_node, finish_node);
    for (let node of visitedNodesInOrder) {
      grid[node.row][node.col].isVisited = true;
    }
    this.setState({ grid });
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish_node);
    this.animateVisitedNodes(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  resetGrid = () => {
    const { grid } = this.state;
    grid.map((row) => {
      row.map((node) => {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node";
        return null;
      });
      return null;
    });
    const newgrid = this.getInitGrid();
    this.setState({ grid: newgrid });
  };

  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <div>
        <button onClick={() => this.VisualDijkstra()}>
          Visualize Dijkstra's algorithm
        </button>
        <button onClick={() => this.Aplus()}>
          Visualize A* search algorithm
        </button>
        <button onClick={() => this.resetGrid()}>Reset</button>
        <div className="grid">
          {grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((node, nodeIndex) => {
                  const {
                    row,
                    col,
                    isFinish,
                    isStart,
                    isWall,
                    isVisited,
                  } = node;
                  return (
                    <Node
                      key={nodeIndex}
                      row={row}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      isVisited={isVisited}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => {
                        this.handleMouseEnter(row, col);
                      }}
                      onMouseUp={(row, col) => this.handleMouseUp(row, col)}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
