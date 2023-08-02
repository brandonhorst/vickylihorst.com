const carousel = document.getElementById("carousel-items");
const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");
const childCount = carousel.children.length;

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

function getChild(i) {
  return carousel.children[i + 1];
}

function addToAll(className) {
  for (let child of carousel.children) {
    child.classList.add(className);
  }
}
function removeFromAll(className) {
  for (let child of carousel.children) {
    child.classList.remove(className);
  }
}

function updateVisibility() {
  addToAll("hidden");

  const child = getChild(offset);
  child.classList.remove("hidden");
  carousel.style.transform = `translateX(${-(offset + 1) * 100}%)`;
}

carousel.addEventListener("transitionend", (e) => {
  if (e.target !== carousel) {
    return;
  }
  if (offset <= -1) offset = childCount - 1;
  if (offset >= childCount) offset = 0;
  carousel.classList.add("notransition");
  addToAll("notransition");

  updateVisibility();

  // Force render
  carousel.offsetHeight;
  carousel.classList.remove("notransition");
  removeFromAll("notransition");
});

carousel.append(carousel.children[0].cloneNode(true));
carousel.prepend(carousel.children[childCount - 1].cloneNode(true));
updateVisibility();
