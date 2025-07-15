document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("mediaGrid");
  const modal = document.getElementById("myModal");
  const modalImage = document.getElementById("modalImage");
  const modalVideo = document.getElementById("modalVideo");
  const downloadButton = document.getElementById("downloadButton");
  const closeBtn = document.getElementsByClassName("close")[0];

  // Carica media dalla variabile mediaFiles definita in media.js
  mediaFiles.forEach(file => {
    const item = document.createElement("div");
    item.className = "grid-item";

    let mediaEl;
    if (file.type === "image") {
      mediaEl = document.createElement("img");
      mediaEl.alt = file.name;
    } else if (file.type === "video") {
      mediaEl = document.createElement("video");
      mediaEl.controls = true;
    }
    mediaEl.src = file.path;

    // Link di download
    const downloadLink = document.createElement("a");
    downloadLink.href = file.path;
    downloadLink.download = file.name;
    downloadLink.className = "download-link";
    downloadLink.textContent = "Download";

    item.appendChild(mediaEl);
    item.appendChild(downloadLink);
    grid.appendChild(item);

    // Click per aprire modale
    mediaEl.addEventListener("click", () => {
      if (file.type === "image") {
        modalImage.src = file.path;
        modalImage.style.display = "block";
        modalVideo.style.display = "none";
      } else {
        modalVideo.src = file.path;
        modalVideo.style.display = "block";
        modalImage.style.display = "none";
      }
      downloadButton.href = file.path;
      downloadButton.download = file.name;
      modal.style.display = "block";
    });
  });

  // Chiudi modale
  closeBtn.onclick = () => (modal.style.display = "none");
  window.onclick = (event) => {
    if (event.target === modal) modal.style.display = "none";
  };
});
