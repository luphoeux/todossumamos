const siteHeader = `
  <header>
    <div class="nav-container">
      <a href="index.html" class="logo">
        <img src="images/todos somos images/logo_color.svg" alt="Todos Somos - Qhantuy" class="logo-img">
      </a>
      
      <nav class="nav-links">
        <a href="index.html">Inicio</a>
        <a href="campanas.html">Campañas activas</a>
        <a href="como-funciona.html">¿Cómo funciona?</a>
        <a href="contacto.html">Contáctanos</a>
      </nav>

      <div class="nav-actions">
        <!-- Social media icons -->
        <div class="nav-social">
          <a href="#" class="nav-social-btn" aria-label="Facebook" title="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" class="nav-social-btn" aria-label="Instagram" title="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="#" class="nav-social-btn" aria-label="X (Twitter)" title="X">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.402 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" class="nav-social-btn" aria-label="LinkedIn" title="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
        <div class="nav-divider"></div>
        <div class="lang-switcher" id="langSwitcher">
          <button class="lang-btn" id="langBtn" aria-haspopup="true" aria-expanded="false">
            <img src="images/todos somos images/bo.svg" class="lang-flag-img" alt="Bolivia" id="langFlagImg">
            <span class="lang-code">ES</span>
            <svg class="lang-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <ul class="lang-dropdown" id="langDropdown" role="listbox">
            <li class="lang-option lang-option--active" data-lang="es" role="option">
              <img src="images/todos somos images/bo.svg" class="lang-flag-img" alt="Bolivia"> <span>Español</span> <span class="lang-code-sm">ES</span>
            </li>
            <li class="lang-option" data-lang="en" role="option">
              <img src="images/todos somos images/us.svg" class="lang-flag-img" alt="USA"> <span>English</span> <span class="lang-code-sm">EN</span>
            </li>
            <li class="lang-option" data-lang="pt" role="option">
              <img src="images/todos somos images/br.svg" class="lang-flag-img" alt="Brasil"> <span>Português</span> <span class="lang-code-sm">PT</span>
            </li>
          </ul>
        </div>
        <a href="login.html" class="btn btn-campaign">Inicia tu campaña</a>
        <button class="mobile-menu-btn">☰</button>
      </div>
    </div>
  </header>
`;

const carouselItems = Array.from({length: 12}, (_, i) => `
  <div class="footer-carousel-item">
    <img src="images/footer images/footer_image_${i+1}.png" alt="Solidaridad en acción ${i+1}" onerror="this.src=''; this.parentElement.style.backgroundColor='#8A2BE2'; this.parentElement.innerHTML='Imagen ${i+1}'">
  </div>
`).join('');

const carouselHTML = `
  <div class="footer-carousel-container">
    <div class="footer-carousel-track">
      ${carouselItems}
      ${carouselItems}
    </div>
  </div>
`;

const siteFooter = `
  ${carouselHTML}
  <footer>
    <div class="container footer-top">
      <div>
        <div class="logo" style="color: white; margin-bottom: 20px;">
          <img src="images/todos somos images/logo_blanco.svg" alt="Todos Somos - Qhantuy" class="logo-img logo-img--footer">
        </div>
        <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px; max-width: 400px;">
          <h4 style="color: white; margin-bottom: 10px;">Mantente informado</h4>
          <p style="font-size: 14px; color: rgba(255,255,255,0.7);">Recibe notificaciones de las causas que apoyas y nuevas campañas urgentes.</p>
          <form class="newsletter-form" onsubmit="event.preventDefault(); alert('Suscrito correctamente!');">
            <input type="email" placeholder="Tu correo electrónico" required>
            <button type="submit" class="btn btn-secondary" style="border-radius: 4px; padding: 10px 20px;">Unirme</button>
          </form>
        </div>
      </div>
      
      <div>
        <h4 class="footer-title" style="font-size: 18px;">Explorar</h4>
        <ul class="footer-links" style="color: rgba(255,255,255,0.7);">
          <li><a href="campanas.html">Causas Urgentes</a></li>
          <li><a href="como-funciona.html">Cómo Funciona</a></li>
          <li><a href="login.html">Crear Una Campaña</a></li>
          <li><a href="#">Donaciones Verificadas</a></li>
          <li><a href="#">Preguntas Frecuentes</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-title" style="font-size: 18px;">Contacto</h4>
        <ul class="footer-links" style="color: rgba(255,255,255,0.7);">
          <li><strong>Ubicación:</strong><br>La Paz Bolivia, Av. Mecapaca N453 Zona Obrajes Calle 25</li>
          <li style="margin-top: 15px;"><strong>Email:</strong><br>contacto@somostodos.bo</li>
          <li><strong>Tel:</strong><br>+591 65558742</li>
        </ul>
      </div>
    </div>
    
    <div class="container footer-bottom" style="color: rgba(255,255,255,0.5);">
      <p>© 2026 Todos Sumamos | Plataforma de Solidaridad Digital | Todos los derechos reservados.</p>
      <div style="display: flex; gap: 20px;">
        <a href="#">Términos y Condiciones</a>
        <a href="#">Privacidad</a>
        <a href="#">Soporte</a>
      </div>
    </div>
  </footer>

  <!-- WhatsApp Floating Widget -->
  <div class="wa-widget" id="waWidget">
    <a href="https://wa.me/59165558742" target="_blank" class="wa-btn" id="waBtn" aria-label="Chat por WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.135.558 4.14 1.532 5.875L0 24l6.292-1.508A11.955 11.955 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.017-1.378l-.36-.213-3.733.894.944-3.64-.234-.374A9.818 9.818 0 1 1 12 21.818z"/>
      </svg>
    </a>
    <div class="wa-bubble wa-bubble--hidden" id="waBubble">
      <p>¿Tienes alguna duda?<br><strong>¡Escríbenos!</strong></p>
      <button class="wa-close" id="waClose" aria-label="Cerrar">×</button>
    </div>

  </div>
`;

