
function addHeaderToPDF(doc, headerContent) {
  // Set font and font size for the header
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(16);

  // Calculate header width and center alignment
  const headerWidth = doc.internal.pageSize.getWidth();
  const headerStartX = (headerWidth / 2) - (doc.getStringUnitWidth(headerContent) * doc.internal.getFontSize()) / 2;

  // Add header text with consistent top margin
  doc.text(headerStartX, 20, headerContent);
  doc.setDrawColor(0, 0, 0); // Set color to black (RGB values)
  doc.lineWidth = 1; // Adjust line thickness as needed
  doc.line(0 , 30, headerStartX + headerWidth, 30);
}

function generate() {

    var doc = new jsPDF('p', 'pt', 'letter');
    var htmlstring = '';
    var tempVarToCheckPageHeight = 0;
    var pageHeight = 0;
    
    pageHeight = doc.internal.pageSize.height;
    
    specialElementHandlers = {
    // element with id of "bypass" - jQuery style selector
    '#bypassme': function (element, renderer) { 
    // true "handled elsewhere, bypass text extraction"
    return true
    }
    };
    margins = {
    top: 130,
    bottom: 80,
    left: 40,
    right: 40,
    width: 600 
    };
    var y =20; 
    addTitlePage(doc);
    // Configure table styles
  const tableStyles = {
    theme: 'grid',
    styles: {
      font: 'Helvetica', // Use the same font as in the frontend
      fontStyle: 'normal', // Set font style to normal
      textColor: [0, 0, 0], // Set text color to black
      cellPadding: 8, // Set cell padding
      overflow: 'linebreak', // Enable line breaks in cells
      halign: 'left', // Set horizontal alignment to left
      valign: 'middle', // Set vertical alignment to middle
      fillColor: [242, 242, 242], // Set background color for header
      lineWidth: 0.5, // Set line width for borders
    },
    headStyles: {
      fillColor: [242, 242, 242], // Set background color for header
    },
    columnStyles: {
      0: { cellWidth: 'auto' }, // Adjust column width as needed
      1: { cellWidth: 'auto' },
    },
  };
    //doc.setLineWidth(2);
    //doc.setFontStyle('bold'); // Set font style to bold
   // doc.text(200, y = y + 30, "Software and hardware Audit report");
    doc.setFontStyle('normal'); // Reset font style to normal
    doc.autoTable({
        html: '#simple_table', 
        startY: 70,
        // theme: 'grid',
        // columnStyles: {
        //  0: { cellwidth: 180,},
        //  1: { cellwidth: 180, },
        //  2: { cellwidth: 180, } },
        // styles: 
        // {
        //  minCellHeight: 40,
        //  cellFont: 'bold',  // Set cell font to bold
        //   valign: 'middle'   // Center the text vertically
        // },
         ...tableStyles,
        didDrawPage: function (data) {
          // Add header to every page after the first
          if (data.pageNumber >= 1) {
            addHeaderToPDF(doc, 'Software and Hardware Audit Report');
          }
        },
        margins: { // Add the margin configuration here
          bottom: margins.bottom + 7, // Increase by 10 units
          // ... other margins (top, left, right)
        }
            });
      
      const totalPages = doc.internal.getNumberOfPages();

      addTextWatermark(doc, 'Minutus Computing Pvt. Ltd');
      //addImageWatermark(doc, 'minutus.png');

    for (let i = 2; i <= totalPages; i++) 
    {
    doc.setPage(i);
    // Add a line before the footer
    doc.setDrawColor(0, 0, 0); // Set line color to black
    doc.lineWidth = 1; // Adjust line thickness as needed
    doc.line(0, doc.internal.pageSize.height - 45, doc.internal.pageSize.width, doc.internal.pageSize.height - 45);
    const text = i + ' / ' + totalPages;
    const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize(); // Calculate the width of the text
    const centerX = (doc.internal.pageSize.width - textWidth) / 2; // Calculate the center position
    const bottomY = doc.internal.pageSize.height - 20; // 30 units above the bottom
    doc.setFontStyle('normal');
    doc.setFontSize(12);
    doc.text(text, centerX, bottomY, null, null, "center");   
    }
        doc.save('genpdf.pdf');
       
}
function addTitlePage(doc) {
  doc.setLineWidth(2);
    // Add an image
    const image= new Image();
     image.src = 's1.png'; // Replace with the actual path to your image
     doc.addImage(image, "png", 0, 0, 620, 900);

    doc.addPage();
}
function addTextWatermark(doc, watermarkText) {
  const totalPages = doc.internal.getNumberOfPages();

  for (let i = 2; i <= totalPages; i++) {
      doc.setPage(i);

      // Add watermark text
      doc.setFontSize(20);
      doc.setTextColor(200, 200, 200); // Adjust text color as needed
      doc.text(watermarkText, doc.internal.pageSize.width / 2, doc.internal.pageSize.height / 2, null, null, "center");
  }

  // Reset text color for content
  doc.setTextColor(0, 0, 0);
}



