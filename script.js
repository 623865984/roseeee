// 图片数据 - 实际项目中可以从服务器获取
const images = [
    {
        filename: 'blackpink-jump-8k-3840x2160-23197.jpeg',
        title: 'BLACKPINK 跳跃瞬间'
    },
    {
        filename: 'blackpink-pink-3840x2160-22431.jpg',
        title: '粉色主题造型'
    },
    {
        filename: 'rose-blackpink-3840x2160-21408.jpg',
        title: '朴彩英舞台魅力'
    },
    {
        filename: 'rose-blackpink-3840x2160-21596.jpg',
        title: '优雅气质'
    },
    {
        filename: 'rose-blackpink-3840x2160-22459.jpg',
        title: '迷人微笑'
    },
    {
        filename: 'rose-blackpink-3840x2160-22482.jpg',
        title: '专注表演'
    },
    {
        filename: 'rose-blackpink-3840x2160-23173.jpg',
        title: '时尚写真'
    },
    {
        filename: 'rose-blackpink-born-3840x2160-22603.jpg',
        title: '出生证明概念照'
    },
    {
        filename: 'rose-blackpink-jump-3840x2160-23171.jpg',
        title: '跳跃瞬间特写'
    }
];

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 加载画廊图片
    loadGallery();

    // 初始化图片查看器
    initImageViewer();

    // 添加平滑滚动效果
    addSmoothScroll();

    // 初始化滚动动画
    initScrollAnimation();

    // 初始化留言板
    initMessageBoard();
});

// 加载画廊图片
function loadGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    images.forEach((image, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = index;

        galleryItem.innerHTML = `
            <img src="rose/${image.filename}" alt="${image.title}">
            <div class="gallery-overlay">
                <h3>${image.title}</h3>
            </div>
        `;

        galleryGrid.appendChild(galleryItem);
    });
}

// 初始化图片查看器
function initImageViewer() {
    // 创建图片查看器元素
    const viewer = document.createElement('div');
    viewer.className = 'image-viewer';
    viewer.id = 'imageViewer';

    viewer.innerHTML = `
        <div class="viewer-content">
            <span class="close-btn">&times;</span>
            <span class="prev-btn">&lt;</span>
            <img class="viewer-image" src="" alt="">
            <span class="next-btn">&gt;</span>
        </div>
    `;

    document.body.appendChild(viewer);

    const imageViewer = document.getElementById('imageViewer');
    const viewerImage = document.querySelector('.viewer-image');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    // 打开图片查看器
    document.addEventListener('click', function(e) {
        if (e.target.closest('.gallery-item')) {
            const galleryItem = e.target.closest('.gallery-item');
            currentIndex = parseInt(galleryItem.dataset.index);
            updateViewerImage();
            imageViewer.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    // 关闭图片查看器
    closeBtn.addEventListener('click', function() {
        imageViewer.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // 点击外部关闭
    imageViewer.addEventListener('click', function(e) {
        if (e.target === imageViewer) {
            imageViewer.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // 上一张图片
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateViewerImage();
    });

    // 下一张图片
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        updateViewerImage();
    });

    // 键盘导航
    document.addEventListener('keydown', function(e) {
        if (!imageViewer.classList.contains('active')) return;

        if (e.key === 'Escape') {
            imageViewer.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateViewerImage();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % images.length;
            updateViewerImage();
        }
    });

    // 更新查看器图片
    function updateViewerImage() {
        viewerImage.src = `rose/${images[currentIndex].filename}`;
        viewerImage.alt = images[currentIndex].title;
    }
}

// 平滑滚动
function addSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// 滚动到画廊
function scrollToGallery() {
    const gallery = document.getElementById('gallery');
    if (gallery) {
        gallery.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// 滚动动画
function initScrollAnimation() {
    const sections = document.querySelectorAll('section');

    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.8) {
                section.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // 初始检查
}

// 留言板功能
function initMessageBoard() {
    const messageForm = document.getElementById('messageForm');
    const messagesList = document.getElementById('messagesList');

    if (!messageForm || !messagesList) return;

    // 添加示例留言数据
    addSampleMessages();

    // 加载存储的留言
    loadMessages();

    // 绑定表单提交事件
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const nameInput = document.getElementById('name');
        const messageInput = document.getElementById('message');

        const name = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (name && message) {
            // 创建新留言
            const newMessage = {
                id: Date.now(),
                name: name,
                content: message,
                date: new Date().toLocaleString()
            };

            // 保存留言
            saveMessage(newMessage);

            // 清空表单
            nameInput.value = '';
            messageInput.value = '';

            // 更新留言列表
            loadMessages();

            // 显示成功提示
            showNotification('留言提交成功！');
        }
    });

    // 加载留言
    function loadMessages() {
        const messages = getMessages();
        messagesList.innerHTML = '';

        if (messages.length === 0) {
            messagesList.innerHTML = '<p class="no-messages">暂无留言，快来发表你的第一条留言吧！</p>';
            return;
        }

        // 按时间倒序排列
        messages.sort((a, b) => b.id - a.id).forEach(message => {
            const messageItem = document.createElement('div');
            messageItem.className = 'message-item';

            messageItem.innerHTML = `
                <div class="message-header">
                    <span class="message-name">${escapeHtml(message.name)}</span>
                    <span class="message-date">${message.date}</span>
                </div>
                <div class="message-content">${escapeHtml(message.content)}</div>
            `;

            messagesList.appendChild(messageItem);
        });
    }

    // 获取所有留言
    function getMessages() {
        const messages = localStorage.getItem('blackpinkMessages');
        return messages ? JSON.parse(messages) : [];
    }

    // 保存新留言
    function saveMessage(message) {
        const messages = getMessages();
        messages.push(message);
        localStorage.setItem('blackpinkMessages', JSON.stringify(messages));
    }

    // 显示通知
    function showNotification(message) {
        // 检查是否已存在通知元素
        let notification = document.getElementById('notification');

        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'notification';
            notification.className = 'notification';
            document.body.appendChild(notification);

            // 添加通知样式
            const style = document.createElement('style');
            style.textContent = `
                .notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background-color: var(--primary-color);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 4px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                    transform: translateY(100px);
                    opacity: 0;
                    transition: all 0.3s ease;
                    z-index: 1000;
                }
                .notification.show {
                    transform: translateY(0);
                    opacity: 1;
                }
            `;
            document.head.appendChild(style);
        }

        notification.textContent = message;
        notification.classList.add('show');

        // 3秒后隐藏通知
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // 添加示例留言数据
function addSampleMessages() {
    const messages = getMessages();
    if (messages.length === 0) {
        const sampleMessages = [
            {
                id: Date.now() - 3600000,
                name: "BLINK_1",
                content: "彩英的嗓音真的太迷人了！永远支持你！",
                date: new Date(Date.now() - 3600000).toLocaleString()
            },
            {
                id: Date.now() - 1800000,
                name: "Rosie_Fan",
                content: "期待彩英的solo新曲！",
                date: new Date(Date.now() - 1800000).toLocaleString()
            },
            {
                id: Date.now() - 600000,
                name: "Blackpink_In_Your_Area",
                content: "四人四色，各有魅力，但彩英的笑容最让我心动！",
                date: new Date(Date.now() - 600000).toLocaleString()
            }
        ];
        
        localStorage.setItem('blackpinkMessages', JSON.stringify(sampleMessages));
    }
}

// 转义HTML特殊字符
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
}

// 简单的图片预加载
function preloadImages() {
    images.forEach(image => {
        const img = new Image();
        img.src = `rose/${image.filename}`;
    });
}