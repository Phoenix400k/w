let movies = JSON.parse(localStorage.getItem('myMovies')) || [];

function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    if (id === 'home') renderMovies();
    if (id === 'admin') renderAdminList();
}

function openModal() { document.getElementById('modal').style.display = 'flex'; }
function closeModal() { document.getElementById('modal').style.display = 'none'; }

function saveVideo() {
    const name = document.getElementById('videoName').value;
    const url = document.getElementById('videoUrl').value;
    if (name && url) {
        movies.push({ name, url });
        localStorage.setItem('myMovies', JSON.stringify(movies));
        document.getElementById('videoName').value = '';
        document.getElementById('videoUrl').value = '';
        closeModal();
        renderMovies();
    }
}

// الدالة المعدلة لعرض الفيديو بدلاً من تحميله
function playMovie(url) {
    const overlay = document.getElementById('videoPlayerOverlay');
    const playerBox = document.getElementById('playerBox');
    
    // فحص إذا كان الرابط مباشراً (MP4 أو Stream)
    const isDirectLink = url.includes('.mp4') || url.includes('stream') || url.includes('m3u8');

    if (isDirectLink) {
        playerBox.innerHTML = `
            <button class="close-player" onclick="closePlayer()">إغلاق ✕</button>
            <video controls autoplay>
                <source src="${url}" type="video/mp4">
                متصفحك لا يدعم تشغيل هذا النوع من الملفات.
            </video>`;
    } else {
        playerBox.innerHTML = `
            <button class="close-player" onclick="closePlayer()">إغلاق ✕</button>
            <iframe src="${url}" allowfullscreen frameborder="0"></iframe>`;
    }
    overlay.style.display = 'flex';
}

function closePlayer() {
    const overlay = document.getElementById('videoPlayerOverlay');
    const playerBox = document.getElementById('playerBox');
    playerBox.innerHTML = ''; // تفريغ المشغل لإيقاف الصوت
    overlay.style.display = 'none';
}

function renderMovies() {
    const container = document.getElementById('moviesContainer');
    container.innerHTML = '';
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerText = movie.name;
        card.onclick = () => playMovie(movie.url);
        container.appendChild(card);
    });
}

function renderAdminList() {
    const list = document.getElementById('adminList');
    list.innerHTML = '<h3>الأفلام الحالية:</h3>';
    movies.forEach((movie, index) => {
        const item = document.createElement('div');
        item.className = 'admin-item';
        item.innerHTML = `<span>${movie.name}</span> <button class="delete-btn" onclick="deleteMovie(${index})">حذف</button>`;
        list.appendChild(item);
    });
}

function deleteMovie(index) {
    movies.splice(index, 1);
    localStorage.setItem('myMovies', JSON.stringify(movies));
    renderAdminList();
}

renderMovies();
