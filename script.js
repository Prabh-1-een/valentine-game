const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

const tileSize = 40; // Maze tile size
const player = { x: 1, y: 1 }; // Player's starting position

const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 2, 1], // The '2' marks the otter goal
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings

    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 1) {
                ctx.fillStyle = "blue"; // Walls
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            } else {
                ctx.fillStyle = "white"; // Open path
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            }

            ctx.strokeRect(col * tileSize, row * tileSize, tileSize, tileSize);

            // Draw the otter emoji at the goal position
            if (maze[row][col] === 2) {
                ctx.font = "30px Arial"; // Set emoji size
                ctx.fillText("🦦", col * tileSize + 10, row * tileSize + 30);
            }
        }
    }

    // Draw the player
    ctx.fillStyle = "red";
    ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

// Move player
document.addEventListener("keydown", (event) => {
    let newX = player.x;
    let newY = player.y;

    if (event.key === "ArrowUp") newY--;
    if (event.key === "ArrowDown") newY++;
    if (event.key === "ArrowLeft") newX--;
    if (event.key === "ArrowRight") newX++;

    if (maze[newY][newX] !== 1) {
        player.x = newX;
        player.y = newY;
    }

    // Check if player reaches goal (otter emoji)
    if (maze[player.y][player.x] === 2) {
        window.location.href = "win.html";
    }

    drawMaze();
});

function startGame() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    drawMaze();
}
