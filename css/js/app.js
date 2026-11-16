document.addEventListener('DOMContentLoaded', () => {
    const btnGeo = document.getElementById('btn-geo');
    const statusGeo = document.getElementById('status-geo');
    const statusConexao = document.getElementById('status-conexao');
    const form = document.getElementById('ocorrencia-form');
    let coordsLatLon = null;

    // Geolocalização API
    btnGeo.addEventListener('click', () => {
        if (navigator.geolocation) {
            statusGeo.textContent = 'Obtendo localização...';
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude.toFixed(6);
                    const lon = position.coords.longitude.toFixed(6);
                    coordsLatLon = { lat, lon };
                    statusGeo.textContent = `Localização obtida: Lat ${lat}, Lon ${lon}`;
                },
                (error) => {
                    statusGeo.textContent = 'Erro ao obter geolocalização.';
                    console.error(error);
                }
            );
        } else {
            statusGeo.textContent = 'Geolocalização não suportada pelo navegador.';
        }
    });

    // Detecção de Conexão (Online / Offline)
    function atualizarConexao() {
        if (navigator.onLine) {
            statusConexao.textContent = 'Status: Conectado (Online)';
            statusConexao.className = 'online';
        } else {
            statusConexao.textContent = 'Status: Desconectado (Modo Rascunho Local)';
            statusConexao.className = 'offline';
        }
    }

    window.addEventListener('online', atualizarConexao);
    window.addEventListener('offline', atualizarConexao);
    atualizarConexao();

    // Envio do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const descricao = document.getElementById('descricao').value;
        
        alert(`Ocorrência registrada com sucesso!\nDescrição: ${descricao}\nGPS: ${coordsLatLon ? coordsLatLon.lat + ', ' + coordsLatLon.lon : 'Não informado'}`);
        form.reset();
        statusGeo.textContent = 'Localização não capturada.';
        coordsLatLon = null;
    });
});
