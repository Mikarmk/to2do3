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
            const documentItem = e.target.closest('.folder-item.document-item');
            if (documentItem) {
                e.stopPropagation();
                const documentType = documentItem.dataset.document || 'hello';
                this.openDocument(documentType);
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
            'app3': 'Лаборатория',
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
                    <div style="padding: 20px;">
                        <h2 style="text-align: center; margin-bottom: 20px;">Почтовый клиент</h2>
                        <div style="background: #f5f5f5; border-radius: 8px; padding: 15px; margin-bottom: 15px; border-left: 4px solid #2196F3;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                <strong style="color: #1976D2;">От: Одот &lt;odot@company.local&gt;</strong>
                                <span style="color: #666; font-size: 12px;">15 июня 2024, 18:30</span>
                            </div>
                            <div style="margin-bottom: 10px;">
                                <strong>Тема:</strong> Срочное поручение - утилизация документов
                            </div>
                            <hr style="margin: 15px 0; border: 1px solid #ddd;">
                            <div style="line-height: 1.6;">
                                <p>Уважаемый коллега,</p>
                                <p>В связи с недавними событиями прошу вас <strong style="color: #d32f2f;">разорвать и утилизировать все письма от полиции</strong>, касающиеся расследования инцидента с роботом INT-25.</p>
                                <p>Данная мера необходима для обеспечения конфиденциальности внутренних процессов компании.</p>
                                <p>Выполните это поручение в кратчайшие сроки.</p>
                                <p style="margin-top: 20px;">
                                    С уважением,<br>
                                    <strong>Одот</strong><br>
                                    <em>Директор по безопасности</em>
                                </p>
                            </div>
                        </div>
                        <div style="text-align: center; color: #666; font-style: italic;">
                            Всего писем: 1
                        </div>
                    </div>
                `;
                break;
                
            case 'app3':
                content = `
                    <div style="text-align: center; padding: 40px;">
                        <h2>Доступ к лаборатории</h2>
                        <div style="margin-top: 30px; padding: 20px; background: rgba(255, 165, 0, 0.1); border: 2px solid #ff8800; border-radius: 8px;">
                            <p style="color: #cc6600; font-weight: bold; font-size: 18px;">
                                🧪 ДЛЯ ДОСТУПА К ЛАБОРАТОРИИ НУЖНО БЫТЬ ХИМИКОМ
                            </p>
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
                    const documentType = item.dataset.document || 'hello';
                    this.openDocument(documentType);
                });
            });
        }, 100);
    }
    
    openDocument(documentType = 'hello') {
        // Set document title and content based on type
        const docTitle = document.getElementById('documentModal').querySelector('.modal-title');
        const docContent = document.getElementById('documentModal').querySelector('.text-document');
        
        switch(documentType) {
            case 'fountain-note':
                docTitle.textContent = 'пойти к фонтану.txt';
                docContent.innerHTML = `
                    <div style="font-family: 'Georgia', serif; line-height: 1.8; padding: 20px;">
                        <h3 style="color: #2e7d32; margin-bottom: 20px; text-align: center;">Личная заметка</h3>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #2e7d32;">
                            <p style="font-size: 16px; margin-bottom: 15px;">
                                <strong>Напоминание:</strong> Пойти к фонтану в центральном парке
                            </p>
                            <p style="color: #666; font-style: italic;">
                                Встреча назначена на завтра в 15:00. Не забыть взять документы.
                            </p>
                            <hr style="margin: 20px 0; border: 1px solid #ddd;">
                            <p style="color: #d32f2f; font-weight: bold;">
                                ⚠️ Важно: После встречи уничтожить все материалы по делу INT-25
                            </p>
                            <p style="font-size: 14px; color: #666; margin-top: 15px;">
                                Место: Фонтан "Три грации", центральная аллея<br>
                                Время: 15:00<br>
                                Контакт: Одот
                            </p>
                        </div>
                    </div>
                `;
                break;
            default:
                docTitle.textContent = 'привет.txt';
                docContent.innerHTML = '<p>привет</p>';
        }
        
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