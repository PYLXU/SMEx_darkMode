
var darkMode = `
body {
    background: #161616 !important;
    color: white;
}

body .right #musicListContainer .tableContainer table td>m {
    background: #043255!important;
}

.right #rightPlaceholder {
    opacity: 0.5;
}

.left>h2 {
    margin:0
}

.left>img {
    display: none;
}

.left .leftBar div:active {
    background: rgb(125 125 125 / 10%);
}

.left .leftBar div:hover {
    background: rgb(106 106 106 / 5%);
}

.right {
    background: rgb(14 14 14 / 80%);
}

.right .page .header {
    background: rgb(24 24 24 / 90%);
}

.right .page .block {
    background: #141414;
}

.right #musicListContainer .musicLocator {
    background: rgb(40 40 40 / 90%);
}

.right .page .block section div badge {
    background: rgb(255 255 255 / 10%);
}

.right .page .block .range>div {
    background: rgb(255 255 255 / 5%);
}

.toggle {
    background: rgb(255 255 255 / 15%);
}

button.sub {
    background: #303031;
    color: #ffffff;
}

.bottom {
    background: rgb(26 26 26 / 90%);
}

.SimProgress {
    --SimProgressBackground: rgb(255 255 255 / 10%);
}

header i {
    color: rgba(255, 255, 255, .8);
}

header i:hover {
    background: rgb(255 255 255 / 7%);
}

input, select {
    background: rgb(255 255 255 / 8%);
    color: #e7e7e7;
}

.right .page .block .colorInput {
    background: rgb(255 255 255 / 8%);
}

.right .musicListTitle {
    background: rgb(20 20 20 / 90%);
}

.right #musicListContainer .tableContainer table tr.selected {
    background: #24292d !important;
}

.right #musicListContainer .tableContainer table tr:hover {
    background: rgb(255 255 255 / 3%);
}

.right #musicListContainer .tableContainer table td:first-child img {
    background: #242424;
}

.right .musicListTitle img {
    background: #222222;
}

.right #musicListContainer .musicListErrorOverlay img {
    opacity: 0.2;
}

.right .searchTitle {
    background: rgb(24 24 24 / 90%);
}

.right .searchTitle {
    background: rgb(24 24 24 / 90%);
}

option {
    background: rgb(0 0 0);
}

#userPage .userPageMod {
    background-color: rgb(22 22 22 / 60%)!important;
}

.right #aboutPage .main>div section {
    background: #202020;
}

#recommendPage .tablink {
    color: white!important;
}

#recognition .source {
    background: black!important;
}

#recognition .source>div.indicator {
    background: #142735!important;
}

#extensionShopPage #extensionShopContainer>div {
    background: #141414!important;
}
    
#dropTipContainer #dropTip {
    background: black;
    border: 1px solid #353535;
}

.context-menu {
    background-color: #121212;
    box-shadow: rgba(0, 0, 0, 0.16) 0 10px 15px, rgba(0, 0, 0, 0.16) 0 0 15px;
    border: solid 1px rgba(255, 255, 255, 0.05);
}

.context-menu .item {
    background-color: transparent;
    color: #fff;
}

.context-menu .item::before {
    color: rgba(255, 255, 255, 0.8);
}

.context-menu .item:hover, .context-menu .item-focused {
    background-color: rgba(255, 255, 255, 0.05);
}

.context-menu .item:not(.sub):active {
    background-color: rgba(255, 255, 255, 0.05);
}

.context-menu .separator {
    border-top: solid 1px rgba(255, 255, 255, 0.05);
}

.context-menu .disabled {
    color: rgba(255, 255, 255, 0.5) !important;
    background-color: transparent !important;
}
`;


const observer = new MutationObserver(() => {
    const hasPlayerShown = document.body.classList.contains('playerShown');
    if (!hasPlayerShown && config.getItem("ext.darkMode.isEffect") == true) {
        ipcRenderer.invoke("overlayWhite");;
    }
});

const config2 = {
    attributes: true,
    attributeFilter: ['class']
};
observer.observe(document.body, config2);


if (config.getItem("ext.darkMode.isEffect") == true) {
    setTimeout(() => { ipcRenderer.invoke("overlayWhite") }, 1000);
}

function loadStyles() {
    let styles = "";
    if (config.getItem("ext.darkMode.isEffect") == true) {
        document.body.classList.add("darkMode");
        const title = document.createElement("h2");
        title.innerHTML = "SimMusic";
        title.id = "darkTitle";
        insertAfter(title, document.querySelector(".left>img"));
        setTimeout(() => { ipcRenderer.invoke("overlayWhite"); }, 500);
        styles = darkMode;
    } else {
        document.body.classList.remove("darkMode");
        document.getElementById("darkTitle").remove();
        ipcRenderer.invoke("overlayBlack");
        styles = "";
    }
    includeStyleElement(styles, "darkMode");
}

SettingsPage.data.push(
    { type: "title", text: "[第三方扩展] 主界面深色模式" },
    { type: "boolean", text: "启用深色模式", description: "开启后将更改主界面样式以启用深色模式", configItem: "ext.darkMode.isEffect" },
);
config.listenChange("ext.darkMode.isEffect", () => loadStyles());

loadStyles();