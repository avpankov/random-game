let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeTop = new Image();
let pipeBottom = new Image();

bird.src = "./src/img/bird.png";
bg.src = "./src/img/bg.png";
fg.src = "./src/img/fg.png";
pipeTop.src = "./src/img/pipeTop.png";
pipeBottom.src = "./src/img/pipeBottom.png";

let fly = new Audio();
let score_audio = new Audio();

fly.src = "./src/audio/fly.mp3";
score_audio.src = "./src/audio/score.mp3";

document.addEventListener("keydown", moveUp);

function moveUp() {
 yPos -= 40;
 fly.play();
}

let pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 0
}

let score = 0;

let xPos = 10;
let yPos = 150;
let grav = 1.5;

//distance between top & bottom pipes
let gap = 100;

function draw() {

    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        
        //add pipes
        ctx.drawImage(pipeTop, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeTop.height + gap);
        
        //move pipes 
        pipe[i].x--;
        
        // add new pipes 
        if (pipe[i].x == 100) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeTop.height) - pipeTop.height
            });
        }

        
        if (xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeTop.width
            && (yPos <= pipe[i].y + pipeTop.height
                || yPos + bird.height >= pipe[i].y + pipeTop.height + gap) || yPos + bird.height >= canvas.height - fg.height) {
            location.reload();
        }

        //update score
        if (pipe[i].x == 5) {
            score++;
            score_audio.play();
        }
    }

    ctx.drawImage(fg, 0, canvas.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Score: " + score, 10, canvas.height - 20);
    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;