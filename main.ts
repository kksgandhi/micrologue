type utterance = {
    readonly speaker: string,
    readonly text:    string
}

type link = {
    readonly text:         string,
    readonly passageTitle: string
}

type passage = {
    readonly utterances:    utterance[],
    readonly links:         link[]
    readonly onEnter?:      () => void,
    readonly onLinkRender?: () => void,
    readonly onExit?:       () => void,
}

type passages = {
    [passageTitle: string]: passage
}

type renderer = (passage: passage) => void;

let renderLinksGeneric = (main: Element, passage: passage) => {
    passage.links.forEach(link => {
        let linkElem = document.createElement("a");
        linkElem.innerText = link.text;
        linkElem.onclick = () => {
            if (linkElem.getAttribute("class") === "clicked") return false;
            if (linkElem.getAttribute("class") === "unclicked-no-clear") return false;
            else {
                linkElem.setAttribute("class", "clicked");
                Array.from(document.getElementsByClassName("unclicked"))
                                   .forEach(elem => {
                                       if (clearOldLinks) elem.remove();
                                       else elem.setAttribute("class", "unclicked-no-clear")
                                   });
                renderPassageGeneric(passages[link.passageTitle]);
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
                if ('onExit' in passage) passage.onExit!();
                return false;
            }
        };
        linkElem.setAttribute("class", "unclicked");
        main.appendChild(linkElem);
        main.appendChild(document.createElement("br"));
        main.appendChild(document.createElement("br"));
    });
    if ('onLinkRender' in passage) passage.onLinkRender!();
}

let renderPassageSimple = (passage: passage) => {
    let main = document.getElementById("main")!;
    passage.utterances.forEach(utterance => {
        let utteranceElem = document.createElement("p");
        utteranceElem.setAttribute("class", utterance.speaker);
        utteranceElem.innerText = utterance.text;
        main.appendChild(utteranceElem);
    });
    renderLinksGeneric(main, passage);
}

let sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
let renderPassageTypewriter = async (passage: passage) => {
    let main = document.getElementById("main")!;
    for (let idx in passage.utterances) {
        let utterance = passage.utterances[idx];
        let utteranceElem = document.createElement("p");
        utteranceElem.setAttribute("class", utterance.speaker);
        main.appendChild(utteranceElem);
        let characters = Array.from(utterance.text);
        for (let charidx in characters) {
            let character = characters[charidx];
            if (character === " ") character = "&nbsp;"
            utteranceElem.innerHTML = utteranceElem.innerHTML + character;
            if (character === ".") await sleep(10 * timeBetweenLetters);
            if (character === ":") await sleep(10 * timeBetweenLetters);
            if (character === ";") await sleep(10 * timeBetweenLetters);
            if (character === "!") await sleep(10 * timeBetweenLetters);
            if (character === "-") await sleep(10 * timeBetweenLetters);
            if (character === ",") await sleep(5 * timeBetweenLetters);
            await sleep(timeBetweenLetters);
        }
        await sleep(timeBetweenSpeakers);
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }
    renderLinksGeneric(main, passage);
}

let renderPassageGeneric = (passage: passage) => {
    if ('onEnter' in passage) passage.onEnter!();

    if (doTypewriterEffect) renderPassageTypewriter(passage);
    else                    renderPassageSimple(passage);
}

renderPassageGeneric(passages[startingPassageTitle])

