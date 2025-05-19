// Drag and swap logic
  let dragged = null;

  // Select all main grid cells by their draggable attribute
  const gridCells = document.querySelectorAll('.grid > [draggable="true"]');

  gridCells.forEach(cell => {
    cell.addEventListener('dragstart', (e) => {
      dragged = cell;
      cell.style.opacity = '0.5';
    });

    cell.addEventListener('dragend', (e) => {
      cell.style.opacity = '';
      dragged = null;
    });

    cell.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    cell.addEventListener('dragenter', (e) => {
      e.preventDefault();
      if (cell !== dragged) cell.style.outlineColor = '#2563eb';
    });

    cell.addEventListener('dragleave', (e) => {
      cell.style.outlineColor = '';
    });

    cell.addEventListener('drop', (e) => {
      e.preventDefault();
      cell.style.outlineColor = '';
      if (dragged && dragged !== cell) {
        // Swap the grid area classes
        const tempClass = cell.className;
        cell.className = dragged.className;
        dragged.className = tempClass;

        // Swap the IDs (optional, if you want to keep IDs unique per area)
        const tempId = cell.id;
        cell.id = dragged.id;
        dragged.id = tempId;
      }
    });
  });