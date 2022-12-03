export const handImgLoad = (imgArray) => new Promise((resolve) => {
    let i = 0;

    imgArray.forEach(item => {
        const img = new Image();
        img.src = item.src;

        img.onload = () => {
            i++;

            (i === imgArray.length) ? resolve() : 0;
        };
    });
});