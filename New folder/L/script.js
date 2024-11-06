document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('يرجى ملء جميع الحقول.');
        return;
    }

    const feedbackMessage = document.createElement('div');
    feedbackMessage.textContent = 'شكرًا على تواصلك معنا!';
    feedbackMessage.classList.add('feedback-message');
    this.parentNode.insertBefore(feedbackMessage, this.nextSibling);

    this.reset();

    setTimeout(() => {
        feedbackMessage.remove();
    }, 5000);
});

// وظيفة البحث الذكي
// وظيفة البحث الذكي المتقدم مع تجاوز الأخطاء الإملائية
document.querySelector('.search-box').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase().trim();
    const lessons = document.querySelectorAll('.lesson-card');

    if (searchValue === '') {
        // عرض جميع الدروس إذا كان الحقل فارغاً
        lessons.forEach(lesson => lesson.style.display = 'block');
        return;
    }

    lessons.forEach(lesson => {
        const lessonName = lesson.getAttribute('data-lesson-name').toLowerCase();

        // التحقق من التشابه عبر مطابقة الكلمة المدخلة أو جزء منها أو عبر التشابه
        if (lessonName.includes(searchValue) || similarity(lessonName, searchValue) > 0.5) {
            lesson.style.display = 'block';
        } else {
            lesson.style.display = 'none';
        }
    });
});

// دالة لحساب التشابه بين النصوص باستخدام Levenshtein Distance
function similarity(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(null));

    for (let i = 0; i <= len1; i++) matrix[i][0] = i;
    for (let j = 0; j <= len2; j++) matrix[0][j] = j;

    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i][j - 1] + 1,      // الحذف
                matrix[i - 1][j] + 1,      // الإضافة
                matrix[i - 1][j - 1] + indicator // التبديل
            );
        }
    }

    const distance = matrix[len1][len2];
    return (len1 + len2 - distance) / (len1 + len2);
}

// فتح نافذة dialog للتواصل
function openContactDialog() {
    document.getElementById('contactDialog').showModal();
}

// إغلاق نافذة dialog للتواصل
function closeContactDialog() {
    document.getElementById('contactDialog').close();
}

// إرسال نموذج الاتصال
document.querySelector('#contactDialog form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('يرجى ملء جميع الحقول.');
        return;
    }

    alert('شكرًا على تواصلك معنا!');
    this.reset();
    closeContactDialog();
});

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        const welcomeAnimation = document.getElementById("welcome-animation");
        if (welcomeAnimation) {
            welcomeAnimation.remove();
        }
    }, 4000); // يطابق مدة الأنميشن
});
