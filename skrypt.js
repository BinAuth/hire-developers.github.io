function otworzOkno(karta) {
    const media = karta.querySelector('img') || karta.querySelector('video');
    const tytul = karta.getAttribute('data-title') || 'Obrazek';
    const opis = karta.getAttribute('data-desc') || '';

    const okno = document.getElementById('okno');
    const zdjecie = document.getElementById('zdjecie');
    const tytul_okno = document.getElementById('tytul_okno');
    const opis_okno = document.getElementById('opis_okno');

    if (media.tagName === 'VIDEO') {
        const wideo = document.createElement('video');
        wideo.src = media.querySelector('source').src;
        wideo.controls = true;
        wideo.autoplay = true;
        wideo.style.maxWidth = '100%';
        wideo.style.maxHeight = '85vh';
        wideo.style.borderRadius = '12px';
        wideo.style.boxShadow = '0 10px 50px rgba(0, 0, 0, 0.5)';
        
        zdjecie.style.display = 'none';
        if (okno.querySelector('video')) {
            okno.querySelector('video').remove();
        }
        okno.querySelector('.zawartosc').insertBefore(wideo, zdjecie);
    } else {
        zdjecie.src = media.src;
        zdjecie.alt = tytul;
        zdjecie.style.display = 'block';
        if (okno.querySelector('video')) {
            okno.querySelector('video').remove();
        }
    }
    
    tytul_okno.textContent = tytul;
    opis_okno.textContent = opis || '';

    okno.classList.add('aktywne');
    okno.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function zamknijOkno() {
    const okno = document.getElementById('okno');
    const zdjecie = document.getElementById('zdjecie');
    okno.classList.remove('aktywne');
    okno.setAttribute('aria-hidden', 'true');
    zdjecie.src = '';
    zdjecie.style.display = 'block';
    const wideo = okno.querySelector('video');
    if (wideo) {
        wideo.pause();
        wideo.remove();
    }
    document.body.style.overflow = '';
}

function otworzModal(czlonek) {
    const modal = document.createElement('div');
    modal.className = 'okno_modalne aktywne';
    modal.innerHTML = `
        <div class="zawartosc_modalu">
            <button class="zamknij_modal" onclick="zamknijModal(this)">×</button>
            <div class="naglowek_modalu">
                <h2 class="tytul_modalu">${czlonek === 'binarylover' ? 'Binarylover' : 'Jurek'}</h2>
                <p class="bio_modalu">${czlonek === 'binarylover' ? 
                    'User-Mode Development · Unreal Engine 5 & Unity · Reverse Engineering, Anti-Analysis & Authorization Systems' : 
                    '• User-mode development for Windows and cross-platform environments<br>•  Unreal Engine 5 and Unity development<br>• Reverse engineering and binary analysis (static and dynamic techniques) for security assessment and resilience testing<br>• Design and implementation of authorization, licensing, and anti-tamper systems to protect commercial software<br>• String protection and obfuscation (runtime encryption/encoding, controlled in-memory representation and sizing to reduce static exposure)<br>• Anti-analysis and anti-debug measures (runtime detection and mitigation strategies, integrity checks, tamper-resistant loading)<br>• Hashing, integrity verification, to ensure code authenticity and resist tampering with software'}</p>
            </div>
            <div class="doswiadczenie_modalu">
                ${czlonek === 'binarylover' ? 
                    '• Usermode cheat development<br>• Unreal Engine 5 integration<br>• Unity game development<br>• Reverse engineering<br>• Exploit development<br>• Authentication systems<br>• Driver communication' : 
                    '• Kernel driver development<br>• IOCTL communication<br>• Shared Memory & IPC<br>• UEFI programming<br>• Hyper-V integration<br>• System call hooking<br>• Memory protection bypass'}
            </div>
            <div class="lista_umiejetnosci">
                <h3 class="tytul_umiejetnosci">Umiejętności techniczne</h3>
                <div class="tag_umiejetnosci">
                    ${czlonek === 'binarylover' ? 
                        '<span class="element_umiejetnosci">C++</span><span class="element_umiejetnosci">C#</span><span class="element_umiejetnosci">UE5</span><span class="element_umiejetnosci">Unity</span><span class="element_umiejetnosci">Reverse Engineering</span><span class="element_umiejetnosci">Cheat Development</span>' : 
                        '<span class="element_umiejetnosci">C++</span><span class="element_umiejetnosci">Assembly</span><span class="element_umiejetnosci">Kernel Drivers</span><span class="element_umiejetnosci">IOCTL</span><span class="element_umiejetnosci">UEFI</span><span class="element_umiejetnosci">Hyper-V</span>'}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function zamknijModal(przycisk) {
    const modal = przycisk.closest('.okno_modalne');
    modal.remove();
    document.body.style.overflow = '';
}

document.getElementById('zamknij')?.addEventListener('click', zamknijOkno);
document.getElementById('okno')?.addEventListener('click', function (e) {
    if (e.target.id === 'okno') zamknijOkno();
});
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        zamknijOkno();
        const modal = document.querySelector('.okno_modalne');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    }

});

