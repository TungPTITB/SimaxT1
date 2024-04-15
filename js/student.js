$(document).ready(function () {
  $('.btn-hidden').click(function(){
    $('.col-xd-3').toggle();
    if ($('.col-xd-3').is(":visible")) {
      $('.col-xd-3').css("position", "absolute");
    } else {
      $('.col-xd-3').css("position", "relative");
    }
  });
  $(".close-choose").hide();
  $(".select-delete").hide();
  $(".choose-delete").hide();
  $(".but-chooseall").hide();
    $(".deleteall").hide();
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
    let aclass = $("#aclass").val();
    let certificate = $('input[name="certificate"]:checked')
      .map(function () {
        return $(this).val();
      })
      .get();
    let gender = $('input[name="gender"]:checked').val();
    let tmp = 1;

    if (/^<.+>/.test(fullname) || /^<.+>/.test(code) || /^<.+>/.test(year) || /^<.+>/.test(address) || /^<.+>/.test(phone)) {
      // Xử lý giá trị nhập vào là thẻ HTML
      alert("Không được nhập thẻ HTML!");
      tmp = 0;;
    }

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

    let student = localStorage.getItem("student")
    ? JSON.parse(localStorage.getItem("student"))
    : [];
    let x = 1;
    for ( let i = 0; i < student.length; i++) {
      if(code == student[i].code){
        alert("Bị trùng mã sinh viên. Vui lòng nhập lại!");
        x=0;
        break;
      }
      if(phone == student[i].phone){
        alert("Bị trùng số điện thoại.  Vui lòng nhập lại!");
        x=0;
        break;
      }
     }

    if (fullname && phone && code && tmp && x) {
      let student = localStorage.getItem("student")
        ? JSON.parse(localStorage.getItem("student"))
        : [];
      student.push({
        fullname: fullname,
        birthday: birthday,
        gender: gender,
        code: code,
        aclass: aclass,
        phone: phone,
        address: address,
        majornames: majornames,
        year: year,
        certificate: certificate,
      });

      localStorage.setItem("student", JSON.stringify(student));
      location.reload();
    }
  });

  $("#add").click( function() { //Click button Thêm
      $("#form-student").toggle();
      // Update overlay position based on form visibility
      if ($("#form-student").is(":visible")) {
        $('#overlay').css("position", "fixed")
      } else {
        $('#overlay').css("position", "relative");
      }

  // Hide update student form (optional)
     $("#form-updatestudent").hide();
    });
    $(document).on('dblclick', function(event) {
      if ($("#form-student").is(":visible") && !$(event.target).closest('#form-student').length) {
        console.log("ok");
        $("#form-student").hide();
        $('#overlay').css("position", "relative"); // Reset overlay position
      }
    });
  

  $(".home").click(function () { // Click button Trang chủ
    location.reload();
  });
  $(".cancel").click(function () { // Click button Hủy
    $('.form-student').hide();
    $('.form-updatestudent').hide();
    $('#overlay').css("position", "relative");

  });

  $("#search").click(function(){ // Click button Search
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
    let studentSearch = students.filter(student => student.fullname.toLowerCase().includes(info.toLowerCase()) || student.code.toLowerCase().includes(info.toLowerCase()) || student.address.toLowerCase().includes(info.toLowerCase()) || student.phone == info || student.birthday == info || student.year == info);
    if(studentSearch==""){
      location.reload();
    }
    localStorage.setItem("studentSearch", JSON.stringify(studentSearch));
    renderListStudentSearch();
  });

  $(".but-choose").click(function(){ 
    $(".select-delete").show();
    $(".choose-delete").show();
    $(".but-chooseall").show();
    $(".deleteall").show();
    $(".but-choose").hide();
    $(".close-choose").show();
  });
  $(".close-choose").click(function(){ 
    $(".select-delete").hide();
    $(".choose-delete").hide();
    $(".but-chooseall").hide();
    $(".deleteall").hide();
    $(".but-choose").show();
    $(".close-choose").hide();
  });

  let a=0;
  $(".but-chooseall").click(function(){ // Chọn tất cả
    a++;
    if(a%2!==0){
      $(".choose-delete-one").prop("checked", true);
    }else{
      $(".choose-delete-one").prop("checked", false);
    }    
  });

  $(".deleteall").click(function() { // Xóa tất cả
    let student = localStorage.getItem("student")
      ? JSON.parse(localStorage.getItem("student"))
      : [];
      // Duyệt qua tất cả các checkbox
      let studentDeletes = $('.choose-delete-one:checked')
      .map(function () {
        return $(this).val();
      })
      .get();
      if(studentDeletes.length != 0){
        if (confirm("Bạn có chắc chắn muốn xóa đối tượng này ?")) {
          let x;
          for ( let i = 0; i < studentDeletes.length; i++) {
            for ( let j = 0; j < student.length; j++) {
              if(studentDeletes[i] == student[j].phone){
                student.splice(j, 1);
                break;
              }
          }
         }
        localStorage.setItem("student", JSON.stringify(student));
        location.reload();
        } 
      }else{
        alert("Vui lòng chọn đối tượng !!!");
      }
  });

  $(".majorfilter").change(function(){ // Theo theo chuyên ngành

    let students = localStorage.getItem("student") ? JSON.parse(localStorage.getItem("student")) : [];
    let major = $(this).val();
    let studentSearch = students.filter(student => student.majornames == major);
    if(studentSearch ==""){
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
  <th class="select-delete">Chọn</th>
  <th>STT</th>
  <th>Họ và tên</th>
  <th>Mã sinh viên</th>
  <th>Lớp</th>
  <th>Ngày sinh</th>
  <th>Số điện thoại</th>
  <th>Ngành</th>
  <th>Năm học</th>
  <th>Giới tính</th>
  <th>Quê quán</th>
  <th>Chứng chỉ</th>
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

    let certificateLabel = stu.certificate;
    certificateLabel.forEach(funSwitch);
    function funSwitch(item, index, arr) {
      if (arr[index] == "aptis") arr[index] = " Aptis";
      if (arr[index] == "ielts") arr[index] = " Ielts";
      if (arr[index] == "toeic") arr[index] = " Toeic";
    }
    index++;

    tableContent += `<tr>
          <td class="choose-delete"><input class="choose-delete-one" type="checkbox" value="${stu.phone}"></td>
          <td>${index}</td>
          <td>${stu.fullname}</td>
          <td>${stu.code}</td>
          <td>${stu.aclass}</td>
          <td>${stu.birthday}</td>
          <td>${stu.phone}</td>
          <td>${majorLabel}</td>
          <td>${stu.year}</td>
          <td>${genderLabel}</td>
          <td>${stu.address}</td>
          <td>${certificateLabel}</td>
          <td><button class="edit" onclick="updateStudent('${stu.phone}')" ><i class="fa-solid fa-pen-to-square" title="Sửa"></i> </button>  <button class="delete" onclick="deleteStudent('${stu.phone}')" ><i class="fa-solid fa-trash" title="Xóa"></i></button></td>
      </tr>`;
  });

  $(".table-student").html(tableContent);
  $(".select-delete").hide();
  $(".choose-delete").hide();
}

