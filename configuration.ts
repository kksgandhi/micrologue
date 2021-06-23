// What passage should the game start on?
let startingPassageTitle = "intro";
// Should unclicked links be cleared away?
let clearOldLinks = true;

// TYPEWRITER EFFECT
// Enable typewriter effect
let doTypewriterEffect = true;
// Time between letters for a speaker, assuming you are using typewriter effect (milliseconds)
let timeBetweenLetters = 0;
// Time between speakers, assuming you are using typewriter effect (milliseconds)
let timeBetweenSpeakers = 0;

// JS hooks
// runs on entering any passage
let onAnyEnter      = (passage: passage) => console.log(`Entering ${getPassageTitle(passage)}`)
// runs on exiting any passage
let onAnyExit       = (passage: passage) => console.log(`Exiting ${getPassageTitle(passage)}`)
// runs on the links rendering for any passage
let onAnyLinkRender = (passage: passage) => console.log(`Links rendering for ${getPassageTitle(passage)}`)
