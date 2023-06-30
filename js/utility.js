const stringify = (date) => {
    const options = {day:'numeric', month:'short',year:'numeric'};
    const newDate = !date ? "undefined": new Date(Date.parse(date)).toLocaleDateString('en-GB',options);
    return newDate;
}

// To udate details of employee
const update = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData._id == node._id);
    if (!empPayrollData) return;
    localStorage.setItem('editEmp',JSON.stringify(empPayrollData));
    window.location.replace(siteProperties.addEmpPayroll);
}