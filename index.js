const form = document.getElementById('formId');
const displayCourts = document.getElementById('formsubmitted');
const courtObjects = []
let courtID = 0;

// create class of Court to generate court objects
class Court {
    constructor(name, length, width,area, courtID){
        this.name = name;
        this.length = length;
        this.width = width;
        this.area = area;
        this.courtID= courtID;
    }
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
    
event.preventDefault()
    const headerContainer = document.querySelector('.headerContainer');
    
    if(headerContainer){
    headerContainer.classList.remove('headerContainer');
    headerContainer.classList.add('newClass');
    const addNewCourt = document.createElement('h1')
    addNewCourt.textContent='Create new court'
    form.prepend(addNewCourt)
    }else{
        console.log('working')
    }
    
    const courtNameInput = document.getElementById('courtName');
    const lengthInput = document.getElementById('length');
    const widthInput = document.getElementById('width');
    //getting values from input boxes 
    const courtName = courtNameInput.value;
    const length = lengthInput.value;
    const width = widthInput.value;
    const courtArea = lengthInput.value * widthInput.value;
    // add one to the court id
    courtID +=1
    
    //create new court object
    const court = new Court(courtName,length, width, courtArea, courtID);
    // run class method on object to generate our card
    const courtInfo = court.generateCourtInfo();
    const deleteBTN = document.createElement('button')

    displayCourts.appendChild(courtInfo);
    $(".courtCard").tilt({
        'maxGlare': .2,
        scale: 1,
    });
   
    courtObjects.push(court)
// if courtcared exists then add a delete button to card
if(courtInfo.classList='courtCard'){
    deleteBTN.style=`width:100px;,
                     height:100px;
                     color:black;
                    `
    deleteBTN.textContent="DELETE"
    courtInfo.appendChild(deleteBTN)
 }


 deleteBTN.addEventListener('click', () => {
    courtInfo.parentNode.removeChild(courtInfo);
    courtObjects.splice(courtObjects.indexOf(court), 1);
  });

form.reset();

}

console.log(courtObjects)

form.addEventListener("submit", onClick)