"use strict";

let canvas = document.querySelector("#canvas");

function createGrid(numBoxesX, numBoxesY) {
  for (let i = 0; i < numBoxesY; i++) {
    let rowFlexBox = document.createElement("div");
    rowFlexBox.classList.add("row");
    canvas.appendChild(rowFlexBox);

    for (let j = 0; j < numBoxesX; j++) {
      let box = document.createElement("div");
      box.classList.add("box");
      rowFlexBox.appendChild(box);
    }
  }

  resizeBoxes();
  window.addEventListener("resize", resizeBoxes);
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

  let numBoxesY = canvas.children.length;
  let numBoxesX = canvas.children[0].children.length;

  let boxes = document.querySelectorAll(".box");
  for (const box of boxes) {
    let idealWidth = vh / numBoxesY;
    let idealHeight = vw / numBoxesX;

    let actualHeightWidth = Math.min(idealHeight, idealWidth);
    box.style.minHeight = actualHeightWidth + "px";
    box.style.minWidth = actualHeightWidth + "px";
  }
}

function main() {
  createGrid(16, 16);
}

main();
