type utterance = {
    speaker: string,
    text:    string
}

type link = {
    text:         string,
    passageTitle: string
}

type passage = {
    utterances: utterance[],
    links:      link[]
}

type passages = {
    [passageTitle: string]: passage
}

type renderer = (passage: passage) => void;

let renderLinksGeneric = (main: Element, links: link[], renderer: renderer) => {
    links.forEach(link => {
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
                renderer(passages[link.passageTitle]);
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
                return false;
            }
        };
        linkElem.setAttribute("class", "unclicked");
        main.appendChild(linkElem);
        main.appendChild(document.createElement("br"));
        main.appendChild(document.createElement("br"));
    });
}

let renderPassageSimple = (passage: passage) => {
    let main = document.getElementById("main")!;
    passage.utterances.forEach(utterance => {
        let utteranceElem = document.createElement("p");
        utteranceElem.setAttribute("class", utterance.speaker);
        utteranceElem.innerText = utterance.text;
        main.appendChild(utteranceElem);
    });
    renderLinksGeneric(main, passage.links, renderPassageSimple);
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
            await sleep(timeBetweenLetters);
        }
        await sleep(timeBetweenSpeakers);
    }
    /**
    passage.utterances.forEach(async (utterance) => {
        let utteranceElem = document.createElement("p");
        utteranceElem.setAttribute("class", utterance.speaker);
        main.appendChild(utteranceElem);
        utterance.text.split('').forEach(async (character) => {
            utteranceElem.innerText = utteranceElem.innerText + character;
            await sleep(5);
        });
    });
    */
    renderLinksGeneric(main, passage.links, renderPassageTypewriter);
}

if (doTypewriterEffect)
    renderPassageTypewriter(passages[startingPassageTitle]);
else
    renderPassageSimple(passages[startingPassageTitle]);
