var langs = {
    ru: {
        init: "Chargement en cours...",
        mounting: "Addons du Workshop : Chargement",
        ws_done: "Addons du Workshop : Terminé",
        sending_info: "Presque là...",
        ws_adds: "Addons du Workshop : ",
        checking: "Vérification ",
        unpacking: "Extraction ",
        loading: "Téléchargement ",
        fastdl: "Fichiers FastDL : ",
        bsp: "Si la barre de chargement apparaît parfois immobile ou bloquée, ne vous inquiétez pas, tout va bien",
        resources: "Chargement des ressources",
        hints: [
 
        ],
        ac_warning: "L'utilisation de logiciels de triche est formellement interdite et est punie par une sanction irrévoquable",
        ac_frags: "Joueurs bannis pour triche : ",
 
         },
    en: {
        init: "Loading",
        mounting: "Workshop Addons: Mounting",
        ws_done: "Workshop Addons: Ready",
        sending_info: "Almost there...",
        ws_adds: "Workshop Addons: ",
        checking: "Checking ",
        unpacking: "Unpacking ",
        loading: "Downloading ",
        fastdl: "FastDL Files: ",
        bsp: "Loading bar can stand still or reset - don't worry, it is fine",
        resources: "Loading resources",
        hints: [
 
        ],
        ac_warning: "Use of cheats is strictly prohibited and is punished with unremovable ban",
        ac_frags: "Caught violators: ",
    },
    fr: {
        init: "Chargement en cours...",
        mounting: "Addons du Workshop : Chargement",
        ws_done: "Addons du Workshop : Terminé",
        sending_info: "Presque là...",
        ws_adds: "Addons du Workshop : ",
        checking: "Vérification ",
        unpacking: "Extraction ",
        loading: "Téléchargement ",
        fastdl: "Fichiers FastDL : ",
        bsp: "Si la barre de chargement apparaît parfois immobile ou bloquée, ne vous inquiétez pas, tout va bien",
        resources: "Chargement des ressources",
        hints: [
 
        ],
        ac_warning: "L'utilisation de logiciels de triche est formellement interdite et est punie par une sanction irrévoquable",
        ac_frags: "Joueurs bannis pour triche : ",
    }
}
 
var lang = langs[location.hash.substr(1)] || langs["ru"]
 
var wsaddons = 0
var wscur = 0
var filesneeded = 0
var filescur = 0
var already = []
 
var logDiv = document.getElementById("log")
 
    function Log(str, str2, str3) {
        /*
    logDiv.insertAdjacentHTML("beforeend", str + "<br>")
    if (str2)
        str += "<br>" + str2
    if (str3)
        str += "<br>" + str3
    */
        document.getElementById("download-notation").innerHTML = str
        //console.log(str)
        //logDiv.scrollTop = logDiv.scrollHeight
    }
Log(lang.init);
 
function SetProgress(num) {
    document.getElementById("progressbar").style.width = (num * 100) + '%'
}
 
function getChromeVersion() {
    var raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    return raw ? parseInt(raw[2], 10) : false;
}
 
function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status == 200;
}
 

 
function SetFilesNeeded(needed) {
    console.log("SetFilesNeeded: " + needed)
    filesneeded = needed
}
 
function SetFilesTotal(total) {
    console.log("SetFilesTotal: " + total)
}
 
function SetStatusChanged(status) {
    console.log("SetStatusChanged: " + status)
 
    switch (status) {
        case "Mounting Addons":
            SetProgress(1)
            Log(lang.mounting)
            break
        case "Workshop Complete":
            SetProgress(1)
            Log(lang.ws_done)
            filesneeded -= wscur;
            break
        case "Sending client info...":
            SetProgress(1)
            Log(lang.sending_info)
            break
    }
 
    if (status.substr(0, 24) == "Getting Addon info for #") {
        wsaddons++
        Log(lang.ws_adds + wsaddons, lang.checking + status.substr(24))
    }
 
    if (status.substr(0, 5) == "Found" && already.indexOf(status.substring(7, status.length - 1)) < 0) {
        wscur++
        Log(lang.ws_adds + wscur + "/" + wsaddons)
        SetProgress(wscur / wsaddons)
    }
 
    if (status.substr(0, 10) == "Extracting") Log(lang.ws_adds + wscur + "/" + wsaddons, lang.unpacking + status.substring(12, status.length - 1))
 
    if (status.substr(0, 9) == "Extracted") {
        SetProgress(wscur / wsaddons)
        Log(lang.ws_adds + wscur + "/" + wsaddons)
        already.push(status.substring(11, status.length - 1))
    }
}
 
function DownloadingFile(name) {
    console.log("DownloadingFile: " + name)
 
    var pos = name.indexOf("via Workshop")
    if (pos >= 0) {
        wscur++
        Log(lang.ws_adds + wscur + "/" + wsaddons, lang.loading + name.substring(1, pos - 2))
    } else {
        SetProgress(filescur / filesneeded)
        filescur++
        if (name.substr(-4) == ".bsp") Log(lang.fastdl + filescur + "/" + filesneeded, lang.loading + name, lang.bsp)
        else if (filescur == filesneeded) Log(lang.fastdl + filescur + "/" + filesneeded, lang.loading + name, lang.resources)
        else Log(lang.fastdl + filescur + "/" + filesneeded, lang.loading + name)
    }
}
 
var hints = lang.hints
var curhint = 0
 
document.getElementsByClassName("nocheating-text")[0].innerHTML = lang.ac_warning
 
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://grserv.site/ldscr/cheats");
xhr.send();
 
xhr.onload = function() {
    if (xhr.status == 200) {
        document.getElementsByClassName("nocheating-text")[0].innerHTML = lang.ac_warning
    }
}
 
/*
function randomHint() {
    document.getElementsByClassName("hint")[0].innerHTML = hints[curhint] || ""
    curhint = (curhint + 1)%hints.length
}
 
randomHint()
 
setInterval(randomHint, 10000)
 
if (location.hash.substr(1) == "en") {
    document.getElementsByClassName("footer")[0].innerHTML = "&copy; NxServ.us, 2013-2018";
}
*/