function testAll() {
    let times = 10
    let domSum = 0;
    let nodeSum = 0;
    let fragSum = 0;

    for (let index = 0; index < times; index++) {
        let domAvg = document.getElementById("domAvg");
        let nodeAvg = document.getElementById("nodeAvg");
        let fragAvg = document.getElementById("fragAvg");

        appendDom()
            .then(res => {domSum += res;})
            .then(() =>{
                appendNode()
                    .then(res => {nodeSum += res})
                    .then(() =>{
                        appendFrag()
                        .then(res => {fragSum += res})
                        .then(() => {
                            domAvg.innerText = domSum / times
                            nodeAvg.innerText = nodeSum / times
                            fragAvg.innerText = fragSum / times
                        })
                    })
            })
            
    }

}

function appendDom() {

    return new Promise(resolve => {
        let area = document.getElementById("area");
        let begin = performance.now();
        for (let x = 0; x < 200000; x++) {
            area.appendChild(document.createElement("div"));
        }
        let end = performance.now();
        document.getElementById("appendDom").innerText = end - begin;
        console.log("DOM ET: ", end - begin);
        clearArea();
        resolve(end - begin);
    })

}


function appendNode() {

    return new Promise(resolve => {
        let area = document.getElementById("area");
        let data = document.createElement('div');
        let begin = performance.now();
        for (let x = 0; x < 200000; x++) {
            data.appendChild(document.createElement("div"));
        }
        let end = performance.now();
        area.appendChild(data);
        document.getElementById("appendNode").innerText = end - begin;
        console.log("Node ET: ", end - begin);
        clearArea();
        resolve(end - begin);
    })

}
function appendFrag() {

    return new Promise(resolve => {
        let area = document.getElementById("area");
        let data = document.createDocumentFragment();
        let begin = performance.now();
        for (let x = 0; x < 200000; x++) {
            data.appendChild(document.createElement("div"));
        }
        let end = performance.now();
        area.appendChild(data);
        document.getElementById("appendFrag").innerText = end - begin
        console.log("Frag ET: ", end - begin);
        clearArea();
        resolve(end - begin);
    })
}

function clearArea() {
    let area = document.getElementById("area");
    while (area.lastChild) {
        area.removeChild(area.lastChild);
    }
}
