// Datos de equipos y jugadores
const data = {
    teams: [
        { id: 1, name: "FC Rayos", emoji: "⚡", color: "#FFD700" },
        { id: 2, name: "United Dragons", emoji: "🐉", color: "#DC143C" },
        { id: 3, name: "Tigres Salvajes", emoji: "🐯", color: "#FF8C00" },
        { id: 4, name: "Phoenix Rising", emoji: "🔥", color: "#FF6347" },
        { id: 5, name: "Águilas Reales", emoji: "🦅", color: "#8B4513" },
        { id: 6, name: "Leones del Sur", emoji: "🦁", color: "#FFB347" },
        { id: 7, name: "Osos Bravos", emoji: "🐻", color: "#8B0000" },
        { id: 8, name: "Lobos Nocturnos", emoji: "🐺", color: "#4B0082" }
    ],
    players: [
        { id: 1, name: "Carlos Relámpago", team: 1, position: "Portero", number: 1, speed: 85, strength: 75 },
        { id: 2, name: "Juan Blitznez", team: 1, position: "Defensa", number: 2, speed: 88, strength: 90 },
        { id: 3, name: "Miguel Voltaire", team: 1, position: "Centrocampista", number: 5, speed: 92, strength: 85 },
        { id: 4, name: "Alex Chispa", team: 1, position: "Delantero", number: 9, speed: 95, strength: 87 },
        { id: 5, name: "Roberto Fulgor", team: 1, position: "Defensa", number: 3, speed: 80, strength: 92 },
        { id: 6, name: "Diego Choque", team: 1, position: "Centrocampista", number: 7, speed: 90, strength: 88 },
        { id: 7, name: "Xander Escamas", team: 2, position: "Portero", number: 1, speed: 84, strength: 78 },
        { id: 8, name: "Vikram Fuego", team: 2, position: "Defensa", number: 4, speed: 87, strength: 91 },
        { id: 9, name: "Lucas Ala", team: 2, position: "Centrocampista", number: 6, speed: 91, strength: 84 },
        { id: 10, name: "Santiago Garras", team: 2, position: "Delantero", number: 10, speed: 93, strength: 89 },
        { id: 11, name: "Fernando Dragón", team: 2, position: "Defensa", number: 2, speed: 82, strength: 88 },
        { id: 12, name: "Eduardo Trueno", team: 2, position: "Centrocampista", number: 8, speed: 89, strength: 86 },
        { id: 13, name: "Sergio Rayas", team: 3, position: "Portero", number: 1, speed: 86, strength: 80 },
        { id: 14, name: "Alberto Zarpazo", team: 3, position: "Defensa", number: 5, speed: 89, strength: 93 },
        { id: 15, name: "Manuel Rugido", team: 3, position: "Centrocampista", number: 7, speed: 90, strength: 85 },
        { id: 16, name: "Javier Felino", team: 3, position: "Delantero", number: 11, speed: 94, strength: 88 },
        { id: 17, name: "Rafael Stripe", team: 3, position: "Defensa", number: 3, speed: 83, strength: 89 },
        { id: 18, name: "Martín Garra", team: 3, position: "Centrocampista", number: 4, speed: 88, strength: 87 },
        { id: 19, name: "Julio Llamas", team: 4, position: "Portero", number: 1, speed: 85, strength: 76 },
        { id: 20, name: "Andrés Ceniza", team: 4, position: "Defensa", number: 2, speed: 86, strength: 90 },
        { id: 21, name: "Pablo Inferno", team: 4, position: "Centrocampista", number: 6, speed: 92, strength: 83 },
        { id: 22, name: "Tomás Llama", team: 4, position: "Delantero", number: 9, speed: 96, strength: 86 },
        { id: 23, name: "Héctor Brasa", team: 4, position: "Defensa", number: 4, speed: 84, strength: 91 },
        { id: 24, name: "Gabriel Brasas", team: 4, position: "Centrocampista", number: 8, speed: 87, strength: 84 },
        { id: 25, name: "Emilio Alas", team: 5, position: "Portero", number: 1, speed: 83, strength: 77 },
        { id: 26, name: "Fernando Cielo", team: 5, position: "Defensa", number: 3, speed: 85, strength: 89 },
        { id: 27, name: "Ignacio Altura", team: 5, position: "Centrocampista", number: 5, speed: 91, strength: 82 },
        { id: 28, name: "Raúl Vuelo", team: 5, position: "Delantero", number: 10, speed: 94, strength: 85 },
        { id: 29, name: "Óscar Pico", team: 5, position: "Defensa", number: 2, speed: 82, strength: 87 },
        { id: 30, name: "Vicente Nido", team: 5, position: "Centrocampista", number: 7, speed: 89, strength: 86 },
        { id: 31, name: "Ramón Melena", team: 6, position: "Portero", number: 1, speed: 84, strength: 79 },
        { id: 32, name: "Arturo Grito", team: 6, position: "Defensa", number: 4, speed: 88, strength: 94 },
        { id: 33, name: "Fabio Fiereza", team: 6, position: "Centrocampista", number: 6, speed: 89, strength: 85 },
        { id: 34, name: "Victor Salvaje", team: 6, position: "Delantero", number: 11, speed: 92, strength: 87 },
        { id: 35, name: "Camilo Crin", team: 6, position: "Defensa", number: 5, speed: 85, strength: 90 },
        { id: 36, name: "Lisandro Presa", team: 6, position: "Centrocampista", number: 8, speed: 91, strength: 88 },
        { id: 37, name: "Gustavo Garras", team: 7, position: "Portero", number: 1, speed: 82, strength: 81 },
        { id: 38, name: "Berto Pata", team: 7, position: "Defensa", number: 2, speed: 83, strength: 95 },
        { id: 39, name: "Oscar Gruñón", team: 7, position: "Centrocampista", number: 7, speed: 88, strength: 86 },
        { id: 40, name: "Leonel Ruido", team: 7, position: "Delantero", number: 10, speed: 90, strength: 84 },
        { id: 41, name: "Jacobo Peludo", team: 7, position: "Defensa", number: 3, speed: 81, strength: 93 },
        { id: 42, name: "Benito Zarpa", team: 7, position: "Centrocampista", number: 5, speed: 87, strength: 89 },
        { id: 43, name: "Silvano Aullido", team: 8, position: "Portero", number: 1, speed: 87, strength: 82 },
        { id: 44, name: "Noctorno Fauces", team: 8, position: "Defensa", number: 4, speed: 90, strength: 92 },
        { id: 45, name: "Sombra Correcaminos", team: 8, position: "Centrocampista", number: 6, speed: 94, strength: 87 },
        { id: 46, name: "Lobo Veloz", team: 8, position: "Delantero", number: 9, speed: 97, strength: 88 },
        { id: 47, name: "Acechador Silente", team: 8, position: "Defensa", number: 2, speed: 88, strength: 91 },
        { id: 48, name: "Cazador Oscuro", team: 8, position: "Centrocampista", number: 8, speed: 92, strength: 90 }
    ]
};

