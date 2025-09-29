// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");

// Get all paper elements dynamically
const papers = document.querySelectorAll('.paper');
const numOfPapers = papers.length;
const maxLocation = numOfPapers + 1;

console.log(`Detected ${numOfPapers} papers`);

// Event Listeners
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business Logic
let currentLocation = 1;

// Khởi tạo z-index ban đầu cho tất cả papers
function initializeZIndex() {
    papers.forEach((paper, index) => {
        paper.style.zIndex = numOfPapers - index;
    });
}

function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }

    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
    if(currentLocation < maxLocation) {
        const paperToFlip = currentLocation - 1; // Paper cần lật
        console.log(`Going to page ${currentLocation + 1}, flipping paper ${paperToFlip}`);

        // Animation lật paper
        if(currentLocation === 1) {
            openBook();
        } else if(currentLocation === maxLocation - 1) {
            closeBook(false);
        }

        papers[paperToFlip].classList.add("flipped");
        papers[paperToFlip].style.zIndex = 1; // Paper đã lật có z-index thấp nhất

        // Chuyển trang sau khi animation
        currentLocation++;
    }
}

function goPrevPage() {
    if(currentLocation > 1) {
        const paperToUnflip = currentLocation - 2; // Paper cần unflip
        console.log(`Going back to page ${currentLocation - 1}, unflipping paper ${paperToUnflip}`);

        // Animation unflip paper
        if(currentLocation === 2) {
            closeBook(true);
        } else if(currentLocation === maxLocation) {
            openBook();
        }

        papers[paperToUnflip].classList.remove("flipped");
        papers[paperToUnflip].style.zIndex = numOfPapers - paperToUnflip; // Khôi phục z-index ban đầu

        // Chuyển trang sau khi animation
        currentLocation--;
    }
}

// Khởi tạo z-index khi trang được load
document.addEventListener('DOMContentLoaded', function() {
    initializeZIndex();
});