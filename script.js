// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有动画和交互效果
    initNavigation();
    initScrollAnimations();
    initFloatingElements();
    createAdditionalParticles();
    initInteractiveEffects();
    initMusicPlayer();
    initThemeToggle();
});

// 导航栏交互效果
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.2)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // 平滑滚动到锚点
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 滚动动画效果
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // 为时间轴项目添加顺序动画
                if (entry.target.classList.contains('timeline-item')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                    entry.target.style.transitionDelay = delay + 'ms';
                }
                
                // 为特性项目添加顺序动画
                if (entry.target.classList.contains('feature-item')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = delay + 'ms';
                }
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.feature-item, .gallery-item, .timeline-item, .section-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 浮动元素动画
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-crystal, .floating-flower');
    
    floatingElements.forEach((element, index) => {
        // 为每个元素设置不同的动画延迟
        element.style.animationDelay = (index * 1.5) + 's';
        
        // 添加鼠标悬停效果
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}



// 显示消息提示
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        background: ${type === 'success' ? '#4ecdc4' : '#ff6b6b'};
    `;
    
    document.body.appendChild(messageDiv);
    
    // 显示动画
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // 隐藏动画
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// 创建额外的粒子效果
function createAdditionalParticles() {
    const particlesContainer = document.querySelector('.stars');
    
    // 创建星光粒子
    for (let i = 0; i < 50; i++) {
        createStarParticle(particlesContainer);
    }
    
    // 创建花瓣粒子
    for (let i = 0; i < 30; i++) {
        createPetalParticle();
    }
}

// 创建星光粒子
function createStarParticle(container) {
    const star = document.createElement('div');
    star.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: white;
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: twinkle ${3 + Math.random() * 7}s infinite alternate;
    `;
    
    container.appendChild(star);
}

// 创建花瓣粒子
function createPetalParticle() {
    const petal = document.createElement('div');
    const colors = ['#FFB6C1', '#87CEEB', '#D8BFD8'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    petal.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: ${color};
        border-radius: 50% 0 50% 50%;
        opacity: 0.7;
        top: -30px;
        left: ${Math.random() * 100}%;
        pointer-events: none;
        z-index: -1;
        animation: fall ${8 + Math.random() * 12}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
        transform: rotate(${Math.random() * 360}deg);
    `;
    
    document.body.appendChild(petal);
}

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.2); }
    }
    
    @keyframes fall {
        0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.7;
        }
        90% {
            opacity: 0.7;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;

document.head.appendChild(style);

// 鼠标移动效果
document.addEventListener('mousemove', function(e) {
    const cursorEffect = document.createElement('div');
    cursorEffect.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: rgba(255, 182, 193, 0.6);
        border-radius: 50%;
        pointer-events: none;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        z-index: 9999;
        animation: cursorTrail 0.6s linear forwards;
    `;
    
    document.body.appendChild(cursorEffect);
    
    setTimeout(() => {
        document.body.removeChild(cursorEffect);
    }, 600);
});

// 添加光标轨迹动画
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    @keyframes cursorTrail {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
    
    /* 自定义光标 */
    body {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="%23FFB6C1" opacity="0.7"/></svg>'), auto;
    }
`;

document.head.appendChild(cursorStyle);

// 页面加载动画
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #FFB6C1 0%, #87CEEB 50%, #D8BFD8 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center; color: white;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🌸</div>
            <h2 style="font-family: 'Dancing Script', cursive; margin-bottom: 1rem;">爱莉希雅</h2>
            <p>正在加载...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 500);
    }, 2000);
});

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    // ESC键回到顶部
    if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // 空格键暂停/恢复动画
    if (e.key === ' ') {
        e.preventDefault();
        const animations = document.querySelectorAll('*');
        animations.forEach(el => {
            if (el.style.animationPlayState === 'paused') {
                el.style.animationPlayState = 'running';
            } else {
                el.style.animationPlayState = 'paused';
            }
        });
    }
    
    // M键切换音乐
    if (e.key === 'm' || e.key === 'M') {
        toggleMusic();
    }
    
    // T键切换主题
    if (e.key === 't' || e.key === 'T') {
        toggleTheme();
    }
});

// 交互效果初始化
function initInteractiveEffects() {
    // 添加点击粒子效果
    document.addEventListener('click', function(e) {
        createClickParticle(e.clientX, e.clientY);
    });
    
    // 添加滚动视差效果
    initParallaxEffect();
    
    // 添加鼠标跟随效果
    initMouseFollowEffect();
}

// 创建点击粒子效果
function createClickParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, #FFB6C1, #87CEEB);
        border-radius: 50%;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        z-index: 9999;
        animation: clickParticle 1s ease-out forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        document.body.removeChild(particle);
    }, 1000);
}

// 视差效果
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero-wallpaper, .particle-layer');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// 鼠标跟随效果
function initMouseFollowEffect() {
    const follower = document.createElement('div');
    follower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(255, 182, 193, 0.8), transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.1s ease;
        mix-blend-mode: screen;
    `;
    
    document.body.appendChild(follower);
    
    document.addEventListener('mousemove', function(e) {
        follower.style.left = e.clientX - 10 + 'px';
        follower.style.top = e.clientY - 10 + 'px';
    });
}

