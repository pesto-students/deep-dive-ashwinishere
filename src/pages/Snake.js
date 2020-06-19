import React, { Component } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import openSocket from "socket.io-client";
import "../App.css";

class Snake extends Component {
  constructor() {
    super();
    //prompts the user to give a player name
    var playerName = prompt("Please enter your name:", "");

    this.name = playerName;
    //player object
    let player = {
      id: 1,
      name: this.name,
      x: 0,
      y: 0,
      rx: 0,
      ry: 0,
      score: 0,
    };
    //apple co-ordinates
    let apple = { ax: 50, ay: 50 };
    this.state = {
      color: "pink",
      apple: apple,
      player: player,
      people: { [this.name]: player },
      serverStatus: "offline",
    };

    //opens the connection
    this.socket = openSocket("localhost:8000");
    this.subscribeToTimer((err, people) => {
      this.setState({
        people: people,
      });
    });

    this.socket.on("moved", (msg) => {
      this.setState({
        people: msg,
      });
    });

    this.socket.on("apple", (msg) => {
      this.setState({
        apple: msg,
      });
    });
  }

  subscribeToTimer(cb) {
    this.socket.on(this.name, (people) => cb(null, people));
    this.socket.emit("subscribeToTimer", this.name);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  componentDidMount() {
    //calls game
    setInterval(this.game.bind(this), 1000 / 8);
    document.addEventListener("keydown", this.keyPress.bind(this));
  }

  keyPress(event) {
    let player = { ...this.state.player };
    if (event.key === "ArrowLeft") {
      player.rx = -1;
      player.ry = 0;
    }
    if (event.key === "ArrowRight") {
      player.rx = 1;
      player.ry = 0;
    }
    if (event.key === "ArrowDown") {
      player.rx = 0;
      player.ry = 1;
    }
    if (event.key === "ArrowUp") {
      player.rx = 0;
      player.ry = -1;
    }

    this.socket.emit("move", {
      id: 1,
      name: this.name,
      x: player.x,
      y: player.y,
      rx: player.rx,
      ry: player.ry,
      score: player.score,
    });
    this.setState({
      player: player,
    });
  }

  game() {
    if (this.socket.connected) {
      this.setState({
        serverStatus: <p className="text-success">ONLINE</p>,
      });
    } else {
      this.setState({
        serverStatus: <p className="text-danger">OFFLINE</p>,
      });
    }
    let player = { ...this.state.player };
    let speed = 7;
    let x = player.x + player.rx * speed;
    let y = player.y + player.ry * speed;
    let rx = player.rx;
    let ry = player.ry;
    let score = player.score;

    if (x < 0) x = 500;
    if (x > 501) x = 0;
    if (y < 0) y = 500;
    if (y > 500) y = 0;
    //logic for eating apple
    if (
      x - 5 < this.state.apple.ax &&
      this.state.apple.ax < x + 5 &&
      this.state.apple.ay - 5 < y &&
      y < this.state.apple.ay + 5
    ) {
      score = score + 1;
      player.score = score;
      let apple = {
        ax: this.getRandomInt(0, 500),
        ay: this.getRandomInt(0, 500),
      };
      this.socket.emit("move", {
        id: 1,
        name: this.name,
        x: x,
        y: y,
        rx: rx,
        ry: ry,
        score: score,
      });
      this.socket.emit("Ieat", apple);
      this.setState({
        apple: apple,
      });
    }

    player.x = x;
    player.y = y;
    this.setState({
      player: player,
    });
    this.socket.emit("move", {
      id: 1,
      name: this.name,
      x: x,
      y: y,
      rx: rx,
      ry: ry,
      score: score,
    });
  }

  render() {
    const image = new window.Image();
    image.src =
      "http://4designer.t7yb.net/files/20130108/Snake-skin-texture-01-HD-Images-41083.jpg";
    return (
      <React.Fragment>
        <div className="col">
          <Stage width={500} height={500}>
            <Layer>
              <Rect
                x={0}
                y={0}
                width={500}
                height={500}
                fillPatternImage={image}
              />
              <Text
                text={this.name}
                x={this.state.player.x}
                y={this.state.player.y + 10}
              />
              <Rect
                x={this.state.player.x}
                y={this.state.player.y}
                width={10}
                height={10}
                fill="blue"
              />
              {Object.keys(this.state.people).map((item, i) => {
                return this.state.people[item].name !== this.name ? (
                  <React.Fragment>
                    <Text
                      text={this.state.people[item].name}
                      x={this.state.people[item].x}
                      y={this.state.people[item].y + 10}
                    />
                    <Rect
                      x={this.state.people[item].x}
                      y={this.state.people[item].y}
                      width={10}
                      height={10}
                      fill="blue"
                    />
                  </React.Fragment>
                ) : null;
              })}
              <Rect
                x={this.state.apple.ax}
                y={this.state.apple.ay}
                width={10}
                height={10}
                fill="red"
              />
            </Layer>
          </Stage>
        </div>
      </React.Fragment>
    );
  }
}

export default Snake;
