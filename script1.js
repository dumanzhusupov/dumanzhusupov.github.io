document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('clickButton').addEventListener('click', () => {
        alert('Button clicked!');
    });

    document.getElementById('hoverElement').addEventListener('mouseover', () => {
        console.log('Hover effect triggered');
    });

   
    document.addEventListener('keypress', (event) => {
        console.log(`Key pressed: ${event.key}`);
    });

    const scrollTopButton = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollTopButton.style.display = 'block';
        } else {
            scrollTopButton.style.display = 'none';
        }
    });

    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const puzzleContainer = document.querySelector('.puzzle-container');
    const numRows = 6; // 6ч6
    const numCols = 6; 
    const pieceWidth = puzzleContainer.offsetWidth / numCols;
    const pieceHeight = puzzleContainer.offsetHeight / numRows;
    const pieces = [];

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const piece = document.createElement('div');
            piece.id = `piece-${row}-${col}`;
            piece.classList.add('puzzle-piece');
            piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;
            piece.style.top = `${row * pieceHeight}px`;
            piece.style.left = `${col * pieceWidth}px`;
            piece.setAttribute('draggable', true);
            puzzleContainer.appendChild(piece);
            pieces.push(piece);

           
            piece.addEventListener('dragstart', handleDragStart);
            piece.addEventListener('dragover', handleDragOver);
            piece.addEventListener('drop', handleDrop);
            piece.addEventListener('dragend', handleDragEnd);
        }
    }

    let draggedItem = null;

    function handleDragStart(e) {
        draggedItem = this;
        setTimeout(() => this.style.visibility = 'hidden', 0);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const droppedRow = this.style.top;
        const droppedCol = this.style.left;
        this.style.top = draggedItem.style.top;
        this.style.left = draggedItem.style.left;
        draggedItem.style.top = droppedRow;
        draggedItem.style.left = droppedCol;
    }

    function handleDragEnd() {
        this.style.visibility = 'visible';
        checkIfSolved();
    }

    function checkIfSolved() {
        let solved = true;
        for (const piece of pieces) {
            const top = parseInt(piece.style.top);
            const left = parseInt(piece.style.left);
            const row = top / pieceHeight;
            const col = left / pieceWidth;
            if (piece.id !== `piece-${row}-${col}`) {
                solved = false;
                break;
            }
        }
        if (solved) {
            alert('Puzzle solved!');
        }
    }
});