let collection = { collected: new Set() };
const avatarEmojis = ['⚽', '🎯', '🏅', '💪', '🔥', '⭐', '🚀', '👑'];

function loadCollection() {
    const saved = localStorage.getItem('figuritasCollection');
    if (saved) {
        collection.collected = new Set(JSON.parse(saved).collected);
    }
}

function saveCollection() {
    localStorage.setItem('figuritasCollection', JSON.stringify({
        collected: Array.from(collection.collected)
    }));
}

function getAvatarEmoji(playerId) {
    return avatarEmojis[playerId % avatarEmojis.length];
}

function getTeamById(teamId) {
    return data.teams.find(t => t.id === teamId);
}

function getPlayerById(playerId) {
    return data.players.find(p => p.id === playerId);
}

function renderAlbum() {
    const content = document.getElementById('albumContent');
    content.innerHTML = '';

    data.teams.forEach(team => {
        const page = document.createElement('div');
        page.className = 'album-page';

        const title = document.createElement('div');
        title.className = 'album-page-title';
        title.innerHTML = `<span class="album-page-title-emoji">${team.emoji}</span> ${team.name}`;

        const grid = document.createElement('div');
        grid.className = 'figuritas-grid';

        const teamPlayers = data.players.filter(p => p.team === team.id);
        teamPlayers.forEach(player => {
            const slot = document.createElement('div');
            slot.className = 'figurita-slot';
            const isCollected = collection.collected.has(player.id);

            if (isCollected) {
                slot.classList.add('filled');
                const content = document.createElement('div');
                content.className = 'figurita-content';
                content.innerHTML = `
                    <div class="player-avatar">${getAvatarEmoji(player.id)}</div>
                    <div class="player-name">${player.name.split(' ')[0]}</div>
                    <div class="player-number">#${player.number}</div>
                    <span class="player-position">${player.position.substring(0, 3)}</span>
                `;
                slot.appendChild(content);
            } else {
                slot.innerHTML = '?';
            }

            slot.addEventListener('click', () => openModal(player));
            grid.appendChild(slot);
        });

        page.appendChild(title);
        page.appendChild(grid);
        content.appendChild(page);
    });
}

