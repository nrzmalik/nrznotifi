(function(window) {
    const NrzNotif = {
      container: null,
      options: {
        position: 'top-right',
        maxNotifications: 5,
        animationDuration: 300
      },
      notifications: [],
  
      init() {
        this.container = this.createContainer();
        document.body.appendChild(this.container);
        this.addStyles();
      },
  
      createContainer() {
        const container = document.createElement('div');
        container.className = `nrz-notif-container ${this.options.position}`;
        return container;
      },
  
      addStyles() {
        const style = document.createElement('style');
        style.textContent = `
          .nrz-notif-container {
            position: fixed;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 350px;
            width: 100%;
            padding: 10px;
          }
          .nrz-notif-container.top-right { top: 0; right: 0; }
          .nrz-notif-container.top-left { top: 0; left: 0; }
          .nrz-notif-container.bottom-right { bottom: 0; right: 0; }
          .nrz-notif-container.bottom-left { bottom: 0; left: 0; }
          .nrz-notif {
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            overflow: hidden;
            transition: all ${this.options.animationDuration}ms ease-in-out;
            max-height: 0;
            opacity: 0;
          }
          .nrz-notif.show {
            max-height: 200px;
            opacity: 1;
          }
          .nrz-notif-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            color: #fff;
          }
          .nrz-notif-content {
            flex-grow: 1;
            padding: 12px;
          }
          .nrz-notif-title {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 5px;
          }
          .nrz-notif-message {
            font-size: 14px;
          }
          .nrz-notif-close {
            background: none;
            border: none;
            color: #999;
            cursor: pointer;
            font-size: 20px;
            padding: 5px;
            align-self: flex-start;
          }
        `;
        document.head.appendChild(style);
      },
  
      show(message, type = 'info', timeout = 5000) {
        if (!this.container) {
          this.init();
        }
  
        if (this.notifications.length >= this.options.maxNotifications) {
          this.close(this.notifications[0]);
        }
  
        const notif = document.createElement('div');
        notif.className = 'nrz-notif';
        const data = this.getTypeData(type);
  
        notif.innerHTML = `
          <div class="nrz-notif-icon" style="background-color: ${data.color}">
            ${this.getIcon(type)}
          </div>
          <div class="nrz-notif-content">
            <div class="nrz-notif-title">${data.title}</div>
            <div class="nrz-notif-message">${message}</div>
          </div>
          <button class="nrz-notif-close">&times;</button>
        `;
  
        this.container.appendChild(notif);
        this.notifications.push(notif);
  
        setTimeout(() => notif.classList.add('show'), 10);
  
        const closeBtn = notif.querySelector('.nrz-notif-close');
        closeBtn.addEventListener('click', () => this.close(notif));
  
        if (timeout > 0) {
          setTimeout(() => this.close(notif), timeout);
        }
      },
  
      close(notif) {
        notif.classList.remove('show');
        setTimeout(() => {
          notif.remove();
          this.notifications = this.notifications.filter(n => n !== notif);
        }, this.options.animationDuration);
      },
  
      getTypeData(type) {
        const types = {
          success: { color: '#28a745', title: 'Success' },
          error: { color: '#dc3545', title: 'Error' },
          warning: { color: '#ffc107', title: 'Warning' },
          question: { color: '#6c757d', title: 'Question' },
          info: { color: '#17a2b8', title: 'Information' }
        };
        return types[type] || types.info;
      },
  
      getIcon(type) {
        const icons = {
          success: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
          error: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',
          warning: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
          question: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>',
          info: '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>'
        };
        return icons[type] || icons.info;
      }
    };
  
    window.nrzNotif = NrzNotif.show.bind(NrzNotif);
  })(window);