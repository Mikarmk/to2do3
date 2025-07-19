// Desktop Application Manager
class DesktopManager {
    constructor() {
        this.modalOverlay = document.getElementById('modalOverlay');
        this.appModal = document.getElementById('appModal');
        this.folderModal = document.getElementById('folderModal');
        this.documentModal = document.getElementById('documentModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalContent = document.getElementById('modalContent');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupKeyboardShortcuts();
    }
    
    bindEvents() {
        // Dock app clicks
        document.querySelectorAll('.dock-item.app').forEach(item => {
            item.addEventListener('click', (e) => {
                const appName = e.currentTarget.dataset.app;
                this.openApp(appName);
            });
        });
        
        // Folder clicks
        document.querySelectorAll('.desktop-item.folder').forEach(item => {
            item.addEventListener('click', () => {
                this.openFolder();
            });
        });
        
        // Document clicks inside folder - using event delegation
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target.closest('.folder-item.document-item')) {
                e.stopPropagation();
                this.openDocument();
            }
        });
        
        // Close button events
        document.getElementById('closeBtn').addEventListener('click', () => {
            this.closeModal();
        });
        
        document.getElementById('folderCloseBtn').addEventListener('click', () => {
            this.closeModal();
        });
        
        document.getElementById('docCloseBtn').addEventListener('click', () => {
            this.closeModal();
        });
        
        // Modal overlay click to close
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) {
                this.closeModal();
            }
        });
        
        // Prevent modal content clicks from closing modal
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // ESC to close modal
            if (e.key === 'Escape') {
                this.closeModal();
            }
            
            // Cmd/Ctrl + W to close modal (Mac-style)
            if ((e.metaKey || e.ctrlKey) && e.key === 'w') {
                e.preventDefault();
                this.closeModal();
            }
        });
    }
    
    openApp(appName) {
        // Set modal title based on app
        const appTitles = {
            'app1': 'Настройки',
            'app2': 'Почта',
            'app3': 'Камеры видеонаблюдения',
            'app4': 'Редактор кода'
        };
        
        this.modalTitle.textContent = appTitles[appName] || 'Приложение';
        
        // Set modal content based on app
        let content = '';
        
        switch(appName) {
            case 'app1':
                content = `
                    <div style="text-align: center; padding: 40px;">
                        <h2>Настройки системы</h2>
                        <div style="margin-top: 30px; padding: 20px; background: rgba(255, 0, 0, 0.1); border: 2px solid #ff4444; border-radius: 8px;">
                            <p style="color: #cc0000; font-weight: bold; font-size: 18px;">
                                ⚠️ НАСТРОЙКИ МЕНЯТЬ НЕЛЬЗЯ
                            </p>
                        </div>
                    </div>
                `;
                break;
                
            case 'app2':
                content = `
                    <div style="text-align: center; padding: 40px;">
                        <h2>Почтовый клиент</h2>
                        <div style="margin-top: 30px; padding: 20px; background: rgba(128, 128, 128, 0.1); border: 2px solid #888; border-radius: 8px;">
                            <p style="color: #666; font-weight: bold; font-size: 18px;">
                                📧 ПИСЕМ НЕТ
                            </p>
                        </div>
                    </div>
                `;
                break;
                
            case 'app3':
                content = `
                    <div style="padding: 15px; height: 600px; overflow-y: auto;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding: 15px; background: linear-gradient(135deg, #2c3e50, #34495e); color: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                            <h2 style="margin: 0; color: white; font-size: 20px;">🎥 Система видеонаблюдения</h2>
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <label style="color: white; font-weight: 500;">Дата:</label>
                                <select id="dateSelector" style="padding: 8px 12px; border-radius: 5px; border: none; background: white; font-size: 14px; min-width: 150px;">
                                    <option value="2024-06-15">15 июня 2024</option>
                                    <option value="2024-06-18">18 июня 2024</option>
                                    <option value="2024-06-20" selected>20 июня 2024</option>
                                    <option value="2024-06-22">22 июня 2024</option>
                                </select>
                                <button onclick="window.desktop.loadCameraHistory()" style="padding: 8px 16px; background: linear-gradient(135deg, #27ae60, #2ecc71); color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: 500; transition: all 0.3s;">Загрузить</button>
                            </div>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                            <div style="background: linear-gradient(135deg, #34495e, #2c3e50); padding: 15px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                                <div style="background: rgba(0,0,0,0.3); color: white; padding: 8px; text-align: center; margin-bottom: 12px; border-radius: 5px; font-weight: 500;">
                                    📹 Камера 1 - Главный вход
                                </div>
                                <div id="camera1" style="width: 100%; aspect-ratio: 16/9; background: linear-gradient(45deg, #1a1a1a, #2a2a2a); border-radius: 5px; display: flex; align-items: center; justify-content: center; color: #888; font-size: 14px; border: 2px solid #444; position: relative; overflow: hidden;">
                                    <div style="text-align: center;">
                                        <div style="font-size: 24px; margin-bottom: 8px;">📷</div>
                                        <div>Загрузка кадра...</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="background: linear-gradient(135deg, #34495e, #2c3e50); padding: 15px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                                <div style="background: rgba(0,0,0,0.3); color: white; padding: 8px; text-align: center; margin-bottom: 12px; border-radius: 5px; font-weight: 500;">
                                    🌲 Камера 2 - Лесная зона
                                </div>
                                <div id="camera2" style="width: 100%; aspect-ratio: 16/9; background: linear-gradient(45deg, #1a1a1a, #2a2a2a); border-radius: 5px; display: flex; align-items: center; justify-content: center; color: #888; font-size: 14px; border: 2px solid #444; position: relative; overflow: hidden;">
                                    <div style="text-align: center;">
                                        <div style="font-size: 24px; margin-bottom: 8px;">📷</div>
                                        <div>Загрузка кадра...</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="background: linear-gradient(135deg, #34495e, #2c3e50); padding: 15px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                                <div style="background: rgba(0,0,0,0.3); color: white; padding: 8px; text-align: center; margin-bottom: 12px; border-radius: 5px; font-weight: 500;">
                                    🛡️ Камера 3 - Периметр
                                </div>
                                <div id="camera3" style="width: 100%; aspect-ratio: 16/9; background: linear-gradient(45deg, #1a1a1a, #2a2a2a); border-radius: 5px; display: flex; align-items: center; justify-content: center; color: #888; font-size: 14px; border: 2px solid #444; position: relative; overflow: hidden;">
                                    <div style="text-align: center;">
                                        <div style="font-size: 24px; margin-bottom: 8px;">📷</div>
                                        <div>Загрузка кадра...</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style="background: linear-gradient(135deg, #34495e, #2c3e50); padding: 15px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                                <div style="background: rgba(0,0,0,0.3); color: white; padding: 8px; text-align: center; margin-bottom: 12px; border-radius: 5px; font-weight: 500;">
                                    📦 Камера 4 - Склад
                                </div>
                                <div id="camera4" style="width: 100%; aspect-ratio: 16/9; background: linear-gradient(45deg, #1a1a1a, #2a2a2a); border-radius: 5px; display: flex; align-items: center; justify-content: center; color: #888; font-size: 14px; border: 2px solid #444; position: relative; overflow: hidden;">
                                    <div style="text-align: center;">
                                        <div style="font-size: 24px; margin-bottom: 8px;">📷</div>
                                        <div>Загрузка кадра...</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div style="background: linear-gradient(135deg, #ecf0f1, #bdc3c7); padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                            <h3 style="margin-top: 0; color: #2c3e50; display: flex; align-items: center; gap: 10px;">
                                📋 <span id="historyTitle">История событий - 20 июня 2024</span>
                            </h3>
                            <div id="eventHistory" style="max-height: 180px; overflow-y: auto; background: white; border-radius: 5px; padding: 10px;">
                                <div style="padding: 12px; margin-bottom: 8px; background: #fff5f5; border-left: 4px solid #e74c3c; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                    <strong style="color: #e74c3c;">🚨 14:23</strong> - Камера 2: Обнаружено повреждение робота INT-25 в лесной зоне
                                </div>
                                <div style="padding: 12px; margin-bottom: 8px; background: #fffbf0; border-left: 4px solid #f39c12; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                    <strong style="color: #f39c12;">⚠️ 14:25</strong> - Камера 2: Активирована система оповещения
                                </div>
                                <div style="padding: 12px; margin-bottom: 8px; background: #f0fff4; border-left: 4px solid #27ae60; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                    <strong style="color: #27ae60;">✅ 15:10</strong> - Камера 1: Прибытие технической службы
                                </div>
                                <div style="padding: 12px; margin-bottom: 8px; background: #f0f8ff; border-left: 4px solid #3498db; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                    <strong style="color: #3498db;">ℹ️ 16:45</strong> - Камера 2: Завершение эвакуации робота
                                </div>
                            </div>
                        </div>
                        
                        <div style="margin-top: 20px; padding: 15px; background: linear-gradient(135deg, #fff3cd, #ffeaa7); border-radius: 8px; border: 2px solid #f39c12; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                            <p style="margin: 0; font-size: 14px; color: #856404; line-height: 1.5;">
                                <strong>⚠️ Важное примечание:</strong> 20 июня зафиксированы критические события.
                                Фотографии с камеры 4 отличаются от обычных записей этого дня.
                                <br><span style="color: #e74c3c; font-weight: bold; margin-top: 8px; display: inline-block;">
                                📸 5 дополнительных фотографий будут загружены позже для детального анализа...
                                </span>
                            </p>
                        </div>
                        
                        <div id="photoUploadArea" style="margin-top: 20px; padding: 20px; background: linear-gradient(135deg, #e8f5e8, #d4edda); border: 2px dashed #28a745; border-radius: 8px; text-align: center; display: none;">
                            <h4 style="color: #155724; margin-bottom: 15px;">📤 Область загрузки дополнительных фотографий</h4>
                            <div id="uploadedPhotos" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-top: 15px;">
                                <!-- Здесь будут отображаться загруженные фотографии -->
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case 'app4':
                content = `
                    <div style="padding: 20px;">
                        <h2 style="text-align: center; margin-bottom: 20px;">Редактор кода</h2>
                        <div style="background: #1e1e1e; color: #d4d4d4; padding: 20px; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.5;">
                            <div style="color: #569cd6; margin-bottom: 10px;"># main.py</div>
                            <div style="color: #c586c0;">print</div><span style="color: #d4d4d4;">(</span><span style="color: #ce9178;">"Привет мир"</span><span style="color: #d4d4d4;">)</span>
                        </div>
                    </div>
                `;
                break;
                
            default:
                content = `
                    <div style="text-align: center; padding: 40px;">
                        <h2>Приложение</h2>
                        <p style="margin-top: 16px; color: #666;">
                            Содержимое приложения
                        </p>
                    </div>
                `;
        }
        
        this.modalContent.innerHTML = content;
        this.showModal(this.appModal);
    }
    
    openFolder() {
        this.showModal(this.folderModal);
        
        // Add event listener for document items in the folder
        setTimeout(() => {
            const documentItems = this.folderModal.querySelectorAll('.folder-item.document-item');
            documentItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.openDocument();
                });
            });
        }, 100);
    }
    
    openDocument() {
        this.showModal(this.documentModal);
    }
    
    showModal(modal) {
        // Hide all modals first
        document.querySelectorAll('.modal').forEach(m => {
            m.classList.remove('active');
        });
        
        // Show overlay and specific modal
        this.modalOverlay.classList.add('active');
        modal.classList.add('active');
        
        // Focus the modal for keyboard navigation
        modal.focus();
        
        // Add animation class
        modal.style.animation = 'modalAppear 0.3s ease-out';
    }
    
    closeModal() {
        // Add closing animation
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.style.animation = 'modalDisappear 0.2s ease-in';
            
            setTimeout(() => {
                this.modalOverlay.classList.remove('active');
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.classList.remove('active');
                    modal.style.animation = '';
                });
            }, 200);
        } else {
            this.modalOverlay.classList.remove('active');
        }
    }
    
    // Utility method to add new apps dynamically
    addApp(appData) {
        const dockContainer = document.querySelector('.dock-container');
        const newApp = document.createElement('div');
        newApp.className = 'dock-item app';
        newApp.dataset.app = appData.id;
        newApp.innerHTML = `<img src="${appData.icon}" alt="${appData.name}" class="dock-icon">`;
        
        newApp.addEventListener('click', () => {
            this.openApp(appData.id);
        });
        
        dockContainer.appendChild(newApp);
    }
    
    // Utility method to add new desktop items
    addDesktopItem(itemData) {
        const desktopIcons = document.querySelector('.desktop-icons');
        const newItem = document.createElement('div');
        newItem.className = `desktop-item ${itemData.type}`;
        newItem.style.top = itemData.position.top;
        newItem.style.left = itemData.position.left;
        
        newItem.innerHTML = `
            <div class="icon-container">
                <img src="${itemData.icon}" alt="${itemData.name}" class="icon">
            </div>
            <span class="icon-label">${itemData.name}</span>
        `;
        
        if (itemData.type === 'folder') {
            newItem.addEventListener('click', () => {
                this.openDocument();
            });
        }
        
        desktopIcons.appendChild(newItem);
    }
    
    // Функция загрузки истории камер
    loadCameraHistory() {
        const dateSelector = document.getElementById('dateSelector');
        const selectedDate = dateSelector.value;
        const historyTitle = document.getElementById('historyTitle');
        const eventHistory = document.getElementById('eventHistory');
        const photoUploadArea = document.getElementById('photoUploadArea');
        
        // Обновляем заголовок истории
        const dateText = dateSelector.options[dateSelector.selectedIndex].text;
        historyTitle.textContent = `История событий - ${dateText}`;
        
        // Данные для разных дат
        const historyData = {
            '2024-06-15': {
                events: [
                    { time: '09:15', type: 'info', icon: 'ℹ️', message: 'Камера 1: Начало рабочего дня, система активна' },
                    { time: '12:30', type: 'success', icon: '✅', message: 'Камера 3: Плановый обход периметра завершен' },
                    { time: '18:45', type: 'info', icon: 'ℹ️', message: 'Камера 1: Завершение рабочего дня' }
                ],
                cameras: {
                    camera4: 'normal'
                }
            },
            '2024-06-18': {
                events: [
                    { time: '08:20', type: 'info', icon: 'ℹ️', message: 'Камера 2: Обнаружена активность в лесной зоне' },
                    { time: '10:15', type: 'warning', icon: '⚠️', message: 'Камера 3: Незначительное нарушение периметра' },
                    { time: '14:30', type: 'success', icon: '✅', message: 'Камера 1: Ложная тревога, система в норме' }
                ],
                cameras: {
                    camera4: 'normal'
                }
            },
            '2024-06-20': {
                events: [
                    { time: '14:23', type: 'danger', icon: '🚨', message: 'Камера 2: Обнаружено повреждение робота INT-25 в лесной зоне' },
                    { time: '14:25', type: 'warning', icon: '⚠️', message: 'Камера 2: Активирована система оповещения' },
                    { time: '15:10', type: 'success', icon: '✅', message: 'Камера 1: Прибытие технической службы' },
                    { time: '16:45', type: 'info', icon: 'ℹ️', message: 'Камера 2: Завершение эвакуации робота' },
                    { time: '17:20', type: 'danger', icon: '🚨', message: 'Камера 4: Обнаружены аномальные изменения в складской зоне' }
                ],
                cameras: {
                    camera4: 'anomaly'
                },
                showUploadArea: true
            },
            '2024-06-22': {
                events: [
                    { time: '09:00', type: 'info', icon: 'ℹ️', message: 'Камера 1: Система восстановлена после инцидента' },
                    { time: '11:30', type: 'success', icon: '✅', message: 'Камера 4: Проведена полная диагностика склада' },
                    { time: '16:15', type: 'info', icon: 'ℹ️', message: 'Камера 3: Усилены меры безопасности периметра' }
                ],
                cameras: {
                    camera4: 'normal'
                }
            }
        };
        
        const data = historyData[selectedDate];
        
        // Обновляем историю событий
        if (data && data.events) {
            const eventColors = {
                'danger': { bg: '#fff5f5', border: '#e74c3c', color: '#e74c3c' },
                'warning': { bg: '#fffbf0', border: '#f39c12', color: '#f39c12' },
                'success': { bg: '#f0fff4', border: '#27ae60', color: '#27ae60' },
                'info': { bg: '#f0f8ff', border: '#3498db', color: '#3498db' }
            };
            
            eventHistory.innerHTML = data.events.map(event => {
                const colors = eventColors[event.type];
                return `
                    <div style="padding: 12px; margin-bottom: 8px; background: ${colors.bg}; border-left: 4px solid ${colors.border}; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <strong style="color: ${colors.color};">${event.icon} ${event.time}</strong> - ${event.message}
                    </div>
                `;
            }).join('');
        }
        
        // Обновляем камеры
        this.updateCameraDisplays(selectedDate, data);
        
        // Показываем/скрываем область загрузки фотографий
        if (data && data.showUploadArea) {
            photoUploadArea.style.display = 'block';
        } else {
            photoUploadArea.style.display = 'none';
        }
        
        // Эффект загрузки
        this.showLoadingEffect();
    }
    
    // Функция обновления отображения камер
    updateCameraDisplays(selectedDate, data) {
        const cameras = ['camera1', 'camera2', 'camera3', 'camera4'];
        const cameraImages = {
            'camera1': selectedDate === '2024-06-20' ? 'assets/images/Камера1 20 июня.png' : 'assets/images/Камера1.png',
            'camera2': 'assets/images/Камера2.png',
            'camera3': 'assets/images/Камера3.png',
            'camera4': 'assets/images/Камера4.png'
        };
        
        cameras.forEach(cameraId => {
            const cameraElement = document.getElementById(cameraId);
            if (cameraElement) {
                // Эффект загрузки
                cameraElement.style.opacity = '0.5';
                cameraElement.innerHTML = `
                    <div style="text-align: center;">
                        <div style="font-size: 24px; margin-bottom: 8px;">⏳</div>
                        <div>Загрузка...</div>
                    </div>
                `;
                
                setTimeout(() => {
                    // Создаем контейнер для камеры с эффектами
                    const cameraContainer = document.createElement('div');
                    cameraContainer.className = selectedDate === '2024-06-20' && cameraId === 'camera1' ?
                        'security-camera-container anomaly' : 'security-camera-container normal';
                    cameraContainer.style.cssText = `
                        position: relative;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        border-radius: 5px;
                    `;
                    
                    // Создаем изображение камеры
                    const cameraImg = document.createElement('img');
                    cameraImg.src = cameraImages[cameraId];
                    cameraImg.className = 'security-camera-feed';
                    cameraImg.style.cssText = `
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        filter: grayscale(0.7) contrast(1.2) brightness(0.8);
                    `;
                    
                    // Создаем оверлей с помехами
                    const noiseOverlay = document.createElement('div');
                    noiseOverlay.className = 'camera-noise-overlay';
                    noiseOverlay.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: repeating-linear-gradient(
                            0deg,
                            transparent,
                            transparent 2px,
                            rgba(0, 255, 0, 0.03) 2px,
                            rgba(0, 255, 0, 0.03) 4px
                        );
                        pointer-events: none;
                        animation: scanlines 0.1s linear infinite;
                    `;
                    
                    // Создаем статические помехи
                    const staticNoise = document.createElement('div');
                    staticNoise.className = 'camera-static';
                    staticNoise.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        opacity: 0.1;
                        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><defs><filter id="noise"><feTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter></defs><rect width="100%" height="100%" filter="url(%23noise)" opacity="0.4"/></svg>');
                        animation: static-noise 0.2s linear infinite;
                        pointer-events: none;
                    `;
                    
                    // Создаем временную метку
                    const timestamp = document.createElement('div');
                    timestamp.className = 'camera-timestamp';
                    timestamp.style.cssText = `
                        position: absolute;
                        top: 8px;
                        left: 8px;
                        color: #00ff00;
                        font-family: 'Courier New', monospace;
                        font-size: 10px;
                        font-weight: bold;
                        text-shadow: 0 0 3px #00ff00;
                        background: rgba(0, 0, 0, 0.7);
                        padding: 2px 4px;
                        border-radius: 2px;
                        animation: timestamp-flicker 2s ease-in-out infinite;
                    `;
                    
                    // Создаем индикатор записи
                    const recordingIndicator = document.createElement('div');
                    recordingIndicator.className = 'recording-indicator';
                    recordingIndicator.style.cssText = `
                        position: absolute;
                        top: 8px;
                        right: 8px;
                        color: #ff0000;
                        font-family: 'Courier New', monospace;
                        font-size: 10px;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                        gap: 4px;
                        background: rgba(0, 0, 0, 0.7);
                        padding: 2px 4px;
                        border-radius: 2px;
                    `;
                    
                    // Создаем мигающую точку записи
                    const recordingDot = document.createElement('div');
                    recordingDot.style.cssText = `
                        width: 6px;
                        height: 6px;
                        background: #ff0000;
                        border-radius: 50%;
                        animation: recording-blink 1s ease-in-out infinite;
                    `;
                    
                    // Обновляем временную метку
                    const updateTimestamp = () => {
                        const now = new Date();
                        const dateStr = selectedDate === '2024-06-20' ? '20.06.24' : now.toLocaleDateString('ru-RU').slice(0, 8);
                        const timeStr = now.toLocaleTimeString('ru-RU', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        });
                        timestamp.textContent = `${dateStr} ${timeStr}`;
                    };
                    
                    updateTimestamp();
                    setInterval(updateTimestamp, 1000);
                    
                    recordingIndicator.appendChild(recordingDot);
                    recordingIndicator.appendChild(document.createTextNode('REC'));
                    
                    // Специальная логика для камеры 1 на 20 июня
                    if (cameraId === 'camera1' && selectedDate === '2024-06-20') {
                        cameraImg.style.filter = 'grayscale(0.9) contrast(1.5) brightness(0.6) hue-rotate(10deg)';
                        staticNoise.style.opacity = '0.3';
                        
                        // Добавляем эффект глитча
                        const glitchOverlay = document.createElement('div');
                        glitchOverlay.style.cssText = `
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: linear-gradient(90deg, transparent 0%, rgba(255, 0, 0, 0.1) 50%, transparent 100%);
                            animation: glitch-effect 3s ease-in-out infinite;
                            pointer-events: none;
                        `;
                        cameraContainer.appendChild(glitchOverlay);
                        
                        // Добавляем предупреждающий текст
                        const warningText = document.createElement('div');
                        warningText.style.cssText = `
                            position: absolute;
                            bottom: 8px;
                            left: 8px;
                            color: #ff0000;
                            font-family: 'Courier New', monospace;
                            font-size: 9px;
                            font-weight: bold;
                            text-shadow: 0 0 3px #ff0000;
                            background: rgba(0, 0, 0, 0.8);
                            padding: 2px 4px;
                            border-radius: 2px;
                            animation: warning-blink 0.5s ease-in-out infinite;
                        `;
                        warningText.textContent = 'СОБЫТИЕ НА ГЛАВНОМ ВХОДЕ';
                        cameraContainer.appendChild(warningText);
                    }
                    
                    // Собираем все элементы
                    cameraContainer.appendChild(cameraImg);
                    cameraContainer.appendChild(noiseOverlay);
                    cameraContainer.appendChild(staticNoise);
                    cameraContainer.appendChild(timestamp);
                    cameraContainer.appendChild(recordingIndicator);
                    
                    // Очищаем и добавляем новый контент
                    cameraElement.innerHTML = '';
                    cameraElement.appendChild(cameraContainer);
                    cameraElement.style.background = 'black';
                    cameraElement.style.border = selectedDate === '2024-06-20' && cameraId === 'camera4' ? '2px solid #e74c3c' : '2px solid #00ff00';
                    cameraElement.style.opacity = '1';
                }, 1000 + Math.random() * 1000); // Случайная задержка для реалистичности
            }
        });
    }
    
    // Функция получения текущего времени
    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
    
    // Эффект загрузки
    showLoadingEffect() {
        const button = document.querySelector('button[onclick="window.desktop.loadCameraHistory()"]');
        if (button) {
            const originalText = button.textContent;
            button.textContent = 'Загрузка...';
            button.style.background = 'linear-gradient(135deg, #95a5a6, #7f8c8d)';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
                button.disabled = false;
            }, 2000);
        }
    }
}

// Add closing animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes modalDisappear {
        from {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        to {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Initialize the desktop when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.desktop = new DesktopManager();
});

// Export for potential future use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DesktopManager;
}