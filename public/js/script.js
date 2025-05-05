const cars = [
  { name: "adventador", path: "images/vehicles/adventador.jpg" },
  { name: "aerocar", path: "images/vehicles/aerocar.jpg" },
  { name: "batmobile", path: "images/vehicles/batmobile.jpg" },
  { name: "camaro", path: "images/vehicles/camaro.jpg" },
  { name: "crwn-vic", path: "images/vehicles/crwn-vic.jpg" },
  { name: "delorean", path: "images/vehicles/delorean.jpg" },
  { name: "dog-car", path: "images/vehicles/dog-car.jpg" },
  { name: "escalade", path: "images/vehicles/escalade.jpg" },
  { name: "fire-truck", path: "images/vehicles/fire-truck.jpg" },
  { name: "hummer", path: "images/vehicles/hummer.jpg" },
  { name: "mechanic", path: "images/vehicles/mechanic.jpg" },
  { name: "model-t", path: "images/vehicles/model-t.jpg" },
  { name: "monster-truck", path: "images/vehicles/monster-truck.jpg" },
  { name: "mystery-van", path: "images/vehicles/mystery-van.jpg" },
  { name: "survan", path: "images/vehicles/survan.jpg" },
  { name: "wrangler", path: "images/vehicles/wrangler.jpg" },
];
document.querySelector(".year").innerHTML = new Date().getFullYear();
document.querySelector(".modified").innerHTML = document.lastModified;
const container = document.querySelector(".v-container");
