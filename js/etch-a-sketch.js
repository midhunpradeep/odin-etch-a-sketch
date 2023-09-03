"use strict";

let canvas = document.getElementById("canvas");
let drawing = false;

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
        draw(event);
      });

      box.addEventListener("dragstart", (event) => {
        event.preventDefault();
      });

      box.addEventListener("drop", (event) => {
        event.preventDefault();
      });

      rowFlexBox.appendChild(box);
    }
  }

  resizeBoxes();
}

function randInt(min, max) {
  return min + Math.random() * (max - min);
}

function draw(event) {
  if (!drawing) return;

  let activeButton = getActiveModeButton();
  switch (activeButton.id) {
    case "etch-btn":
      event.target.style.backgroundColor = "black";
      break;
    case "erase-btn":
      event.target.style.backgroundColor = "white";
      break;
    case "random-btn":
      event.target.style.backgroundColor = `hsl(${randInt(0, 360)}, 95%, 50%)`;
  }
}

function switchActiveModeButton(button) {
  if (button.id === "clear-btn") {
    for (const box of document.querySelectorAll(".box")) {
      box.style.backgroundColor = "white";
    }
    return;
  }

  getActiveModeButton().disabled = false;
  button.disabled = true;
}

function getActiveModeButton() {
  return document.querySelector("#btn-container > button:disabled");
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

function bindDrawButtonKeys() {
  let drawButtons = document.querySelectorAll(
    "#btn-container > button[data-kb]",
  );

  for (const button of drawButtons) {
    button.addEventListener("click", () => {
      switchActiveModeButton(button);
    });
  }

  window.addEventListener("keypress", (event) => {
    for (const button of drawButtons) {
      if (event.key === button.dataset.kb.toLowerCase()) {
        switchActiveModeButton(button);
      }
    }
  });
}

function setDrawingState(e) {
  let flags = e.buttons !== undefined ? e.buttons : e.which;
  drawing = (flags & 1) === 1;
}

function main() {
  let resizeButton = document.getElementById("resize-btn");

  resizeButton.addEventListener("click", () => {
    let gridSize = parseInt(prompt("New grid size (Max 100): "));
    if (isNaN(gridSize)) {
      gridSize = 16;
    }
    gridSize = Math.min(gridSize, 100);
    createGrid(gridSize, gridSize);
  });

  window.addEventListener("mousedown", setDrawingState);
  window.addEventListener("mouseup", setDrawingState);
  window.addEventListener("mousemove", setDrawingState);

  bindDrawButtonKeys();
  createGrid(100, 100);
}

main();
