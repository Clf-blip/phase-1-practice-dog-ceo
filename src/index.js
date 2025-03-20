document.addEventListener("DOMContentLoaded", () => {
    console.log('%c HI', 'color: firebrick');

    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imageContainer = document.getElementById("dog-image-container");
    const breedList = document.getElementById("dog-breeds");
    const breedDropdown = document.getElementById("breed-dropdown");

    // Challenge 1: Fetch and display dog images
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            data.message.forEach(imgSrc => {
                const img = document.createElement("img");
                img.src = imgSrc;
                img.alt = "Random Dog";
                img.style.width = "200px";
                img.style.margin = "10px";
                imageContainer.appendChild(img);
            });
        })
        .catch(error => console.error("Error fetching dog images:", error));

    // Challenge 2: Fetch and display dog breeds
    let allBreeds = {};
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            allBreeds = data.message;
            renderBreeds(Object.keys(allBreeds));
        })
        .catch(error => console.error("Error fetching dog breeds:", error));

    function renderBreeds(breeds) {
        breedList.innerHTML = ""; // Clear previous breeds
        breeds.forEach(breed => {
            const li = document.createElement("li");
            li.textContent = breed;
            li.style.cursor = "pointer";
            li.addEventListener("click", () => {
                li.style.color = "blue"; // Challenge 3: Change color on click
            });
            breedList.appendChild(li);
        });
    }

    // Challenge 4: Filter breeds by first letter
    breedDropdown.addEventListener("change", (event) => {
        const selectedLetter = event.target.value;
        const filteredBreeds = Object.keys(allBreeds).filter(breed => breed.startsWith(selectedLetter));
        renderBreeds(filteredBreeds);
    });
});
