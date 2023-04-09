import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = (data, name) => {
  const doc = new jsPDF();

  const tableColumn = ["Date", "Description", "Amount", ];
  const tableRows = [];
  let total = 0;
  data.forEach(item => {
    item.items.forEach(row => {
        const rowData = [
            row.date.split('T')[0],
            row.description,
            row.amount,
          ];
          total += row.amount;
        tableRows.push(rowData);
    })
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 }); 

  doc.setFontSize(14).setFont(undefined, 'bold').setTextColor(0,0,128);
  doc.text(name + " Trip Expense" , doc.internal.pageSize.getWidth()/2, 10, { align: "center" })

  let finalY = doc.lastAutoTable.finalY; 
  doc.text(15, finalY+10, "Total Amount- " + total)
  
  doc.save(`report.pdf`);
};

export default generatePDF;