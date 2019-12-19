let historietext = document.getElementById("historyText");
let inputtext = document.getElementById("inputhistory");
let message = document.getElementById("message");
let menuOpen = true;
let koord = [];
let nymarker;
// Historire kordinat ved ny historie

function clickmarker() {
  let markerset = false;
  map.addEventListener("click", function(e) {
    console.log(markerset);
    if (!markerset) {
      const { lat, lng } = e.latlng;
      document.getElementById("sendkord").value = [lat, lng];
      koord = [lat, lng];
      nymarker = L.marker(e.latlng, { draggable: "true" })
        .addTo(map)
        .bindPopup("Ny markør")
        .openPopup();
      markerset = true;
    }
  });
}

//skjekk at bruker er i stavanger sentrum?
function getcords() {
  navigator.geolocation.getCurrentPosition(position => {
    nymarker = L.marker([position.coords.latitude, position.coords.longitude], {
      draggable: "true"
    })
      .addTo(map)
      .bindPopup("your current location")
      .openPopup();
    koord.push(position.coords.latitude);
    koord.push(position.coords.longitude);
    document.getElementById("sendkord").value = [
      position.coords.latitude,
      position.coords.longitude
    ];
  });
}

function visTextFelt() {
  document.getElementById("nyText").style.display = "block";
  //$("form").fadeIn();
  historietext.style.display = "none";
}
function skjulfelt() {
  document.getElementById("nyText").style.display = "none";
  historietext.style.display = "block";
  message.style.display = "none";
}

function sjekklengde() {
  if (!(inputtext.value.length > 20)) {
    console.log(inputtext.value.length);
    message.style.display = "flex";
    message.innerText = "Teksten du inntastet er ikke lang nokk";
  } else {
    message.style.display = "none";
  }
}

function visnormal() {
  document.getElementsByTagName("header")[0].style.display = "grid";
  document.getElementsByTagName("footer")[0].style.display = "flex";
}
function skjulnormal() {
  document.getElementsByTagName("header")[0].style.display = "none";
  document.getElementsByTagName("footer")[0].style.display = "none";
}

function cpmenu(cp) {
  if (cp == 1) {
    document.getElementById("menu").style.display = "grid";
    // $("#menu").fadein();
    //document.getElementsByTagName("main")[0].style.display = "none";
    // $("main").fadeOut();
    $("main").css("filter", " blur(8px)");
    menuOpen = false;
  } else {
    //document.getElementById("menu").style.display = "none";
    $("#menu").fadeOut();
    $("main").css("filter", "blur()");
    //document.getElementsByTagName("main")[0].style.display = "grid";
    //$("main").fadeIn();
    menuOpen = true;
  }
}
let map = L.map("mapid").setView([58.969975, 5.733107], 14.2);
L.tileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
  // https://api.mapbox.com/styles/v1/stealthalgorithm/ck38knnvx1c6z1cpj7nyst8g0/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3RlYWx0aGFsZ29yaXRobSIsImEiOiJjazM4aGZsZ2IwOHVoM3Bvdng2a2UwNHUzIn0.H5YK9CC9XhpGRfMt0vtQrw
})
  .addTo(map)
  .on("load", function() {
    document.getElementsByClassName("screensplash")[0].style.display = "none";
    visnormal();
    //$(".screensplash").fadeOut();
  });

//legger til knapplytter
document.getElementById("nyM").addEventListener(
  "mousedown",
  function() {
    clickmarker();
    visTextFelt();
    cpmenu(0);
  },
  false
);
document.getElementById("hPos").addEventListener(
  "mousedown",
  function() {
    getcords();
    visTextFelt();
    cpmenu(0);
  },
  false
);
document.getElementById("cancelbutton").addEventListener(
  "mousedown",
  function() {
    //markerset = false;
    map.removeLayer(nymarker);
    skjulfelt();
  },
  false
);
/* inputtext.addEventListener(
  "blur",
  function() {
    sjekklengde();
  },
  false
); */
inputtext.addEventListener(
  "keydown",
  function() {
    sjekklengde();
  },
  false
);

const menuBtn = document.querySelector(".menu-btn");

menuBtn.addEventListener("mousedown", () => {
  if (menuOpen) {
    menuBtn.classList.remove("open");
    cpmenu(1);
    menuOpen = false;
  } else {
    menuBtn.classList.add("open");
    cpmenu(0);
    menuOpen = true;
  }
});

window.addEventListener("mousedown", function(e) {
  if (e.target != historietext) {
    historietext.innerText = "";
    historietext.style.padding = "";
  }
});
