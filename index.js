const player = document.getElementById("player");

function play(track) {
  player.src = track + ".mp3";
  player.play();
}

const imgs = document.getElementsByTagName("img");

const transforms = [];

for (const img of imgs) {
  const { id } = img;
  const initialTransform = window.getComputedStyle(img).transform;
  transforms.push(initialTransform === "none" ? "" : initialTransform);
  if (id === "official-bomb") continue;
  img.src = id + ".png";
  img.onclick = play.bind(null, id);
}

window.addEventListener("mousemove", (e) => {
  const { pageX, pageY } = e;
  let i = 0;
  for (const img of imgs) {
    const { top, bottom, left, right } = img.getBoundingClientRect();
    const cx = (left + right) / 2;
    const cy = (top + bottom) / 2;

    const dist = Math.sqrt(
      (pageX - cx) * (pageX - cx) + (pageY - cy) * (pageY - cy)
    );
    const scale =
      pageX >= left && pageX <= right && pageY >= top && pageY <= bottom
        ? 1
        : Math.max(0.75, 1 - dist / 1000);

    img.style.transform = `${transforms[i]} scale(${scale})`;
    i++;
  }
});
