const form = document.getElementById('formId');
const displayCourts = document.getElementById('sectionContainer');
const courtObjects = []
const baseURL = 'http://localhost:4500/api'
let isNewCourtAdded = false;

// create class of Court to generate court objects

class Court {
    constructor(name, length, width,area, courtID){
        this.name = name;
        this.length = length;
        this.width = width;
        this.area = area;
        
    }
}

//PASSING IN THE COURT OBJECT FROM OUR BACKED
function generateCourtInfo(court) {
    if (courtObjects.some(obj => obj.courtID === court.id)) {
        // Court with the same ID already exists, do not add it again
        return;
      }
   
    let courtInfo = document.createElement('div');
   
    // for TILT.JS
    courtInfo.classList.add('courtCard');
    
    courtInfo.setAttribute('data-tilt-glare', 'true');
    courtInfo.setAttribute('data-tilt-perspective', '2000');
    courtInfo.setAttribute('data-tilt-scale', '1');
    courtInfo.setAttribute('data-tilt-speed', '400');
    courtInfo.setAttribute('data-tilt-max', '30');
    // court info to display
    
    courtInfo.innerHTML = `
        <h1>${court.name}'s Court</h1>
        <div id='dimensions'>
        <div id='courtWithWidth'>
        <div style='display:flex, flex-direction:column;font-size:18px;'>
            <u>Width</u>
            <p style ='color:red'>${court.width}ft</p>
            </div>
        <img alt="Pickleball Court" id="courtIMG" src="/photos/Screenshot 2023-05-29 at 9.27.31 PM.png"width='200' height='200'>
            </div>
        <div style='display:flex, flex-direction:column;font-size:18px;'>
            <u>Length</u>
            <p style ='color:red'>${court.length} ft</p>
        </div>
        <br>
        <div style='display:flex, flex-direction:column;font-size:18px;'>
            <u>Area:</u>
            <p style ='color:red'>${court.area} ft</p>
        </div>
        <p>Court # ${court.id}</p>
    </div>
    <div class='cardBtnContainer'>
        <button class='btnCard' id='notesBtn'>Notes</button>
        <button class='btnCard' id='infoBtn'>Court Info</button>
        <button class='btnCard' id='customerInfo'>Customer Details</button>
        <button class='btnCard' id='deleteBTN' onClick='deleteCourt(${court.id})'>Delete Court</button>
    </div>`
    console.log(court.id)
     if(court.id>1){                
    displayCourts.appendChild(courtInfo);
     }else{
        return;
     }
    //Below is require for tilt.js
    $(".courtCard").tilt({
    'maxGlare': .0,
    scale: 1.1,
    });

    return courtInfo;
    }

    function deleteCourt(id) {
        
        axios.delete(`${baseURL}/court/${id}`)
            .then((res) => {
                // Handle the response after the court is successfully deleted
                displayCourts.innerHTML = '';
                res.data.forEach((courtObj) => {
                    generateCourtInfo(courtObj);
                });
            })
            .catch((error) => {
                // Handle any errors that occur during the delete request
                console.error(error);
            });
    }
    
function onClick(event){
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
    //create new court object
    const courtObj = new Court(courtNameUpperCased,length, width, courtArea);

    //POST REQUEST
    axios
    .post(`${baseURL}/court`, courtObj)
    .then((res) => {
      displayCourts.innerHTML = '';
      res.data.forEach((courtObj) => {
        generateCourtInfo(courtObj);
      });

      if (!isNewCourtAdded) {
        // Add the "Add New Court" heading to the form
        const addNewCourt = document.createElement('div');
        addNewCourt.innerHTML = `
          <h1>Add New Court</h1>
        `;
        addNewCourt.classList.add('addNewCourt');
        form.appendChild(addNewCourt);
        isNewCourtAdded = true;
      }
    })
    .catch((error) => {
      console.log(error);
    });
    //CHANGES OUR MAIN FORM AND PIC TO SWITCH FROM MIDDLE OF THE PAGE TO THE TOP LEFT DONE BY CHANGING THE CLASS.
    if(headerContainer.classList='newClass'){
        headerContainer.classList.remove('headerContainer');
        headerContainer.classList.add('newClass');
    }
       
  form.reset();
}



    
form.addEventListener("submit", onClick)