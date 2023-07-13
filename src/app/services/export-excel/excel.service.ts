import { Injectable } from '@angular/core';
import * as fs from 'file-saver';
declare const ExcelJS: any;
import * as ExcelProper from "exceljs";
let workbook: ExcelProper.Workbook = new ExcelJS.Workbook();
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {


  constructor() {

  }

  generateExcel(header: any, subHeading: any, data: any, title: any, columnStyle = [], mergeCells:any = []) {

    //Create workbook and worksheet

    let worksheet = workbook.addWorksheet(title);

    //Add Row and formatting
    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Calibri', family: 4, size: 14, underline: false, bold: true }
    titleRow.alignment = { vertical: 'middle', horizontal: 'center' }
    titleRow.eachCell((cell: any, number: any) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'dce6f1' },
        bgColor: { argb: 'FFFFFFFF' }
      }
      cell.font = {
        color: { argb: 333333 },
        size: 16,
        bold: true
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    });
    worksheet.mergeCells('A1:D2');    

    if (subHeading && subHeading.type == "date_range") {
      let subTitleRow = worksheet.addRow([subHeading.data]);
      subTitleRow.font = { name: 'Calibri', family: 4, size: 10, underline: false, bold: false }
      subTitleRow.alignment = { vertical: 'middle', horizontal: 'center' }
      subTitleRow.eachCell((cell: any, number: any) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'dce6f1' },
          bgColor: { argb: 'FFFFFFFF' }
        }
        cell.font = {
          color: { argb: 333333 },
          size: 12,
          bold: false
        }
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      })

      worksheet.mergeCells('A3:D3');
    }

    //Blank Row 
    worksheet.addRow([]);

    //Add Header Row

    if(header && header.length>0){
      let headerRow = worksheet.addRow(header);

      // Cell Style : Fill and Border
      headerRow.eachCell((cell: any, number: any) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'd9d9d9' },
          bgColor: { argb: 'FFFFFFFF' }
        }
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      })
    }
 

    // Add Data and Conditional Formatting
    data.forEach((d: any, i: any) => {
      let row = worksheet.addRow(d);
      row.alignment = { vertical: 'middle', horizontal: 'left' }


      let isColumnStyle:any = columnStyle[i];
      let isRowBolder = false;      

      /* Cells styles */
      if(isColumnStyle && isColumnStyle.length>0){
        isColumnStyle.map((o:any)=>{

          let column:any = row.getCell(o.columnIndex);
          column.alignment = { vertical: 'middle', horizontal: 'left' }
          
          column.font = { 
            color: { argb: o.fontColor }, 
            underline: (o.underline) ? o.underline : false,
            bold: (o.bold) ? o.bold : false,
           }

           if(o.hAlign){
            column.alignment.horizontal = o.hAlign;
           }
           if( o.vAlign){
            column.alignment.vertical = o.vAlign;
           }



           if(o.fgColor){
            column.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: o.fgColor },
              bgColor: { argb: 'FFFFFFFF' }
            }
           }

           if(o.rowBorder){
             isRowBolder = o.rowBorder;
           }

           let iscellborder = false;
           let borderObj:any = {};
           if(o.cellTopBorder){
            iscellborder = true;
            borderObj = {...borderObj, ...{top: { style: 'thin' }}};
           }
           if(o.cellLeftBorder){
            iscellborder = true;
            borderObj = {...borderObj,...{left: { style: 'thin' }}};
           }
           if(o.cellBottomBorder){
            iscellborder = true;
            borderObj = {...borderObj,...{bottom: { style: 'thin' }}};
           }
           if(o.cellRightBorder){
            iscellborder = true;
            borderObj = {...borderObj,...{right: { style: 'thin' }}};
           }

           if(iscellborder){
            column.border = borderObj;
           }
        })
      }


      /* Merge cells */
      if(mergeCells[i] && mergeCells[i].length>0){
        mergeCells[i].map((cellRange:any)=>{
          worksheet.mergeCells(cellRange.range);
        })
      }


      if(isRowBolder){
        for(let j=1; j<=d.length;j++){
          let column = row.getCell(j);
          if(j != d.length){
            column.border = { top: { style: 'thin' }, bottom: { style: 'thin' } }
          } else {
            column.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
          }
          
        }
      }
    }
    );
    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 30;
    worksheet.addRow([]);



    worksheet.columns.forEach(function (column: any, i: any) {
      var maxLength = 0;
      column["eachCell"]({ includeEmpty: true }, function (cell: any) {
        var columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 12 : maxLength + 2;
    });


    // var filename = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    var filename = title.replace(/[^\w\u0621-\u064A\s]/gi, '_').toLowerCase();
    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, `${filename}.xlsx`);
    })


    setTimeout(() => {
      workbook.eachSheet(o=>{
        workbook.removeWorksheet(o.name);
      })
    }, 1000)

  }



  mapArrayToExcel(sheetName: string, headersArr: Array<any>, valueKey: Array<any>, valueDataType: Array<string>, dataList: Array<object>, subHeading: any = "") {

    let cellConfig: any = [];
    let xlDataObj: Array<any> = [];
    let columnStyle:any = [];
    let mergeCells:any = [];

    dataList.map((o: any, i: number) => {
    

      let rowData: Array<any> = [];
      let configData: Array<any> = [];
      let cellDataInternalType: string = (o.cellDataType)?o.cellDataType:"";

      valueKey.map((child: any, childIndex: number) => {
      

        let cellDataTypeStr: string =  (cellDataInternalType)?cellDataInternalType[childIndex+1]:valueDataType[childIndex];
        
        let value: any = '';

        if (cellDataTypeStr == 'string') {
          value = o[child];
        }

        if (cellDataTypeStr == 'date') {
          value = o[child];
          value = (value)?moment(value).format('DD-MM-YYYY'):'';
        }

        if (cellDataTypeStr == 'monthyear') {
          value = o[child];
          value = (value)?moment(value).format('MMM, YYYY'):"";
        }

        if (cellDataTypeStr == 'one_level') {
          value = (o[child[0]] && o[child[0]][child[1]]) ? o[child[0]][child[1]] : '';
        }
      

    

        if (cellDataTypeStr == 'percent') {
          value = (o[child]) ? `${o[child]}%` : 0;
        }

        if (cellDataTypeStr == 'tax_percent') {
          value = (o[child[0]] && o[child[0]][child[1]]) ? `${o[child[0]][child[1]]}(${o[child[0]][child[2]]}%)` : '';
        }
        

        rowData.push(value);
      });

      /* Push row data into final array */
      xlDataObj.push(rowData);
      cellConfig[i] = configData;

      if(o.columnStyle){
        columnStyle[i] = o.columnStyle
      }
      if(o.mergeCells){
        mergeCells[i] = o.mergeCells
      }
    });
    this.generateExcel(headersArr, subHeading, xlDataObj, sheetName, columnStyle,mergeCells);
  }
}