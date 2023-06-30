let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ? 
     JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

//Template literal ES6 features
const createInnerHtml = () => {
    const headerHtml = "<th>Profile Pic</th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Note</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    if (empPayrollList.length==0) return;
    for (const empPayrollData of empPayrollList) {
      innerHtml = `${innerHtml}
      <tr>
        <td><img class="profile" alt="" src="${empPayrollData._profilePic}" style="border-radius: 50%; height: 50px; width: 50px;"></td>
        <td>${empPayrollData._name}</td>
        <td>${empPayrollData._gender}</td>
        <td>${getDeptHtml(empPayrollData._department)}</td>
        <td>${empPayrollData._salary}</td>
        <td>${(empPayrollData._startDate)}</td>
        <td>${(empPayrollData._note)}</td>
        <td>
            <img id="${empPayrollData._id}" onclick="remove(this)" alt="delete" src="../assets/deleteIcon.png">
            <img id="${empPayrollData._id}" onclick="update(this)" alt="edit" src="../assets/edit.png">
        </td>
      </tr>`;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

// To delete any data from the table
const remove = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData._id == node._id);
    if (!empPayrollData) return;
    const index = empPayrollList.map(empData => empData._id).indexOf(empPayrollData._id);
    empPayrollList.splice(index,1);
    localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
    createInnerHtml();
}