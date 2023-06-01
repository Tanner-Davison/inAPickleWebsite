const form = document.getElementById('formId');
const displayCourts = document.getElementById('formsubmitted');
const courtObjects = []
let courtID = 0;
const baseURL = 'http://localhost:4500/api/cards'
// create class of Court to generate court objects
class Court {
    constructor(name, length, width,area, courtID){
        this.name = name;
        this.length = length;
        this.width = width;
        this.area = area;
        this.courtID= courtID;
    }
    //making a new card (you can call this when adding a new object Court Object)
    generateCourtInfo() {
        const courtInfo = document.createElement('div');
        // for tilt.js
        courtInfo.classList.add('courtCard');
        courtInfo.setAttribute('data-tilt-axis', 'x');
        courtInfo.setAttribute('data-tilt-glare', 'true');
        courtInfo.setAttribute('data-tilt-perspective', '2000');
        courtInfo.setAttribute('data-tilt-scale', '1');
        courtInfo.setAttribute('data-tilt-speed', '400');
        courtInfo.setAttribute('data-tilt-max', '30');
        // court info to display
        courtInfo.innerHTML = `<h1>${this.name}'s Court</h1>
                               <div id='dimensions'>
                                 <p>Length: ${this.length}ft</p>
                                 <div id='courtWithWidth'>
                                   <p>Width: ${this.width}ft</p>
                                   <img alt="Pickleball Court" id="courtIMG" src="/photos/Screenshot 2023-05-29 at 9.27.31 PM.png">
                                 </div>
                                 <p>Area: ${this.area} ft</p>
                                 <p>Court # ${this.courtID}</p>
                               </div>`;
        return courtInfo;
        
    }
}
function onClick(event){
    

const getAllCards = ()=>{
    axios.get(baseURL)
    .then((res) => {
        console.log(res)
        console.log(res.body)
        res.data.forEach(court => {
            console.log(court)
        })
    })
    }
    getAllCards()
    event.preventDefault()
    const headerContainer = document.querySelector('.headerContainer');
    
    

    //declaring inputbox Elements
    const courtNameInput = document.getElementById('courtName');
    const lengthInput = document.getElementById('length');
    const widthInput = document.getElementById('width');
    //getting values from input boxes 
    const courtName = courtNameInput.value;
    const courtNameUpperCased = courtName.charAt(0).toUpperCase()
    + courtName.slice(1)
    const length = lengthInput.value;
    const width = widthInput.value;
    const courtArea = lengthInput.value * widthInput.value;

    if(headerContainer){
        headerContainer.classList.remove('headerContainer');
        headerContainer.classList.add('newClass');
        const addNewCourt = document.createElement('div')
        if(addNewCourt && !addNewCourt.innerHTML){
        addNewCourt.innerHTML=`<h1>Create New</h1>`
        addNewCourt.classList.add('addNewCourt')
        form.prepend(addNewCourt)
        }
    }
    
    // add one to the global court id
    courtID +=1
    
    //create new court object
    const court = new Court(courtNameUpperCased,length, width, courtArea, courtID);
    // run class method on object to generate our card
    const courtInfo = court.generateCourtInfo();
    displayCourts.appendChild(courtInfo);
    $(".courtCard").tilt({
        'maxGlare': .2,
        scale: 1,
    });
    //add the new court to the court Objects array
    courtObjects.push(court)

   //create your cards BTNS container
  const cardBtnContainer = document.createElement('div')
  
 // if courtInfo exists then add the functionality buttons
if(courtInfo.classList='courtCard'){
    
    cardBtnContainer.classList.add('cardBtnContainer')


    cardBtnContainer.innerHTML=`
    <button class='btnCard' id='notesBtn'>Notes</button>
    <button class='btnCard' id='infoBtn'>Court Info</button>
    <button class='btnCard' id='customerInfo'>Customer Details</button>
    <button class='btnCard' id='deleteBTN'>Delete Court</button>
`
    courtInfo.appendChild(cardBtnContainer)
 }else{}

 function changeClass(){
    if(courtObjects.length===0){
        headerContainer.classList.remove('newClass')
        headerContainer.classList.add('headerContainer')
    }
 }
 const deleteBTN = document.getElementById('deleteBTN')

 deleteBTN.addEventListener('click', () => {
    courtInfo.parentNode.removeChild(courtInfo);
    courtObjects.splice(courtObjects.indexOf(court), 1);
    changeClass();
  })
  console.log(courtObjects)
  
}
form.reset();




    
form.addEventListener("submit", onClick)