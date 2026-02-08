const images = [
    'https://images.unsplash.com/photo-1535868463750-c78d9543614f',
    'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e',
    'https://images.unsplash.com/photo-1615714781440-ae4045fb9f4f'
];

async function checkImages() {
    for (const url of images) {
        try {
            const res = await fetch(url, { method: 'HEAD' });
            if (res.status === 200) {
                console.log(`[OK] ${url.substring(0, 40)}...`);
            } else {
                console.log(`[FAIL ${res.status}] ${url}`);
            }
        } catch (e: any) {
            console.log(`[ERR] ${e.message}`);
        }
    }
}

checkImages();
