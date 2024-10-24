var newMemberAddBtn = document.querySelector('.addMemberBtn'),
    darkBg = document.querySelector('.dark_bg'),
    popupForm = document.querySelector('.popup'),
    crossBtn = document.querySelector('.closeBtn'),
    submitBtn = document.querySelector('.submitBtn'),
    modalTitle = document.querySelector('.modalTitle'),
    popupFooter = document.querySelector('.popupFooter'),
    imgInput = document.querySelector('.img'),
    imgHolder = document.querySelector('.imgholder'),
    form = document.querySelector('form'),
    formInputFields = document.querySelectorAll('form input'),
    uploadimg = document.querySelector("#uploadimg"),
    fName = document.getElementById("fName"),
    lName = document.getElementById("lName"),
    age = document.getElementById("age"),
    city = document.getElementById("city"),
    position = document.getElementById("position"),
    salary = document.getElementById("salary"),
    sDate = document.getElementById("sDate"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    entries = document.querySelector(".showEntries"),
    tabSize = document.getElementById("table_size"),
    userInfo = document.querySelector(".userInfo"),
    table = document.querySelector("table"),
    filterData = document.getElementById("search"),
    sortOptions = document.getElementById("sortOptions");

let originalData = [];
let getData = [];
let sortedData = [];
let isEdit = false, editId;

var arrayLength = 0;
var tableSize = 10;
var startIndex = 1;
var endIndex = 0;
var currentIndex = 1;
var maxIndex = 0;

showInfo();

newMemberAddBtn.addEventListener('click', () => {
    isEdit = false;
    submitBtn.innerHTML = "Submit";
    modalTitle.innerHTML = "Fill the Form";
    popupFooter.style.display = "block";
    imgInput.src = "./img/pic1.png";
    darkBg.classList.add('active');
    popupForm.classList.add('active');
});

crossBtn.addEventListener('click', () => {
    darkBg.classList.remove('active');
    popupForm.classList.remove('active');
    form.reset();
});

uploadimg.onchange = function () {
    if (uploadimg.files[0].size < 1000000) {   // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function (e) {
            var imgUrl = e.target.result;
            imgInput.src = imgUrl;
        }

        fileReader.readAsDataURL(uploadimg.files[0]);
    } else {
        alert("This file is too large!");
    }
}

function preLoadCalculations() {
    array = getData;
    arrayLength = array.length;
    maxIndex = arrayLength / tableSize;

    if ((arrayLength % tableSize) > 0) {
        maxIndex++;
    }
}

function displayIndexBtn() {
    preLoadCalculations();

    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = "";
    pagination.innerHTML = '<button onclick="prev()" class="prev">Previous</button>';

    for (let i = 1; i <= maxIndex; i++) {
        pagination.innerHTML += '<button onclick= "paginationBtn(' + i + ')" index="' + i + '">' + i + '</button>';
    }

    pagination.innerHTML += '<button onclick="next()" class="next">Next</button>';
    highlightIndexBtn();
}

function highlightIndexBtn() {
    startIndex = ((currentIndex - 1) * tableSize) + 1;
    endIndex = (startIndex + tableSize) - 1;

    if (endIndex > arrayLength) {
        endIndex = arrayLength;
    }

    if (maxIndex >= 2) {
        var nextBtn = document.querySelector(".next");
        nextBtn.classList.add("act");
    }

    entries.textContent = `Showing ${startIndex} to ${endIndex} of ${arrayLength} entries`;

    var paginationBtns = document.querySelectorAll('.pagination button');
    paginationBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('index') === currentIndex.toString()) {
            btn.classList.add('active');
        }
    });

    showInfo();
}

function showInfo() {
    document.querySelectorAll(".employeeDetails").forEach(info => info.remove());

    var tab_start = startIndex - 1;
    var tab_end = endIndex;

    if (getData.length > 0) {
        for (var i = tab_start; i < tab_end; i++) {
            var staff = getData[i];

            if (staff) {
                let createElement = `<tr class = "employeeDetails">
                    <td>${i + 1}</td>
                    <td><img src="${staff.picture}" alt="" width="40" height="40"></td>
                    <td>${staff.fName + " " + staff.lName}</td>
                    <td>${staff.ageVal}</td>
                    <td>${staff.cityVal}</td>
                    <td>${staff.positionVal}</td>
                    <td>${staff.salaryVal}</td>
                    <td>${staff.sDateVal}</td>
                    <td>${staff.emailVal}</td>
                    <td>${staff.phoneVal}</td>
                    <td>
                        <button onclick="readInfo('${staff.picture}', '${staff.fName}', '${staff.lName}', '${staff.ageVal}', '${staff.cityVal}', '${staff.positionVal}', '${staff.salaryVal}', '${staff.sDateVal}', '${staff.emailVal}', '${staff.phoneVal}')"><i class="fa-regular fa-eye"></i></button>
                        <button onclick="editInfo('${i}', '${staff.picture}', '${staff.fName}', '${staff.lName}', '${staff.ageVal}', '${staff.cityVal}', '${staff.positionVal}', '${staff.salaryVal}', '${staff.sDateVal}', '${staff.emailVal}', '${staff.phoneVal}')"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button onclick="deleteInfo(${i})"><i class="fa-regular fa-trash-can"></i></button>
                    </td>
                </tr>`;

                userInfo.innerHTML += createElement;
                table.style.minWidth = "1400px";
            }
        }
    } else {
        userInfo.innerHTML = `<tr class="employeeDetails"><td class="empty" colspan="11" align="center">No data available in table</td></tr>`;
        table.style.minWidth = "1400px";
    }
}

