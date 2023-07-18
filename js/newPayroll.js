//UC2
let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    name.addEventListener('input',function(){
        if(name.value.length==0){
            setTextValue('.text-error',"");
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            setTextValue('.text-error',"");
        } catch(e) {
            setTextValue('.text-error',e);
        }
    });

    const date = document.querySelector('#date');
    date.addEventListener('input',function(){
        const startDate = new Date(Date.parse(getInputValueById('#day')+" "+
        getInputValueById('#month')+" "+getInputValueById('#year')));
        try {
            (new EmployeePayrollData()).startDate = startDate;
            setTextValue('.date-error',"");
        }catch (e) {
            setTextValue('.date-error',e);
        }
    });

    const salary = document.querySelector('#salary');
    setTextValue('.salary-output',salary.value);
    salary.addEventListener('input',function(){
        setTextValue('.salary-output',salary.value);
    });

    checkForUpdate();
});

const createEmployeePayroll = () =>{
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day') +" " + getInputValueById('#month')+" "+ getInputValueById('#year');
    employeePayrollData.startDate = date;
    alert(employeePayrollData.toString());
    return employeePayrollData;
}
const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item =>{
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

//new method
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

//old method only for demo
const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

const setEmployeePayrollData = (employeePayrollData) => {
    try{
        employeePayrollData.name = employeePayrollObj._name;
    }catch(e) {
        setTextValue('.text-error',e);
        throw e;
    }
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender = employeePayrollObj._gender;
    employeePayrollData.department = employeePayrollObj._department;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.note = employeePayrollObj._note;
    try{
        employeePayrollData.startDate = new Date(Date.parse(employeePayrollObj._startDate));
    }catch (e) {
        setTextValue('.date-error',e);
        throw e;
    }
    alert(employeePayrollData.toString());
}

const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID",empID);
    return empID;
}


const resetForm =()=>{
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2023');
}
const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked =false;
    });
}
const setTextValue=(id,value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

// define check for update method if update is available
const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if(!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

// define setForm method which is used to set the element to be updated in payroll form
const setForm = () => {
    setValue('#name',employeePayrollObj._name);
    setSelectedValues('[name=profile]',employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setSelectedValues('[name=department]',employeePayrollObj._department);
    setValue('#salary',employeePayrollObj._salary);
    setTextValue('.salary-output',employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._note);
    let date = (employeePayrollObj._startDate).split(" ");
    setValue('#day',day[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
}

// defining methods used in set form
const setSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked){
            selItems.push(item.value);
        }
    });
    return selItems;
}

// Modification of save function to weather it is update or new entry accordingly
const save=(event) =>{
    event.preventDefault();
    event.stopPropagation();
    try {
        setEmployeePayrollObject();
        createAndUpdateStoarge();
        resetForm();
        window.location.replace(siteProperties.home_Page);
    }catch (e) {
        return;
    }
}

// define setEmployeePayrollObject
const setEmployeePayrollObject = () => {
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('notes');
    let date = getInputValueById('#day')+" " + getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollObj._startDate = date;
}

function createAndUpdateStoarge() {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let empPayrollData = employeePayrollList.find(empData => empData._id == employeePayrollObj._id);
        if(!empPayrollData) {
            employeePayrollList.push(createEmployeePayrollData());
        }else {
            const index = employeePayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
            employeePayrollList.splice(index,1,createEmployeePayrollData(empPayrollData._id));
        }
    }else{
        employeePayrollList = [createEmployeePayrollData()];
    }
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

// To read from json Object and set to local storage
const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if(!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollObject(employeePayrollData);
    return employeePayrollData;
}

const redirect = () => {
    window.location.href = "../pages/addHomePage.html";
}