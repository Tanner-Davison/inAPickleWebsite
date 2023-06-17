/** @format */
const body = document.querySelector("body");
const form = document.getElementById("formId");
const displayCourts = document.getElementById("sectionContainer");
const headerContainer = document.querySelector(".headerContainer");
const courtNameInput = document.getElementById("courtName");
const lengthInput = document.getElementById("length");
const widthInput = document.getElementById("width");
let courtObjects = [];
const baseURL = "http://localhost:4500/api";

$(".youTubeLogo").tilt({
	maxGlare: 0,
	scale: 1,
	maxTilt: 30,
});

const errCallback = (err) => console.log(err);
const deleteCourt = (id) =>
	axios
		.delete(`${baseURL}/court/${id}`)
		.then((res) => {
			displayCourts.innerHTML = "";

			const { data } = res; //same as res.data except now data is the variable name
			data.forEach((courtObj) => {
				generateCourtInfo(courtObj);
			});
		})
		.catch(errCallback);

const createNewCourt = (body) =>
	axios
		.post(`${baseURL}/court`, body)
		.then((res) => {
			displayCourts.innerHTML = "";

			res.data.forEach((courtObj) => {
				generateCourtInfo(courtObj);
			});
		})
		.catch(errCallback);

const updateCourtCard = (id, body) =>
	axios
		.put(`${baseURL}/court/${id}`, body)
		.then((res) => {
			displayCourts.innerHTML = "";
			res.data.forEach((court) => {
				generateCourtInfo(court);
			});
		})
		.catch(errCallback);

const getAllCourts = () =>
	axios
		.get(`${baseURL}/cards/`)
		.then((res) => {
			displayCourts.innerHTML = "";

			res.data.forEach((court) => {
				generateCourtInfo(court);
			});
		})
		.catch(errCallback);

class Court {
	constructor(name, length, width, area) {
		this.name = name;
		this.length = length;
		this.width = width;
		this.area = area;
	}
}

function onClick(e) {
	e.preventDefault();

	const courtName = courtNameInput.value;
	let courtNameUpperCased =
		courtName.charAt(0).toUpperCase() + courtName.slice(1);
	let length = lengthInput.value;
	let width = widthInput.value;
	let courtArea = lengthInput.value * widthInput.value;
	if (courtNameUpperCased === "") {
		courtNameUpperCased = "No Name";
	}
	courtNameUpperCased =
		courtNameUpperCased === "" ? "No Name" : courtNameUpperCased;
	length = length === "" ? 0 : length;
	width = width === "" ? 0 : width;
	const courtObj = new Court(courtNameUpperCased, length, width, courtArea);

	if ((headerContainer.classList = "newClass")) {
		headerContainer.classList.remove("headerContainer");
		headerContainer.classList.add("newClass");
	}
	createNewCourt(courtObj);
	form.reset();
}

function generateCourtInfo(court) {
	let courtInfo = document.createElement("div");
	courtInfo.classList.add("courtCard");
	courtInfo.id = `courtCard_${court.id}`;
	courtInfo.setAttribute("data-tilt-glare", "true");
	courtInfo.setAttribute("data-tilt-perspective", "2000");
	courtInfo.setAttribute("data-tilt-scale", "1");
	courtInfo.setAttribute("data-tilt-speed", "400");
	courtInfo.setAttribute("data-tilt-max", "30");

	courtInfo.innerHTML = `
	
    <h1 style='transform: translateZ(20px);padding-top:1em; font-size:37px;'>${
			court.name
		}'s Court</h1>
		<br>
    <div class='imageClassWL'>
        <img alt="Pickleball Court" id="courtIMG" src="/photos/pickleball.png" width='350'  height='200'style="transform: translateZ(65px);border-radius:15%;">
		<p id='child'style='color: lightgray;'>
		${court.width} X ${court.length}
    	</p>
	</div>
    <div id='this'style="display:flex; flex-direction:row; font-size:18px; transform: translateZ(50px);align-items:center; gap:5px;">
      <u>Total Area:</u>
      <p style='color:red'>${court.area} FT</p>
    </div>
    <p>Court # ${court.id - 1}</p>
    <div class='btnContainer' >
      <button class='btnCard'id='updateCourtBtn' onClick='changeInputs(${
				court.id
			})'>Update Court</button>
      <button class='btnCard' id='materialsBtn' onClick='showMaterials("${
				court.name
			}", ${court.id}, ${court.length}, ${court.width})'>Materials</button>
      <button class='btnCard' id='customerInfo' onClick='changeStatus(${
				court.id
			})'>Status</button>
      <button class='btnCard' id='deleteBTN' onClick='deleteCourt(${
				court.id
			})'>Delete Court</button>
     </div>
  	</div>
  `;

	if (court.id > 1) {
		displayCourts.appendChild(courtInfo);
		$(".courtCard").tilt({
			maxGlare: 0,
			scale: 1,
			maxTilt: 12,
		});
		displayCourts.style =
			"background-color: #4d4855;background-image: linear-gradient(147deg, #4d4855 0%, #000000 74%);";
	} else {
		return courtInfo;
	}

	return courtInfo;
}

