// Crear una instancia de WebSocket para conectarse a la API de Binance
var ws = new WebSocket("wss://stream.binance.com:9443/ws");

// Enviar un mensaje para suscribirse a los canales de las criptomonedas que quieres obtener
ws.onopen = function() {
  ws.send(JSON.stringify({
    method: "SUBSCRIBE",
    params: [
      "btcusdt@trade", // Bitcoin/USDT
      "ethusdt@trade", // Ethereum/USDT
      "adausdt@trade", // Cardano/USDT
      "dotusdt@trade"  // Polkadot/USDT
    ],
    id: 1
  }));
};

// Recibir los mensajes con los datos de los precios en tiempo real
ws.onmessage = function(event) {
  var data = JSON.parse(event.data);
  // Si el mensaje es un evento de trade, actualizar el elemento HTML correspondiente con el precio
  if (data.e == "trade") {
    var symbol = data.s; // Símbolo de la criptomoneda
    var price = data.p; // Precio en USDT
    // Seleccionar el elemento HTML con el id que coincide con el símbolo en minúsculas
    var element = document.getElementById(symbol.toLowerCase());
    // Cambiar el formato del precio a dos decimales
    var formattedPrice = parseFloat(price).toFixed(2);
    // Actualizar el contenido del elemento con el precio formateado
    element.textContent = formattedPrice;
  }
};
