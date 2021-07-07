/**
 * I did my best with this documentation, but it's still not the best. If others start using this, I'll update it
 */
let passages: passages = {
    /* intro is the first passage
     * A passage is defined as "passage title" followed by a : followed by a {
     * The passage goes until }
     * For more information, look up json notation
     */
    "intro": {
        /*
         * Each passage has a list of "utterances" which are the actual lines of dialogue
         */
        utterances: [{
            speaker: "primo",
            text: "Hi, I am the first speaker. I am speaking. Isn't speaking great?"
        },{
            speaker: "green_speaker",
            text: "I am the second speaker, I've been recolored green. Being green is amazing.",
        }, {
            speaker: "primo",
            text: "Using HTML, I can <b>bold</b> and <em>emphasize</em> things.",
        }],
        // Each passage also has links. text is the displayed text, passageTitle is where it goes
        links: [{
            text: "Go to second passage",
            passageTitle: "second passage"
        }]
    },
    "second passage": {
        utterances: [{
            speaker: "primo",
            text: "Second passage here",
        },{
            speaker: "green_speaker",
            text: "I remain green.",
        },],
        links: [{
            text: "Re-do the second passage",
            passageTitle: "second passage",
        },{
            text: "Back to the beginnning!",
            passageTitle: "intro"
        }, {
            text: "This also goes to the second passage, but the wording of the link is different",
            passageTitle: "second passage"
        }, {
            text: "See the power of javascript",
            passageTitle: "js passage"
        }, {
            text: "See other features",
            passageTitle: "other features"
        }]
    },
    // Here is an empty passage for all your copy pasting needs
    "empty": {
        utterances: [
            { speaker: "", text: "" },
        ],
        links: [
            { text: "", passageTitle: "" },
        ]
    },
    // If you are a beginner, the following passages will show off advanced features that you may want to avoid just now for the sake of simplicity
    "js passage": {
        utterances: [{
            speaker: "primo",
            text: "This passage has the power of javascript (aka it should put out some alerts)",
            // showUtterance is a lambda that decides whether or not this utterance should be shown
            showUtterance: () => true,
        },{
            speaker: "green_speaker",
            text: "This utterance will not be shown because the lambda evaluates to false",
            showUtterance: () => 2 + 2 === 5,
        }],
        links: [{
            text: "Re-do the second passage",
            passageTitle: "second passage",
            // onLinkClick is a hook that is run if this specific link is clicked
            onLinkClick: () => alert("You clicked going back to the second passage"),
        },{
            text: "Back to the beginnning!",
            passageTitle: "intro",
            onLinkClick: () => alert("You clicked going back to the beginning"),
        }, {
            text: "Want more alerts?",
            passageTitle: "js passage",
            onLinkClick: () => alert("You clicked asking for more alerts"),
        }, {
            text: "This link won't be shown because its lambda evaluates to false",
            passageTitle: "js passage",
            // Just like showUtterance, there is showLink, which is a lambda that decides if a link should appear
            showLink: () => false,
        }],
        // add javascript hooks to your passages. Unfortunately to use this you'll need some coding experience
        // These properties are optional for any passage
        onEnter:      () => alert("You have entered this passage"),
        onExit:       () => alert("You are exiting the passage"),
        onLinkRender: () => alert("The links are rendering"),
    },
    "other features": {
        utterances: [{
            speaker: "primo",
            text: "This text has no typewriter effect.<br><br>Linebreak with br <br><br> In addition, it has 'additionalDelay', which means there will be a longer wait after it is done rendering.", noTypewriter: true, additionalDelay: () => 2000,
        }, {
            speaker: "primo",
            text: "This text will be ignored because dynamicText takes precedence",
            // The output of the dynamicText function will be displayed, and 'text' will be ignored
            // Template literals make this easier
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#description
            dynamicText: () => "Here is some dynamic text: The current date is " + new Date(),
        }, {
            speaker: "primo",
            text: "Here is an image. All I had to do was put an img html tag as the speaker text",
        }, {
            speaker: "primo",
            text: "<img src=\"imgs/sun-warm.png\"></img><hr>", noTypewriter: true
        }, {
            speaker: "green_speaker",
            text: "This passage has an autolink, and will return to the second passage without any user interaction"
        }],
        // If the autoLink function returns a non-empty string, the links array will be ignored
        links: [{ text: "This link will be ignored due to the autolink", passageTitle: "second passage"}],
        // and add a parameter called autoLink with the passage name of whatever passage you want to automatically go to
        // If you don't know js and are unsure what the () => is about, don't worry about it, you can just copy it for future autolinks
        autoLink: () => "second passage",
    },
}
