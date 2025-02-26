
const inputData = document.getElementById("file-input")
// const compressButton = document.getElementById("compress-button")
const progressBar = document.getElementById("progress-bar");
const onFileChange = (event) =>{
    if(event.target && event.target?.files?.length > 0){
        const files =Array.from(event.target.files);
        const zip = new JSZip();
        files.forEach((file)=>{
            zip.file(file.name, file)
        })
        progressBar.style.display = "flex"
        zip.generateAsync({type:"blob", compression : "DEFLATE",
            compressionOptions: { level: 9 } 
        }).then(function(content) {
            let a = document.createElement("a")
            a.href = URL.createObjectURL(content)
            a.download = "archive.zip";
            document.body.appendChild(a);
            a.click()
            document.body.removeChild(a);
            // saveAs(content, "my-zip.zip");
            alert("Zip Successfull")
            progressBar.style.display = "none"
        });

    }else{
        alert("No files")
    }
}


const onCompressButtonPress = (event) =>{
    console.log("pressed")
}


// compressButton.addEventListener("click", onCompressButtonPress)
inputData.addEventListener("input", onFileChange)