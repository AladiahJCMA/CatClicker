let cats=document.getElementById("cats"), cps=document.getElementById("cps");
let itemName=document.getElementById("itemName"), itemDesc=document.getElementById("itemDesc");
let infoVisibility=document.getElementById("divInfo"), hiddenCat=document.getElementById("hiddenCat");
let powerBox=document.getElementById("powerCats"), upgradeBox=document.getElementById("divUpgradeCat");
let clickMultiplier=1;
let numberCats=0;
let catsPerSecond=0.0;
let costMultiplier= 1.15;
let hCatChanceO=0.00;
let hCatChance=0.00;
let hCatChanceI=0.002;
let upgrades=[
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
    }, {
        name: "Treats",
        qty: 0,
        cps: 5.0,
        oCost: 450.0,
        cost: 450.0,
        modifier: 1,
        paragraphId: "up3",
        paragraphNum: "numUp3",
        desc: "Looks like the cat has behaved well! Time for a snack :3"
    }
]

let powerUps = [
    {

        name: "Newbie caresses",
        desc: "You're starting to learn what your cat likes.<br/>Headpats cps x2",
        puId: "pu1",
        pic: "media/hand.png",
        cost: 150,
        type: "upgrade",
        upgrade: upgrades[0],
        modifier: 2
    }, {
        name: "Feline knowledge",
        desc: "Your clicks now create double the cats!<br/>Clicks cps x2",
        puId: "pu2",
        pic: "media/cursor.png",
        cost: 300,
        type: "click",
        modifier: 2
    }, {
        name: "Cheap hair brush",
        desc: "It's not very good, but your cat seems to like it...<br/>Hair stroke cps x2",
        puId: "pu3",
        pic: "media/hairBrush.png",
        cost: 1500,
        type: "upgrade",
        upgrade: upgrades[1],
        modifier: 2
    }, {
        name: "Mouse full of hair",
        desc: "Well, the cats start comin' and they don't stop comin'!<br/>Clicks cps x2",
        puId: "pu4",
        pic: "media/cursor.png",
        cost: 3000,
        type: "click",
        modifier: 2
    }, {
        name: "Fish treats!",
        desc: "Yup, they have salmon. I definitely didn't taste it myself.<br/>Treats cps x2",
        puId: "pu5",
        pic: "media/treat.png",
        cost: 4500,
        type: "click",
        upgrade: upgrades[2],
        modifier: 2
    }, {
        name: "That cursor sure is hairy",
        desc: "I came in like a ball of wool<br/>I never hit so hard in love<br/>Clicks cps x4",
        puId: "pu6",
        pic: "media/cursor.png",
        cost: 8000,
        type: "click",
        modifier: 4
    }
]

let hideouts= ["media/blanket.png", "media/box.png", "media/paperbag.png"]

updateCps();
updateCats();
cpsCats();
fillUpgrades();
fillPowerups();

/* This function is called on the click of the CAT. It adds the click value to the cats value */
function clickCat() {
    numberCats += clickMultiplier;
}

/* This function is called every 10th of a second and updates the number of cats the player has*/
function updateCats(){
    cats.innerHTML=Math.round(numberCats*10)/10;
    setTimeout(updateCats, 100);
}

/* This function is called authomatically every second and does two things; it adds the cps value 
to the quantity of cats and also loads the hideouts if the random number generated is included on 
the hideout chance */
function cpsCats() {
    numberCats+=catsPerSecond;
    if (Math.random()<=hCatChance) {
        loadHideouts();
        hCatChance=hCatChanceO;
    } else {
        hCatChance+=hCatChanceI;
        console.log(hCatChance);
    }
    setTimeout(cpsCats, 1000);
}

/* This function is executed authomatically every 0.5 seconds and updates the cps. 
Might be too resource intensive */
function updateCps() {
    catsPerSecond=0;
    upgrades.forEach(element => {
        catsPerSecond+=(element.cps*element.qty*element.modifier);
    });
    setTimeout(updateCps, 50);
}

