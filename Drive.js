document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("mediaGrid");
  const modal = document.getElementById("myModal");
  const modalImage = document.getElementById("modalImage");
  const modalVideo = document.getElementById("modalVideo");
  const downloadButton = document.getElementById("downloadButton");
  const closeBtn = document.getElementsByClassName("close")[0];

  mediaFiles.forEach(file => {
    const item = document.createElement("div");
    item.className = "grid-item";

    let mediaEl;

    if (file.type === "image") {
      mediaEl = document.createElement("img");
      mediaEl.src = file.path;
      mediaEl.alt = file.name;
    } else if (file.type === "video") {
      mediaEl = document.createElement("video");
      mediaEl.controls = true;
      mediaEl.muted = true;
      mediaEl.playsInline = true;
      mediaEl.style.backgroundColor = "black";

      const source = document.createElement("source");
      source.src = file.path;
      source.type = "video/mp4"; // assume mp4, ma può essere dinamico
      mediaEl.appendChild(source);
    }

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
        modalVideo.pause();
        modalVideo.src = "";
      } else if (file.type === "video") {
        modalImage.style.display = "none";
        modalImage.src = "";

        modalVideo.src = file.path;
        modalVideo.style.display = "block";
        modalVideo.load();
      }

      downloadButton.href = file.path;
      downloadButton.download = file.name;
      modal.style.display = "block";
    });
  });

  // Chiudi modale
  closeBtn.onclick = () => {
    modal.style.display = "none";
    modalVideo.pause();
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      modalVideo.pause();
    }
  };
});
