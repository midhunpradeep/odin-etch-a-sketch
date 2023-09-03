"use strict";

let canvas = document.getElementById("canvas");
let etching = true;

function createGrid(numBoxesX, numBoxesY) {
  canvas.remove();
  canvas = document.createElement("div");
  canvas.id = "#canvas";
  document.body.insertBefore(canvas, document.getElementById("btn-container"));

  for (let i = 0; i < numBoxesY; i++) {
    let rowFlexBox = document.createElement("div");
    rowFlexBox.classList.add("row");
    canvas.appendChild(rowFlexBox);

    for (let j = 0; j < numBoxesX; j++) {
      let box = document.createElement("div");
      box.classList.add("box");

      if (i === 0) box.classList.add("b-top");
      if (j === numBoxesX - 1) box.classList.add("b-right");
      if (i === numBoxesY - 1) box.classList.add("b-bottom");
      if (j === 0) box.classList.add("b-left");

      box.addEventListener("mouseover", (event) => {
        if (etching) {
          event.target.classList.add("filled");
        } else {
          event.target.classList.remove("filled");
        }
      });

      rowFlexBox.appendChild(box);
    }
  }

  resizeBoxes();
}

function resizeBoxes() {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0,
  );
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0,
  );

  let margin = parseInt(window.getComputedStyle(canvas).margin);
  let availableHeight = vh - 48;
  let availableWidth = vw - 48;

  let numBoxesY = canvas.children.length;
  let numBoxesX = canvas.children[0].children.length;

  let boxes = document.querySelectorAll(".box");
  for (const box of boxes) {
    let idealWidth = availableHeight / numBoxesY;
    let idealHeight = availableWidth / numBoxesX;

    let actualHeightWidth = Math.min(idealHeight, idealWidth);
    box.style.minHeight = actualHeightWidth + "px";
    box.style.minWidth = actualHeightWidth + "px";
  }
}

function toggleEtching() {
  etching = !etching;
  let button = document.getElementById("etch-btn");
  if (etching) {
    button.textContent = "T: Etch Mode";
  } else {
    button.textContent = "T: Erase Mode";
  }
}

function main() {
  let resizeButton = document.getElementById("resize-btn");

  resizeButton.addEventListener(
    "click",
    () => {
      resizeButton.textContent = "Resize";
    },
    { once: true },
  );

  resizeButton.addEventListener("click", () => {
    let gridSize = parseInt(prompt("New grid size (Max 100): "));
    if (isNaN(gridSize)) {
      gridSize = 16;
    }
    gridSize = Math.min(gridSize, 100);
    createGrid(gridSize, gridSize);
  });

  let etchToggleButton = document.getElementById("etch-btn");
  etchToggleButton.addEventListener("click", () => {
    toggleEtching();
  });
  window.addEventListener("keypress", (event) => {
    if (event.key === "T" || event.key === "t") {
      toggleEtching();
    }
  });
}

main();
