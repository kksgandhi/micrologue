// Title of your game
let title = "Micrologue";
// What passage should the game start on?
let startingPassageTitle = "intro";
// change to "light" to start with a light colorscheme
let defaultColorScheme = "dark";
// Should the game yell at you when you have passages that don't lead anywhere? Set this to false and warning messages will go to the console instead.
let debug = true;
// Should unclicked links be cleared away?
let clearOldLinks = true;

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
