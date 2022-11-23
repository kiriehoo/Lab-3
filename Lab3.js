function Disable(id) {
  if (id) {
    var element = document.getElementById(id);
    element.setAttribute("disabled", "true");
  }
}
function Endable(id) {
  if (id) {
    var element = document.getElementById(id);
    element.removeAttribute("disabled");
  }
}
var tableValues = [];
//headers - одномерный массив
//values - двумерный массив
function CreateTable(idTable, idContainer, headers, values) {
  var container = document.getElementById(idContainer);
  if (container) {
    var table = document.createElement("table");
    table.setAttribute("id", idTable);
    table.setAttribute("class", "table table-dark table-striped");
    var headerRow = document.createElement("tr");
    var headers = ["#"].concat(headers);
    for (var i = 0; i < headers.length; i++) {
      var th = document.createElement("th");
      th.setAttribute("scope", "col");
      th.innerHTML = headers[i];
      headerRow.appendChild(th);
    }
    var thead = document.createElement("thead");
    thead.appendChild(headerRow);
    table.appendChild(thead);
    var tbody = document.createElement("tbody");
    if (values.length > 0) {
      for (var i = 0; i < values.length; i++) {
        var row = document.createElement("tr");
        var subValues = [i + 1].concat(values[i]);
        subValues.forEach((element) => {
          var td = document.createElement("td");
          td.innerHTML = element;
          row.appendChild(td);
        });
        tbody.appendChild(row);
      }
    }
    table.appendChild(tbody);
    container.appendChild(table);
  } else {
    alert("Не найден контейнер для вставки таблицы!");
  }
}

function Create() {
  var idTable = "tableMain";
  var table = document.getElementById(idTable);
  if (!table) {
    CreateTable(idTable, "tableContiner", ["Значение"], tableValues);
    Endable("txbAdd");
    Endable("txbDelete");
    Endable("btnAdd");
    Endable("btnDelete");
  } else {
    alert("Таблица уже создана!");
  }
}
function Update() {
  var idTable = "tableMain";

  var table = document.getElementById(idTable);
  var tableContiner = document.getElementById("tableContiner");
  if (txbAdd && table && tableContiner) {
    tableContiner.innerHTML = "";
    CreateTable(idTable, "tableContiner", ["Значение"], tableValues);
  }
}
function Add() {
  var txbAdd = document.getElementById("txbAdd");
  if (txbAdd) {
    tableValues.push([txbAdd.value]);
    Update();
  }
}
function Delete() {
  var txbDelete = document.getElementById("txbDelete");
  if (txbDelete) {
    var index = parseInt(txbDelete.value);
    if (!Number.isInteger(index)) {
      alert("Номер строки должен быть числом!");
      return;
    }
    index--;
    if (index < 0 || index >= tableValues.length) {
      alert("Введен некорректный номер строки!");
      return;
    }
    tableValues.splice(index, 1);
    Update();
  }
}
window.onload = function () {
  Disable("txbAdd");
  Disable("txbDelete");
  Disable("btnAdd");
  Disable("btnDelete");
};
