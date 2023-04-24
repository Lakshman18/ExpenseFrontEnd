import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = (data, users, name) => { 
  const doc = new jsPDF();

  const tableColumn = ["Date", "Description", "Payment Method", "Amount" ];
  users.map((item) => {
   return tableColumn.push(item.userName)
  })

  const tableRows = [];
    data.forEach(row => {
        const rowData = [
            row.date.split('T')[0],
            row.name,
            row.paymentMethod === 'K' ? 'KOKO' : 'MINTPAY',
            row.amount,
            row.userName === tableColumn[4] ? row.perPersonAmount : row.userName === '' ? row.perPersonAmount : 0,
            row.userName === tableColumn[5] ? row.perPersonAmount : row.userName === '' ? row.perPersonAmount : 0
          ];
        tableRows.push(rowData);
    });
  const resultsData = [
    '',
    '',
    '',
    '',
    users[0].amount,
    users[1].amount
  ];
  tableRows.push(resultsData);

  doc.autoTable(tableColumn, tableRows, { startY: 20 }); 

  doc.setFontSize(14).setFont(undefined, 'bold').setTextColor(0,0,128);
  doc.text(name + " Month Installments" , doc.internal.pageSize.getWidth()/2, 10, { align: "center" })

  // let finalY = doc.lastAutoTable.finalY; 
  // doc.text(15, finalY+10, "Total Amount- " + total)
  
  doc.save(`report.pdf`);
};

export default generatePDF;