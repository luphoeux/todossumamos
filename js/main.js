document.addEventListener('DOMContentLoaded', () => {
  console.log('Todos Somos - Qhantuy : Frontend Initialized');

  // Mobile menu toggle logic
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      // Very basic toggle, you might want to expand this to add/remove a class
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

  // Handle generic form submissions with prevention and basic alert
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      // Prevent reload to keep the flow smooth for the frontend presentation
      e.preventDefault();
      
      const formId = form.getAttribute('id');
      if (formId === 'login-form') {
        alert('Simulando inicio de sesión...');
        window.location.href = 'index.html';
      } else if (formId === 'contact-form') {
        alert('¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.');
        form.reset();
      } else if (formId === 'payment-form') {
        alert('Redirigiendo a la pasarela de Qhantuy...');
        window.location.href = 'pago-realizado.html';
      } else {
        alert('Formulario enviado localmente.');
      }
    });
  });

  // ── FAQ Accordion ────────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('faq-item--active');
      // Close all
      faqItems.forEach(i => {
        i.classList.remove('faq-item--active');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      // Open clicked (unless it was already open)
      if (!isActive) {
        item.classList.add('faq-item--active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ── Dynamic Campaigns from Google Sheets ─────────
  const campaignsGrid = document.getElementById('campaigns-grid');
  if (campaignsGrid) {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpWWo7P-c71ljdvMgk2u-ZLH_CV9i-eu1nMxN5XJPjr9c-slnQVvx-djOtwEcYzCKaUimvsz30f8gz/pub?output=csv';

    const categoryColors = {
      'Salud': 'var(--primary)',
      'Animales': '#e74c3c',
      'Educación': '#3498db'
    };

    // Usamos un proxy de CORS (corsproxy.io) para evitar el bloqueo 'Origin null'
    // que ocurre cuando abres el archivo HTML haciendo doble clic desde tu disco duro (file://)
    const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(csvUrl);

    fetch(proxyUrl)
      .then(response => response.text())
      .then(csvText => {
        // Simple CSV parser handling quotes
        const rows = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
        // Remove header row
        rows.shift();

        if (rows.length === 0) {
          campaignsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No hay campañas activas en este momento.</p>';
          return;
        }

        campaignsGrid.innerHTML = ''; // Limpiar el loading state
        
        const allCampaignsHTML = [];

        rows.forEach(rowStr => {
          // Expresión regular para separar por comas pero ignorando las que están dentro de comillas dobles
          const columns = rowStr.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(col => col.replace(/^"|"$/g, '').trim());
          
          if (columns.length < 9) return;

          const titulo = columns[1];
          const categoria = columns[2];
          const descripcion = columns[3];
          const metaBs = parseFloat(columns[4]) || 0;
          const actualBs = parseFloat(columns[5]) || 0;
          const tagColor = categoryColors[categoria] || '#95a5a6';
          const porcentaje = Math.min(100, Math.round((actualBs / metaBs) * 100)) || 0;
          const fmtActual = new Intl.NumberFormat('es-BO').format(actualBs);
          const fmtMeta = new Intl.NumberFormat('es-BO').format(metaBs);

          // Extraer ID de la URL de Google Drive (Columna I = índice 8)
          let imgHtml = `<div class="placeholder-img" style="height: 100%; width: 100%; border-radius: 0; background-color: var(--dark); color: white; display:flex; align-items:center; justify-content:center; text-align: center; padding: 10px;">${titulo}</div>`;
          const rawImgUrl = columns[8]; 
          if (rawImgUrl && rawImgUrl.includes('drive.google.com')) {
            const match = rawImgUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (match && match[1]) {
              // Usar el endpoint de thumbnail de Google Drive que evita los bloqueos de cookies de terceros
              const directImgUrl = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`;
              imgHtml = `<img src="${directImgUrl}" alt="${titulo}" style="width: 100%; height: 100%; object-fit: cover;">`;
            }
          }

          const cardHTML = `
            <div class="card" style="animation: heroFadeIn 0.5s ease both;">
              <div style="height: 180px; width: 100%; overflow: hidden; border-radius: 16px 16px 0 0;">
                ${imgHtml}
              </div>
              <div style="padding: 20px; display: flex; flex-direction: column; flex-grow: 1;">
                <div><span style="background: ${tagColor}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">${categoria}</span></div>
                <h3 style="margin: 10px 0 5px; font-size: 18px;">${titulo}</h3>
                <p class="card-description">${descripcion}</p>
                <div style="margin-top: auto; margin-bottom: 15px;">
                  <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 5px;">
                    <span><strong>Bs. ${fmtActual}</strong> recaudados</span>
                    <span style="color: var(--text-muted);">Meta: Bs. ${fmtMeta}</span>
                  </div>
                  <div style="width: 100%; background: var(--border-color); height: 8px; border-radius: 4px;">
                    <div style="width: ${porcentaje}%; background: ${tagColor}; height: 100%; border-radius: 4px;"></div>
                  </div>
                </div>
                <a href="detalle-campana.html" class="btn btn-outline btn-full">Quiero apoyar</a>
              </div>
            </div>
          `;
          allCampaignsHTML.push(cardHTML);
        });

        // Lógica para renderizar siempre 3 a la vez y deslizar de a 1 tarjeta en HOME
        let currentIndex = 0;
        const itemsPerPage = 3;

        function renderVisibleCampaigns() {
          campaignsGrid.innerHTML = '';
          const totalItems = allCampaignsHTML.length;
          // Mostramos 3, o el total si hay menos de 3
          const showCount = Math.min(itemsPerPage, totalItems); 
          
          for (let i = 0; i < showCount; i++) {
            // El módulo (%) nos permite dar la vuelta al inicio automáticamente
            const indexToRender = (currentIndex + i) % totalItems;
            campaignsGrid.insertAdjacentHTML('beforeend', allCampaignsHTML[indexToRender]);
          }
        }

        // Render inicial
        renderVisibleCampaigns();

        // Rotar moviendo 1 posición cada 30 segundos
        setInterval(() => {
          currentIndex = (currentIndex + 1) % allCampaignsHTML.length;
          renderVisibleCampaigns();
        }, 30000);

      })
      .catch(error => {
        console.error('Error fetching campaigns:', error);
        if(campaignsGrid) campaignsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: red;">Error al cargar las campañas. Intenta de nuevo más tarde.</p>';
      });
  }

  // ── PÁGINA CAMPANAS COMPLETA (Grid) ─────────
  const allCampaignsGridPage = document.getElementById('all-campaigns-grid');
  if (allCampaignsGridPage) {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRpWWo7P-c71ljdvMgk2u-ZLH_CV9i-eu1nMxN5XJPjr9c-slnQVvx-djOtwEcYzCKaUimvsz30f8gz/pub?output=csv';
    const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(csvUrl);

    fetch(proxyUrl)
      .then(response => response.text())
      .then(csvText => {
        const rows = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
        rows.shift();

        if (rows.length === 0) {
          allCampaignsGridPage.innerHTML = '<p style="grid-column: 1 / -1; text-align: center;">No hay campañas activas en este momento.</p>';
          return;
        }

        allCampaignsGridPage.innerHTML = ''; 
        
        const categoryColors = {
          'Salud': 'var(--primary)',
          'Animales': '#e74c3c',
          'Educación': '#3498db',
          'Desastres': '#e67e22',
          'Comunidad': '#9b59b6'
        };

        const checkedIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="var(--primary)" style="flex-shrink:0; margin-left:4px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
        const locIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:2px; vertical-align:middle;"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path><circle cx="12" cy="9" r="2.5"></circle></svg>`;

        // Estructurar los datos
        let allCampanasData = [];
        
        rows.forEach(rowStr => {
          const columns = rowStr.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(col => col.replace(/^"|"$/g, '').trim());
          if (columns.length < 9) return;

          const titulo = columns[1];
          const categoria = columns[2];
          const descripcion = columns[3];
          const metaBs = parseFloat(columns[4]) || 0;
          const actualBs = parseFloat(columns[5]) || 0;
          const tagColor = categoryColors[categoria] || '#95a5a6';
          const porcentaje = Math.min(100, Math.round((actualBs / metaBs) * 100)) || 0;
          
          let directImgUrl = '';
          const rawImgUrl = columns[8]; 
          if (rawImgUrl && rawImgUrl.includes('drive.google.com')) {
            const match = rawImgUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
            if (match && match[1]) {
              directImgUrl = `https://drive.google.com/thumbnail?id=${match[1]}&sz=w800`;
            }
          }
          
          // Asumimos info extra si en el futuro se añade a las columnas
          const ubicacion = titulo.includes("Julián") ? "Santa Cruz" : "La Paz";
          const urgente = porcentaje < 50 && metaBs > 10000;
          const cercaMeta = porcentaje >= 80;

          allCampanasData.push({
            titulo, categoria, descripcion, metaBs, actualBs, tagColor, porcentaje, directImgUrl,
            ubicacion,
            estado: urgente ? 'Urgentes' : (cercaMeta ? 'Cerca de la meta' : 'Nuevas'),
            verificada: true // Mock, asume que todas son verificadas
          });
        });
        
        function renderCampanas(dataArray) {
          if(dataArray.length === 0) {
            allCampaignsGridPage.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding:40px; color:var(--text-muted);">No se encontraron campañas con esos filtros.</p>';
            return;
          }
          
          let htmlRender = '';
          dataArray.forEach(camp => {
            const fmtActual = new Intl.NumberFormat('es-BO').format(camp.actualBs);
            const fmtMeta = new Intl.NumberFormat('es-BO').format(camp.metaBs);
            htmlRender += `
              <div class="card-c">
                <div class="card-img-c">
                  <span class="card-badge" style="background:${camp.tagColor};">${camp.categoria}</span>
                  ${camp.directImgUrl ? `<img src="${camp.directImgUrl}" alt="" onerror="this.onerror=null; this.src='images/todos somos images/login_1.jpg';">` : `<div style="width:100%; height:100%; background:var(--dark);"></div>`}
                </div>
                <div class="card-content-c">
                  <div class="card-loc">${locIcon} ${camp.ubicacion}</div>
                  <h3 class="card-title-c">
                    ${camp.titulo}
                    ${camp.verificada ? checkedIcon : ''}
                  </h3>
                  <p class="card-desc-c">${camp.descripcion}</p>
                  <div class="card-progress-labels">
                    <span>Progreso:</span>
                    <span>${camp.porcentaje}%</span>
                  </div>
                  <div class="card-progress-bar">
                    <div class="card-progress-fill" style="width: ${camp.porcentaje}%; background: ${camp.tagColor};"></div>
                  </div>
                  <div class="card-money">
                    <span>Recaudado: <strong>Bs${fmtActual}</strong></span>
                    <span>Meta: <strong>Bs${fmtMeta}</strong></span>
                  </div>
                  <a href="detalle-campana.html" class="btn-c">Quiero apoyar</a>
                </div>
              </div>
            `;
          });
          allCampaignsGridPage.innerHTML = htmlRender;
        }

        // --- LÓGICA DE FILTRADO ---
        const filterSearch = document.getElementById('filter-search');
        const filterVerified = document.getElementById('filter-verified');
        const filterUbicacionInputs = document.querySelectorAll('#filter-ubicacion input');
        const filterEtiquetasInputs = document.querySelectorAll('#filter-etiquetas input');
        const filterEstadoInputs = document.querySelectorAll('#filter-estado input');

        function applyFilters() {
          const searchText = filterSearch ? filterSearch.value.toLowerCase() : '';
          const checkedVerified = filterVerified ? filterVerified.checked : false;

          // Obtener arrays de los checkboxes marcados
          const getCheckedVals = (inputs) => Array.from(inputs).filter(i => i.checked).map(i => i.value);
          const ubicaciones = getCheckedVals(filterUbicacionInputs);
          const categorias = getCheckedVals(filterEtiquetasInputs);
          const estados = getCheckedVals(filterEstadoInputs);

          const filteredData = allCampanasData.filter(camp => {
            // 1. Verificación
            if (checkedVerified && !camp.verificada) return false;
            
            // 2. Búsqueda por texto (titulo o descripcion)
            if (searchText) {
              const textContent = (camp.titulo + " " + camp.descripcion).toLowerCase();
              if (!textContent.includes(searchText)) return false;
            }

            // 3. Ubicación (Si "Todos" está desmarcado, filtrar)
            if (!ubicaciones.includes("Todos") && ubicaciones.length > 0) {
              if (!ubicaciones.includes(camp.ubicacion)) return false;
            }

            // 4. Categoría/Etiquetas
            if (!categorias.includes("Todos") && categorias.length > 0) {
              if (!categorias.includes(camp.categoria)) return false;
            }

            // 5. Estado
            if (!estados.includes("Todos") && estados.length > 0) {
              if (!estados.includes(camp.estado)) return false;
            }

            return true;
          });

          renderCampanas(filteredData);
        }

        // Setup Event Listeners para cada input del Sidebar
        if (filterSearch) filterSearch.addEventListener('input', applyFilters);
        if (filterVerified) filterVerified.addEventListener('change', applyFilters);
        
        // Función comodín para hacer check en "Todos" desmarque los demás y viceversa
        function setupMutuallyExclusiveGroup(inputsGroup) {
          if(!inputsGroup || inputsGroup.length === 0) return;
          const todosCheck = Array.from(inputsGroup).find(i => i.value === 'Todos');
          if(!todosCheck) return;

          inputsGroup.forEach(input => {
            input.addEventListener('change', (e) => {
              if(e.target.value === 'Todos' && e.target.checked) {
                inputsGroup.forEach(i => { if(i !== todosCheck) i.checked = false; });
              } else if (e.target.checked) {
                todosCheck.checked = false;
              }
              // Asegurar que al menos uno esté checked
              if(Array.from(inputsGroup).filter(i => i.checked).length === 0) {
                todosCheck.checked = true;
              }
              applyFilters();
            });
          });
        }

        setupMutuallyExclusiveGroup(filterUbicacionInputs);
        setupMutuallyExclusiveGroup(filterEtiquetasInputs);
        setupMutuallyExclusiveGroup(filterEstadoInputs);

        // Renderizado Inicial
        renderCampanas(allCampanasData);

      })
      .catch(error => {
        console.error('Error fetching campaigns:', error);
        allCampaignsGridPage.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: red;">Error al cargar las campañas.</p>';
      });
  }
});
