import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { figuritasAPI, usuariosAPI } from '../services/api';
import './Album.css';

const Album = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [figuritas, setFiguritas] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [error, setError] = useState(null);
    const [sobres, setSobres] = useState(2);
    const [showPackModal, setShowPackModal] = useState(false);
    const [packCards, setPackCards] = useState([]);
    const [obtainedPlayers, setObtainedPlayers] = useState(new Set());
    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width <= 768;

    // Cargar figuritas y estadísticas
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [figuritasRes, statsRes, sobresRes] = await Promise.all([
                    figuritasAPI.obtenerTodas(),
                    figuritasAPI.obtenerStats(),
                    usuariosAPI.obtenerSobres()
                ]);

                setFiguritas(figuritasRes.data);
                setStats(statsRes.data);
                setSobres(sobresRes.data.sobres);
                setError(null);
            } catch (err) {
                console.error('Error al cargar figuritas:', err);
                setError('Error al cargar las figuritas');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Agrupar figuritas por equipo
    const figuritasPorEquipo = React.useMemo(() => {
        const grupos = {};
        figuritas.forEach(fig => {
            if (fig.equipo_id) {
                if (!grupos[fig.equipo_id]) {
                    grupos[fig.equipo_id] = {
                        equipo_nombre: fig.equipo_nombre,
                        emoji: fig.emoji,
                        color: fig.color,
                        figuritas: []
                    };
                }
                grupos[fig.equipo_id].figuritas.push(fig);
            }
        });
        return Object.values(grupos);
    }, [figuritas]);

    // Crear páginas del álbum (cada equipo ocupa 1 página)
    const paginas = React.useMemo(() => {
        return figuritasPorEquipo.map(equipo => ({
            equipo: equipo,
            jugadores: equipo.figuritas
        }));
    }, [figuritasPorEquipo]);

    const handleNext = () => {
        if (currentPageIndex < paginas.length - 1) {
            setCurrentPageIndex(currentPageIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentPageIndex > 0) {
            setCurrentPageIndex(currentPageIndex - 1);
        }
    };

    const togglePegar = async (figuritaId, estaPegada, jugadorId) => {
        // Solo permitir si fue obtenido del sobre
        if (!obtainedPlayers.has(jugadorId)) {
            alert('Solo puedes desbloquear jugadores que hayas conseguido en los sobres');
            return;
        }

        try {
            if (estaPegada) {
                await figuritasAPI.quitarFiguritas(figuritaId);
            } else {
                await figuritasAPI.pegarFiguritas(figuritaId);
            }
            // Recargar figuritas
            const res = await figuritasAPI.obtenerTodas();
            setFiguritas(res.data);
            // Recargar stats
            const statsRes = await figuritasAPI.obtenerStats();
            setStats(statsRes.data);
        } catch (err) {
            console.error('Error al cambiar estado de figurita:', err);
        }
    };

    const abrirSobre = async () => {
        if (sobres <= 0) {
            alert('¡No tienes más sobres disponibles! Volverá en 24 horas.');
            return;
        }

        try {
            // Decrementar sobres en el servidor
            const sobresRes = await usuariosAPI.abrirSobre();
            setSobres(sobresRes.data.sobres);

            // Obtener 5 jugadores al azar
            const jugadoresUnicos = [...new Set(figuritas.map(f => f.id))];
            const jugadoresAleatorios = [];

            for (let i = 0; i < 5 && jugadoresUnicos.length > 0; i++) {
                const index = Math.floor(Math.random() * jugadoresUnicos.length);
                const jugadorId = jugadoresUnicos[index];
                const jugador = figuritas.find(f => f.id === jugadorId);
                if (jugador) {
                    jugadoresAleatorios.push(jugador);
                }
                jugadoresUnicos.splice(index, 1);
            }

            setPackCards(jugadoresAleatorios);
            setShowPackModal(true);

            // Agregar estos jugadores a los obtenidos
            const nuevosObtenidos = new Set(obtainedPlayers);
            jugadoresAleatorios.forEach(j => nuevosObtenidos.add(j.id));
            setObtainedPlayers(nuevosObtenidos);
        } catch (err) {
            console.error('Error al abrir sobre:', err);
            if (err.response?.data?.error) {
                alert(err.response.data.error);
            } else {
                alert('Error al abrir el sobre');
            }
        }
    };

    if (loading) {
        return (
            <div className="album-page">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white', fontSize: '1.5rem' }}>
                    Cargando álbum...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="album-page">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white', fontSize: '1.5rem' }}>
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="album-page">
            {/* ENCABEZADO */}
            <div className="album-header">
                <div className="header-content">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                        <h1></h1>
                        <button
                            className="sobres-btn"
                            onClick={abrirSobre}
                            title="Abre un sobre para conseguir 5 jugadores al azar"
                        >
                            📦 {sobres}
                        </button>
                    </div>
                    {stats && (
                        <div className="header-stats">
                            <div>
                                ⭐ <strong>{stats.pegadas || 0}</strong> Desbloqueadas
                            </div>
                            <div>
                                🔒 <strong>{stats.faltantes || 0}</strong> Faltantes
                            </div>
                            <div>
                                📊 <strong>{stats.pegadas || 0}/{stats.total || 0}</strong>
                            </div>
                        </div>
                    )}
                </div>
                <div className="header-user">
                    <span>👤 {user?.nombre}</span>
                    <button className="logout-btn" onClick={logout}>Cerrar Sesión</button>
                </div>
            </div>

            {/* MODAL DE SOBRE */}
            {showPackModal && (
                <div className="modal-overlay" onClick={() => setShowPackModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>🎉 ¡Abriste un sobre!</h2>
                            <button className="modal-close" onClick={() => setShowPackModal(false)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <p style={{ color: '#666', marginBottom: '20px' }}>Conseguiste estos 5 jugadores:</p>
                            <div className="pack-cards-grid">
                                {packCards.map(card => (
                                    <div key={card.id} className="pack-card">
                                        <div className="pack-emoji">{card.avatar_emoji}</div>
                                        <div className="pack-info">
                                            <p className="pack-nombre">{card.nombre}</p>
                                            <p className="pack-team">{card.equipo_nombre}</p>
                                            <p className="pack-numero">#{card.numero_camiseta}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="modal-btn"
                                onClick={() => setShowPackModal(false)}
                            >
                                Listo, volver
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ÁLBUM */}
            <div className="album-wrapper">
                {!isOpen ? (
                    // ÁLBUM CERRADO
                    <div className="album-closed" onClick={() => setIsOpen(true)}>
                        <div className="album-cover">
                            <div className="cover-image">
                            </div>
                            <div className="cover-text">
                                <h2>ALBUM</h2>
                                <p>Panono Kentimbo</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    // ÁLBUM ABIERTO
                    <div className="album-open">
                        {/* BOTÓN CERRAR */}
                        <button className="album-close-btn" onClick={() => setIsOpen(false)}>
                            ✕
                        </button>

                        {/* PÁGINAS DEL ÁLBUM */}
                        {paginas.length > 0 ? (
                            <div className="pages-container">
                                <div className="pages-wrapper">
                                    {!isMobile && (
                                        <button
                                            className="nav-btn prev-btn"
                                            onClick={handlePrev}
                                            disabled={currentPageIndex === 0}
                                        >
                                            ◀
                                        </button>
                                    )}
                                    <div className="page-spread">
                                        <div className="page page-full">
                                            {paginas[currentPageIndex] && (
                                                <div className="team-section">
                                                    <div className="team-header-full">
                                                        <span className="team-emoji">{paginas[currentPageIndex].equipo.emoji}</span>
                                                        <h3>{paginas[currentPageIndex].equipo.equipo_nombre}</h3>
                                                    </div>
                                                    <div className="figuritas-grid-full">
                                                        {paginas[currentPageIndex].jugadores.map(fig => (
                                                            <div
                                                                key={fig.id}
                                                                className={`figurita-card ${fig.pegada ? 'pegada' : 'no-pegada'} ${obtainedPlayers.has(fig.id) ? 'obtenido' : ''}`}
                                                                onClick={() => togglePegar(fig.figurita_id || fig.id, fig.pegada, fig.id)}
                                                            >
                                                                <div className="figurita-info">
                                                                    <p className="figurita-nombre">{fig.nombre}</p>
                                                                    <p className="figurita-numero">#{fig.numero_camiseta}</p>
                                                                </div>
                                                                <div className="figurita-status">
                                                                    {fig.pegada ? '✓' : '?'}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {!isMobile && (
                                        <button
                                            className="nav-btn next-btn"
                                            onClick={handleNext}
                                            disabled={currentPageIndex === paginas.length - 1}
                                        >
                                            ▶
                                        </button>
                                    )}
                                </div>

                                {/* INDICADOR DE PÁGINA */}
                                {paginas.length > 0 && (
                                    <div className="page-indicator">
                                        {isMobile && (
                                            <button
                                                className="nav-btn prev-btn"
                                                onClick={handlePrev}
                                                disabled={currentPageIndex === 0}
                                            >
                                                ◀
                                            </button>
                                        )}
                                        Página {currentPageIndex + 1} de {paginas.length}

                                        {isMobile && (
                                            <button
                                                className="nav-btn next-btn"
                                                onClick={handleNext}
                                                disabled={currentPageIndex === paginas.length - 1}
                                            >
                                                ▶
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={{ color: 'white', fontSize: '1.2rem' }}>No hay equipos disponibles</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Album;
