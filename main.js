const API = 'https://6956d02bf7ea690182d0c10a.mockapi.io/todos'

let mainTable = document.querySelector('.mainTable')
let btnLight = document.querySelector('.btnLight')
let btnDark = document.querySelector('.btnDark')
let bntSaveAdd = document.querySelector('.bntSaveAdd')
let btnCancelAdd = document.querySelector('.btnCancelAdd')
let SelectCities = document.querySelector('.SelectCities')
let selectStatus = document.querySelector('.selectStatus')
let modalAdd = document.querySelector('.modalAdd')
let btnUser = document.querySelector('.btnUser')
let formAdd = document.querySelector('.formAdd')
let btnCancelEdit = document.querySelector('.btnCancelEdit')
let modalAction = document.querySelector('.modalAction')
let modalEdit = document.querySelector('.modalEdit')
let btnEdit = document.querySelector('.btnEdit')
let btnDelete = document.querySelector('.btnDelete')
let btnprofile = document.querySelector('.btnprofile')
let btnActionEdit = document.querySelector('.btnActionEdit')
let btnActionProfile = document.querySelector('.btnActionProfile')
let btnActionDelete = document.querySelector('.btnActionDelete')
let formEdit = document.querySelector('.formEdit')
let searchName = document.querySelector('.searchName')
let forCities = document.querySelector('.forCities')
let forStatus = document.querySelector('.forStatus')
let modalInfo = document.querySelector('.modalInfo')
let formInfo = document.querySelector('.formInfo')
let imgInfo = document.querySelector('.imgInfo')
let nameInfo = document.querySelector('.nameInfo')
let emailInfo = document.querySelector('.emailInfo')
let wrong = document.querySelector('.wrong')
let cityInfo = document.querySelector('.cityInfo')
let statusInfo = document.querySelector('.statusInfo')
let phoneInfo = document.querySelector('.phoneInfo')
let btnDeleteInfo = document.querySelector('.btnDeleteInfo')
let btnActionDeleteInfo = document.querySelector('.btnActionDeleteInfo')
let btnActionEditInfo = document.querySelector('.btnActionEditInfo')
let btnEditInfo = document.querySelector('.btnEditInfo')
let formEditInfo = document.querySelector('.formEditInfo')
let paragraf = document.querySelector('.paragraf')
let statusUser = document.querySelector('.statusUser')

let filterCities = []

async function getData() {
    try {
        let response = await fetch(API)
        let data = await response.json()
        get(data)
        filterCities = data.map((elem) => elem.adress)
        getCities(filterCities)
    } catch (error) {
        console.log(error)
    }
}
getData()

function getCities(data) {
    forCities.innerHTML = `<option value="">All</option>` + data.map((elem) => {
        return `<option value="${elem}">${elem}</option>`
    })
}

function get(data) {
    mainTable.innerHTML = data.map((elem) => {
        return `
        <tr>
            <td style="display: flex; align-items: center; gap: 10px;">
                <img src="${elem.avatar}" style="width: 50px; height: 50px; border-radius: 50%;">
                <div>
                    <div>${elem.name}</div>
                    <div>${elem.email}</div>
                </div>
            </td>
            <td>${elem.adress}</td>
            <td>
                ${elem.status
                ? '<button class="btnStatusActive">Active</button>'
                : '<button class="btnStatusInctive">Inactive</button>'
            }
            </td>
            <td>${elem.phone}</td>
            <td class="dot" onclick="openActionModal(${elem.id})">. . .</td>
        </tr>
        `
    }).join('')
}

// add
btnUser.onclick = () => {
    modalAdd.showModal()
}
btnCancelAdd.onclick = () => {
    modalAdd.close()
    formAdd.reset()
}

formAdd.onsubmit = (e) => {
    e.preventDefault()

    let newUser = {
        avatar: formAdd['img'].value,
        name: formAdd['name'].value,
        email: formAdd['email'].value,
        status: formAdd['selectStatus'].value == 'active',
        adress: formAdd['SelectCities'].value,
        phone: formAdd['phone'].value,
    }
    addUser(newUser)
}

async function addUser(newUser) {
    try {
        await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        getData()
        formAdd.reset()
        modalAdd.close()
    } catch (error) {
        console.log(error)
    }
}


// edit
let idx = null

function openActionModal(id) {
    modalAction.showModal()
    idx = id
}

btnActionEdit.onclick = () => {
    modalEdit.showModal()
    modalAction.close()
    showModalEdit(idx)
}