// 音乐播放器功能
function initMusicPlayer() {
    // 创建音乐播放器界面
    const musicPlayer = document.createElement('div');
    musicPlayer.innerHTML = `
        <div class="music-player">
            <button class="music-toggle" title="播放/暂停音乐 (M键)">
                <span>🎵</span>
            </button>
            <audio id="bgm" loop>
                <source src="sound/《崩坏：星穹铁道》TruE「昔涟」爱门「BGM」加长版.mp3" type="audio/mpeg">
            </audio>
        </div>
    `;
    
    document.body.appendChild(musicPlayer);
    
    // 添加音乐播放器样式
    const style = document.createElement('style');
    style.textContent = `
        .music-player {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        .music-toggle {
            width: 50px;
            height: 50px;
            border: none;
            border-radius: 50%;
            background: rgba(255, 182, 193, 0.9);
            backdrop-filter: blur(10px);
            cursor: pointer;
            font-size: 1.5rem;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .music-toggle:hover {
            transform: scale(1.1);
            background: rgba(255, 182, 193, 1);
        }
        
        .music-toggle.playing {
            background: rgba(135, 206, 235, 0.9);
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        @keyframes clickParticle {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            50% {
                transform: scale(2);
                opacity: 0.5;
            }
            100% {
                transform: scale(3);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // 音乐控制逻辑
    const toggleBtn = document.querySelector('.music-toggle');
    const audio = document.getElementById('bgm');
    
    toggleBtn.addEventListener('click', toggleMusic);
}

// 切换音乐
function toggleMusic() {
    const toggleBtn = document.querySelector('.music-toggle');
    const audio = document.getElementById('bgm');
    
    if (audio.paused) {
        audio.play().then(() => {
            toggleBtn.classList.add('playing');
            toggleBtn.innerHTML = '<span>🎶</span>';
            showMessage('音乐播放中', 'success');
        }).catch(error => {
            console.error('音乐播放失败:', error);
            showMessage('音乐播放失败，请检查文件路径', 'error');
        });
    } else {
        audio.pause();
        toggleBtn.classList.remove('playing');
        toggleBtn.innerHTML = '<span>🎵</span>';
        showMessage('音乐已暂停', 'info');
    }
}

// 主题切换功能
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.title = '切换主题 (T键)';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: rgba(216, 191, 216, 0.9);
        backdrop-filter: blur(10px);
        cursor: pointer;
        font-size: 1.5rem;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', toggleTheme);
    
    // 添加悬停效果
    themeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    themeToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

// 显示消息提示
function showMessage(message, type = 'info') {
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.innerHTML = `
        <span>${message}</span>
        <button class="message-close">×</button>
    `;
    
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 
                   type === 'error' ? 'rgba(244, 67, 54, 0.9)' : 
                   'rgba(33, 150, 243, 0.9)'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        backdrop-filter: blur(10px);
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(messageEl);
    
    // 添加关闭按钮样式
    const closeBtn = messageEl.querySelector('.message-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 10px;
        padding: 0;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    closeBtn.addEventListener('mouseleave', function() {
        this.style.background = 'transparent';
    });
    
    closeBtn.addEventListener('click', function() {
        messageEl.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            if (messageEl.parentNode) {
                document.body.removeChild(messageEl);
            }
        }, 300);
    });
    
    // 3秒后自动消失
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => {
                if (messageEl.parentNode) {
                    document.body.removeChild(messageEl);
                }
            }, 300);
        }
    }, 3000);
}

// 切换主题
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('button[title*="切换主题"]');
    
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        themeToggle.innerHTML = '🌙';
        themeToggle.style.background = 'rgba(216, 191, 216, 0.9)';
        showMessage('切换到明亮主题', 'success');
    } else {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '☀️';
        themeToggle.style.background = 'rgba(135, 206, 235, 0.9)';
        showMessage('切换到暗色主题', 'success');
    }
}

// 添加暗色主题样式
const themeStyle = document.createElement('style');
themeStyle.textContent = `
    .dark-theme {
        filter: invert(1) hue-rotate(180deg);
    }
    
    .dark-theme img,
    .dark-theme video {
        filter: invert(1) hue-rotate(180deg);
    }
`;

document.head.appendChild(themeStyle);

// 壁纸轮播功能
function initWallpaperCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const carouselContainer = document.querySelector('.wallpaper-carousel');
    
    let currentSlide = 0;
    let autoPlayInterval;
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let dragThreshold = 50; // 拖动阈值
    
    // 显示指定幻灯片
    function showSlide(index) {
        // 获取当前活动幻灯片
        const currentActiveSlide = document.querySelector('.carousel-slide.active');
        
        if (currentActiveSlide) {
            // 添加离开动画
            currentActiveSlide.classList.add('leaving');
            currentActiveSlide.classList.remove('active');
            
            // 动画结束后移除类
            setTimeout(() => {
                currentActiveSlide.classList.remove('leaving');
            }, 1500);
        }
        
        // 隐藏所有指示器
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // 显示新幻灯片
        slides[index].classList.add('active', 'entering');
        indicators[index].classList.add('active');
        
        // 动画结束后移除进入类
        setTimeout(() => {
            slides[index].classList.remove('entering');
        }, 1500);
        
        currentSlide = index;
    }
    
    // 下一张幻灯片
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }
    
    // 上一张幻灯片
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        showSlide(prevIndex);
    }
    
    // 自动播放
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // 5秒切换一次
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // 事件监听
    nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });
    
    prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });
    
    // 指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoPlay();
            showSlide(index);
            startAutoPlay();
        });
    });
    
    // 鼠标悬停暂停自动播放
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
    
    // 鼠标拖动控制
    function handleDragStart(e) {
        isDragging = true;
        startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        currentX = startX;
        carouselContainer.style.cursor = 'grabbing';
        stopAutoPlay();
    }
    
    function handleDragMove(e) {
        if (!isDragging) return;
        
        currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        
        // 添加拖动时的视觉反馈
        const dragDistance = currentX - startX;
        const maxDrag = 100;
        const dragPercentage = Math.min(Math.abs(dragDistance) / maxDrag, 1);
        
        // 添加拖动指示器
        if (!document.querySelector('.drag-indicator')) {
            const indicator = document.createElement('div');
            indicator.className = 'drag-indicator';
            indicator.style.cssText = `
                position: absolute;
                top: 50%;
                width: 60px;
                height: 60px;
                background: rgba(255, 182, 193, 0.8);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                color: white;
                z-index: 100;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            carouselContainer.appendChild(indicator);
        }
        
        const indicator = document.querySelector('.drag-indicator');
        if (dragDistance > 0) {
            indicator.innerHTML = '‹';
            indicator.style.left = '20px';
        } else {
            indicator.innerHTML = '›';
            indicator.style.right = '20px';
        }
        indicator.style.opacity = dragPercentage;
        indicator.style.transform = `translateY(-50%) scale(${0.5 + dragPercentage * 0.5})`;
    }
    
    function handleDragEnd(e) {
        if (!isDragging) return;
        
        isDragging = false;
        carouselContainer.style.cursor = '';
        
        const dragDistance = currentX - startX;
        
        // 移除拖动指示器
        const indicator = document.querySelector('.drag-indicator');
        if (indicator) {
            indicator.style.opacity = '0';
            setTimeout(() => {
                if (indicator.parentNode) {
                    indicator.parentNode.removeChild(indicator);
                }
            }, 300);
        }
        
        // 根据拖动距离判断是否切换幻灯片
        if (Math.abs(dragDistance) > dragThreshold) {
            if (dragDistance > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
        
        startAutoPlay();
    }
    
    // 鼠标事件监听
    carouselContainer.addEventListener('mousedown', handleDragStart);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    
    // 触摸事件监听（移动端）
    carouselContainer.addEventListener('touchstart', handleDragStart);
    document.addEventListener('touchmove', handleDragMove);
    document.addEventListener('touchend', handleDragEnd);
    
    // 防止拖动时选中文本
    carouselContainer.addEventListener('dragstart', (e) => e.preventDefault());
    
    // 键盘控制
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        }
    });
    
    // 开始自动播放
    startAutoPlay();
    
    // 添加轮播状态显示
    const statusDisplay = document.createElement('div');
    statusDisplay.className = 'carousel-status';
    statusDisplay.innerHTML = `
        <span class="current-slide">1</span>
        <span class="separator">/</span>
        <span class="total-slides">${slides.length}</span>
    `;
    
    statusDisplay.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.9rem;
        z-index: 10;
        backdrop-filter: blur(10px);
    `;
    
    document.querySelector('.hero-background').appendChild(statusDisplay);
    
    // 更新状态显示
    function updateStatusDisplay() {
        const currentSlideEl = statusDisplay.querySelector('.current-slide');
        currentSlideEl.textContent = currentSlide + 1;
    }
    
    // 监听幻灯片切换
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                updateStatusDisplay();
            }
        });
    });
    
    slides.forEach(slide => {
        observer.observe(slide, { attributes: true });
    });
}

// 在DOM加载完成后初始化轮播
document.addEventListener('DOMContentLoaded', function() {
    initWallpaperCarousel();
});