function deleteStudent( studentId) { //Xóa student ra khỏi mảng
  let student = localStorage.getItem("student")
    ? JSON.parse(localStorage.getItem("student"))
    : [];
    let x=-1;
    for ( let i = 0; i < student.length; i++) {
      if(studentId == student[i].phone){
        x=i;
        break;
      }
    }
  if (x!=-1 && confirm("Bạn có muốn xóa " + student[x].fullname +" - " + student[x].code+" không?")) {
    student.splice(x, 1);
    localStorage.setItem("student", JSON.stringify(student));
    if(x==0){
      location.reload();
    }else{
      renderListStudent();
    }
  } 
}

function updateStudent(studentId) { //Cập nhật student
  $(".form-student").hide();
  if ($("#form-updatestudent").is(":visible")) {
    $('#overlay').css("position", "relative");
  } else {
    $('#overlay').css("position", "fixed");
  }
  let student = localStorage.getItem("student")
    ? JSON.parse(localStorage.getItem("student"))
    : [];
  let studentToUpdate = student.find((student) => student.phone == studentId); // Lấy student dựa trên số điện thoại
  console.log(studentToUpdate);

  $("#form-updatestudent").toggle();

  $("#fullnameu").val(studentToUpdate.fullname); // Hiển thị thông tin đã có sẵn
  $("#codeu").val(studentToUpdate.code);
  $("#birthdayu").val(studentToUpdate.birthday);
  $("#phoneu").val(studentToUpdate.phone);
  $("#addressu").val(studentToUpdate.address);
  $("#majornamesu").val(studentToUpdate.majornames);
  $("#genderu").val(studentToUpdate.gender);
  $("#aclassu").val(studentToUpdate.aclass);
  var certificates = studentToUpdate.certificate; // Lấy giá trị của studentToUpdate.certificate

  $('.certificatesu input[name="certificateu"]').each(function () {
    var checkboxValue = $(this).val();
    if (certificates.includes(checkboxValue)) {
      $(this).prop("checked", true);
    }
  });
  var selectedcertificates = [];
  $('.certificatesu input[name="certificateu"]:checked').each(function () {
    selectedcertificates.push($(this).val());
  });

  studentToUpdate.certificate = selectedcertificates;

  $("#update").click(function () { // Kiểm tra thông tin update (validate)
    let fullname = $("#fullnameu").val();
    let phone = $("#phoneu").val();
    let code = $("#codeu").val();
    let birthday = $("#birthdayu").val();
    let address = $("#addressu").val();
    let majornames = $("#major-namesu").val();
    let year = $("#yearu").val();
    let aclass = $("#aclassu").val();
    let certificate = $('input[name="certificateu"]:checked')
      .map(function () {
        return $(this).val();
      })
      .get();
    let gender = $('input[name="genderu"]:checked').val();
    let tmpp = 1;

    if (/^<.+>/.test(fullname) || /^<.+>/.test(code) || /^<.+>/.test(year) || /^<.+>/.test(address) || /^<.+>/.test(phone)) {
      // Xử lý giá trị nhập vào là thẻ HTML
      alert("Không được nhập thẻ HTML!");
      tmpp = 0;;
    }

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
    let students = localStorage.getItem("student")
    ? JSON.parse(localStorage.getItem("student"))
    : [];
    let x=-1;
    let y=-1;
    for(let i=0; i<students.length ; i++){
      if(code==students[i].code){
        x=i;
        break;
      }
    }
    for(let i=0; i<students.length ; i++){
      if(phone==students[i].phone){
        y=i; 
        break;
      }
    }
    let tmp=0;
    if(x==-1 && y==-1){
      tmp=1;
    }else if(x==y){
      tmp=1;
    }else if(x==-1 && phone==students[y].phone){
      tmp=1;
    }else if(y==-1 && code==students[x].code){
      tmp=1;
    }else{
      alert('Trùng thông tin!!!');
      tmp=0;
    }

    if (fullname && phone && code && tmp && tmpp) { // Nếu thỏa mãn, lấy thông tin
      studentToUpdate.fullname = fullname;
      studentToUpdate.birthday = birthday;
      studentToUpdate.gender = gender;
      studentToUpdate.code = code;
      studentToUpdate.aclass = aclass;
      studentToUpdate.phone = phone;
      studentToUpdate.address = address;
      studentToUpdate.majornames = majornames;
      studentToUpdate.year = year;
      studentToUpdate.certificate = certificate;

      localStorage.setItem("student", JSON.stringify(student));
      renderListStudent();
      location.reload();
    }
  });
}