btnCancelEdit.onclick = () => {
    modalEdit.close()
}

async function showModalEdit(id) {
    try {
        let response = await fetch(`${API}/${id}`)
        let data = await response.json()
        formEdit['img'].value = data.avatar
        formEdit['name'].value = data.name
        formEdit['email'].value = data.email
        formEdit['selectStatus'].value = data.status ? 'active' : 'inactive'
        formEdit['SelectCities'].value = data.adress
        formEdit['phone'].value = data.phone
    } catch (error) {
        console.log(error)
    }
}

formEdit.onsubmit = (e) => {
    e.preventDefault()

    let editedUser = {
        avatar: formEdit['img'].value,
        name: formEdit['name'].value,
        email: formEdit['email'].value,
        status: formEdit['selectStatus'].value == 'active',
        adress: formEdit['SelectCities'].value,
        phone: formEdit['phone'].value,
    }
    editUser(idx, editedUser)
}

async function editUser(id, editedUser) {
    try {
        await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedUser)
        })
        modalEdit.close()
        getData()
    } catch (error) {
        console.log(error)
    }
}

// delete
btnActionDelete.onclick = () => {
    deleteUser(idx)
}

async function deleteUser(id) {
    try {
        await fetch(`${API}/${id}`, {
            method: 'DELETE'
        })
        modalAction.close()
        getData()
    } catch (error) {
        console.log(error)
    }
}

// search
searchName.oninput = async () => {
    try {
        let response = await fetch(`${API}?name=${searchName.value}`)
        let data = await response.json()
        get(data)
    } catch (error) {
        console.log(error);

    }
}

// status
forStatus.onclick = async () => {
    try {
        let response = await fetch(`${API}?status=${forStatus.value == 'all' ? "" : forStatus.value == 'active' ? true : false}`)
        let data = await response.json()
        get(data)
    } catch (error) {
        console.log(error);

    }
}


// choce city
forCities.onclick = async () => {
    try {
        let response = await fetch(`${API}?adress=${forCities.value}`)
        let data = await response.json()
        get(data)
    } catch (error) {
        console.log(error);

    }
}

// information
wrong.onclick = () => {
    modalInfo.close()
}

btnActionProfile.onclick = () => {
    infoUser(idx)
    modalInfo.showModal()
    modalAction.close()
}


async function infoUser(id) {
    try {
        let response = await fetch(`${API}/${id}`)
        let data = await response.json()
        imgInfo.src = data.avatar 
        nameInfo.innerHTML = data.name
        emailInfo.innerHTML = data.email
        cityInfo.innerHTML = data.adress
        cityInfo.classList.add('city')
        statusInfo.innerHTML = `${data.status ? '<button class="active">active</button>' : '<button class="inactive">inactive</button>'}`
        phoneInfo.innerHTML = `${data.phone}`
        getData()
    } catch (error) {
        console.log(error);

    }
}

// deleteInfo
btnActionDeleteInfo.onclick = () => {
    deleteUser(idx)
}

async function deleteUser(id) {
    try {
        await fetch(`${API}/${id}`, {
            method: 'DELETE'
        })
        getData()
        modalInfo.close()
    } catch (error) {
        console.log(error)
    }
}

// editInfo
async function showModalEdit(id) {
    try {
        let response = await fetch(`${API}/${id}`)
        let data = await response.json()
        formEdit['img'].value = data.avatar
        formEdit['name'].value = data.name
        formEdit['email'].value = data.email
        formEdit['selectStatus'].value = data.status ? 'active' : 'inactive'
        formEdit['SelectCities'].value = data.adress
        formEdit['phone'].value = data.phone
        modalInfo.close()
    } catch (error) {
        console.log(error)
    }
}

btnActionEditInfo.onclick = () => {
    modalEdit.showModal()
    modalAction.close()
    showModalEdit(idx)
}

function openActionModal(id) {
    modalAction.showModal()
    idx = id
}

formEditInfo.onsubmit = (e) => {
    e.preventDefault()

    let editedUser = {
        avatar: formEdit['img'].value,
        name: formEdit['name'].value,
        email: formEdit['email'].value,
        status: formEdit['selectStatus'].value == 'active',
        adress: formEdit['SelectCities'].value,
        phone: formEdit['phone'].value,
    }
    editUser(idx, editedUser)
}

async function editUser(id, editedUser) {
    try {
        await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedUser)
        })
        modalEdit.close()
        getData()
    } catch (error) {
        console.log(error)
    }
}


