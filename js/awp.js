var shootInit = 0.0;
var reloadUrl = "wav/reloadb.wav";
var reloadSingleUrl = "wav/reload_single.wav";
var ak47url = "wav/awp.mp3";

var shoot = false;
var reloading = false;
var ammo = 10;
var shouldExtractCase = false;
var audio;

var reloadAudioElement = new Audio(reloadUrl);
var reloadSingleAudioElement = new Audio(reloadSingleUrl);
var shootAudioElement = new Audio(ak47url);

var reload = function() {
  reloadAudioElement.currentTime = 0;
  reloadAudioElement.play();
};

var lastInterval;
var shootDisabled = false;

var play = function() {
  if (shouldExtractCase || shootDisabled || ammo <= 0) return;

  shootDisabled = true;
  setTimeout(function() {
    shootDisabled = false;
  }, 1500);

  shootAudioElement.currentTime = shootInit;
  shootAudioElement.play();

  shouldExtractCase = true;
  ammo--;
  if (ammo === 0) {
    document.getElementById("reload_instructions").classList.add("blink");
  }

  document.getElementById("extract_case_instructions").classList.add("blink");
};

var stop = function() {
  console.log("stop");
};

window.onkeydown = function(e) {
  if (e.keyCode !== 13 && e.keyCode !== 111) {
    reloading = false;
  }
  console.log(e.keyCode);
  if (e.keyCode === 8) {
    reloadSingleAudioElement.currentTime = 0;
    reloadSingleAudioElement.play();

    if (shouldExtractCase) {
      shouldExtractCase = false;
      document.getElementById("extract_case_instructions").classList.remove("blink");
    }
  } else if (e.keyCode === 13) {
    if (ammo < 10) reloading = true;
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
      ammo = 10;
      reload();

      document.getElementById("reload_instructions").classList.remove("blink");
    }
    reloading = false;
  }

  console.log("keyup");
  if (shoot) stop();
  shoot = false;
};