function readInfo(pic, fname, lname, Age, City, Position, Salary, SDate, Email, Phone) {
    imgInput.src = pic;
    fName.value = fname;
    lName.value = lname;
    age.value = Age;
    city.value = City;
    position.value = Position;
    salary.value = Salary;
    sDate.value = SDate;
    email.value = Email;
    phone.value = Phone;

    darkBg.classList.add('active');
    popupForm.classList.add('active');
    popupFooter.style.display = "none";
    modalTitle.innerHTML = "Profile";
    formInputFields.forEach(input => {
        input.disabled = true;
    });

    imgHolder.style.pointerEvents = "none";
}

function editInfo(id, pic, fname, lname, Age, City, Position, Salary, SDate, Email, Phone) {
    isEdit = true;
    editId = id;

    imgInput.src = pic;
    fName.value = fname;
    lName.value = lname;
    age.value = Age;
    city.value = City;
    position.value = Position;
    salary.value = Salary;
    sDate.value = SDate;
    email.value = Email;
    phone.value = Phone;

    darkBg.classList.add('active');
    popupForm.classList.add('active');
    popupFooter.style.display = "block";
    modalTitle.innerHTML = "Update the Form";
    submitBtn.innerHTML = "Update";
    formInputFields.forEach(input => {
        input.disabled = false;
    });

    imgHolder.style.pointerEvents = "auto";
}

