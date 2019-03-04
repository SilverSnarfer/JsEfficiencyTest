function testAll() {
    let times = 100
    let domSum = 0;
    let nodeSum = 0;
    let fragSum = 0;

    for (let index = 0; index < times; index++) {


        appendDom()
            .then(res => {domSum += res;})
            .then(() =>{
                appendNode()
                    .then(res => {nodeSum += res})
                    .then(() =>{
                        appendFrag()
                        .then(res => {fragSum += res})
                        .then(() => {
                            document.getElementById("domAvg").innerText = domSum / times
                            document.getElementById("nodeAvg").innerText = nodeSum / times
                            document.getElementById("fragAvg").innerText = fragSum / times
                        })
                    })
            })
            
    }

}

function appendDom(params) {

    return new Promise(resolve => {
        let area = document.getElementById("area");
        var begin = performance.now();
        for (var x = 0; x < 200000; x++) {
            area.appendChild(document.createElement("div"));
        }
        var end = performance.now();
        document.getElementById("appendDom").innerText = end - begin;
        console.log("DOM ET: ", end - begin);
        clearArea();
        resolve(end - begin);
    })

}


function appendNode(params) {

    return new Promise(resolve => {
        let area = document.getElementById("area");
        let data = document.createElement('div');
        var begin = performance.now();
        for (var x = 0; x < 200000; x++) {
            data.appendChild(document.createElement("div"));
        }
        var end = performance.now();
        area.appendChild(data);
        document.getElementById("appendNode").innerText = end - begin;
        console.log("Node ET: ", end - begin);
        clearArea();
        resolve(end - begin);
    })

}
function appendFrag(params) {

    return new Promise(resolve => {
        let area = document.getElementById("area");
        let data = document.createDocumentFragment();
        var begin = performance.now();
        for (var x = 0; x < 200000; x++) {
            data.appendChild(document.createElement("div"));
        }
        var end = performance.now();
        area.appendChild(data);
        document.getElementById("appendFrag").innerText = end - begin
        console.log("Frag ET: ", end - begin);
        clearArea();
        resolve(end - begin);
    })
}

function clearArea(params) {
    let area = document.getElementById("area");
    while (area.lastChild) {
        area.removeChild(area.lastChild);
    }
}
