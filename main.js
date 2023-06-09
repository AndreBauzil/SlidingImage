const track = document.getElementById("image-track");   // gets the image track

const handleOnDown = e => { // When the mouse is down on the window
    track.dataset.mouseDownAt = e.clientX; // Get the x position of the mouse and store it in the track
}

const handleOnMove = e => { // When the mouse is moved on the window
    if (track.dataset.mouseDownAt === "0") return;
    
    // Relative position and maximum distance
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX, // Subtracts the current position (clientX) from the starting position point (mouseDownAt)  
        maxDelta = window.innerWidth / 2; // Get the maximum distance, that its one half of the width window

    // Percentage of the mouse movement by dividing the relative position with the maximum distance 
    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;   
        Math.min(nextPercentage, 0);
        Math.max(nextPercentage, -100);
    track.dataset.percentage = nextPercentage;

    track.style.transform = `translate(${nextPercentage}%, -50%)`;

}

const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";   
    track.dataset.prevPercentage = track.dataset.percentage;
}




window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);
