function exportToPDF() {
    const element = document.getElementById('t1');
  
    // Customize the PDF configuration
    const pdfConfig = {
      margins: {
        top: 40,
        bottom: 60,
        left: 30,
        right: 30
      },
      filename: 'software_hardware_audit_report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      },
      callback: function(doc) {
        // Manually create pages and handle table breaks
        let currentPage = 1;
        let currentY = doc.autoTable.previous.finalY || doc.margins.top; // Start from top margin
  
        function addPageAndTablePart() {
          doc.addPage();
          // Add header and footer for the new page
          addHeader(doc);
          addFooter(doc, currentPage++);
          // Start table on the new page
          currentY = doc.margins.top + 20; // Updated to leave space for header
        }
  
        function addHeader(doc) {
          doc.setFontSize(16);
          doc.text(40, 25, 'Software and Hardware Audit Report'); // Header
        }
  
        function addFooter(doc, pageNum) {
          doc.setFontSize(10);
          doc.text(210, 285, `Page ${pageNum} of `); // Footer
        }
  
        const table = document.getElementById('t1');
        const rows = table.rows;
  
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          const rowHeight = row.offsetHeight;
  
          if (currentY + rowHeight > doc.internal.pageSize.getHeight() - doc.margins.bottom) {
            addPageAndTablePart();
          }
  
          doc.autoTable({
            startY: currentY,
            theme: 'grid',
            styles: {
              font: 'helvetica',
              minCellHeight: 20,
              cellPadding: 5,
              halign: 'left',
              valign: 'middle',
              overflow: 'linebreak'
            },
            body: [row], // Add only the current row
            tableWidth: 170
          });
  
          currentY += rowHeight;
        }
  
        // Add total page number in the footer of the last page
        addFooter(doc, currentPage);
      }
    };
  
    // Use the html2pdf function with the customized configuration
    html2pdf(element, pdfConfig);
  }
  