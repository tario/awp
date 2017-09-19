var shootInit = 0.0;
var reloadUrl = "wav/reloadb.wav";
var ak47url = "wav/ak47d.wav";

var shoot = false;
var reloading = false;
var ammo = 31;
var audio;

var reloadAudioElement = new Audio(reloadUrl);
var shootAudioElement = new Audio(ak47url);

var reload = function() {
  reloadAudioElement.currentTime = 0;
  reloadAudioElement.play();
};

var lastInterval;
var play = function() {
  if (ammo <= 0) return;

  console.log("play");
  shootAudioElement.currentTime = shootInit;
  shootAudioElement.play();

  if (lastInterval) clearInterval(lastInterval);
  ammo--;
  lastInterval = setInterval(function() {
    shootAudioElement.currentTime = shootInit;
    ammo--;
    if (ammo <=0) {
      if (lastInterval) clearInterval(lastInterval);    
      document.getElementById("reload_instructions").classList.add("blink");
    }
  }, 100);
};

var stop = function() {
  if (lastInterval) clearInterval(lastInterval);

  console.log("stop");
  //shootAudioElement.pause();
  //shootAudioElement.currentTime = shootInit;
};

window.onkeydown = function(e) {
  if (e.keyCode !== 13 && e.keyCode !== 111) {
    reloading = false;
  }
  if (e.keyCode === 13) {
    if (ammo < 31) reloading = true;
  } else {
    if (e.keyCode !== 111) {
      if (!shoot) play();
      shoot = true;
    }
  }
};

window.onkeyup = function(e) {
  if (e.keyCode === 111) {
    if (reloading) {
      ammo = 31;
      reload();

      document.getElementById("reload_instructions").classList.remove("blink");
    }
    reloading = false;
  }

  console.log("keyup");
  if (shoot) stop();
  shoot = false;
};