function updateStats() {
    const collected = collection.collected.size;
    const total = data.players.length;
    const percent = (collected / total) * 100;

    document.getElementById('collected').textContent = collected;
    document.getElementById('total').textContent = total;

    const progressFill = document.getElementById('progressFill');
    progressFill.style.width = percent + '%';
    if (percent > 0) {
        progressFill.textContent = Math.round(percent) + '%';
    }
}

let currentPlayer = null;

function openModal(player) {
    currentPlayer = player;
    const modal = document.getElementById('cardModal');
    const team = getTeamById(player.team);

    document.getElementById('modalAvatar').textContent = getAvatarEmoji(player.id);
    document.getElementById('modalName').textContent = player.name;
    document.getElementById('modalTeam').textContent = team.name;
    document.getElementById('modalPosition').textContent = player.position;
    document.getElementById('modalNumber').textContent = player.number;
    document.getElementById('modalSpeed').textContent = player.speed;
    document.getElementById('modalStrength').textContent = player.strength;

    const isCollected = collection.collected.has(player.id);
    const toggleBtn = document.getElementById('toggleCollectedBtn');
    toggleBtn.textContent = isCollected ? 'Quitar del Álbum' : 'Pegar en Álbum';
    toggleBtn.style.background = isCollected ? '#d32f2f' : 'var(--primary-color)';

    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('cardModal').style.display = 'none';
}

document.getElementById('toggleCollectedBtn')?.addEventListener('click', () => {
    if (currentPlayer) {
        if (collection.collected.has(currentPlayer.id)) {
            collection.collected.delete(currentPlayer.id);
        } else {
            collection.collected.add(currentPlayer.id);
        }
        saveCollection();
        updateStats();
        renderAlbum();
        openModal(currentPlayer);
    }
});

document.querySelector('.close')?.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    const modal = document.getElementById('cardModal');
    if (event.target === modal) {
        closeModal();
    }
});

document.getElementById('openPackBtn')?.addEventListener('click', () => {
    const packSize = 5;
    const availablePlayers = data.players.filter(p => !collection.collected.has(p.id));

    if (availablePlayers.length === 0) {
        alert('¡Felicitaciones! ¡Has completado el álbum! 🎉');
        return;
    }

    const randomPlayers = [];
    for (let i = 0; i < Math.min(packSize, availablePlayers.length); i++) {
        const randomIndex = Math.floor(Math.random() * availablePlayers.length);
        randomPlayers.push(availablePlayers[randomIndex]);
        availablePlayers.splice(randomIndex, 1);
    }

    randomPlayers.forEach(player => {
        collection.collected.add(player.id);
    });

    saveCollection();
    updateStats();
    renderAlbum();

    alert(`¡Abriste un sobre! Obtuviste ${randomPlayers.length} figuritas:\n${randomPlayers.map(p => `${p.name} (${getTeamById(p.team).name})`).join('\n')}`);
});

document.getElementById('viewMissingBtn')?.addEventListener('click', () => {
    const missing = data.players.filter(p => !collection.collected.has(p.id));
    if (missing.length === 0) {
        alert('¡No te falta ninguna figurita!');
        return;
    }

    let message = `Te faltan ${missing.length} figuritas:\n\n`;
    data.teams.forEach(team => {
        const teamMissing = missing.filter(p => p.team === team.id);
        if (teamMissing.length > 0) {
            message += `${team.emoji} ${team.name}: ${teamMissing.length}\n`;
        }
    });

    alert(message);
});

loadCollection();
updateStats();
renderAlbum();
