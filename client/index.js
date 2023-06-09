const form = document.getElementById('formId');
const displayCourts = document.getElementById('sectionContainer');
const headerContainer = document.querySelector('.headerContainer');
const courtNameInput = document.getElementById('courtName');
const lengthInput = document.getElementById('length');
const widthInput = document.getElementById('width');
let courtObjects = [];
const baseURL = 'http://localhost:4500/api';

$('.youTubeLogo').tilt({
	maxGlare: 0,
	scale: 1,
	maxTilt: 30,
});

const errCallback = (err) => console.log(err);

const deleteCourt = (id) =>
	axios
		.delete(`${baseURL}/court/${id}`)
		.then((res) => {
			displayCourts.innerHTML = '';
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
			displayCourts.innerHTML = '';
			res.data.forEach((courtObj) => {
				generateCourtInfo(courtObj);
			});
		})
		.catch(errCallback);

const updateCourtCard = (id, body) =>
	axios
		.put(`${baseURL}/court/${id}`, body)
		.then((res) => {
			displayCourts.innerHTML = '';
			res.data.forEach((court) => {
				generateCourtInfo(court);
			});
		})
		.catch(errCallback);

const getAllCourts = () =>
	axios
		.get(`${baseURL}/cards/`)
		.then((res) => {
			displayCourts.innerHTML = '';
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
if (headerContainer.classList.contains('headerContainer')) {
}
function onClick(e) {
	e.preventDefault();

	const courtName = courtNameInput.value;
	let courtNameUpperCased =
		courtName.charAt(0).toUpperCase() + courtName.slice(1);
	let length = lengthInput.value;
	let width = widthInput.value;
	let courtArea = lengthInput.value * widthInput.value;
	if (courtNameUpperCased === '') {
		courtNameUpperCased = 'No Name';
	}
	courtNameUpperCased =
		courtNameUpperCased === '' ? 'No Name' : courtNameUpperCased;
	length = length === '' ? 0 : length;
	width = width === '' ? 0 : width;
	const courtObj = new Court(courtNameUpperCased, length, width, courtArea);

	if ((headerContainer.classList = 'newClass')) {
		headerContainer.classList.remove('headerContainer');
		headerContainer.classList.add('newClass');
	}
	createNewCourt(courtObj);
	form.reset();
}

function generateCourtInfo(court) {
	let courtInfo = document.createElement('div');
	courtInfo.classList.add('courtCard');
	courtInfo.id = `courtCard_${court.id}`;
	courtInfo.setAttribute('data-tilt-glare', 'true');
	courtInfo.setAttribute('data-tilt-perspective', '2000');
	courtInfo.setAttribute('data-tilt-scale', '1');
	courtInfo.setAttribute('data-tilt-speed', '400');
	courtInfo.setAttribute('data-tilt-max', '30');

	courtInfo.innerHTML = `
    <h1 style='transform: translateZ(35px);padding-top:1em'>${
			court.name
		}'s Court</h1>
    <div style='display:flex; flex-direction:row; align-items:center; justify-content:center; gap:20px;  transform-style: preserve-3d;'>
      <div style='transform: translateZ(20px)'>
        <u style='font-size:18px;'>Length:</u>
        <p style='color:red'>${court.length} ft</p>
      </div>
        <img alt="Pickleball Court" id="courtIMG" src="/photos/pickleball.png" width='350'  height='200'style="transform: translateZ(65px);border-radius:15%;">
        <div style='font-size:18px; transform: translateZ(20px);'>
        <u>Width:</u>
        <div style='color:red'>${court.width} ft</div>
      </div>
    </div><br>
    <div style='display:flex, flex-direction:column; font-size:18px; transform'></div>
    <div style="display:flex, flex-direction:column; font-size:18px; transform: translateZ(50px)">
      <u>Total Area:</u>
      <br>
      <p style='color:red'>${court.area} ft</p>
    </div><br>
    <p>Court # ${court.id - 1}</p>
    <div class='btnContainer' >
      <button class='btnCard' id='notesBtn' onClick="changeInputs(${
				court.id
			})">Update Court</button>
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
  </div>`;

	if (court.id > 1) {
		displayCourts.appendChild(courtInfo);
		$('.courtCard').tilt({
			maxGlare: 0,
			scale: 1,
			maxTilt: 12,
		});
		displayCourts.style = 'background-color: black';
	} else {
		return;
	}
	return courtInfo;
}

function showMaterials(courtName, id, length, width) {
	const currentCourtCard = document.getElementById(`courtCard_${id}`);
	if (length === 0 || width === 0) {
		alert(
			'Must enter a Length & Width to enter materials. Please Update Court Info.'
		);
		return;
	}
	if (currentCourtCard) {
		currentCourtCard.style.display = 'none';
		const materialsContainer = document.createElement('div');
		materialsContainer.id = `materialsContainer_${id}`;
		materialsContainer.classList.add('courtCard');
		materialsContainer.innerHTML = `
      
      <p style='transform: translateZ(25px)'>Court Name: ${courtName}</p>
      <p style='transform: translateZ(25px)'>ID: ${id}</p>
      <p style='transform: translateZ(25px)'>Length: ${length}</p>
      <p style='transform: translateZ(25px)'>Width: ${width}</p>
      <button class="btnCard" onclick="exitMaterials(${id})">Back</button>
    </div>`;

		currentCourtCard.insertAdjacentElement('afterend', materialsContainer);
		materialsContainer.classList.add('courtCard');
		$('.courtCard').tilt({
			maxGlare: 0.0,
			scale: 1,
			maxTilt: 15,
		});
	}
}

function exitMaterials(id) {
	const materialsContainer = document.getElementById(
		`materialsContainer_${id}`
	);
	const currentCourtCard = document.getElementById(`courtCard_${id}`);
	if (materialsContainer && currentCourtCard) {
		materialsContainer.remove();
		currentCourtCard.style.display = 'flex';
		currentCourtCard.classList.add('courtCard');
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
	changeForm.classList.add('showInputContainer');
	//go BACK
	const backBtn = document.getElementById('backBtn');

	const backToMain = function (e) {
		e.preventDefault();

		changeForm.innerHTML = '';
		getAllCourts();
		return;
	};
	backBtn.addEventListener('click', backToMain);
	changeForm.addEventListener('submit', updateFormData);

	function updateFormData(e) {
		e.preventDefault();
		const nameInput = document.getElementById('updateName');
		const widthInput = document.getElementById('width2');
		const lengthInput = document.getElementById('length2');
		const id = changeForm.id;
		nameInputToUpperCase = nameInput.value;
		const upperCasedName =
			nameInputToUpperCase.charAt(0).toUpperCase() + nameInputToUpperCase.slice(1);
		const Uname = upperCasedName;
		let width = widthInput.value;
		let length = lengthInput.value;
	    length = length === '' ? 0 : length;
		width = width === '' ? 0 : width;
		const area = length * width;

		const updatedCourtInfo = {
			Uname,
			width,
			length,
			area,
		};
		$('.showInputContainer').tilt({
			maxGlare: 0,
			scale: 1,
			maxTilt: 30,
		});

		updateCourtCard(id, updatedCourtInfo);
	}
}
const changeStatus = function (id) {
	const court = document.getElementById(`courtCard_{id}`);
	const markComplete = document.createElement('div')
	markComplete.classList.add('completeOverlay')
	markComplete.innerHTML = `
	<div class='completeOverlay'></div>`
	court.replaceWith(markComplete)
	
};

form.addEventListener('submit', onClick);
