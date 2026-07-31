/**
 * CASE Weekly Blog - HTML Include System
 * Carga fragmentos HTML de forma asíncrona para mantener DRY
 */

async function loadInclude(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}: ${response.status} ${response.statusText}`);
    }
    const html = await response.text();
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = html;
    } else {
      console.warn(`Element #${elementId} not found`);
    }
  } catch (error) {
    console.error(`Error loading include ${filePath}:`, error);
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = `<p class="include-error">Error loading ${filePath}</p>`;
    }
  }
}

// Auto-load cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Determinar ruta base según la ubicación del archivo
  const isNested = window.location.pathname.includes('/slop/');
  const basePath = isNested ? '../../' : '';
  
  // Header (siempre presente)
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    loadInclude('header-placeholder', basePath + 'fragments/header.html');
  }

  // Footer (siempre presente)
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    loadInclude('footer-placeholder', basePath + 'fragments/footer.html');
  }

  // Archive list (solo en index y archive pages)
  const archivePlaceholder = document.getElementById('archive-placeholder');
  if (archivePlaceholder) {
    loadInclude('archive-placeholder', basePath + 'fragments/archive-list.html');
  }
});