function showMaterials(courtName, id, length, width) {
	const currentCourtCard = document.getElementById(`courtCard_${id}`);
	if (length === 0 || width === 0) {
		alert(
			"Must enter a Length & Width to enter materials. Please Update Court Info."
		);
		return;
	}
	if (currentCourtCard) {
		currentCourtCard.style.display = "none";
		const materialsContainer = document.createElement("div");
		materialsContainer.id = `materialsContainer`;
		materialsContainer.classList.add("courtCard");
		let area = length * width;
		let PaintWithSand = null;
		let primer = null;
		let linePaint = null;

		if (area <= 880) {
			acrylicResurfacer = "15-Gallons"; //if area is 880 sqft (just pickleball internal no outside)
			PaintWithSand = "15-20 Gallons";
			primer = "1-Gallon";
			linePaint = "1-Gallon";
		} else if (area <= 1800) {
			acrylicResurfacer = "20-25 Gallons"; // If area is less than or equal to 1800 square feet
			PaintWithSand = "40-45 Gallons";
			primer = "1-Gallon";
			linePaint = "1-Gallon";
		} else if (area <= 7200) {
			acrylicResurfacer = "170-180 Gallons";
			PaintWithSand = "45 Gallons"; // If area is less than or equal to 7200 square feet
		} else {
			acrylicResurfacer = 0; // For any other area size
		}

		materialsContainer.innerHTML = `
		<h1 style='position:relative;display:flex; align-self:center;transform: translateZ(60px);top:25px;'>${courtName} Material Needs</h1>
		 <p style='transform: translateZ(25px)'>Total Court Area: ${area}sq/ft </p>
	<div class= materialWrapper>
		<div style='display:flex; flex-direction:row; align-items:center; gap:30px;transform-style: preserve-3d;'>
      	  <img alt="Barrel" id="barrelImg" src="/photos/barrel.png" width='200'  height='200'style="transform: translateZ(25px);border-radius:15%;">
			<div class='BarrelListContainer'>
				<div id='materialList'>
				<p>Acrylic Resurfacer: <p style='color:black;font-size:large;'>${acrylicResurfacer}</p> <p style='color:gray;font-size:small;'>(*covers 2 coats w/ sand)</p> 
				</div>
				<div id='materialList'>
			  	<p>Acrylic Paint w/Sand: <p style='color:black;font-size:large;'>${PaintWithSand}</p> <p style='color:gray;font-size:small;'>(*covers 2 coats w/ sand)</p> 
				</div>
				<div id='materialList'>
				<p>Line Primer:  <p style='color:black;font-size:large;'>${primer}</p> 
				</div>
				<div id='materialList'>
				<p>Line Paint:  <p style='color:black;font-size:large;'>${linePaint}</p> 
				</div>
			</div>
		</div>
     	 	<div class="materialBtn">
      			<button class="btnCard"id="exitMaterials" onclick="exitMaterials(${id})">Back</button>
	  			<button class="btnCard"id="customCourt1" >Custom Court Color's </button>
	  		</div>
    		</div>
	</div>`;

		currentCourtCard.insertAdjacentElement("afterend", materialsContainer);

		$(".courtCard").tilt({
			maxGlare: 0.0,
			scale: 1,
			maxTilt: 3,
		});
	}
	const customCourtBtn = document.getElementById("customCourt1");
	
	
	customCourtBtn.addEventListener("click", (event) => {
		event.preventDefault()
		customCourtColor(id,materialsContainer);
	});
}
 const customCourtColor = (id,currentDisplay) => {

	console.log(currentDisplay)
	 customCourtCard = currentDisplay;
	 customCourtCard.id = id;
	 customCourtCard.innerHTML = `
	<form class= colorForm>
	  
        <div class="parent">
        <div class="child">
			<button class="child"id='childBtn'></button>
		</div>
        <div class="child2">
			<button class="child2"id='childBtn'></button>
		</div>
		
    </div>
		 <div class="courtDesign">
		<img class='imgGridBox'src="/photos/pickleballCourt.png" alt="thumbnail" height='300' width='500'>
	</div> 
		</form>
	`;
	 
;
	
};
function exitMaterials(id) {
	const materialsContainer = document.getElementById(`materialsContainer`);
	const currentCourtCard = document.getElementById(`courtCard_${id}`);
	if (materialsContainer && currentCourtCard) {
		materialsContainer.remove();
		currentCourtCard.style.display = "flex";
		currentCourtCard.classList.add("courtCard");
	}
}
function changeInputs(id) {
	const currentForm = document.getElementById(`courtCard_${id}`);
	changeForm = currentForm;
	changeForm.id = id;
	changeForm.innerHTML = `
  <div class='wrapperUpdateContainer' >
 <div class='showInputContainer' >
<form id='updateInputSection'>
      <h1 style='font-size:2em; font-weight:bolder;transform: translateZ(15px)'>Update Court</h1>
    <label for='updateName'style='transform: translateZ(25px)'>Add Court Name</label>
    <input id='updateName'placeholder='Enter Name'style='transform: translateZ(15px)'>
      <label for='width2'style='transform: translateZ(25px)'>Court Width</label>
    	<input id='width2' placeholder='Enter Width'style='transform: translateZ(15px)'>
    <label for='updateName'style='transform: translateZ(25px)'>Court Length</label>
       	<input style='color: black;transform: translateZ(15px)'id='length2' placeholder='Enter length'>
    <div style='display: flex; flex-direction: row; gap:4px;transform: translateZ(25px)'>
    	<button id='updateBtn'class='btnCard'type='submit'style='display:flex; height:20px width:100px;placeholder='Update Court User Info'>Update Court</button>
    	<button id='backBtn' class='btnCard'>Back Button</button>
  </div>
 	</div>
  </form>
    <img alt="Pickleball Court" id="courtIMG" src="/photos/pickleball.png" width='350' height='200'style="transform: translateZ(55px);border-radius:15%;">
 </div>
</div>
  `;
	changeForm.classList.add("showInputContainer");
	//go BACK
	const backBtn = document.getElementById("backBtn");

	const backToMain = function (e) {
		e.preventDefault();

		changeForm.innerHTML = "";
		getAllCourts();
		return;
	};
	backBtn.addEventListener("click", backToMain);
	changeForm.addEventListener("submit", updateFormData);

	function updateFormData(e) {
		e.preventDefault();

		const nameInput = document.getElementById("updateName");
		const widthInput = document.getElementById("width2");
		const lengthInput = document.getElementById("length2");
		const id = changeForm.id;
		nameInputToUpperCase = nameInput.value;
		const upperCasedName =
			nameInputToUpperCase.charAt(0).toUpperCase() +
			nameInputToUpperCase.slice(1);
		const Uname = upperCasedName;
		let width = widthInput.value;
		let length = lengthInput.value;
		length = length === "" ? 0 : length;
		width = width === "" ? 0 : width;
		const area = length * width;

		const updatedCourtInfo = {
			Uname,
			width,
			length,
			area,
		};
		$(".showInputContainer").tilt({
			maxGlare: 0,
			scale: 1,
			maxTilt: 30,
		});

		updateCourtCard(id, updatedCourtInfo);
	}
}
const changeStatus = function (id) {
	const court = document.getElementById(`courtCard_${id}`);
	let courtImage = document.getElementById("courtIMG");
	const buttonChange = court.querySelector("#customerInfo");
	const markComplete = court.querySelector(".completeOverlay");
	console.log();
	if (markComplete) {
		court.removeChild(markComplete);
		buttonChange.textContent = "Status";
		courtImage.style = "transform: translateZ(65px);border-radius: 15%;";
	} else {
		courtImage.style = "transform: translateZ(0px);border-radius: 15%;";
		const markCompleteElement = document.createElement("div");
		buttonChange.textContent = "Undo";
		markCompleteElement.classList.add("completeOverlay");
		markCompleteElement.innerHTML = `
      <div class='completeOverlay' style=''>
        <p>COMPLETE</p>
      </div>`;

		court.appendChild(markCompleteElement);
	}
};
if (headerContainer.classList.contains("headerContainer")) {
	displayCourts.style = "height:0px; width:0px;border:hidden";
}

form.addEventListener("submit", onClick);