class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = siteHeader;
    // Set active link properly based on current URL path
    const path = window.location.pathname;
    const page = path.split("/").pop();
    const links = this.querySelectorAll('.nav-links a');
    links.forEach(link => {
      if (link.getAttribute('href') === page || (page === '' && link.getAttribute('href') === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Re-attach mobile menu logic specific to this component instance
    const mobileMenuBtn = this.querySelector('.mobile-menu-btn');
    const navLinks = this.querySelector('.nav-links');
    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
          navLinks.style.display = 'none';
        } else {
          navLinks.style.display = 'flex';
          navLinks.style.flexDirection = 'column';
          navLinks.style.position = 'absolute';
          navLinks.style.top = '80px';
          navLinks.style.left = '0';
          navLinks.style.width = '100%';
          navLinks.style.backgroundColor = 'white';
          navLinks.style.padding = '20px';
          navLinks.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        }
      });
    }

    // Language switcher toggle
    const langBtn = this.querySelector('#langBtn');
    const langDropdown = this.querySelector('#langDropdown');
    const langOptions = this.querySelectorAll('.lang-option');

    if (langBtn && langDropdown) {
      langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = langDropdown.classList.toggle('lang-dropdown--open');
        langBtn.setAttribute('aria-expanded', isOpen);
      });

      langOptions.forEach(opt => {
        opt.addEventListener('click', () => {
          // Update active state
          langOptions.forEach(o => o.classList.remove('lang-option--active'));
          opt.classList.add('lang-option--active');
          // Update button label
          const flagImg = opt.querySelector('.lang-flag-img');
          const code = opt.querySelector('.lang-code-sm').textContent;
          const btnFlagImg = langBtn.querySelector('.lang-flag-img');
          btnFlagImg.src = flagImg.src;
          btnFlagImg.alt = flagImg.alt;
          langBtn.querySelector('.lang-code').textContent = code;
          // Close dropdown
          langDropdown.classList.remove('lang-dropdown--open');
          langBtn.setAttribute('aria-expanded', 'false');
          // TODO: trigger actual translation here
        });
      });

      // Close on outside click
      document.addEventListener('click', () => {
        langDropdown.classList.remove('lang-dropdown--open');
        langBtn.setAttribute('aria-expanded', 'false');
      });
    }
  }
}

class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = siteFooter;

    // Lógica del slide de imágenes cada 7 segundos (Sin pausa al infinito)
    const track = this.querySelector('.footer-carousel-track');
    if (track) {
      let currentIndex = 0;
      const totalOriginalItems = 12; // Cantidad original de imágenes antes del duplicado

      setInterval(() => {
        currentIndex++;
        
        // El track tiene 24 items en total (width: 400%). Mover 1 item equivale a avanzar 1/24 (o sea 4.1666% de su total)
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${(currentIndex / 24) * 100}%)`;

        // Si llegamos al final del primer set (se está mostrando el inicio del set duplicado)
        if (currentIndex === totalOriginalItems) {
          // Esperamos a que la transición termine (500ms) y "reseteamos" instantáneamente a 0
          setTimeout(() => {
            track.style.transition = 'none'; // Quitar animación para el salto invisible
            track.style.transform = `translateX(0)`;
            currentIndex = 0; 
            // Forzar un repaint (reflow corto) para que la próxima transición funcione
            track.offsetHeight;
          }, 500);
        }
      }, 7000); // 7 segundos exactamente por petición
    }

    // WhatsApp widget bubble toggle
    const waBubble = document.getElementById('waBubble');
    const waClose = document.getElementById('waClose');
    
    if (waBubble && waClose) {
      // 10s timeout to show the bubble
      setTimeout(() => {
        waBubble.classList.remove('wa-bubble--hidden');
      }, 30000);

      // Close logic
      waClose.addEventListener('click', (e) => {
        e.preventDefault();
        waBubble.classList.add('wa-bubble--hidden');
      });
    }
  }
}

customElements.define('app-header', AppHeader);
customElements.define('app-footer', AppFooter);
