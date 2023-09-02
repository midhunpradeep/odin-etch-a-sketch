"use strict";

let canvas = document.getElementById("canvas");

function createGrid(numBoxesX, numBoxesY) {
  canvas.remove();
  canvas = document.createElement("div");
  canvas.id = "#canvas";
  document.body.insertBefore(canvas, document.getElementById("resize-btn"));

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
  let availableHeight = vh - margin * 2;
  let availableWidth = vw - margin * 2;

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

function main() {
  createGrid(16, 16);

  document.getElementById("resize-btn").addEventListener("click", () => {
    let gridSize = parseInt(prompt("New grid size (Max 100): "));
    if (isNaN(gridSize)) {
      gridSize = 16;
    }
    gridSize = Math.min(gridSize, 100);
    createGrid(gridSize, gridSize);
  });
}

main();
