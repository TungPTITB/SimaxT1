$(document).ready(function () {
  $(".error").hide();
  $("#form-student").hide();
  $("#form-updatestudent").hide();
  $("#save").click(function () {
    let fullname = $("#fullname").val();
    let phone = $("#phone").val();
    let code = $("#code").val();
    let birthday = $("#birthday").val();
    let address = $("#address").val();
    let majornames = $("#major-names").val();
    let year = $("#year").val();
    let vehicle = $('input[name="vehicle"]:checked')
      .map(function () {
        return $(this).val();
      })
      .get();
    let gender = $('input[name="gender"]:checked').val();

    if (fullname.trim().length == 0) {
      fullname = "";
      $("#fullnamee").show();
    } else if (fullname.trim().length <= 6) {
      fullname = "";
      $("#fullnamee").text("Tối thiểu 6 ký tự").show();
    } else {
      $("#fullnamee").hide();
    }

    if (phone.trim().length < 9 || phone.trim().length > 10) {
      phone = "";
      $("#phonee").show();
    } else {
      $("#phonee").hide();
    }

    if (code.trim().length == 0) {
      code = "";
      $("#codee").show();
    } else if (code.trim().length != 10) {
      code = "";
      $("#codee").text("Phải đủ 10 ký tự").show();
    } else {
      $("#codee").hide();
    }

    if (fullname && phone && code) {
      let student = localStorage.getItem("student")
        ? JSON.parse(localStorage.getItem("student"))
        : [];
      student.push({
        fullname: fullname,
        birthday: birthday,
        gender: gender,
        code: code,
        phone: phone,
        address: address,
        majornames: majornames,
        year: year,
        vehicle: vehicle,
      });

      localStorage.setItem("student", JSON.stringify(student));
      location.reload();
    }
  });

  $("#add").click(function () { // Click button Thêm
    $("#form-student").show();
    $(".index").hide();
  });

  $(".home").click(function () { // Click button Thêm
    location.reload();
  });

  $("#search").click(function(){ // Click button Update
    let info = $('#info').val();
    let infoo = info.toLowerCase();
    if(infoo == "công nghệ thông tin"){
      info = "cntt";
    }if(infoo == "tài chính"){
      info = "tc";
    }if(infoo == "điện tử viễn thông"){
      info = "cntt";
    }if(infoo == "công nghệ thông tin"){
      info = "cntt";
    }
    let students = localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")) : [];
    let studentSearch = students.filter(student => student.fullname == info || student.code == info || student.phone == info || student.year == info || student.address == info || student.majornames == info || student.birthday == info);
    if(studentSearch==""){
      location.reload();
    }
    localStorage.setItem("studentSearch", JSON.stringify(studentSearch));
    renderListStudentSearch();
  });
});

function renderListStudent() {
  let student = localStorage.getItem("student")
    ? JSON.parse(localStorage.getItem("student"))
    : [];

  if (student.length == 0) {
    return false;
  }

  let tableContent = `<tr>
  <th>STT</th>
  <th>Họ và tên</th>
  <th>Mã sinh viên</th>
  <th>Ngày sinh</th>
  <th>Số điện thoại</th>
  <th>Ngành</th>
  <th>Năm học</th>
  <th>Giới tính</th>
  <th>Quê quán</th>
  <th>Phương tiện</th>
  <th></th>
  </tr>`;

  student.forEach((stu, index) => {
    let genderLabel = stu.gender == 1 ? "Nam" : "Nữ";

    let majorLabel = stu.majornames;
    if (majorLabel == "cntt") {
      majorLabel = "Công nghệ thông tin";
    } else if (majorLabel == "kt") {
      majorLabel = "Kế toán";
    } else if (majorLabel == "dtvt") {
      majorLabel = "Điện tử viễn thông";
    } else {
      majorLabel = "Tài chính";
    }

    let vehicleLabel = stu.vehicle;
    vehicleLabel.forEach(funSwitch);
    function funSwitch(item, index, arr) {
      if (arr[index] == "walk") arr[index] = "Đi bộ";
      if (arr[index] == "motor") arr[index] = "Xe máy";
      if (arr[index] == "bicycle") arr[index] = "Xe đạp";
      if (arr[index] == "car") arr[index] = "Ô tô";
    }
    index++;

    tableContent += `<tr>
          <td>${index}</td>
          <td>${stu.fullname}</td>
          <td>${stu.code}</td>
          <td>${stu.birthday}</td>
          <td>${stu.phone}</td>
          <td>${majorLabel}</td>
          <td>${stu.year}</td>
          <td>${genderLabel}</td>
          <td>${stu.address}</td>
          <td>${vehicleLabel}</td>
          <td><button class="edit" onclick="updateStudent(${stu.phone})" ><i class="fa-solid fa-pen-to-square"></i> Sửa</button> | <button class="delete" onclick="deleteStudent(${stu.phone})" ><i class="fa-solid fa-trash"></i> Xóa</button></td>
      </tr>`;
  });

  $(".table-student").html(tableContent);
}

function deleteStudent(studentId) { //Xóa student ra khỏi mảng
  if (confirm("Bạn có chắc chắn muốn xóa đối tượng này?")) {
    let student = localStorage.getItem("student")
    ? JSON.parse(localStorage.getItem("student"))
    : [];
    let x;
    for ( let i = 0; i < student.length; i++) {
      if(studentId == student[i].phone){
        console.log(i);
        x=i;
        break;
      }
     }
    student.splice(x, 1);
    localStorage.setItem("student", JSON.stringify(student));
    renderListStudent();
  } else {
  }
  
}

