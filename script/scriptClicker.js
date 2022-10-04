let cats=document.getElementById("cats"), cps=document.getElementById("cps");
let itemName=document.getElementById("itemName"), itemDesc=document.getElementById("itemDesc");
let infoVisibility=document.getElementById("divInfo"); let hiddenCat=document.getElementById("hiddenCat");
let powerBox=document.getElementById("powerCats"); let upgradeBox=document.getElementById("divUpgradeCat");
let clickMultiplier=1;
let numberCats=0;
let catsPerSecond=0.0;
let costMultiplier= 1.15;
let upgrades = [
    {
        name: "Headpats",
        qty: 0,
        cps: 0.1,
        oCost: 15.0,
        cost: 15.0,
        modifier: 1,
        paragraphId: "up1",
        paragraphNum: "numUp1",
        desc: "Some cats dislike having their heads patted, but hopefully this one doesn't"
    },
    {
        name: "Hair strokes",
        qty: 0,
        cps: 1.0,
        oCost: 100.0,
        cost: 100.0,
        modifier: 1,
        paragraphId: "up2",
        paragraphNum: "numUp2",
        desc: "They love having their hair stroken though"
    }
]

let powerUps = [
    {
        name: "Unknown",
        desc: "Eureka",
        puId: "pu1",
        pic: "media/cursor.png",
        cost: 300,
        type: "click",
        modifier: 2
    },
    {
        name: "Unknown2",
        desc: "Yupii",
        puId: "pu2",
        pic: "media/ejemplo2.jpg",
        cost: 150,
        type: "upgrade",
        upgrade: upgrades[0],
        modifier: 2
    }, {
        name: "Unknown3",
        desc: "Yupii",
        puId: "pu2",
        pic: "media/ejemplo2.jpg",
        cost: 1500,
        type: "upgrade",
        upgrade: upgrades[1],
        modifier: 2
    }
]

let hideouts= ["media/blanketOriginal.jpg", "media/boxOriginal.jpg", "media/paperbagOriginal.jpg"]

updateCps();
updateCats();
cpsCats();
fillUpgrades();
fillPowerups();
loadHideouts();

function clickCat() {
    numberCats += clickMultiplier;
}

function updateCats(){
    cats.innerHTML=Math.round(numberCats*10)/10;
    setTimeout(updateCats, 100);
}

function cpsCats() {
    numberCats+=catsPerSecond;
    setTimeout(cpsCats, 1000);
}

function updateCps() {
    catsPerSecond=0;
    upgrades.forEach(element => {
        catsPerSecond+=(element.cps*element.qty*element.modifier);
    });
    setTimeout(updateCps, 50);
}

function showCps() {
    cps.innerHTML=Math.round(catsPerSecond*10)/10;
}

function fillUpgrades() {
    for (let i=0; i<upgrades.length; i++) {
        let upgrade=document.createElement("div");
        upgrade.setAttribute("class", "upgradeModel");
        upgrade.addEventListener("click", function() {
            buy(upgrades[i])
        });
        upgrade.addEventListener("mouseenter", function() {
            description(upgrades[i].name, upgrades[i].desc);
        });
        upgrade.addEventListener("mouseleave", descriptionOver);

        let upgradeName=document.createElement("div");
        upgradeName.setAttribute("class", "upgradeModelTitle");
        
        let title=document.createElement("h1");
        title.innerHTML=upgrades[i].name;
        upgradeName.appendChild(title);

        let upgradeInfo=document.createElement("div");
        upgradeInfo.setAttribute("class", "upgradeModelInfo");

        let upgradeCost=document.createElement("div");
        let upgradeCostp=document.createElement("p");
        upgradeCostp.setAttribute("id", upgrades[i].paragraphId);
        upgradeCostp.innerHTML=upgrades[i].oCost+"&nbsp;cats";
        upgradeCost.appendChild(upgradeCostp);
        
        let upgradeQty=document.createElement("div");
        let upgradeQtyp=document.createElement("p");
        upgradeQtyp.setAttribute("id", upgrades[i].paragraphNum);
        upgradeQtyp.innerHTML=upgrades[i].qty+"&nbsp;"+(upgrades[i].name.toLowerCase());
        upgradeQty.appendChild(upgradeQtyp);

        upgradeInfo.appendChild(upgradeCost);
        upgradeInfo.appendChild(upgradeQty);

        upgrade.appendChild(upgradeName);
        upgrade.appendChild(upgradeInfo);

        upgradeBox.appendChild(upgrade);
    }
}

