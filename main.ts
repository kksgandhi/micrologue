type utterance = {
    readonly speaker:        string,
    readonly text:           string
    readonly showUtterance?: () => boolean,
}

type link = {
    readonly text:         string,
    readonly passageTitle: string
    readonly showLink?:    () => boolean,
}

type passage = {
    readonly utterances:    utterance[],
    readonly links:         link[]
    readonly onEnter?:      () => void,
    readonly onLinkRender?: () => void,
    readonly onExit?:       () => void,
    readonly autoLink?:     string,
}

type passages = {
    [passageTitle: string]: passage
}

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
    // No links in the passage? Check for an autolink
    if (passage.links.length === 0) {
        passage.onExit?.();
        onAnyExit(passage);
        // and go there if an autolink is found
        if ('autoLink' in passage) renderPassageGeneric(getPassage(passage.autoLink!));
        else console.warn("Links were empty and there was no autolink. Is this the end of your story or did you mess up somewhere?");
    }
    else {
        // Oh there are links? Let's insert them
        passage.links.forEach(link => {
            // render the link only if the link has no "showLink" hook or if the showLink hook passes
            if (!('showLink' in link) || link.showLink!()) {
                let linkElem = document.createElement("a");
                linkElem.innerText = link.text;
                // Set the onclick property to render the next passage
                linkElem.onclick = () => {
                    // don't do anything if the link has been clicked in the past (or if the link was unclicked, but part of a group of links where another one was clicked)
                    if (linkElem.getAttribute("class") === "clicked") return false;
                    if (linkElem.getAttribute("class") === "old-link") return false;
                    else {
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
                        // render the passage this points to
                        renderPassageGeneric(getPassage(link.passageTitle));
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

// rendering the passage without a typewriter effect
let renderPassageSimple = (passage: passage) => {
    let main = document.getElementById("main")!;
    // simple append of all the passages
    passage.utterances.forEach(utterance => {
        // render the utterance only if the utterance has no "showUtterance" hook or if the showUtterance hook passes
        if (!('showUtterance' in utterance) || utterance.showUtterance!()) {
            let utteranceElem = document.createElement("p");
            utteranceElem.setAttribute("class", utterance.speaker);
            utteranceElem.innerText = utterance.text;
            main.appendChild(utteranceElem);
        }
    });
    renderLinksGeneric(main, passage);
}

let sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
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
            let characters = Array.from(utterance.text);
            // instead of blindly appending the text, split it up into an array of characters and loop through
            for (let charidx in characters) {
                let character = characters[charidx];
                // a space has to be converted to a non breaking space because HTML is silly
                if (character === " ") character = "&nbsp;"
                // append the character to the HTML paragraph. Replace any previous non breaking spaces for simplicity and to enable word breaking.
                utteranceElem.innerHTML = utteranceElem.innerHTML.replace("&nbsp;", " ") + character;
                // if the character was punctuation, wait a bit longer
                if (character === ".") await sleep(periodDelay);
                if (character === ":") await sleep(periodDelay);
                if (character === ";") await sleep(periodDelay);
                if (character === "!") await sleep(periodDelay);
                if (character === "?") await sleep(periodDelay);
                if (character === "-") await sleep(periodDelay);
                if (character === ",") await sleep(commaDelay);
                // wait between characters
                await sleep(timeBetweenLetters);
            }
            // wait between speakers
            await sleep(timeBetweenSpeakers);
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
