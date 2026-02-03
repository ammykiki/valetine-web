document.addEventListener("DOMContentLoaded", function () {
    const envelope = document.querySelector(".envelope-wrapper");
    const letterText = document.querySelector(".text p");
    const heart = document.querySelector(".heart");
    const imageContainer = document.querySelector(".background-images");
    const imageList = [
        "zhuzhu1.jpg", "zhuzhu2.jpg", "zhuzhu3.jpg",
        "zhuzhu4.jpg", "zhuzhu5.jpg", "zhuzhu6.jpg",
        "zhuzhu7.jpg", "zhuzhu8.jpg", "zhuzhu9.jpg",
        "zhuzhu10.jpg", "zhuzhu11.jpg", "zhuzhu12.jpg",
        "zhuzhu13.jpg", "zhuzhu14.jpg", "zhuzhu15.jpg",
        "zhuzhu16.jpg", "zhuzhu17.jpg", "zhuzhu18.jpg",
        "zhuzhu19.jpg", "zhuzhu20.jpg", "zhuzhu21.jpg",
        "zhuzhu22.jpg", "zhuzhu23.jpg", "zhuzhu24.jpg",
        "zhuzhu25.jpg", "zhuzhu26.jpg", "zhuzhu27.jpg",
        "zhuzhu28.jpg", "zhuzhu29.jpg", "zhuzhu30.jpg",
        "zhuzhu31.jpg", "zhuzhu32.jpg",
    ];

    let message = "အသက်ကြီးလာလေ ပိုပိုပင်ပန်းလာရလေပဲနော် စိုက်ပျိုးသမျှက အသီးအပွင့်ပြန်ဖြစ်မှာမို့လို့ အားတင်းထားပါဦး နောင်ချစ်သူများနေ့တွေတိုင်းကိုလည်း အတူတူ ဖြတ်ကျော်သွားချင်ပါတယ်,Your koe koe💖";
    let index = 0;

    function typeLetter() {
        if (index < message.length) {
            letterText.innerHTML += message.charAt(index);
            index++;
            setTimeout(typeLetter, 100);
        }
    }

    envelope.addEventListener("click", () => {
        const letter = document.querySelector(".letter");
    
        if (envelope.classList.contains("flap")) {
            envelope.classList.remove("flap");
            letter.style.bottom = "0"; // Move letter back inside the envelope
            letter.style.transform = "scale(1)"; // Reset scaling
            setTimeout(() => {
                envelope.style.zIndex = "2"; // Ensure lid is above
            }, 500);
        } else {
            envelope.classList.add("flap");
            setTimeout(() => {
                
                letter.style.bottom = "100px"; // Move letter out of the envelope
                letter.style.transform = "scale(1.5)"; // Make it bigger when out
                typeLetter();
                placeImages();
                setTimeout(createConfetti,createHeart, 1500);
                positionHearts();
                
            }, 700);
            
        }
    });

    heart.addEventListener("mouseover", function () {
        heart.style.transform = "scale(1.2)";
    });

    heart.addEventListener("mouseleave", function () {
        heart.style.transform = "scale(1)";
    });


    function createConfetti() {
        for (let i = 0; i < 30; i++) {
            let confetti = document.createElement("div");
            confetti.classList.add("confetti");
            document.body.appendChild(confetti);
            confetti.style.left = Math.random() * window.innerWidth + "px";
            confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
            confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;

            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }
    }

    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart-shape");

        const colors = ["#FFFF33", "#FFFDD0", "#FFFAFA"];
        heart.style.background = colors[Math.floor(Math.random() * colors.length)];

        heart.style.setProperty("--heart-color", heart.style.background);
        return heart;
    }

    function positionHearts() {
        const numHearts = 300;
        for (let i = 0; i < numHearts; i++) {
            const heart = createHeart();
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = `${Math.random() * -50}%`;
            heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
            heart.style.animationDelay = `${Math.random() * 2}s`;
            document.querySelector(".background-hearts").appendChild(heart);
        }
    }

    function placeImages() {
        imageContainer.innerHTML = ""; // Clear existing images
        let placedImages = []; // Store placed image positions
    
        let maxImages = imageList.length; // Use all images
        let imgWidth = 120; // Approximate image width
        let imgHeight = 150; // Approximate image height
        let padding = 20; // Extra spacing to prevent overlap
    
        for (let i = 0; i < maxImages; i++) {
            let img = document.createElement("img");
            img.src = `images/${imageList[i]}`;
            img.style.width = imgWidth + "px";
            img.style.height = "auto";
            img.style.opacity = "0.8";
            img.style.borderRadius = "10px";
            img.style.boxShadow = "2px 2px 10px rgba(0, 0, 0, 0.2)";
            img.style.position = "absolute";
    
            let placed = false;
            let maxAttempts = 100; // Tries to find a good position
    
            while (!placed && maxAttempts > 0) {
                let leftPos = Math.random() * (window.innerWidth - imgWidth - padding);
                let topPos = Math.random() * (window.innerHeight - imgHeight - padding);
    
                // Check if new position overlaps with existing images
                let overlapping = placedImages.some(existing => {
                    return (
                        leftPos < existing.left + imgWidth + padding &&
                        leftPos + imgWidth + padding > existing.left &&
                        topPos < existing.top + imgHeight + padding &&
                        topPos + imgHeight + padding > existing.top
                    );
                });
    
                if (!overlapping) {
                    img.style.left = `${leftPos}px`;
                    img.style.top = `${topPos}px`;
                    placedImages.push({ left: leftPos, top: topPos });
                    placed = true;
                }
                maxAttempts--;
            }
    
            // If still not placed, allow overlapping
            if (!placed) {
                img.style.left = `${Math.random() * (window.innerWidth - imgWidth)}px`;
                img.style.top = `${Math.random() * (window.innerHeight - imgHeight)}px`;
            }
    
            // Random rotation
            img.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
    
            imageContainer.appendChild(img);
        }
    }
    
    
    function handleResize() {
        placeImages();
    }
    
    window.addEventListener("resize", handleResize);
    
    

    
    
});
