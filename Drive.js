document.addEventListener("DOMContentLoaded", () => {
  const mediaGrid = document.getElementById('mediaGrid');
  const modal = document.getElementById('myModal');
  const modalContent = document.getElementById('modalContent');
  const modalImg = document.getElementById('modalImage');
  const modalVideo = document.getElementById('modalVideo');
  const downloadButton = document.getElementById('downloadButton');
  const closeSpan = document.getElementsByClassName('close')[0];

  // Filtra mediaFiles per escludere .mov
  const filteredMedia = mediaFiles.filter(file => {
    if (file.type === 'video') {
      return file.name.toLowerCase().endsWith('.mp4');
    }
    return file.type === 'image';
  });

  filteredMedia.forEach(file => {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');

    if (file.type === 'image') {
      const img = document.createElement('img');
      img.src = file.path;
      img.alt = file.name;
      img.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        modalImg.style.display = "block";
        modalVideo.style.display = "none";
        modalVideo.pause();
        modalVideo.src = "";

        downloadButton.href = this.src;
        downloadButton.download = file.name;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const maxModalWidth = windowWidth * 0.9;
        const maxModalHeight = windowHeight * 0.9;

        const imgAspectRatio = this.naturalWidth / this.naturalHeight;
        const modalAspectRatio = maxModalWidth / maxModalHeight;

        if (imgAspectRatio > modalAspectRatio) {
          modalImg.style.width = `${maxModalWidth}px`;
          modalImg.style.height = `${maxModalWidth / imgAspectRatio}px`;
        } else {
          modalImg.style.height = `${maxModalHeight}px`;
          modalImg.style.width = `${maxModalHeight * imgAspectRatio}px`;
        }

        modalContent.style.display = "flex";
        modalContent.style.justifyContent = "center";
        modalContent.style.alignItems = "center";
        modalContent.style.height = `${maxModalHeight}px`;
        modalContent.style.marginTop = "5%";
      };
      gridItem.appendChild(img);

    } else if (file.type === 'video') {
      const video = document.createElement('video');
      video.src = file.path;
      video.controls = true;
      video.muted = true;
      video.playsInline = true;
      video.style.backgroundColor = "black";
      gridItem.appendChild(video);

      video.onclick = function() {
        modal.style.display = "block";
        modalImg.style.display = "none";

        modalVideo.src = this.src;
        modalVideo.style.display = "block";
        modalVideo.load();
        modalVideo.play();

        downloadButton.href = this.src;
        downloadButton.download = file.name;

        modalContent.style.display = "flex";
        modalContent.style.justifyContent = "center";
        modalContent.style.alignItems = "center";
        modalContent.style.height = `90vh`;
        modalContent.style.marginTop = "5%";
      };
    }

    const downloadLink = document.createElement('a');
    downloadLink.href = file.path;
    downloadLink.download = file.name;
    downloadLink.classList.add('download-link');
    downloadLink.textContent = 'Download';
    gridItem.appendChild(downloadLink);

    mediaGrid.appendChild(gridItem);
  });

  closeSpan.onclick = function() {
    modal.style.display = "none";
    modalVideo.pause();
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      modalVideo.pause();
    }
  };
});
