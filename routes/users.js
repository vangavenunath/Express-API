var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  var fonts = {
    Roboto: {
      normal: 'fonts/Roboto-Regular.ttf',
      bold: 'fonts/Roboto-Medium.ttf',
      italics: 'fonts/Roboto-Italic.ttf',
      bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
  };

  var PdfPrinter = require('pdfmake');
  var printer = new PdfPrinter(fonts);
  var fs = require('fs');

  var docDefinition = {
    // ...
    pageOrientation: 'landscape',
    watermark: { text: 'ABC Company', color: '#CCCCCC', opacity: 0.3, bold: true, italics: false },
    content: [
      {
        alignment: 'justify',
        columns: [
          { text: 'PAYSLIP', fontSize: 22, alignment: "left", bold: true },
          { text: 'ABC Company', fontSize: 20, color: "blue", alignment: "right", bold: true }
        ]
      },
      { text: '123 Albert St, Melbourne, VIC - 3000', fontSize: 10, alignment: "right" },
      { text: '\n' },
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Employee Name', fontSize: 12, alignment: "left"
          },
          {
            text: ': VENUNATH VANGA', fontSize: 12, alignment: "left"
          }
        ]
      },
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Pay Period', fontSize: 12, alignment: "left"
          },
          {
            text: ': 01-Jul-2020 to 31-Jul-2020', fontSize: 12, alignment: "left"
          }
        ]
      },
      {
        alignment: 'justify',
        columns: [
          {
            text: 'Employment Status', fontSize: 12, alignment: "left"
          },
          {
            text: ': Full-time', fontSize: 12, alignment: "left"
          }
        ]
      },
      { text: ' ', fontSize: 12, alignment: "left" },
      { text: '\n' },
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: ['*', 'auto', 100, '*'],

          body: [
            [{ text: 'Earnings', fillColor: '#EEEEEE' }, { text: 'Amount(In AUD)', fillColor: '#EEEEEE', alignment: "right" }, { text: 'Deductions', fillColor: '#EEEEEE' }, { text: 'Amount(In AUD)', fillColor: '#EEEEEE', alignment: "right" }],
            ['Basic', { text: '10000', color: "green", alignment: "right" }, 'Tax', { text: '10', color: "red", alignment: "right" }],
            ['Overtime Pay', { text: '1000', color: "green", alignment: "right" }, 'Other deductions', { text: '10', color: "red", alignment: "right" }],
            [{ text: 'Total Earnings', bold: true }, { text: '11000', color: "green", alignment: "right", bold: true }, { text: 'Total Deductions', bold: true }, { text: '20', color: "red", alignment: "right", bold: true }],
            [{
              colSpan: 2,
              border: [true, true, true, true],
              fillColor: '#EEEEEE',
              text: 'Net Pay'
            }, '', { text: '10880', colSpan: 2, fillColor: '#EEEEEE', alignment: "right", bold: true }, '']
            // [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
          ]
        }
      }
    ]
  };

  var options = {
    // ...
  }

  var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(fs.createWriteStream('document.pdf'));
  pdfDoc.end();
  res.send('respond with a resource');
});

module.exports = router;
