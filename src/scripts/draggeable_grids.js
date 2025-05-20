// Drag and swap logic
let dragged = null;

// Select all main grid cells by their draggable attribute
const gridCells = document.querySelectorAll('.grid > [draggable="true"]');

gridCells.forEach((cell) => {
  cell.addEventListener("dragstart", (e) => {
    dragged = cell;
    cell.style.opacity = "0.5";
  });

  cell.addEventListener("dragend", (e) => {
    cell.style.opacity = "";
    dragged = null;
  });

  cell.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  cell.addEventListener("dragenter", (e) => {
    e.preventDefault();
    if (cell !== dragged) {
      // Define allowed swap pairs
      const allowedPairs = [
        ["intro", "techstack"],
        ["move", "contact"],
      ];
      const isAllowed = allowedPairs.some(
        ([a, b]) =>
          dragged &&
          ((dragged.id === a && cell.id === b) ||
            (dragged.id === b && cell.id === a))
      );
      cell.style.outlineColor = isAllowed ? "#2563eb" : "#dc2626"; // blue or red
    }
  });

  cell.addEventListener("dragleave", (e) => {
    cell.style.outlineColor = "";
  });

  cell.addEventListener("drop", (e) => {
    e.preventDefault();
    cell.style.outlineColor = "";
    if (dragged && dragged !== cell) {
      // Define allowed swap pairs
      const allowedPairs = [
        ["intro", "techstack"],
        ["move", "contact"],
      ];

      const isAllowed = allowedPairs.some(
        ([a, b]) =>
          (dragged.id === a && cell.id === b) ||
          (dragged.id === b && cell.id === a)
      );

      if (!isAllowed) return;

      // Swap the grid area classes
      const tempClass = cell.className;
      cell.className = dragged.className;
      dragged.className = tempClass;

      // Swap the IDs
      const tempId = cell.id;
      cell.id = dragged.id;
      dragged.id = tempId;
    }
  });
});