function fillPowerups() {
    for (let i=0; i<powerUps.length; i++) {
        let powerup=document.createElement("div");
        let powerImg=document.createElement("img");
        powerup.setAttribute("class", "powerModel");
        powerup.setAttribute("id", powerUps[i].puId);
        powerImg.setAttribute("src", powerUps[i].pic);
        powerImg.setAttribute("width", "60px");
        powerImg.setAttribute("height", "60px");
        powerup.addEventListener("click", function() {
            buy(powerUps[i]);
        });
        powerup.addEventListener("mouseenter", function() {
            description(powerUps[i].name, powerUps[i].desc);
        });
        powerup.addEventListener("mouseleave", descriptionOver);
        let powerupCost=document.createElement("p");
        powerupCost.innerHTML=powerUps[i].cost+"&nbsp;cps";
        powerupCost.setAttribute("class", "powerupCost");
        powerupCost.setAttribute("width", "60px");
        powerupCost.setAttribute("height", "20px");
        powerupCost.style.margin="0";
        powerupCost.style.backgroundColor="white";
        powerupCost.style.borderTop="1px solid black";
        powerupCost.style.borderBottom="1px solid black";
        powerup.appendChild(powerImg);
        powerup.appendChild(powerupCost);
        powerBox.appendChild(powerup);
    }
}

function description(descName, descInfo) {
    itemName.innerHTML=descName;
    itemDesc.innerHTML=descInfo;
    infoVisible();
}

function descriptionOver() {
    infoInvisible();
    itemName.innerHTML="";
    itemDesc.innerHTML="";
}

function infoVisible() {
    if (itemName.innerHTML!="") {
        infoVisibility.style.visibility="visible";
    }
}

function infoInvisible() {
    infoVisibility.style.visibility="hidden";
}

function buy(object) {
    if (object.cost<=numberCats) {
        numberCats-=object.cost;
        if (object.type==null) {
            object.qty+=1;
            object.cost*=costMultiplier;
            document.getElementById(object.paragraphId).innerHTML=(Math.round(object.cost*10)/10)+"&nbspcats";
            document.getElementById(object.paragraphNum).innerHTML=object.qty+"&nbsp;"+object.name.toLowerCase();
            updateCps();
            showCps();
        } else if (object.type=="click") {
            document.getElementById(object.puId).style.display="none";
            clickMultiplier*=object.modifier;
        } else if (object.type=="upgrade") {
            document.getElementById(object.puId).style.display="none";
            object.upgrade.modifier*=object.modifier;
            updateCps();
            showCps();
        }
    }
}

function updateCps() {
    catsPerSecond=0;
    upgrades.forEach(element => {
        catsPerSecond+=(element.cps*element.qty*element.modifier);
    });
}

/*

-2% prob de que aparezca el evento cada segundo
-por cada segundo que pase, +0.3%
-a los 30 segundos sería un 11%
-----------------------------
-aparecen 2 objetos, con sus imágenes aleatorias
-uno es true, otro es false
-cuando el usuario hace click en uno, ambos desaparecen
-si adivina el verdadero, premio

*/

function loadHideouts() {
    let hideout1=document.createElement("img");
    let hideout2=document.createElement("img");

    hideout1.setAttribute("src", Math.floor(Math.random)*(hideouts.length+1));
    hideout2.setAttribute("src", Math.floor(Math.random)*(hideouts.length+1));

    hideout1.setAttribute("class", "hideouts");
    hideout2.setAttribute("class", "hideouts");

    hideout1.addEventListener("click", function() {
        findcat(true);
    });
    hideout2.addEventListener("click", function() {
        findcat(false);
    });

    hiddenCat.appendChild(hideout1);
    hiddenCat.appendChild(hideout2);

    let hideoutH=document.getElementById("divCat").offsetHeight;
    let hideoutW=document.getElementById("divCat").offsetWidth;

    hideout1.style.left=Math.floor(Math.random()*(Number(hideoutW)-20))+"px";
    hideout1.style.top=Math.floor(Math.random()*(Number(hideoutH)-20))+"px";
    hideout2.style.left=Math.floor(Math.random()*(Number(hideoutW)-20))+"px";
    hideout2.style.left=Math.floor(Math.random()*(Number(hideoutH)-20))+"px";
    // Falta la posición aleatoria y appendChild a hiddenCat
}

function findcat(bool) {
    let hideArray=document.getElementsByClassName("hideouts");
    hideArray[0].style.display="none";
    hideArray[1].style.display="none";

    if (bool) {
        activatePrize();
    }
}