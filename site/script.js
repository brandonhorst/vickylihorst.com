const slider = document.getElementById("slider");
const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");
const childCount = slider.children.length;

let offset = 0;

leftButton.addEventListener("click", function () {
  if (offset <= -1) return;
  offset -= 1;
  updateVisibility();
});

rightButton.addEventListener("click", function () {
  if (offset >= childCount) return;
  offset += 1;
  updateVisibility();
});

function addToAll(className) {
  for (let child of slider.children) {
    child.classList.add(className);
  }
}
function removeFromAll(className) {
  for (let child of slider.children) {
    child.classList.remove(className);
  }
}

function updateVisibility() {
  addToAll("hidden");

  const child = slider.children[offset + 1];
  child.classList.remove("hidden");
  slider.style.transform = `translateX(${-(offset + 1) * 100}%)`;
}

slider.addEventListener("transitionend", (e) => {
  if (e.target !== slider) {
    return;
  }
  if (offset <= -1) offset = childCount - 1;
  if (offset >= childCount) offset = 0;
  slider.classList.add("notransition");
  addToAll("notransition");

  updateVisibility();

  // Force render
  slider.offsetHeight;
  slider.classList.remove("notransition");
  removeFromAll("notransition");
});

slider.append(slider.children[0].cloneNode(true));
slider.prepend(slider.children[childCount - 1].cloneNode(true));
updateVisibility();
