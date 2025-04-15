const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function gerarPdfComLink(nome, token) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 500]);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const linkTexto = `https://seudominio.com/jogo?token=${token}`;

  page.drawText(`Olá ${nome},`, {
    x: 50,
    y: 450,
    size: 18,
    font,
    color: rgb(1, 1, 1)
  });

  page.drawText(`Blair deixou uma mensagem oculta para você. Acesse o link abaixo para continuar sua investigação:`, {
    x: 50,
    y: 420,
    size: 12,
    font,
    color: rgb(1, 1, 1)
  });

  page.drawText(linkTexto, {
    x: 50,
    y: 400,
    size: 12,
    font,
    color: rgb(0.2, 0.5, 1)
  });

  page.doc.context.addAnnotation({
    Type: 'Annot',
    Subtype: 'Link',
    Rect: [50, 400, 400, 415],
    Border: [0, 0, 0],
    A: {
      Type: 'Action',
      S: 'URI',
      URI: linkTexto
    }
  });

  const outputPath = path.join(__dirname, `../pdfs/jogo-${token}.pdf`);
  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);

  return outputPath;
}

module.exports = gerarPdfComLink;