async function deleteInfo(index) {
    if (confirm("Are you sure want to delete?")) {
        const employeeId = originalData[index].id;

        // Gửi yêu cầu DELETE tới MockAPI
        await fetch(`https://67186355b910c6a6e02beb10.mockapi.io/employees/${employeeId}`, {
            method: 'DELETE'
        });

        // Xóa dữ liệu từ mảng local sau khi xóa thành công từ server
        originalData.splice(index, 1);

        // Update getData after deleting the record
        getData = [...originalData];

        preLoadCalculations();

        if (getData.length === 0) {
            currentIndex = 1;
            startIndex = 1;
            endIndex = 0;
        } else if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        showInfo();
        highlightIndexBtn();
        displayIndexBtn();

        var nextBtn = document.querySelector('.next');
        var prevBtn = document.querySelector('.prev');

        if (Math.floor(maxIndex) > currentIndex) {
            nextBtn.classList.add("act");
        } else {
            nextBtn.classList.remove("act");
        }

        if (currentIndex > 1) {
            prevBtn.classList.add("act");
        } else {
            prevBtn.classList.remove("act");
        }
    }
}

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (isEdit) {
        const updatedData = {
            fName: fName.value,
            lName: lName.value,
            ageVal: age.value,
            cityVal: city.value,
            positionVal: position.value,
            salaryVal: salary.value,
            sDateVal: sDate.value,
            emailVal: email.value,
            phoneVal: phone.value,
            picture: imgInput.src
        };

        // Gửi yêu cầu PUT tới MockAPI
        await fetch(`https://67186355b910c6a6e02beb10.mockapi.io/employees/${originalData[editId].id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData)
        });

        originalData[editId] = { ...originalData[editId], ...updatedData };

    } else {
        const newEmployee = {
            fName: fName.value,
            lName: lName.value,
            ageVal: age.value,
            cityVal: city.value,
            positionVal: position.value,
            salaryVal: salary.value,
            sDateVal: sDate.value,
            emailVal: email.value,
            phoneVal: phone.value,
            picture: imgInput.src
        };

        // Gửi yêu cầu POST tới MockAPI
        await fetch('https://67186355b910c6a6e02beb10.mockapi.io/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEmployee)
        });

        originalData.push(newEmployee);
    }

    darkBg.classList.remove('active');
    popupForm.classList.remove('active');
    form.reset();

    getData = [...originalData]; // Đảm bảo getData khớp với originalData
    preLoadCalculations();
    currentIndex = 1; // Đặt lại chỉ số trang
    displayIndexBtn();
    showInfo();
});

// Hàm phân trang
function paginationBtn(index) {
    currentIndex = index;
    startIndex = ((currentIndex - 1) * tableSize) + 1;
    endIndex = startIndex + tableSize - 1;

    highlightIndexBtn();
}

function prev() {
    if (currentIndex > 1) {
        currentIndex--;
        highlightIndexBtn();
    }
}

function next() {
    if (currentIndex < maxIndex) {
        currentIndex++;
        highlightIndexBtn();
    }
}

// Chức năng tìm kiếm
filterData.addEventListener("input", () => {
    const searchTerm = filterData.value.toLowerCase().trim();

    if (searchTerm !== "") {
        const filteredData = originalData.filter((item) => {
            const fullName = (item.fName + " " + item.lName).toLowerCase();
            const city = item.cityVal.toLowerCase();
            const position = item.positionVal.toLowerCase();

            return (
                fullName.includes(searchTerm) ||
                city.includes(searchTerm) ||
                position.includes(searchTerm)
            );
        });

        getData = filteredData; // Cập nhật getData với dữ liệu tìm kiếm
    } else {
        getData = [...originalData]; // Trả về dữ liệu gốc nếu không có từ khóa tìm kiếm
    }

    currentIndex = 1; // Đặt lại chỉ số trang
    displayIndexBtn(); // Cập nhật phân trang
    showInfo(); // Hiển thị thông tin
});


// Hàm sắp xếp
let currentSortColumn = null; // Cột hiện tại đang được sắp xếp
let currentSortOrder = 'asc'; // Thứ tự sắp xếp hiện tại ('asc' hoặc 'desc')

function sortTable(columnName) {
    // Nếu cột hiện tại đã được sắp xếp, đảo thứ tự
    if (currentSortColumn === columnName) {
        currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc'; // Đổi thứ tự
    } else {
        currentSortOrder = 'asc'; // Mặc định là sắp xếp tăng dần
        currentSortColumn = columnName; // Cập nhật cột đang sắp xếp
    }

    // Sắp xếp dữ liệu
    getData.sort((a, b) => {
        let valA, valB;

        // Lấy giá trị tùy thuộc vào cột
        if (columnName === 'name') {
            valA = a.fName + ' ' + a.lName; // Tên đầy đủ
            valB = b.fName + ' ' + b.lName;
        } else if (columnName === 'age') {
            valA = a.ageVal; // Tuổi
            valB = b.ageVal;
        } else if (columnName === 'salary') {
            valA = parseFloat(a.salaryVal); // Lương
            valB = parseFloat(b.salaryVal);
        } else if (columnName === 'city') {
            valA = a.cityVal.toLowerCase(); // Thành phố (chuyển về lowercase để so sánh đúng)
            valB = b.cityVal.toLowerCase();
        } else if (columnName === 'position') {
            valA = a.positionVal.toLowerCase(); // Vị trí
            valB = b.positionVal.toLowerCase();
        } else if (columnName === 'email') {
            valA = a.emailVal.toLowerCase(); // Email
            valB = b.emailVal.toLowerCase();
        } else if (columnName === 'startDate') {
            valA = new Date(a.sDateVal); // Ngày bắt đầu
            valB = new Date(b.sDateVal);
        } else if (columnName === 'phone') {
            valA = a.phoneVal; // Số điện thoại
            valB = b.phoneVal;
        }

        // So sánh theo thứ tự
        if (currentSortOrder === 'asc') {
            return valA > valB ? 1 : -1; // Sắp xếp tăng dần
        } else {
            return valA < valB ? 1 : -1; // Sắp xếp giảm dần
        }
    });

    showInfo(); // Cập nhật hiển thị bảng sau khi sắp xếp
}

const tableHeaders = document.querySelectorAll("table thead th");
tableHeaders.forEach(header => {
    if (header.innerText === "Full Name") {
        header.addEventListener("click", () => sortTable('name'));
    } else if (header.innerText === "Age") {
        header.addEventListener("click", () => sortTable('age')); 
    } else if (header.innerText === "Salary") {
        header.addEventListener("click", () => sortTable('salary')); 
    } else if (header.innerText === "City") {
        header.addEventListener("click", () => sortTable('city')); 
    } else if (header.innerText === "Position") {
        header.addEventListener("click", () => sortTable('position')); 
    } else if (header.innerText === "Email") {
        header.addEventListener("click", () => sortTable('email')); 
    } else if (header.innerText === "Start Date") {
        header.addEventListener("click", () => sortTable('startDate')); 
    }
});
//--------------------------------------------------//
// Hàm lấy dữ liệu từ MockAPI
async function fetchData() {
    const response = await fetch('https://67186355b910c6a6e02beb10.mockapi.io/employees');
    originalData = await response.json();
    getData = [...originalData]; // Khởi tạo getData với dữ liệu ban đầu
    preLoadCalculations();
    displayIndexBtn();
    showInfo();
}

fetchData();
