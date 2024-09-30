const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let backgroundImg = null;

// Функция для начала рисования
canvas.addEventListener('mousedown', () => {
    drawing = true;
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

// Функция рисования
function draw(event) {
    if (!drawing) return;
    
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

// Загрузка изображения как фона
document.getElementById('upload-image').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        backgroundImg = new Image();
        backgroundImg.src = event.target.result;
        backgroundImg.onload = () => {
            ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
        };
    };

    reader.readAsDataURL(file);
});
