let canvas = document.querySelector('#cnv');
let ctx = canvas.getContext('2d');

let W, H;

function size() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
}

size();

window.addEventListener("resize", size);

// /////////////////////////////////////

let boule = {
    x: W/2,
    y: H/2,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 0
}

// window.addEventListener('mousemove', control)

window.addEventListener("deviceorientation", handleOrientation);

function handleOrientation(event) {
  let sensibilite = 0.00005;
  boule.ay = event.beta * sensibilite
  boule.ax = event.gamma * sensibilite

//   console.log(beta, gamma)
}

function control(e) {
    // console.log(e.clientX, e.clientY)
    
    let distCentX =  e.clientX - W/2;
    let distCentY = e.clientY - H/2;

    let sensibilite = 1;

    boule.ax = distCentX * sensibilite;
    boule.ay = distCentY * sensibilite;

    // console.log(distCentX, distCentY)
}

function draw() {
    boule.vx += boule.ax;
    boule.vy += boule.ay;

    boule.x += boule.vx
    boule.y += boule.vy

    ctx.clearRect(0, 0, W, H);
    ctx.beginPath();
    ctx.arc(boule.x, boule.y, 25, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    requestAnimationFrame(draw)
}

requestAnimationFrame(draw)

function handleClick() {
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    // The API requires permission — request it
    Promise.all([
      DeviceMotionEvent.requestPermission(),
      DeviceOrientationEvent.requestPermission(),
    ]).then(([motionPermission, orientationPermission]) => {
      if (
        motionPermission === "granted" &&
        orientationPermission === "granted"
      ) {
        // window.addEventListener("devicemotion", handleMotion);
        window.addEventListener("deviceorientation", handleOrientation);
      }
    });
  } else {
    // No permission needed, add event listeners directly
    // window.addEventListener("devicemotion", handleMotion);
    window.addEventListener("deviceorientation", handleOrientation);
  }
}

document.querySelector('button').addEventListener("click", handleClick)