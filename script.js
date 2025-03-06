document.addEventListener('DOMContentLoaded', () => {
    // 3D Card Effect
    const container = document.querySelector('.container');
    const card = container.getBoundingClientRect();
    const centerX = card.left + card.width / 2;
    const centerY = card.top + card.height / 2;

    // Mouse movement effect for desktop
    container.addEventListener('mousemove', (e) => {
        const rotateX = -((e.clientY - centerY) / (card.height / 2)) * 5;
        const rotateY = ((e.clientX - centerX) / (card.width / 2)) * 5;
        container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    container.addEventListener('mouseleave', () => {
        container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });

    // Gyroscope effect for mobile devices
    if (window.DeviceOrientationEvent) {
        let lastX = 0;
        let lastY = 0;
        const smoothingFactor = 0.1;
        const maxAngle = 15;
        let isActive = false;
        let resetTimeout;
    
        window.addEventListener('deviceorientation', (e) => {
            // Clear any existing reset timeout
            if (resetTimeout) {
                clearTimeout(resetTimeout);
            }

            // Set active state
            isActive = true;

            // Check if device is in portrait mode
            const isPortrait = window.innerHeight > window.innerWidth;
            
            // Get raw tilt values
            const rawX = isPortrait ? e.beta - 45 : e.gamma;
            const rawY = isPortrait ? e.gamma : e.beta - 45;
            
            // Apply smoothing
            lastX = lastX + (rawX - lastX) * smoothingFactor;
            lastY = lastY + (rawY - lastY) * smoothingFactor;
            
            // Limit the rotation angles
            const rotateX = Math.min(Math.max(lastX * 0.5, -maxAngle), maxAngle);
            const rotateY = Math.min(Math.max(lastY * 0.5, -maxAngle), maxAngle);
            
            // Apply smooth transition
            container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            // Set timeout to reset position
            resetTimeout = setTimeout(() => {
                if (isActive) {
                    isActive = false;
                    container.style.transition = 'transform 0.5s ease';
                    container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
                    setTimeout(() => {
                        container.style.transition = 'transform 0.1s ease';
                    }, 500);
                }
            }, 100);
        });
    }

    // Banner, landscape, and profile image handling
    const banner = document.querySelector('.banner');
    const landscape = document.querySelector('.landscape');
    const glowingOrb = document.querySelector('.glowing-orb');
    const orbContents = document.querySelector('.orb-contents');

    // Set banner image if URL is provided
    const bannerUrl = banner.getAttribute('data-image-url');
    if (bannerUrl) {
        banner.style.background = `url(${bannerUrl}) center/cover no-repeat`;
    }

    // Set landscape image if URL is provided
    const landscapeUrl = landscape.getAttribute('data-image-url');
    if (landscapeUrl) {
        landscape.style.background = `url(${landscapeUrl}) center/cover no-repeat`;
    }

    // Set profile photo if URL is provided
    const profilePhotoUrl = glowingOrb.getAttribute('data-image-url');
    if (profilePhotoUrl) {
        orbContents.querySelector('img').src = profilePhotoUrl;
    }

    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Social media links configuration
    const socialLinks = {
        'SOCIAL 1': 'https://twitter.com/exploriot',
        'SOCIAL 2': 'https://github.com/exploriot',
        'SOCIAL 3': 'https://discord.gg/exploriot',
        'SOCIAL 4': 'https://youtube.com/@exploriot'
    };

    // Make social items clickable with actual links
    const socialItems = document.querySelectorAll('.social-item');
    socialItems.forEach(item => {
        item.addEventListener('click', () => {
            const socialName = item.querySelector('.social-label').textContent;
            const socialUrl = socialLinks[socialName];
            if (socialUrl) {
                window.open(socialUrl, '_blank');
            }
        });
    });

    // Project links configuration
    const projectLinks = {
        'Space Shooter': 'https://github.com/exploriot/space-shooter',
        'Movie Website': 'https://github.com/exploriot/movie-website',
        'Netflix Clone': 'https://github.com/exploriot/netflix-clone',
        'Social Links Website': 'https://github.com/exploriot/social-links',
        'Calculator App': 'https://github.com/exploriot/calculator-app',
        'PROJECT NAME': 'https://github.com/exploriot/project-6',
        'PROJECT NAME': 'https://github.com/exploriot/project-7',
        'PROJECT NAME': 'https://github.com/exploriot/project-8'
    };

    // Make project items clickable with actual links
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectName = item.querySelector('.project-label').textContent;
            const projectUrl = projectLinks[projectName];
            if (projectUrl) {
                window.open(projectUrl, '_blank');
            }
        });
    });

    // Make the "More Coming Soon" button show a custom message
    const moreProjects = document.querySelector('.more-projects');
    if (moreProjects) {
        moreProjects.addEventListener('click', () => {
            const message = document.createElement('div');
            message.style.position = 'fixed';
            message.style.top = '50%';
            message.style.left = '50%';
            message.style.transform = 'translate(-50%, -50%)';
            message.style.background = 'rgba(255, 0, 0, 0.9)';
            message.style.color = 'white';
            message.style.padding = '20px';
            message.style.borderRadius = '10px';
            message.style.zIndex = '1000';
            message.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.5)';
            message.textContent = 'Exciting new projects are in development! Check back soon!';
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.style.opacity = '0';
                message.style.transition = 'opacity 0.5s ease';
                setTimeout(() => document.body.removeChild(message), 500);
            }, 2000);
        });
    }
});
