/** @format */
const body = document.querySelector("body");
const form = document.getElementById("formId");
const displayCourts = document.getElementById("sectionContainer");
const headerContainer = document.querySelector(".headerContainer");
const courtNameInput = document.getElementById("courtName");
const lengthInput = document.getElementById("length");
const widthInput = document.getElementById("width");
const changeLayout = document.createElement("div");
let courtObjects = [];
const baseURL = "http://localhost:4500/api";

$(".youTubeLogo").tilt({
	maxGlare: 0,
	scale: 1,
	maxTilt: 30,
});
$(".changeStyle").tilt({
	maxGlare: 0,
	scale: 1,
	maxTilt: 30,
});
changeLayout.innerHTML = `
  <button type="submit">
    <i class="fas fa-columns" style=" background-color: linear-gradient(147deg, #166d3b 0%, #000000 74%);"></i>
  </button>
`;

changeLayout.classList.add("changeStyle");
displayCourts.appendChild(changeLayout);

const errCallback = (err) => console.log(err);

const deleteCourt = (id) =>
	axios
		.delete(`${baseURL}/court/${id}`)
		.then((res) => {
			displayCourts.innerHTML = "";
			displayCourts.appendChild(changeLayout);
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
			displayCourts.appendChild(changeLayout);
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
				displayCourts.appendChild(changeLayout);
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
	
    <h1 style='transform: translateZ(35px);padding-top:1em; font-size:30px;'>${
			court.name
		}'s Court</h1>
		<br>
    <div class='imageClassWL'>
        <div class="parent">
        <div class="courtDesign"><img src="/photos/pickleballCourt copy.png" alt="thumbnail" height='300' width='500'></div> 
        <div class="child"></div>
        <div class="child2"></div>
        <div class="child3"></div>
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
	if (displayCourts.contains(changeLayout)) {
	} else {
		displayCourts.appendChild(changeLayout);
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
		<p style='display:flex; align-self:center;font-size:20px; '>${courtName}'s Court</p>
		 <p style='transform: translateZ(25px)'>Total Area: ${area}sq/ft </p>
		<div class= materialWrapper>
	  	<div style='display:flex; flex-direction:row; align-items:center; gap:7px; transform: translateZ(45px);'>
      	<img alt="Barrel" id="barrelImg" src="/photos/barrel.png" width='100'  height='100'style="transform: translateZ(65px);border-radius:15%;">
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
		<img alt="Pickleball Court"  src="/photos/pickleball.png" width='350'  height='200'style="transform: translateZ(65px);border-radius:15%;">
	</div>
      
      <button class="btnCard" onclick="exitMaterials(${id})">Back</button>
  
	</div>`;

		currentCourtCard.insertAdjacentElement("afterend", materialsContainer);

		$(".courtCard").tilt({
			maxGlare: 0.0,
			scale: 1,
			maxTilt: 3,
		});
	}
}

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
	displayCourts.removeChild(changeLayout);
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
