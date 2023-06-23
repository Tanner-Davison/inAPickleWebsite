/** @format */
const body = document.querySelector("body");
const form = document.getElementById("formId");
const displayCourts = document.getElementById("sectionContainer");
const headerContainer = document.querySelector(".headerContainer");
const courtNameInput = document.getElementById("courtName");
const lengthInput = document.getElementById("length");
const widthInput = document.getElementById("width");
let numColors = document.getElementById("color");
let courtObjects = [];
const baseURL = "http://localhost:4500/api";
const selectedColors = [];



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
	constructor(name, length, width, area, colors) {
		this.name = name;
		this.length = length;
		this.width = width;
		this.area = area;
		this.colors = colors;
	}
}

function onClick(e) {
	console.log(selectedColors);
	e.preventDefault();
	let colors = numColors.value;
	const courtName = courtNameInput.value;
	let courtNameUpperCased =
		courtName.charAt(0).toUpperCase() + courtName.slice(1);
	let length = lengthInput.value;
	let width = widthInput.value;
	console.log(numColors.value);
	let courtArea = lengthInput.value * widthInput.value;
	if (courtNameUpperCased === "") {
		courtNameUpperCased = "No Name";
	}
	courtNameUpperCased =
		courtNameUpperCased === "" ? "No Name" : courtNameUpperCased;
	length = length === "" ? 0 : length;
	width = width === "" ? 0 : width;
	const courtObj = new Court(
		courtNameUpperCased,
		length,
		width,
		courtArea,
		colors
	);

	if ((headerContainer.classList = "newClass")) {
		headerContainer.classList.remove("headerContainer");
		headerContainer.classList.add("newClass");
	}
	createNewCourt(courtObj);
	form.reset();
}

