// What passage should the game start on?
let startingPassageTitle = "intro";
// Should unclicked links be cleared away?
let clearOldLinks = true;
// leave it as true when working on the project, set it to false when publishing the project.
let debug = true;
// change to "light" to start with a light colorscheme
let defaultColorScheme = "dark";

// TYPEWRITER EFFECT
// Enable typewriter effect
let doTypewriterEffect = true;
// The number of milliseconds waited between typing out individual letters (assuming you are using typewriter effect)
let baseDelay = 30;
// Multiply this by baseDelay to get the number of milliseconds waited between speakers
let delayBetweenSpeakers = 10;
// Multiply this by baseDelay to get the number of milliseconds waited after a comma
let delayComma = 3;
// Multiply this by baseDelay to get the number of milliseconds waited after punctuation (.:;!?-)
let delayPunctuation = 7;

// JS hooks
// runs on entering any passage
let onAnyEnter      = (passage: passage) => console.log(`Entering ${getPassageTitle(passage)}`)
// runs on exiting any passage
let onAnyExit       = (passage: passage) => console.log(`Exiting ${getPassageTitle(passage)}`)
// runs on the links rendering for any passage
let onAnyLinkRender = (passage: passage) => console.log(`Links rendering for ${getPassageTitle(passage)}`)
