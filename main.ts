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

let renderPassage = (passage: passage) => {
    let main = document.getElementById("main")!;
    passage.utterances.map(utterance => {
        let utteranceElem = document.createElement("p");
        utteranceElem.setAttribute("class", utterance.speaker);
        utteranceElem.innerText = utterance.text;
        main.appendChild(utteranceElem);
    });
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
                renderPassage(passages[link.passageTitle]);
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

renderPassage(passages[startingPassageTitle]);
