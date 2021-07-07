type utterance = {
    readonly speaker:          string,
    readonly text:             string
    readonly showUtterance?:   () => boolean,
    readonly dynamicText?:     () => string,
    readonly noTypewriter?:    boolean,
    readonly additionalDelay?: () => number,
}

type link = {
    readonly text:              string,
    readonly passageTitle:      string
    readonly showLink?:         () => boolean,
    readonly dynamicText?:      () => boolean,
    readonly onLinkClick?:      () => void,
    readonly dynamicReference?: () => string,
    readonly ignoreDebug?:      boolean,
}

type passage = {
    readonly utterances:    utterance[],
    readonly links:         link[]
    readonly onEnter?:      () => void,
    readonly onLinkRender?: () => void,
    readonly onExit?:       () => void,
    readonly autoLink?:     () => string,
    readonly ignoreDebug?:  boolean,
}

type passages = {
    [passageTitle: string]: passage
}

let delay = baseDelay;

// given a string passageName, get the appropriate passage
let getPassage = (passageName: string) => {
    if (passageName in passages) return passages[passageName];
    else {
        // error out if the passage doesn't exist
        alert("This passage doesn't lead anywhere");
        return passages[startingPassageTitle];
    }
}

// reverse search, given a passage, get its title
let getPassageTitle = (passage: passage) => Object.keys(passages).find(key => passages[key] === passage);

let scrollToBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

// whether you are using typewriter passage rendering or not, the links are rendered in the same way through this function.
let renderLinksGeneric = (main: Element, passage: passage) => {
    // Check for an autolink
    let autoLinkTarget = passage.autoLink?.();
    if (autoLinkTarget) {
        passage.onExit?.();
        onAnyExit(passage);
        // if it exists, go there
        renderPassageGeneric(getPassage(autoLinkTarget));
    }
    else {
        // Autolink didn't exist or returned an empty string, let's render the links
        passage.links.forEach(link => {
            // render the link only if the link has no "showLink" hook or if the showLink hook passes
            if (!('showLink' in link) || link.showLink!()) {
                let linkElem = document.createElement("a");
                linkElem.innerHTML = link.text;
                // Set the onclick property to render the next passage
                linkElem.onclick = () => {
                    // don't do anything if the link has been clicked in the past (or if the link was unclicked, but part of a group of links where another one was clicked)
                    if (linkElem.getAttribute("class") === "clicked") return false;
                    if (linkElem.getAttribute("class") === "old-link") return false;
                    else {
                        link.onLinkClick?.();
                        // set this link as clicked
                        linkElem.setAttribute("class", "clicked");
                        // either remove all the other unclicked links, or mark them as an old links
                        Array.from(document.getElementsByClassName("unclicked"))
                            .forEach(elem => {
                                if (clearOldLinks) elem.remove();
                                else elem.setAttribute("class", "old-link")
                            });
                        // run the onExit hooks
                        passage.onExit?.();
                        onAnyExit(passage);
                        // render the passage this points to. Use the dynamicReference if it exists, or just the normal reference
                        renderPassageGeneric(getPassage(link.dynamicReference?.() || link.passageTitle));
                        scrollToBottom();
                        return false;
                    }
                };
                // set as unclicked and append to the main flow
                linkElem.setAttribute("class", "unclicked");
                main.appendChild(linkElem);
                main.appendChild(document.createElement("br"));
                main.appendChild(document.createElement("br"));
                scrollToBottom();
            }
        });
    }
    // run links rendering hook
    passage.onLinkRender?.();
    onAnyLinkRender(passage);
}

let sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
// rendering the passage without a typewriter effect
let renderPassageSimple = async (passage: passage) => {
    let main = document.getElementById("main")!;
    // simple append of all the passages
    for (let idx in passage.utterances) {
        let utterance = passage.utterances[idx];
        // render the utterance only if the utterance has no "showUtterance" hook or if the showUtterance hook passes
        if (!('showUtterance' in utterance) || utterance.showUtterance!()) {
            let utteranceElem = document.createElement("p");
            utteranceElem.setAttribute("class", `${utterance.speaker} fade-in`);
            // Use the dynamic text if it exists, else use the normal text
            utteranceElem.innerHTML = utterance.dynamicText?.() || utterance.text;
            main.appendChild(utteranceElem);
            // if the passage has additionalDelay, delay that much as well
            if ('additionalDelay' in utterance) {
                console.log("ADDITIONAL DELAY NO TYPEWRITER");
                await sleep(utterance.additionalDelay!());
            }
        }
    }
    renderLinksGeneric(main, passage);
}

