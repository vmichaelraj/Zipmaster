const inputData = document.getElementById("file-input");
const uploadBox = document.querySelector(".upload-box");
const progressBar = document.getElementById("progress-bar");
const onFileChange = (event) => {
  if (event.target && event.target?.files?.length > 0) {
    const files = Array.from(event.target.files);
    uploadBox.innerHTML =
      '<div class="file-list-container"><h2>Selected Files:</h2><ul id="file-list"></ul><button id="confirm-upload" class="confirm-button">Compress</button></div>';
    const fileList = document.getElementById("file-list");
    files.forEach((file) => {
      const listItems = document.createElement("li");
      listItems.textContent = file.name;
      fileList.appendChild(listItems);
    });
    document.getElementById("confirm-upload").addEventListener("click", () => {
      compressFiles(files);
    });
  } else {
    alert("No files");
  }
};
const compressFiles = (files) => {
  const zip = new JSZip();
  files.forEach((file) => {
    zip.file(file.name, file);
  });
  progressBar.style.display = "flex";
  zip
    .generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 9 },
    })
    .then(function (content) {
      progressBar.innerHTML =
        '<h2>Compression Completed</h2><button id="download-zip" class="download-button">Download</button>';
      document.getElementById("download-zip").addEventListener("click", () => {
        let a = document.createElement("a");
        a.href = URL.createObjectURL(content);
        a.download = "archive.zip";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        alert("Zip Successfull");
        progressBar.style.display = "none";
        resetuploadBox();
      });
    });
};
const resetuploadBox = () => {
  uploadBox.innerHTML =
    '<input type="file" hidden id="file-input" multiple/><label for="file-input" class="upload-button">Upload<div class="upload-button-container"><img src="public/icons8-up-90.png" alt="icon" height="24px" /></div></label>';
  document.getElementById("file-input").addEventListener("input", onFileChange);
};

const onCompressButtonPress = (event) => {
  console.log("pressed");
};

inputData.addEventListener("input", onFileChange);