function generateCourtInfo(court) {
	console.log(court.colors);
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
    <p>Court # ${court.id - 1} ${court.colors}</p>
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
		let color = document.querySelector("#color-option");
		console.log(color);
		materialsContainer.id = `materialsContainer`;
		materialsContainer.classList.add("courtCard");
		let area = length * width;
		let PaintWithSand = null;
		let primer = null;
		let linePaint = null;
		let adhesion = null;
		let seventyThirty = null;
		let fourtyTen = null;
		let acid = null;
		let patchBinder = null;
		let paper = null;
		let sportWax = null;

		if (area <= 880) {
			acrylicResurfacer = "15-Gallons"; //if area is 880 sqft (just pickleball internal no outside)
			PaintWithSand = "15-20 Gallons";
			primer = "1-Gallon";
			linePaint = "1-Gallon";
			adhesion = "5 Gallons";
		} else if (area <= 1800) {
			acrylicResurfacer = "40-60 Gallons"; // If area is less than or equal to 1800 square feet
			PaintWithSand = "40-45 Gallons"; // used
			primer = "1-Gallon"; //used
			adhesion = "5-Gallons"; //used
			linePaint = "1-Gallon"; //used
			patchBinder = "5 Gallons"; //used
			fourtyTen = "8 bags"; //used
			seventyThirty = "4 bags"; //used
			paper = "2-3 rolls of paper"; //used
			acid = "4-Gallons"; //used
			sportWax = "5-Gallons"; //used
		} else if (area <= 7200) {
			acrylicResurfacer = "170-180 Gallons";
			PaintWithSand = "45 Gallons"; // If area is less than or equal to 7200 square feet
			primer = "2- Gallons";
			linePaint = "2-Gallons";
			patchBinder = "10-Gallons ";
			fourtyTen = "44 bags *(12 bags for color)";
			paper = "5-6 rolls of paper (depending on court)";
		} else {
			acrylicResurfacer = 0; // For any other area size
		}

		materialsContainer.innerHTML = `
		<h1 style='position: absolute;top: 146px;left: 80px;z-index: 100;'>${courtName}'s Material Needs</h1>
		<div style='position: absolute;display: flex;flex-direction: row;align-items: center;height: 13px;top: 463px;left: 85px;color: black;z-index: 50;font-size: 13px;background-color: transparent;'>
				<em>
					<p>Numbers based on</p>
				</em>
				<em>
				<p style='transform: translateZ(25px)'>Total Court Area: ${area}sq/ft </p>
			</em>
			
	</div>
	<img alt="Barrel" id="barrelImg" src="/photos/barrel.png" width='200'  height='200'>
	<div class= materialWrapper>
		<div class='matCardStyle'>
			<div class='BarrelListContainer'>
				<div id='materialList'>
				<p>Acrylic Resurfacer: <h6 class='measurementsStyle'>${acrylicResurfacer}</h6> <p style='color:gray;font-size:small;'>(*covers 2 coats w/ sand)</p> 
				</div>
				<div id='materialList'>
			  	<p>Acrylic PickleMaster: <h6 class='measurementsStyle'>${PaintWithSand}</h6> <p style='color:gray;font-size:small;'>(*covers 2 coats w/ sand)</p> 
			</div>
				<div id='materialList'>
				<p>Patch Binder:  <h6 class='measurementsStyle'>${patchBinder}</h6><p style='color:gray;font-size:small;'>(*may use more given court condition) </p>
				</div>
				<div id='materialList'>
				<p>Adhesion Promoter:  <h6 class='measurementsStyle'>${adhesion}</h6> 
				</div>
			<div id='materialList'>
				<p>Line Primer:  <h6 class='measurementsStyle'>${primer}</h6> 
				</div>
				<div id='materialList'>
				<p>Line Paint:  <h6 class='measurementsStyle'>${linePaint}</h6> 
				</div>
				<div id='materialList'>
				<p>Sand 40/10: <h6 class='measurementsStyle'>${fourtyTen}</h6> 
				</div>
				<div id='materialList'>
				<p>Sand 70/30: <h6 class='measurementsStyle'>${seventyThirty}</h6> <p style='color:gray;font-size:small;'>(2 per/ half keg)</p>
				</div>
				<div id='materialList'>
				<p>Paper Rolls: <h6 class='measurementsStyle'>${paper}</h6> 
				</div>
				<div id='materialList'>
				<p>Acid-wash: <h6 class='measurementsStyle'>${acid}</h6> 
				</div>
				<div id='materialList'>
				<p>Sport-Wax <h6 class='measurementsStyle'>${sportWax}</h6> 
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

		$(".court").tilt({
			maxGlare: 0.0,
			scale: 1,
			maxTilt: 3,
			

		});
	}
	const customCourtBtn = document.getElementById("customCourt1");

	customCourtBtn.addEventListener("click", (event) => {
		event.preventDefault();
		customCourtColor(id, materialsContainer);
	});
}
const customCourtColor = (id, currentDisplay) => {
	customCourtCard = currentDisplay;
	customCourtCard.id = `customCourtCard_${id}`;

	customCourtCard.innerHTML = `
	<form class= colorForm>
        <div class="parent">
			<button type='button'class='childP' id='parentBtn' onclick="colorWheel(${id},'parentBtn','parent')"></button>
        <div class="child">
			<button type='button'class="childs"id='childBtn'onclick="colorWheel(${id},'childBtn','child')"></button>
		</div>
        <div class="child2">
			<button type='button'class="child2s"id='childBtn2'onclick="colorWheel(${id},'childBtn2','child2')"></button>
		</div>
    </div>
	<div id="dropdown_${id}" class="dropdown-content">
    <a  class="color-option" style='color:#00562f;' onclick="colorChanger(${id},'#00562f','parent')">Light Green</a>
    <a  class="color-option"style='color:#1b4d2d;' onclick="colorChanger(${id},'#1b4d2d','parent')">Forest Green</a>
      <a  class="color-option"style='color:#375748;' onclick="colorChanger(${id},'#375748','parent')">Dark Green</a>
	   <a  class="color-option"style='color:#614f43;' onclick="colorChanger(${id},'#614f43','parent')">Beige</a>
	     <a  class="color-option"style='color:#382728;' onclick="colorChanger(${id},'#382728','parent')">Brown</a>
	       <a  class="color-option"style='color:#73292f;' onclick="colorChanger(${id},'#73292f','parent')">Red</a>
	        <a  class="color-option"style='color:#bd9f6f;' onclick="colorChanger(${id},'#bd9f6f','parent')">SandStone</a>
		     <a  class="color-option"style='color:#4e131e;' onclick="colorChanger(${id},'#4e131e','parent')">Maroon</a>
		      <a  class="color-option"style='color:#1c1b57;' onclick="colorChanger(${id},'#1c1b57','parent')">Tournament Purple</a>
		     <a  class="color-option"style='color:#5b5d62;' onclick="colorChanger(${id},'#5b5d62','parent')">Gray</a>
		    <a  class="color-option"style='color:#002f54;' onclick="colorChanger(${id},'#002f54','parent')">Blue</a>
		   <a  class="color-option"style='color:#00517f;' onclick="colorChanger(${id},'#00517f','parent')">Light Blue</a>
		  <a  class="color-option"style='color:#8d9198;' onclick="colorChanger(${id},'#8d9198','parent')">Dove Gray</a>
         <a  class="color-option"style='color:#49c7ed;' onclick="colorChanger(${id},'#49c7ed','parent')">Icy Blue</a>
        <a  class="color-option"style='color:#ffca6e;' onclick="colorChanger(${id},'#ffca6e','parent')">Yellow</a>
       <a  class="color-option"style='color:#e35e44;' onclick="colorChanger(${id},'#e35e44','parent')">Orange</a>
      <a  class="color-option"style='color:#c71823;' onclick="colorChanger(${id},'#c71823','parent')">Bright Red</a>
    <a  class="color-option"style='color:#000000;' onclick="colorChanger(${id},'#000000','parent')">Black</a>
   

</div>
		 <div class="courtDesign">
		<img class='imgGridBox'src="/photos/pickleballCourt.png" alt="thumbnail" height='300' width='500'>
	</div> 
</form>
<div class='colorBtnContainer'>
<button class="btnCard"id="exitMaterials" onclick="exitMaterials(${id})">Home</button>
<button class="btnCard" id="saveColors" type='submit' onclick="saveColorFunc(${id})">Save</button>
</div>
	`;
	let outerBorder = document.querySelector(".childP");

	let courtArea = document.querySelector("#childBtn");
	let kitchen = document.querySelector("#childBtn2");

	let thisHome = document.getElementById(`courtCard_${id}`);
	const hasId = selectedColors.findIndex((item) => item.id == thisHome);

	if (hasId !== -1) {
		num = hasId;
		outerBorder.style.backgroundColor = selectedColors[num].colorOuter;
		courtArea.style.backgroundColor = selectedColors[num].colorCourt;
		kitchen.style.backgroundColor = selectedColors[num].colorKitchen;
	}
	console.log(hasId.color);
	$(".dropdown-content").tilt({
		maxGlare: 0,
		scale: 1,
		maxTilt: 10,
	});
	colorWheel = (id, parents, target) => {
		const dropdown = document.getElementById(`dropdown_${id}`);
		dropdown.style.display =
			dropdown.style.display === "block" ? "none" : "block";
		const targetElement = document
			.getElementById(`customCourtCard_${id}`)
			.querySelector(`#${parents}`);
		colorChanger = (id, color) => {
			console.log(target);

			targetElement.style.backgroundColor = color;
			console.log(target);
		};
	};
	saveColorFunc = (id) => {
		let thisHome = document.getElementById(`courtCard_${id}`);
		let parentBtn = document.getElementById("parentBtn");
		let childBtn = document.getElementById("childBtn");
		let childBtn2 = document.getElementById("childBtn2");

		parentBtn.textContent = parentBtn.style.backgroundColor;
		let parent = parentBtn.textContent;

		childBtn.textContent = childBtn.style.backgroundColor;
		let child = childBtn.textContent;

		childBtn2.textContent = childBtn2.style.backgroundColor;
		let child2 = childBtn2.textContent;

		const existingColorIndex = selectedColors.findIndex(
			(item) => item.id === thisHome
		);
		if (existingColorIndex !== -1) {
			selectedColors[existingColorIndex].colorOuter = parent;
			selectedColors[existingColorIndex].colorCourt = child;
			selectedColors[existingColorIndex].colorKitchen = child2;
		} else {
			selectedColors.push({
				colorOuter: parent,
				colorCourt: child,
				colorKitchen: child2,
				id: thisHome,
			});
		}
		console.log(selectedColors);
	};
};
function exitMaterials(id) {
	const materialsContainer = document.getElementById(`materialsContainer`);
	const currentCourtCard = document.getElementById(`courtCard_${id}`);
	const customCourtCard = document.getElementById(`customCourtCard_${id}`);
	if (customCourtCard && currentCourtCard) {
		customCourtCard.remove();
		currentCourtCard.style.display = "flex";
		currentCourtCard.classList.add("courtCard");
	} else if (materialsContainer && currentCourtCard) {
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
