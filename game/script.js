const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
const x_velocity = 100;
const y_velocity = 100;
let score = 0;
const score_text = document.querySelector("span");
const arrows1 = document.getElementById("arrows1");
const arrows2 = document.getElementById("arrows2");
const arrows3 = document.getElementById("arrows3");
const arrows4 = document.getElementById("arrows4");
function isColliding(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  );
}
const player = {
  x: 0,
  y: 100,
  w: 100,
  h: 100,
  color: "#55ff00",
  img: new Image(),
  draw: function () {
    this.img.src = "img/player.png";
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  },
  left: function () {
    this.x += x_velocity;
  },
  right: function () {
    this.x -= x_velocity;
  },
  up: function () {
    this.y -= y_velocity;
  },
  down: function () {
    this.y += y_velocity;
  }
};
const apple = {
    x: 0,
    y: 0,
    w: 100,
    h: 100,
    color: "red",
    img: new Image(),
    draw: function () {
      this.img.src = "img/abellota.png";
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
  };
window.addEventListener("keydown", (e) => {
  if (e.key === "d" || e.key === "ArrowRight") {
    player.left();
  }
  if(e.key === "a" || e.key === "ArrowRight") {
    player.right();
  }
  if(e.key === "w" || e.key === "ArrowRight") {
    player.up();
  }
  if(e.key === "s" || e.key === "ArrowRight") {
    player.down();
  }
});
arrows1.addEventListener("click", () => {
  player.up();
});
arrows2.addEventListener("click", () => {
  player.down();
});
arrows3.addEventListener("click", () => {
  player.right();
});
arrows4.addEventListener("click", () => {
  player.left();
});
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    apple.draw();
    score_text.innerHTML = score;
    if (isColliding(player, apple)) {
        apple.x = Math.floor(Math.random() * canvas.width);
        apple.y = Math.floor(Math.random() * canvas.height);
        score++;
    }
    requestAnimationFrame(loop);
}
loop();
requestAnimationFrame(loop);
const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", resetGame);
function resetGame() {
  player.x = 0;
  player.y = 100;
  apple.x = 0;
  apple.y = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function gameOver() {
    alert("Game Over, score: " + score);
}
//setInterval(gameOver, 20000);