// render passage with a typewriter effect.
let renderPassageTypewriter = async (passage: passage) => {
    let main = document.getElementById("main")!;
    // unfortunately we have to use for loops because the lambdas in map don't work easily with async
    // for every utterance...
    for (let idx in passage.utterances) {
        let utterance = passage.utterances[idx];
        // render the utterance only if the utterance has no "showUtterance" hook or if the showUtterance hook passes
        if (!('showUtterance' in utterance) || utterance.showUtterance!()) {
            let utteranceElem = document.createElement("p");
            utteranceElem.setAttribute("class", utterance.speaker);
            main.appendChild(utteranceElem);
            // Use the dynamic text if it exists, else use the normal text
            let characters = utterance.dynamicText?.() || utterance.text;
            // if noTypewriter, just set it and move on.
            if (utterance.noTypewriter) {
                utteranceElem.innerHTML = characters;
                utteranceElem.setAttribute("class", `${utterance.speaker} fade-in`);
            }
            else
                // for every character index...
                for (let charidx = 0; charidx < characters.length; charidx++) {
                    // convert the innerHTML into the substring upto that index
                    utteranceElem.innerHTML = characters.slice(0, charidx + 1);
                    let character = characters[charidx];
                    // if the character was a comma wait a bit
                    if (character === ",") 
                        await sleep(delayComma * delay);
                    // if the character was other punctuation, wait a bit longer
                    if (".:;!?-".split('').includes(character))
                        await sleep(delayPunctuation * delay);
                    // wait between characters
                    await sleep(delay);
                }
            // wait between speakers
            await sleep(delay * delayBetweenSpeakers);
            // if the passage has additionalDelay, delay that much as well
            if ('additionalDelay' in utterance)
                await sleep(utterance.additionalDelay!());
            scrollToBottom();
        }
    }
    // render the links
    renderLinksGeneric(main, passage);
}

// the entrypoint function for rendering any passage
let renderPassageGeneric = (passage: passage) => {
    // run the hooks
    passage.onEnter?.();
    onAnyEnter(passage);

    // render based on whether configuration asks for a typewriter effect or not
    if (doTypewriterEffect) renderPassageTypewriter(passage);
    else                    renderPassageSimple(passage);
}

// render the starting passage
renderPassageGeneric(passages[startingPassageTitle])

// Ensure there are no typos, hanging passages etc.
let validatePassages = () => {
    let doAlertIf = (doAlert: boolean, alertMsg: string) => {
        if (!doAlert) return;
        else {
            if (debug)
                alert(`${alertMsg}
                       
To silence this message, set "debug = false" in configuration.js or add ignoreDebug to the link / passage referenced`);
            else 
                console.warn(alertMsg);
        }
    }
    // all the titles except for 'empty'. Maybe this could be a configuration var, but it's fine for now
    let titlesNonEmpty = Object.keys(passages)
                               .filter(title => title !== "empty");
    titlesNonEmpty
          .forEach(title => {
              // for each passage...
              let passage = passages[title];
              // and the linkReferences in the passage
              let linkReferences = passage.links
                                              .filter(link => !link.ignoreDebug)
                                              .map(link => link.passageTitle);
              // is each linkReference included in the list of titles?
              linkReferences.forEach(linkReference => 
                  doAlertIf(
                      !titlesNonEmpty.includes(linkReference),
                      `Passage with title "${title}" contains link that leads to "${linkReference}" which does not exist`));
    });
    // make a mega list of all link references
    let allLinkReferences = Object
                                .values(passages)
                                .map(passage => {
                                    let simpleLinks = passage.links.map(link => link.passageTitle);
                                    if (simpleLinks.length === 0 && 'autoLink' in passage)
                                        return passage.autoLink!();
                                    else
                                        return simpleLinks;
                                })
                                // This is a list of lists, so let's flatten it
                                .flat();
    let allLinksAndIntro = allLinkReferences.concat([startingPassageTitle]);
    // is every title accounted for in the list of all the references?
    titlesNonEmpty.forEach(title => 
        doAlertIf(
            !(allLinksAndIntro.includes(title) || passages[title].ignoreDebug),
            `No way to get to passage with title "${title}"`));
}

validatePassages();

let textSpeedSlider = (document.getElementById("textSpeedSlider")! as HTMLInputElement);
textSpeedSlider.oninput = () => {
    // Make the slider a logistic curve
    let x = parseInt(textSpeedSlider.value);
    delay = 2 * baseDelay / (1 + Math.E ** (-0.005 * (500 - x)));
    console.log(`New text delay ${delay}`);
}

let colorSchemeChanger = document.getElementById("colorSchemeChanger")!;
let swapColorScheme = () => {
    let cssElement = document.getElementById("colorSchemeCSS")!;
    // what is the current theme, aka what css file is the main css pointing at?
    let curTheme = cssElement.getAttribute("href")!;
    // depending, decide on the new color changer icon and the new main css file
    let newTheme = curTheme === "solarized-dark.css" ? "solarized-light.css" : "solarized-dark.css";
    let newImg = curTheme === "solarized-dark.css" ? "imgs/moon-black.png" : "imgs/sun-warm.png";
    // Actually set the values
    cssElement.setAttribute("href", newTheme);
    colorSchemeChanger.setAttribute("src", newImg);
}
colorSchemeChanger.onclick = swapColorScheme;
if (defaultColorScheme === "light") swapColorScheme();

document.title = title;
