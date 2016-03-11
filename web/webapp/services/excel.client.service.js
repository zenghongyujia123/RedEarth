/**
 * Created by zenghong on 16/1/20.
 */
/**
 * Created by Wayne on 15/12/7.
 */

'use strict';
angular.module('agilesales-web').factory('ExcelReaderService', function () {
  function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
  }

  var activeXReader = {
    getWorkSheet: function (element, sheetName, callback) {
      var fileObject = document.getElementById('filename');
      fileObject.select();
      fileObject.blur();

      var filePath = document.selection.createRange().text;
      var suffix = filePath.substring(filePath.lastIndexOf('.') + 1).toLowerCase();

      if (suffix !== 'xls' && suffix != 'xlsx') {
        return callback({type: 'file_type_error', message: '选择的文件不是Excel文件'});
      }

      var excel = new ActiveXObject('Excel.Application');
      var excel_file = excel.Workbooks.open(filePath);
      var excelSheet = excel.Worksheets(sheetName);

      console.log(excelSheet.UsedRange.Rows.Count);
      console.log(excelSheet.UsedRange.Columns.Count);

      return callback(null, excelSheet);
    },
    checkHeader: function (excelSheet, headers, callback) {
      if (!excelSheet) {
        return callback(false);
      }

      for (var column = 0; column < headers.length; column++) {
        if (excelSheet.Cells(1, column + 1).Value !== headers[column].value) {
          return callback(false);
        }
      }
      return callback(true);
    },
    isHeaderNameExist: function (excelSheet, headerColumn) {
      if (!excelSheet) {
        return false;
      }
      if (excelSheet.Cells(1, headerColumn.index + 1).Value !== headerColumn.value) {
        return false;
      }
      return true;
    },
    exportExcel: function (rows) {
      var workSheetName = "Sheet1";
      console.log('data:');
      var data = rows;
      console.log(data);
      if (isIE()) {
        var excel = new ActiveXObject('Excel.Application');
        var excel_book = excel.Workbooks.Add;
        var excel_sheet = excel_book.Worksheets(1);
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data[i].length; j++) {
            excel_sheet.Cells(i + 1, j + 1).Value = data[i][j];
          }
        }
        excel.Visible = true;
        excel.UserControl = true;
      }
      else {
        var wookBook = new Workbook();
        var wookSheet = sheet_from_array_of_arrays(data);

        /* add worksheet to workbook */
        wookBook.SheetNames.push(workSheetName);
        wookBook.Sheets[workSheetName] = wookSheet;

        var wbout = XLSX.write(wookBook, {bookType: 'xlsx', bookSST: false, type: 'binary'});
        saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), "Sheet1.xlsx");
      }
    },
    getSheetData: function (excelSheet, headers, callback) {
      var dataArray = [];
      var columnCount = excelSheet.UsedRange.Columns.Count;
      var data, hasValue;
      for (var row = 2; row < columnCount; row++) {
        data = {};
        hasValue = false;
        for (var column = 0; column < headers.length; column++) {
          if (excelSheet.Cells(row, column + 1).Value != undefined) {
            data[headers[column]] = excelSheet.Cells(row, column + 1).Value;
            hasValue = true;
          }
        }
        if (hasValue) {
          dataArray.push(data);
        }
      }
      //var jsonResultString = JSON.stringify(dataArray);

      if (dataArray.length === 0) {
        return callback({type: 'file_content_empty', message: '表格中没有数据'});
      }
      return callback(null, dataArray);
    }
  };

  var otherReader = {
    getWorkSheet: function (element, sheetName, callback) {
      var file = element.files[0];
      var suffix = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
      if (suffix !== 'xls' && suffix !== 'xlsx') {
        return callback({type: 'file_type_error', message: '选择的文件不是Excel文件'});
      }

      var reader = new FileReader();
      reader.onload = function (e) {
        var workbook;
        var isError = false;
        try {
          var binary = '';

          if (reader.readAsBinaryString) {
            binary = e.target.result;
          }
          else {
            var bytes = new Uint8Array(e.target.result);
            var length = bytes.byteLength;

            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
          }

          workbook = XLSX.read(binary, {type: 'binary'});
          if (workbook.SheetNames.length <= 0) {
            return callback({type: 'file_content_empty', message: '表格中没有数据'});
          }
        }
        catch (ex) {
          isError = true;
        }
        if (isError) {
          return callback({type: 'file_parse_error', message: 'Excel文件解析失败'});
        }
        return callback(null, workbook);
      };

      if (reader.readAsBinaryString) {
        reader.readAsBinaryString(file);
      }
      else {
        reader.readAsArrayBuffer(file);
      }
    },
    checkHeader: function (workbook, headers, sheetName, callback) {
      var excelSheet = workbook.Sheets[sheetName];
      if (!excelSheet) {
        return callback(false);
      }
      for (var index = 0; index < headers.length; index++) {
        var column = 'excelSheet.' + headers[index].key;

        if (eval(column)) {
          var columnName = column + '.v';
          if (eval(columnName) !== headers[index].value) {
            return callback(false);
          }
        }
        else {
          return callback(false);
        }
      }
      return callback(true);
    },
    isHeaderNameExist: function (workbook, headerColumn, sheetName) {
      var excelSheet = workbook.Sheets[0];
      if (!excelSheet) {
        return false;
      }
      var column = 'excelSheet.' + headerColumn.key;
      if (eval(column)) {
        var columnName = column + '.v';
        if (eval(columnName) === headerColumn.value) {
          return true;
        }
      }
      return false;
    },
    getSheetData: function (workbook, headers, sheetName, callback) {
      //目前只取第一个sheet的内容
      var xlsSheetArray = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
      //var jsonResultString = JSON.stringify(xlsSheetArray);

      if (!xlsSheetArray || xlsSheetArray.length <= 0) {
        return callback({type: 'file_content_empty', message: '表格中没有数据'});
      }
      return callback(null, xlsSheetArray);
    },
    exportExcel: function (rows) {
      var workSheetName = "Sheet1";
      console.log('data:');
      var data = rows;
      console.log(data);
      if (isIE()) {
        var excel = new ActiveXObject('Excel.Application');
        var excel_book = excel.Workbooks.Add;
        var excel_sheet = excel_book.Worksheets(1);
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < data[i].length; j++) {
            excel_sheet.Cells(i + 1, j + 1).Value = data[i][j];
          }
        }
        excel.Visible = true;
        excel.UserControl = true;
      }
      else {
        var wookBook = new Workbook();
        var wookSheet = sheet_from_array_of_arrays(data);

        /* add worksheet to workbook */
        wookBook.SheetNames.push(workSheetName);
        wookBook.Sheets[workSheetName] = wookSheet;

        var wbout = XLSX.write(wookBook, {bookType: 'xlsx', bookSST: false, type: 'binary'});
        saveAs(new Blob([s2ab(wbout)], {type: "application/octet-stream"}), "Sheet1.xlsx");
      }
    }
  };

  return {
    getReader: function () {
      if (typeof FileReader == 'undefined') {
        return activeXReader;
      }
      return otherReader;
    },
    splitArray: function (dataArray, splitSize) {
      var newArray = [];
      var i = 0;
      while (i < dataArray.length) {
        var sliceArray = dataArray.slice(i, i + splitSize);
        newArray.push(sliceArray);
        i = i + splitSize;
      }

      return newArray;
    }
  };

});