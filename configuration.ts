// What passage should the game start on?
let startingPassageTitle = "intro";
// Should unclicked links be cleared away?
let clearOldLinks = true;
// leave it as true when working on the project, set it to false when publishing the project.
let debug = true;

// TYPEWRITER EFFECT
// Enable typewriter effect
let doTypewriterEffect = true;
// Time between letters for a speaker, assuming you are using typewriter effect (milliseconds)
let timeBetweenLetters = 30;
// Time between speakers, assuming you are using typewriter effect (milliseconds)
let timeBetweenSpeakers = 300;
// How much extra delay should a comma have?
let commaDelay = 150;
// How much extra delay should a period and other punction (example !?:) have?
let periodDelay = 300;

// JS hooks
// runs on entering any passage
let onAnyEnter      = (passage: passage) => console.log(`Entering ${getPassageTitle(passage)}`)
// runs on exiting any passage
let onAnyExit       = (passage: passage) => console.log(`Exiting ${getPassageTitle(passage)}`)
// runs on the links rendering for any passage
let onAnyLinkRender = (passage: passage) => console.log(`Links rendering for ${getPassageTitle(passage)}`)
