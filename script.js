// تحميل البيانات من الذاكرة المحلية أو البدء بمصفوفة فارغة
let movies = JSON.parse(localStorage.getItem('myMovies')) || [];

// تبديل الأقسام (الرئيسية / الإدارة)
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    
    if (id === 'home') renderMovies();
    if (id === 'admin') renderAdminList();
}

// التحكم في نافذة الإضافة
function openModal() { document.getElementById('modal').style.display = 'flex'; }
function closeModal() { document.getElementById('modal').style.display = 'none'; }

// حفظ الفيلم الجديد
function saveVideo() {
    const name = document.getElementById('videoName').value;
    const url = document.getElementById('videoUrl').value;

    if (name && url) {
        movies.push({ name, url });
        localStorage.setItem('myMovies', JSON.stringify(movies));
        
        // تنظيف الخانات
        document.getElementById('videoName').value = '';
        document.getElementById('videoUrl').value = '';
        closeModal();
        renderMovies();
    } else {
        alert("الرجاء ملء جميع الخانات");
    }
}

// تشغيل الفيلم داخل الـ Iframe
function playMovie(url) {
    const container = document.getElementById('videoPlayerContainer');
    const iframe = document.getElementById('videoFrame');
    
    iframe.src = url;
    container.style.display = 'flex';
}

function closePlayer() {
    const container = document.getElementById('videoPlayerContainer');
    const iframe = document.getElementById('videoFrame');
    iframe.src = ""; // لإيقاف الفيديو تماماً
    container.style.display = 'none';
}

// عرض الأزرار في الصفحة الرئيسية
function renderMovies() {
    const container = document.getElementById('moviesContainer');
    container.innerHTML = '';

    if (movies.length === 0) {
        container.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">لا توجد أفلام مضافة بعد..</p>';
    }

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerText = movie.name;
        card.onclick = () => playMovie(movie.url);
        container.appendChild(card);
    });
}

// عرض قائمة الإدارة للحذف
function renderAdminList() {
    const list = document.getElementById('adminList');
    list.innerHTML = '<h3>قائمة الأفلام الحالية:</h3>';

    movies.forEach((movie, index) => {
        const item = document.createElement('div');
        item.className = 'admin-item';
        item.innerHTML = `
            <span>${movie.name}</span>
            <button class="delete-btn" onclick="deleteMovie(${index})">حذف 🗑️</button>
        `;
        list.appendChild(item);
    });
}

// حذف فيلم
function deleteMovie(index) {
    if (confirm("هل أنت متأكد من حذف هذا الفيلم؟")) {
        movies.splice(index, 1);
        localStorage.setItem('myMovies', JSON.stringify(movies));
        renderAdminList();
    }
}

// التشغيل الافتراضي عند فتح الموقع
renderMovies();
