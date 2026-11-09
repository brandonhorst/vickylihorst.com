(() => {
  const mobile = window.matchMedia("(max-width: 600px)");

  document.querySelectorAll(".company-logos").forEach((list) => {
    const logos = Array.from(list.children);
    if (logos.length < 5) return;

    const carousel = document.createElement("div");
    carousel.className = "content logo-carousel";
    carousel.setAttribute("role", "region");
    carousel.setAttribute("aria-label", "Companies I’ve worked with");
    carousel.setAttribute("aria-roledescription", "carousel");
    const viewport = document.createElement("div");
    viewport.className = "logo-viewport";
    const status = document.createElement("span");
    status.className = "logo-status";
    status.setAttribute("aria-live", "polite");
    status.setAttribute("aria-atomic", "true");
    let first = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function render() {
      const count = mobile.matches ? 1 : 3;
      list.replaceChildren();
      // Include both ends so wrapping can settle before resetting the track.
      for (let position = -2; position <= logos.length + count + 1; position += 1) {
        const index = (position + logos.length) % logos.length;
        list.append(logos[index].cloneNode(true));
      }
      resetPosition();
    }

    function updateVisibility() {
      const count = mobile.matches ? 1 : 3;
      const step = mobile.matches ? 50 : 25;
      const visibleNames = [];
      Array.from(list.children).forEach((item, index) => {
        const position = index - 2;
        const preview = position < first || position >= first + count;
        item.classList.toggle("logo-preview", preview);
        if (preview) item.setAttribute("aria-hidden", "true");
        else {
          item.removeAttribute("aria-hidden");
          visibleNames.push(item.querySelector("img").alt);
        }
      });
      list.style.transform = `translateX(${-(first + 1.5) * step}%)`;
      status.textContent = visibleNames.join(", ");
    }

    function resetPosition() {
      first = (first + logos.length) % logos.length;
      list.classList.add("notransition");
      updateVisibility();
      // Commit the equivalent wrapped position before accepting more movement.
      list.offsetHeight;
      list.classList.remove("notransition");
    }

    list.addEventListener("transitionend", (event) => {
      if (event.target !== list || event.propertyName !== "transform") return;
      if (first < 0 || first >= logos.length) resetPosition();
    });

    function makeButton(label, icon, direction) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "carousel-button logo-button";
      button.setAttribute("aria-label", label);
      const arrow = document.createElement("i");
      arrow.className = `lni lni-angle-double-${icon}`;
      arrow.setAttribute("aria-hidden", "true");
      button.append(arrow);
      button.addEventListener("click", () => {
        if (direction < 0 && first <= -1) return;
        if (direction > 0 && first >= logos.length) return;
        first += direction;
        if (reducedMotion.matches) resetPosition();
        else updateVisibility();
      });
      return button;
    }

    list.before(carousel);
    list.classList.remove("content");
    viewport.append(list);
    carousel.append(
      makeButton("Previous companies", "left", -1),
      viewport,
      makeButton("Next companies", "right", 1),
      status
    );
    mobile.addEventListener("change", render);
    render();
  });
})();

(() => {
  const slider = document.getElementById("slider");
  const leftButton = document.getElementById("left-button");
  const rightButton = document.getElementById("right-button");
  if (!slider || !leftButton || !rightButton) return;

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
})();
