const express = require('express');
const mongoose = require('mongoose');
const PedidoDeBolo = require('./models/pedidoDeBolo');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/BoloLtda', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conexão com MongoDB estabelecida'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

const pedidoDeBoloSchema = new mongoose.Schema({
  sabor: {
    type: String,
    required: true
  },
  tamanho: {
    type: String,
    enum: ['pequeno', 'médio', 'grande'],
    required: true
  },
  cobertura: {
    type: String,
    required: true
  },
  dataPedido: {
    type: Date,
    default: Date.now
  },
  entregue: {
    type: Boolean,
    default: false
  }
});

const PedidoDeBolo = mongoose.model('PedidoDeBolo', pedidoDeBoloSchema);

app.post('/pedidos', async (req, res) => {
  try {
    const pedido = await PedidoDeBolo.create(req.body);
    res.status(201).json({ status: 'success', data: pedido });
  } catch (error) {
    console.error('Erro ao criar pedido de bolo:', error);
    res.status(500).json({ status: 'error', message: 'Erro ao criar pedido de bolo' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});