/* This function update the innerHTML of the cps, with the rounded up quantity */
function showCps() {
    cps.innerHTML=Math.round(catsPerSecond*10)/10;
}

/* This function uses the array upgrades to fill the powerups box with them */
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

/* This function uses the array powerUps to fill the powerups box with them */
function fillPowerups() {
    for (let i=0; i<powerUps.length; i++) {
        let powerup=document.createElement("div");
        let powerImg=document.createElement("img");
        powerup.setAttribute("class", "powerModel");
        powerup.setAttribute("id", powerUps[i].puId);
        powerImg.setAttribute("src", powerUps[i].pic);
        powerImg.setAttribute("width", "60px");
        powerImg.setAttribute("height", "60px");
        let powerupImgDiv=document.createElement("div");
        powerupImgDiv.setAttribute("class", "powerupImgDiv");
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
        powerupImgDiv.appendChild(powerImg);
        powerup.appendChild(powerupImgDiv);
        powerup.appendChild(powerupCost);
        powerBox.appendChild(powerup);
    }
}

/* This function fills the information box and then calls infoVisible to set the box visible */
function description(descName, descInfo) {
    itemName.innerHTML=descName;
    itemDesc.innerHTML=descInfo;
    infoVisible();
}

/* This function calls infoInvisible, and then empties the content of the information box */
function descriptionOver() {
    infoInvisible();
    itemName.innerHTML="";
    itemDesc.innerHTML="";
}

/* This function sets the information box visibility to visible if the box's content isn't empty */
function infoVisible() {
    if (itemName.innerHTML!="") {
        infoVisibility.style.visibility="visible";
    }
}

/* This function sets the information box visibility to hidden */
function infoInvisible() {
    infoVisibility.style.visibility="hidden";
}

/* A general function called whenever the player buys something. It uses the value "type" to filter
through the different things the player can buy */
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

/* This function loads the hideouts for the cats and sets them to random positions */
function loadHideouts() {
    let hideout1=document.createElement("img");
    let hideout2=document.createElement("img");

    hideout1.setAttribute("src", hideouts[Math.floor(Math.random()*(hideouts.length))]);
    hideout2.setAttribute("src", hideouts[Math.floor(Math.random()*(hideouts.length))]);

    hideout1.setAttribute("class", "hideouts");
    hideout2.setAttribute("class", "hideouts");

    hideout1.addEventListener("click", function() {
        findCat(true);
    });
    hideout2.addEventListener("click", function() {
        findCat(false);
    });

    hiddenCat.appendChild(hideout1);
    hiddenCat.appendChild(hideout2);

    let hideoutH=document.getElementById("divCat").offsetHeight;
    let hideoutW=document.getElementById("divCat").offsetWidth;

    hideout1.style.left=Math.floor(Math.random()*(Number(hideoutW)-80))+"px";
    hideout1.style.top=Math.floor(Math.random()*(Number(hideoutH)-80))+"px";
    hideout2.style.left=Math.floor(Math.random()*(Number(hideoutW)-80))+"px";
    hideout2.style.top=Math.floor(Math.random()*(Number(hideoutH)-80))+"px";

    setTimeout(hideCat, 5000);
}

/* This function is called whenever a loadout is clicked.
It first hides them, then awards the player if they win the 50/50 */
function findCat(bool) {
    hideCat();
    if (bool) {
        activatePrize();
    }
}

/* This function is called from findCat and delete all hideouts */
function hideCat() {
        while (hiddenCat.firstChild) {
        hiddenCat.removeChild(hiddenCat.firstChild);
    }
}

/* Function called when the player wins the 50/50, it will create a random number and award the
player depending on the number created */
function activatePrize() {
    let chance=Math.random(); // Between 0 and 1
    console.log(chance);

    if (chance<=0.01) {
        numberCats+=(catsPerSecond*200);
    } else if (chance<=0.10) {
        numberCats+=(catsPerSecond*100);
    } else {
        numberCats+=(catsPerSecond*20);
    }

}