const injetarLinkNoPdf = require('../utils/injetarLinkNoPdf');

router.post('/kiwify', async (req, res) => {
  const { buyer_name, buyer_email, buyer_phone } = req.body;
  const token = crypto.randomBytes(6).toString('hex');
  const whatsapp = buyer_phone.replace(/\D/g, '');

  const caminhoBase = path.join(__dirname, '../pdfs/BASE_JOGO.pdf'); // PDF modelo
  const novoPdfPath = await injetarLinkNoPdf(caminhoBase, buyer_name, token);

  const newPlayer = new Player({
    name: buyer_name,
    email: buyer_email,
    whatsapp,
    token,
    pdfPath: novoPdfPath
  });

  await newPlayer.save();
  res.status(200).send('PDF personalizado criado com sucesso');
});