function updateStudent(studentId) { //Cập nhật student
  let student = localStorage.getItem("student")
    ? JSON.parse(localStorage.getItem("student"))
    : [];
  let studentToUpdate = student.find((student) => student.phone == studentId); // Lấy student dựa trên số điện thoại
  console.log(studentToUpdate);

  $(".form-updatestudent").show();
  $(".index").hide();
  $("#form-student").hide();

  $("#fullnameu").val(studentToUpdate.fullname); // Hiển thị thông tin đã có sẵn
  $("#codeu").val(studentToUpdate.code);
  $("#birthdayu").val(studentToUpdate.birthday);
  $("#phoneu").val(studentToUpdate.phone);
  $("#addressu").val(studentToUpdate.address);
  $("#majornamesu").val(studentToUpdate.majornames);
  $("#genderu").val(studentToUpdate.gender);
  var vehicles = studentToUpdate.vehicle; // Lấy giá trị của studentToUpdate.vehicle

  $('.vehiclesu input[name="vehicleu"]').each(function () {
    var checkboxValue = $(this).val();
    if (vehicles.includes(checkboxValue)) {
      $(this).prop("checked", true);
    }
  });
  var selectedVehicles = [];
  $('.vehiclesu input[name="vehicleu"]:checked').each(function () {
    selectedVehicles.push($(this).val());
  });

  studentToUpdate.vehicle = selectedVehicles;

  $("#update").click(function () { // Kiểm tra thông tin update (validate)
    let fullname = $("#fullnameu").val();
    let phone = $("#phoneu").val();
    let code = $("#codeu").val();
    let birthday = $("#birthdayu").val();
    let address = $("#addressu").val();
    let majornames = $("#major-namesu").val();
    let year = $("#yearu").val();
    let vehicle = $('input[name="vehicleu"]:checked')
      .map(function () {
        return $(this).val();
      })
      .get();
    let gender = $('input[name="genderu"]:checked').val();

    if (fullname.trim().length == 0) {
      fullname = "";
      $("#fullnameeu").show();
    } else if (fullname.trim().length <= 6) {
      fullname = "";
      $("#fullnameeu").text("Tối thiểu 6 ký tự").show();
    } else {
      $("#fullnameeu").hide();
    }

    if (phone.trim().length < 9 || phone.trim().length > 10) {
      phone = "";
      $("#phoneeu").show();
    } else {
      $("#phoneeu").hide();
    }

    if (code.trim().length == 0) {
      code = "";
      $("#codeeu").show();
    } else if (code.trim().length != 10) {
      code = "";
      $("#codeeu").text("Phải đủ 10 ký tự").show();
    } else {
      $("#codeeu").hide();
    }

    if (fullname && phone && code) { // Nếu thỏa mãn, lấy thông tin
      studentToUpdate.fullname = fullname;
      studentToUpdate.birthday = birthday;
      studentToUpdate.gender = gender;
      studentToUpdate.code = code;
      studentToUpdate.phone = phone;
      studentToUpdate.address = address;
      studentToUpdate.majornames = majornames;
      studentToUpdate.year = year;
      studentToUpdate.vehicle = vehicle;

      localStorage.setItem("student", JSON.stringify(student));
      renderListStudent();
      location.reload();
    }
  });
}

function renderListStudentSearch() {
  let studentSearch = localStorage.getItem("studentSearch")
    ? JSON.parse(localStorage.getItem("studentSearch"))
    : [];

  if (studentSearch.length == 0) {
    return false;
  }

  let tableContent = `<tr>
      <th>STT</th>
      <th>Họ và tên</th>
      <th>Mã sinh viên</th>
      <th>Ngày sinh</th>
      <th>Số điện thoại</th>
      <th>Ngành</th>
      <th>Năm học</th>
      <th>Giới tính</th>
      <th>Quê quán</th>
      <th>Phương tiện</th>
      <th></th>
      </tr>`;

    studentSearch.forEach((stu, index) => {
    let genderLabel = stu.gender == 1 ? "Nam" : "Nữ";

    let majorLabel = stu.majornames;
    if (majorLabel == "cntt") {
      majorLabel = "Công nghệ thông tin";
    } else if (majorLabel == "kt") {
      majorLabel = "Kế toán";
    } else if (majorLabel == "dtvt") {
      majorLabel = "Điện tử viễn thông";
    } else {
      majorLabel = "Tài chính";
    }

    let vehicleLabel = stu.vehicle;
    vehicleLabel.forEach(funSwitch);
    function funSwitch(item, index, arr) {
      if (arr[index] == "walk") arr[index] = "Đi bộ";
      if (arr[index] == "motor") arr[index] = "Xe máy";
      if (arr[index] == "bicycle") arr[index] = "Xe đạp";
      if (arr[index] == "car") arr[index] = "Ô tô";
    }

    index++;

    tableContent += `<tr>
          <td>${index}</td>
          <td>${stu.fullname}</td>
          <td>${stu.code}</td>
          <td>${stu.birthday}</td>
          <td>${stu.phone}</td>
          <td>${majorLabel}</td>
          <td>${stu.year}</td>
          <td>${genderLabel}</td>
          <td>${stu.address}</td>
          <td>${vehicleLabel}</td>
          <td><button class="edit" onclick="updateStudent(${stu.phone})" ><i class="fa-solid fa-pen-to-square"></i> Sửa</button> | <button class="delete" onclick="deleteStudent(${stu.phone})" ><i class="fa-solid fa-trash"></i> Xóa</button></td>
      </tr>`;
  });

  $(".table-student").html(tableContent);
}