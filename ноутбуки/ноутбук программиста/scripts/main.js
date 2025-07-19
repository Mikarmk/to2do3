// Desktop Application Manager
class DesktopManager {
    constructor() {
        this.modalOverlay = document.getElementById('modalOverlay');
        this.appModal = document.getElementById('appModal');
        this.folderModal = document.getElementById('folderModal');
        this.errorReportsModal = document.getElementById('errorReportsModal');
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
                const folderType = item.dataset.folder || 'main';
                this.openFolder(folderType);
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
        
        document.getElementById('errorReportsCloseBtn').addEventListener('click', () => {
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
    
    openFolder(folderType = 'main') {
        let targetModal;
        
        if (folderType === 'errors') {
            targetModal = this.errorReportsModal;
        } else {
            targetModal = this.folderModal;
        }
        
        this.showModal(targetModal);
        
        // Add event listener for document items in the folder
        setTimeout(() => {
            const documentItems = targetModal.querySelectorAll('.folder-item.document-item');
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
            case 'error-05-06':
                docTitle.textContent = 'сбой_05_06.log';
                docContent.innerHTML = `
                    <div style="font-family: 'Courier New', monospace; line-height: 1.6; padding: 10px; background: #1e1e1e; color: #d4d4d4;">
                        <div style="color: #569cd6;">[2024-06-05 14:23:15] ERROR</div>
                        <div style="color: #ce9178;">System: Критический сбой в модуле управления</div>
                        <div style="color: #ce9178;">Component: INT-25 Navigation System</div>
                        <div style="color: #ce9178;">Status: OFFLINE</div>
                        <div style="color: #dcdcaa; margin-top: 10px;">Stack trace:</div>
                        <div style="color: #808080; margin-left: 20px;">
                            at NavigationCore.process()<br>
                            at RobotController.execute()<br>
                            at MainLoop.run()
                        </div>
                    </div>
                `;
                break;
            case 'error-12-06':
                docTitle.textContent = 'сбой_12_06.log';
                docContent.innerHTML = `
                    <div style="font-family: 'Courier New', monospace; line-height: 1.6; padding: 10px; background: #1e1e1e; color: #d4d4d4;">
                        <div style="color: #569cd6;">[2024-06-12 09:45:32] WARNING</div>
                        <div style="color: #ce9178;">System: Потеря связи с центральным сервером</div>
                        <div style="color: #ce9178;">Component: Communication Module</div>
                        <div style="color: #ce9178;">Duration: 3 hours 24 minutes</div>
                        <div style="color: #dcdcaa; margin-top: 10px;">Last known position: Forest sector 7</div>
                    </div>
                `;
                break;
            case 'error-20-06':
                docTitle.textContent = 'сбой_20_06.log';
                docContent.innerHTML = `
                    <div style="font-family: 'Courier New', monospace; line-height: 1.6; padding: 10px; background: #1e1e1e; color: #d4d4d4;">
                        <div style="color: #569cd6;">[2024-06-20 16:12:08] CRITICAL</div>
                        <div style="color: #f44747;">System: Полный отказ системы INT-25</div>
                        <div style="color: #ce9178;">Component: All systems</div>
                        <div style="color: #ce9178;">Status: TERMINATED</div>
                        <div style="color: #dcdcaa; margin-top: 10px;">
                            Комментарий: Удалить всю историю о INT-25 по просьбе Одота.
                        </div>
                        <div style="color: #f44747; margin-top: 10px; font-weight: bold;">
                            ВНИМАНИЕ: Данные подлежат немедленному удалению!
                        </div>
                    </div>
                `;
                break;
            case 'error-25-06':
                docTitle.textContent = 'сбой_25_06.log';
                docContent.innerHTML = `
                    <div style="font-family: 'Courier New', monospace; line-height: 1.6; padding: 10px; background: #1e1e1e; color: #d4d4d4;">
                        <div style="color: #569cd6;">[2024-06-25 11:30:45] INFO</div>
                        <div style="color: #ce9178;">System: Попытка восстановления данных</div>
                        <div style="color: #ce9178;">Component: Data Recovery Module</div>
                        <div style="color: #ce9178;">Status: FAILED</div>
                        <div style="color: #dcdcaa; margin-top: 10px;">
                            Все попытки восстановления INT-25 провалились.
                        </div>
                    </div>
                `;
                break;
            case 'error-28-06':
                docTitle.textContent = 'сбой_28_06.log';
                docContent.innerHTML = `
                    <div style="font-family: 'Courier New', monospace; line-height: 1.6; padding: 10px; background: #1e1e1e; color: #d4d4d4;">
                        <div style="color: #569cd6;">[2024-06-28 23:59:59] FINAL</div>
                        <div style="color: #ce9178;">System: Закрытие дела INT-25</div>
                        <div style="color: #ce9178;">Component: Archive System</div>
                        <div style="color: #ce9178;">Status: ARCHIVED</div>
                        <div style="color: #dcdcaa; margin-top: 10px;">
                            Все данные о проекте INT-25 архивированы.<br>
                            Доступ ограничен уровнем безопасности ALPHA.
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