function renderListStudentSearch() { // Hàm tìm kiếm
  let studentSearch = localStorage.getItem("studentSearch")
    ? JSON.parse(localStorage.getItem("studentSearch"))
    : [];

  if (studentSearch.length == 0) {
    return false;
  }

  let tableContent = `<tr>
      <th class="select-delete">Chọn</th>
      <th>STT</th>
      <th>Họ và tên</th>
      <th>Mã sinh viên</th>
      <th>Lớp</th>
      <th>Ngày sinh</th>
      <th>Số điện thoại</th>
      <th>Ngành</th>
      <th>Năm học</th>
      <th>Giới tính</th>
      <th>Quê quán</th>
      <th>Chứng chỉ</th>
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

    let certificateLabel = stu.certificate;
    certificateLabel.forEach(funSwitch);
    function funSwitch(item, index, arr) {
      if (arr[index] == "aptis") arr[index] = " Aptis";
      if (arr[index] == "ielts") arr[index] = " Ielts";
      if (arr[index] == "toeic") arr[index] = " Toeic";
    }

    index++;

    tableContent += `<tr>
          <td class="choose-delete"><input class="choose-delete-one" type="checkbox" value="${stu.phone}"></td>
          <td>${index}</td>
          <td>${stu.fullname}</td>
          <td>${stu.code}</td>
          <td>${stu.aclass}</td>
          <td>${stu.birthday}</td>
          <td>${stu.phone}</td>
          <td>${majorLabel}</td>
          <td>${stu.year}</td>
          <td>${genderLabel}</td>
          <td>${stu.address}</td>
          <td>${certificateLabel}</td>
          <td><button class="edit" onclick="updateStudent('${stu.phone}')" ><i class="fa-solid fa-pen-to-square" title="Sửa"></i></button>  <button class="delete" onclick="deleteStudent('${stu.phone}')" ><i class="fa-solid fa-trash" title="Xóa"></i></button></td>
      </tr>`;
  });

  $(".table-student").html(tableContent);
  $(".select-delete").hide();
  $(".choose-delete").hide();
}
