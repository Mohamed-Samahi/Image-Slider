// select the indicators element
let ind = document.getElementById("indicators");

// selecting the previous button
let prevButton = document.getElementById("prev");

// selecting the next button
let nextButton = document.getElementById("next");

// create the ul element
let ul = document.createElement("ul");

// creating array of images
let images = Array.from(document.querySelectorAll(".slider-container img"));

// getting images count
let imgsCount = images.length;

// current image index
let currentImage = 1;

let slideNum = document.getElementById("slide-number");

// making for loop of imgscount length to create lis items and append them to the ul
for (let i = 1; i <= imgsCount; i++) {
  let li = document.createElement("li");

  li.setAttribute("data-index", i);

  li.appendChild(document.createTextNode(i));

  ul.appendChild(li);
}

ind.appendChild(ul);

let createdLi = document.querySelectorAll(".indicators ul li");

let liArray = Array.from(createdLi);

progress();

for (let i = 0; i < liArray.length; i++) {
  liArray[i].onclick = function () {
    currentImage = parseInt(this.getAttribute("data-index"));

    window.localStorage.setItem("currentImageIndex", `${currentImage}`);

    progress();
  };
}

prevButton.onclick = changeImage;

nextButton.onclick = changeImage;

function changeImage() {
  if (this.classList.contains("disabled")) {
    return false;
  } else if (this.classList.contains("next")) {
    currentImage++;

    window.localStorage.setItem("currentImageIndex", `${currentImage}`);

    progress();
  } else if (this.classList.contains("prev")) {
    currentImage--;

    window.localStorage.setItem("currentImageIndex", `${currentImage}`);

    progress();
  }
}

function removeActive() {
  images.forEach((e) => {
    e.classList.remove("active");
  });

  liArray.forEach((e) => {
    e.classList.remove("active");
  });
}

function progress() {
  if (window.localStorage.getItem("currentImageIndex") === "null") {
    window.localStorage.setItem("currentImageIndex", currentImage);
  } else {
    currentImage = window.localStorage.getItem("currentImageIndex");
  }

  slideNum.textContent = `image ${currentImage} of ${imgsCount}`;

  removeActive();

  if (currentImage == 1) {
    prevButton.classList.add("disabled");
  } else {
    prevButton.classList.remove("disabled");
  }

  if (currentImage == imgsCount) {
    nextButton.classList.add("disabled");
  } else {
    nextButton.classList.remove("disabled");
  }

  images[currentImage - 1].classList.add("active");

  ul.children[currentImage - 1].classList.add("active");
}
