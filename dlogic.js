let downloadBtn = document.getElementById("downloadBtn")
let console = document.getElementById("center-console")
let backgroundImg = document.getElementById("background")


async function downloadFile(){
    try{
        let getData = await fetch("/get-installer-data")
        let data = await getData.blob()
        const blob = new Blob([data], { type: type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = "Youth Empowerment App Installer.apk";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url)
    }catch{
        alert("Something went wrong. Please try again later")
    }
}

let alertText = document.getElementById("alertText")

function alert(message){
    alertText.style["opacity"] = "0"
    alertText.innerHTML = message
    setTimeout(()=>{
        alertText.style["opacity"] = "1"
    },210)
    setTimeout(()=>{
        alertText.style["opacity"] = "0"
    },5000)
}

downloadBtn.addEventListener("click",()=>{
    downloadFile()
})
downloadBtn.addEventListener("mousedown",()=>{
    downloadBtn.style["box-shadow"] = "0px 0px 0px black"
})
downloadBtn.addEventListener("mouseup",()=>{
    downloadBtn.style["box-shadow"] ="0px 2px 3px black"
})

window.addEventListener("load",()=>{
    
    setTimeout(()=>{
        setTimeout(()=>{
            background.style["opacity"] = "1"
            setTimeout(()=>{
                console.style["opacity"] = "1"
                setTimeout(()=>{
                    alert("Hello")
                },300)
            },800)
        },700)
        
    },1000)
})
