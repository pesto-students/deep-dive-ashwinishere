const io = require("socket.io")();

people = {};
names = [];
apple = { ax: 50, ay: 50 };
idname = {};
io.on("connection", (client) => {
  client.on("subscribeToTimer", (name) => {
    idname[client.id] = name;
    console.log("client is subscribing to timer with interval ", name);
    person = { id: 1, name: name, x: 0, y: 0, rx: 0, ry: 0, score: 0 };
    if (names.indexOf(person.name) === -1) {
      people[name] = person;
      names.push(person.name);
    }
    client.emit(name, people);
    client.emit("apple", apple);
    client.emit("moved", people);
  });

  client.on("Ieat", function (msg) {
    apple = msg;
    client.emit("apple", apple);
  });

  client.on("move", function (msg) {
    people[msg.name] = msg;
    client.emit("moved", people);
  });
});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);
