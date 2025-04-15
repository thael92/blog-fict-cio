const fs = require('fs');
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

async function injetarLinkNoPdf(pdfBasePath, nome, token) {
  const pdfBytes = fs.readFileSync(pdfBasePath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const linkTexto = `https://seudominio.com/jogo?token=${token}`;

  const texto = `Olá ${nome}, Blair deixou pistas que só você pode acessar: ${linkTexto}`;

  // Adiciona o texto e o link na primeira página
  const x = 50;
  const y = 100; // ajusta a posição aqui
  const fontSize = 12;

  firstPage.drawText(texto, {
    x,
    y,
    size: fontSize,
    font,
    color: rgb(0.9, 0.9, 0.9)
  });

  // Área clicável no link
  const linkX = x + texto.indexOf(linkTexto) * 5.5; // aproximação para onde começa o link
  firstPage.doc.context.addAnnotation({
    Type: 'Annot',
    Subtype: 'Link',
    Rect: [linkX, y, linkX + 300, y + 15],
    Border: [0, 0, 0],
    A: {
      Type: 'Action',
      S: 'URI',
      URI: linkTexto
    }
  });

  const outputPath = path.join(__dirname, `../pdfs/jogo-${token}.pdf`);
  const finalPdf = await pdfDoc.save();
  fs.writeFileSync(outputPath, finalPdf);
  return outputPath;
}

module.exports = injetarLinkNoPdf;
