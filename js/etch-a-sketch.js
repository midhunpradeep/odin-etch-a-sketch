"use strict";

function createGrid(numBoxesX, numBoxesY) {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0,
  );
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0,
  );

  let canvas = document.querySelector("#canvas");
  for (let i = 0; i < numBoxesY; i++) {
    let rowFlexBox = document.createElement("div");
    rowFlexBox.classList.add("row");
    canvas.appendChild(rowFlexBox);

    for (let j = 0; j < numBoxesX; j++) {
      let box = document.createElement("div");
      box.classList.add("box");

      let idealWidth = vh / numBoxesY;
      let idealHeight = vw / numBoxesX;

      let actualHeightWidth = Math.min(idealHeight, idealWidth);
      box.style.minHeight = actualHeightWidth + "px";
      box.style.minWidth = actualHeightWidth / numBoxesX + "px";
      rowFlexBox.appendChild(box);
    }
  }
}

function main() {
  createGrid(16, 16);
}

main();
