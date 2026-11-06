// OPEN GIFT

function openGift(){

document.getElementById("welcome").style.display="none";

document.getElementById("greeting").style.display="block";

grandCelebration();

}


// FLOATING PARTICLES

const symbols=["✨","🌸","✦","🌺","❁","⭐"];

function createParticles(){

for(let i=0;i<40;i++){

let p=document.createElement("div");

p.className="particle";

p.innerText=symbols[Math.floor(Math.random()*symbols.length)];

p.style.left=Math.random()*100+"vw";

p.style.fontSize=(12+Math.random()*18)+"px";

p.style.animationDuration=(5+Math.random()*7)+"s";

p.style.animationDelay=Math.random()*5+"s";

document.body.appendChild(p);

}

}

createParticles();


// FIREWORKS ENGINE

const canvas=document.getElementById("fireworks");

const ctx=canvas.getContext("2d");

let particles=[];

function resizeCanvas(){

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize",resizeCanvas);


function createFirework(x,y){

let colors=["#ffcc33","#ff4444","#ffffff","#ff66cc","#66ffff","#aaff66"];

for(let i=0;i<90;i++){

let angle=Math.random()*Math.PI*2;

let speed=Math.random()*6+2;

particles.push({

x:x,

y:y,

vx:Math.cos(angle)*speed,

vy:Math.sin(angle)*speed,

life:100,

color:colors[Math.floor(Math.random()*colors.length)]

});

}

}


function animateFireworks(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach((p)=>{

ctx.globalAlpha=p.life/100;

ctx.fillStyle=p.color;

ctx.beginPath();

ctx.arc(p.x,p.y,2.5,0,Math.PI*2);

ctx.fill();

p.x+=p.vx;

p.y+=p.vy;

p.vy+=0.04;

p.life--;

});

ctx.globalAlpha=1;

particles=particles.filter(p=>p.life>0);

requestAnimationFrame(animateFireworks);

}

animateFireworks();


// RANDOM FIREWORKS

function launchFireworks(){

for(let i=0;i<5;i++){

setTimeout(()=>{

let x=Math.random()*canvas.width;

let y=Math.random()*(canvas.height*0.65);

createFirework(x,y);

},i*300);

}

}


// CRACKER EFFECT

function launchCrackers(){

const crackerSymbols=["🎆","🎇","✨","💥","⭐"];

for(let i=0;i<25;i++){

let cracker=document.createElement("div");

cracker.innerText=crackerSymbols[
Math.floor(Math.random()*crackerSymbols.length)
];

cracker.style.position="fixed";

cracker.style.left=Math.random()*100+"vw";

cracker.style.top=(30+Math.random()*60)+"vh";

cracker.style.fontSize=(20+Math.random()*25)+"px";

cracker.style.zIndex="15";

cracker.style.pointerEvents="none";

cracker.style.transition="all 1.5s ease-out";

document.body.appendChild(cracker);

setTimeout(()=>{

cracker.style.transform=
"translateY(-150px) scale(2) rotate(360deg)";

cracker.style.opacity="0";

},50);

setTimeout(()=>cracker.remove(),1700);

}

}


// GRAND CELEBRATION

function grandCelebration(){

launchFireworks();

launchCrackers();

setTimeout(launchFireworks,1800);

setTimeout(launchCrackers,2500);

setTimeout(launchFireworks,3500);

}


// WHATSAPP SHARING

function shareWebsite(){

const message=
"🪔✨ Happy Dhanteras! ✨🪔\n\n"+
"May Goddess Lakshmi bless every home with wealth, "+
"health, happiness and prosperity.\n\n"+
"Wishing you and your family a beautiful Dhanteras! ❤️\n\n"+
window.location.href;

const url="https://wa.me/?text="+encodeURIComponent(message);

window.open(url,"_blank");

}


// BACKGROUND MUSIC

let audioContext;

let oscillator;

let musicPlaying=false;

function toggleMusic(){

if(!audioContext){

audioContext=new (window.AudioContext||window.webkitAudioContext)();

}

if(audioContext.state==="suspended"){

audioContext.resume();

}

if(!musicPlaying){

oscillator=audioContext.createOscillator();

let gain=audioContext.createGain();

oscillator.type="sine";

oscillator.frequency.value=523.25;

gain.gain.value=0.025;

oscillator.connect(gain);

gain.connect(audioContext.destination);

oscillator.start();

musicPlaying=true;

document.getElementById("musicBtn").innerText="🔇 Stop Music";

}else{

oscillator.stop();

musicPlaying=false;

document.getElementById("musicBtn").innerText="🎵 Play Music";

}

}