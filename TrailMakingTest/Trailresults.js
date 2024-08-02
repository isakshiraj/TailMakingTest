// document.addEventListener('DOMContentLoaded', () => {
//     const partATime = localStorage.getItem('partATiming');
//     const partBTime = localStorage.getItem('partBTiming');
//     const username = localStorage.getItem('username');
    
//     if (!partATime || !partBTime || !username) {
//         console.error('Timing data or username not found in localStorage');
//         return;
//     }

//     const partATimeElement = document.getElementById('partA-time');
//     const partAInterpretationElement = document.getElementById('partA-interpretation');
//     const partBTimeElement = document.getElementById('partB-time');
//     const partBInterpretationElement = document.getElementById('partB-interpretation');


//     if (!partATimeElement || !partAInterpretationElement || !partATimeElement || !partBInterpretationElement) {
//         console.error('One or more result elements not found');
//         return;
//     }

//     const partASeconds = convertTimeToSeconds(partATime);
//     const partBSeconds = convertTimeToSeconds(partBTime);

//     partATimeElement.innerHTML = `Part A<br><span class="time">Time: ${partASeconds} seconds</span>`;
//     partBTimeElement.innerHTML = `Part B<br><span class="time">Time: ${partBSeconds} seconds</span>`;

//     const standardPartATime = 40; // in seconds
//     const standardPartBTime = 91; // in seconds

//     if (partASeconds <= standardPartATime) {
//         partAInterpretationElement.innerHTML = "<span class='bold'>Interpretation:</span> Strong cognitive flexibility and attentional control. Shorter completion times and accuracy in connecting the trails suggest efficient planning skills.";
//     } else {
//         partAInterpretationElement.innerHTML = "<span class='bold'>Interpretation:</span> Weak cognitive flexibility and attentional control. Longer completion times and inaccuracies in connecting the trails suggest inefficient planning skills.";
//     }

//     if (partBSeconds <= standardPartBTime) {
//         partBInterpretationElement.innerHTML = "<span class='bold'>Interpretation:</span> Strong cognitive flexibility and attentional control on numbers. Shorter completion times and accuracy in connecting the trails suggest efficient planning skills.";
//     } else {
//         partBInterpretationElement.innerHTML = "<span class='bold'>Interpretation:</span> Weak cognitive flexibility and attentional control on numbers and letters. Longer completion times and inaccuracies in connecting the trails suggest inefficient planning skills.";
//     }


// // Call saveResult to store the timing data
// saveResulttTrailMaking(username, partATime, partBTime);

// const backToDashboardButton = document.getElementById('back-to-dashboard-button');

// if (backToDashboardButton) {
//     backToDashboardButton.addEventListener('click', function() {
//         window.location.href = `/dashboard?username=${username}`;
//     });
// } else {
//     console.error('Back to Dashboard button not found');
// }
// });




// function convertTimeToSeconds(time) {
//     const [minutes, seconds] = time.split(':').map(Number);
//     return minutes * 60 + seconds;
// }


// function saveResultTrailMaking(username, partATiming, partBTiming) {
//     fetch('/save-resultTrailMaking', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, partATiming, partBTiming })
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to save result.');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Result saved successfully:', data);
//         // Optionally handle success message or redirect here
//     })
//     .catch(error => {
//         console.error('Error saving result:', error);
//         // Optionally handle error message here
//     });
// }

   

document.addEventListener('DOMContentLoaded', () => {
    const partATime = localStorage.getItem('partATiming');
    const partBTime = localStorage.getItem('partBTiming');
    const username = localStorage.getItem('username');
    
    if (!partATime || !partBTime || !username) {
        console.error('Timing data or username not found in localStorage');
        return;
    }

    const partATimeElement = document.getElementById('partA-time');
    const partAInterpretationElement = document.getElementById('partA-interpretation');
    const partBTimeElement = document.getElementById('partB-time');
    const partBInterpretationElement = document.getElementById('partB-interpretation');

    if (!partATimeElement || !partAInterpretationElement || !partBTimeElement || !partBInterpretationElement) {
        console.error('One or more result elements not found');
        return;
    }

    const partASeconds = convertTimeToSeconds(partATime);
    const partBSeconds = convertTimeToSeconds(partBTime);

    partATimeElement.innerHTML = `Part A<br><span class="time">Time: ${partASeconds} seconds</span>`;
    partBTimeElement.innerHTML = `Part B<br><span class="time">Time: ${partBSeconds} seconds</span>`;

    const standardPartATime = 40; // in seconds
    const standardPartBTime = 91; // in seconds

    if (partASeconds <= standardPartATime) {
        partAInterpretationElement.innerHTML = "<span class='bold'>Interpretation:</span> Strong cognitive flexibility and attentional control. Shorter completion times and accuracy in connecting the trails suggest efficient planning skills.";
    } else {
        partAInterpretationElement.innerHTML = "<span class='bold'>Interpretation:</span> Weak cognitive flexibility and attentional control. Longer completion times and inaccuracies in connecting the trails suggest inefficient planning skills.";
    }

    if (partBSeconds <= standardPartBTime) {
        partBInterpretationElement.innerHTML = "<span class='bold'>Interpretation:</span> Strong cognitive flexibility and attentional control on numbers. Shorter completion times and accuracy in connecting the trails suggest efficient planning skills.";
    } else {
        partBInterpretationElement.innerHTML = "<span class='bold'>Interpretation:</span> Weak cognitive flexibility and attentional control on numbers and letters. Longer completion times and inaccuracies in connecting the trails suggest inefficient planning skills.";
    }

    // Call saveResultTrailMaking to store the timing data
    saveResultTrailMaking(username, partATime, partBTime);

    const backToDashboardButton = document.getElementById('back-to-dashboard-button');

    if (backToDashboardButton) {
        backToDashboardButton.addEventListener('click', function() {
            window.location.href = `/dashboard?username=${username}`;
        });
    } else {
        console.error('Back to Dashboard button not found');
    }
});

function convertTimeToSeconds(time) {
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
}

function saveResultTrailMaking(username, partATiming, partBTiming) {
    fetch('/save-resultTrailMaking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, partATiming, partBTiming })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to save result.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Result saved successfully:', data);
        // Optionally handle success message or redirect here
    })
    .catch(error => {
        console.error('Error saving result:', error);
        // Optionally handle error message here
    });
}
