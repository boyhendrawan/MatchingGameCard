const getData=document.querySelector(".grid");
const ourShape=["angular","aurelia","backbone","ember","react","vue"];
const modal = document.getElementById("popup-modal");
const messageDone = document.getElementById("messageDone");


let check=false;
let fristCard=null,secondCards="",lockBoard=false,chance,dataWin=0;


function events(e){
   e.preventDefault();
   
   if(lockBoard) return;
   const valData=e.target;
   handleFlip(e,valData.dataset.check);
   //to handle card is maching
   if(fristCard==null){
       fristCard=valData;
    }else if(fristCard != valData){
        secondCards=valData;
        matching();
    }
  
}
function matching(){
    const truth=fristCard.dataset.check ===secondCards.dataset.check;
    truth ? fullfill() : rejected();
    
}
function fullfill(){
    fristCard.classList.add("fulfill"); 
    secondCards.classList.add("fulfill"); 
    resetBoard();
    dataWin--;
    checkChance();
}
function rejected(){
    lockBoard=true;
    setTimeout(e=>{
        fristCard.setAttribute("src",`assets/img/js-badge.svg`);
        fristCard.parentElement.classList.remove("rotate-y-180");
        fristCard.classList.remove("rotate-y-180"); 
        
        //second
        secondCards.setAttribute("src",`assets/img/js-badge.svg`);
        secondCards.parentElement.classList.remove("rotate-y-180");
        secondCards.classList.remove("rotate-y-180"); 
        resetBoard();
    },800);
    chance--;
    checkChance();
    
}
function resetBoard(){
    [fristCard,secondCards,lockBoard]=[null,null,false];
}
function handleFlip(e,valDataset){
    
    if((e.target.className.includes("fulfill")))return; //if card has been truth this card can't flip again

    if(e.target.getAttribute("src").includes("js-badge.svg")){ //search as src
        //get the picture
            e.target.setAttribute("src",`assets/img/${valDataset??"wayoKosong"}.svg`);
            e.target.parentElement.classList.add("rotate-y-180")
            e.target.classList.add("rotate-y-180");
        }
        else if(e.target.getAttribute("src").includes("assets/img/")){
            e.target.setAttribute("src",`assets/img/js-badge.svg`);
            e.target.parentElement.classList.remove("rotate-y-180");
            e.target.classList.remove("rotate-y-180");
        }

}

function createAndSuffleCard(dataShapes,muchEachData=2){
    //handle much data
    // why i copy that array ? when you pass an array to a function, that array is treated as a pointer 
    // pointing to the base location of the array, hence manipulating your elements
    let dataShape=[...dataShapes];
    for(let i=0;i<muchEachData-1;i++){
        dataShape.push(...dataShape);
    }
    //Made limit and chance
    chance=dataShape.length;
    dataWin=(dataShape.length/2);
    document.getElementById("chance").innerText=chance;
    //end 

    let increment=1;
    while(increment<= dataShape.length){
        const randomVal=Math.floor(Math.random() *12);
        if(dataShape[randomVal] ==false){
            continue;
        }
        createElement(dataShape[randomVal]);
        dataShape[randomVal]=false;
        increment++;
    }     

};
function createElement(valDataStart){
    const wrap=document.getElementsByClassName("grid-cols-4")[0];
    const container=document.createElement("div");
    container.setAttribute("class","transform-style  relative cursor-pointer transition duration-500 ");
    const img=document.createElement("img");
    img.setAttribute("class","designCard ");
    img.setAttribute("src","assets/img/js-badge.svg");
    img.setAttribute("data-check",`${valDataStart}`);
    container.appendChild(img);
    wrap.appendChild(container);
}
function checkChance(){   
    const htmlChance=document.getElementById("chance").innerText=chance;
    if(chance ==0){
        
       
        const message = "Sorry, today is Not your day , wanna play agian ?";
        const msgsColor = "selectionLose";
        const colorBtn = "buttonLose";
        const icon = ` 
        <span class="absolute inline-flex h-14 w-14 rounded-full bg-rose-500 opacity-60 animate-ping transition"></span>
        <svg class="inline-flex relative w-14 mx-auto h-14 text-rose-600 transition group-hover:scale-150 duration-400 ease-in-out" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
        ></path>
         </svg>
    
        `;
        madeModalHTML(messageDone, message, msgsColor, colorBtn, icon);
        return;
    }
    if(dataWin==0){
        const message = "Congratulation Player Win Wanna Play Again ?";
        const msgsColor = "selectionWinner";
        const colorBtn = "buttonWinner";
        const icon = `
        <span class="absolute inline-flex h-14 w-14 rounded-full bg-green-500 opacity-60 animate-ping transition"></span>
                <svg class="inline-flex relative w-14 mx-auto h-14 text-green-600 transition group-hover:scale-150 duration-400 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>`;
        modal.classList.remove("hidden");
        madeModalHTML(messageDone, message, msgsColor, colorBtn, icon);
        }
}
function madeModalHTML(reference, message, msgsColor, colorBtn, icon) {
    modal.classList.remove("hidden");
    reference.innerHTML = message;
    reference.classList.add(msgsColor);
    reference.nextElementSibling.classList.add(colorBtn);
    reference.previousElementSibling.innerHTML = icon;
  }

createAndSuffleCard(ourShape);


getData.addEventListener("click",events);


//if modal have been pop already
const buttonReload=messageDone.nextElementSibling;
buttonReload.addEventListener("click",function(e){
   
    e.preventDefault();
    const wrap=document.getElementsByClassName("grid-cols-4")[0];
    wrap.innerHTML=""; //earse all data
    createAndSuffleCard(ourShape); //calling new again
    modal.classList.add("hidden"); //hidden modal



});