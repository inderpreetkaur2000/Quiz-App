const downloadResult = document.querySelector(".result-box-buttons .download");
const pdfresult = document.querySelector(".table");

let doc = new jsPDF();
var specialElementHandlers = {
    '.result-box h1': function (element, renderer) {
        return true;
    }
};



downloadResult.addEventListener("click",function () {
    doc.fromHTML(pdfresult, 10,10 , {
        'width': 170,
            'elementHandlers': specialElementHandlers
    });
    doc.save('Result-file.pdf');
});