let passages: passages = {
    /* intro is the first passage
     * A passage is defined as "passage title" followed by a : followed by a {
     * The passage goes until }
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
            text: "More words. Words words words.",
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
            text: "Congrats, you've made it to the second passage."
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
        }]
    },
    "js passage": {
        utterances: [{
            speaker: "primo",
            text: "This passage has the power of javascript (aka it should put out some alerts)"
        }],
        links: [{
            text: "Re-do the second passage",
            passageTitle: "second passage",
        },{
            text: "Back to the beginnning!",
            passageTitle: "intro"
        }, {
            text: "Want more alerts?",
            passageTitle: "js passage"
        }],
        // add javascript hooks to your passages. Unfortunately to use this you'll need some coding experience
        // These properties are optional for any passage
        onEnter:      () => alert("You have entered this passage"),
        onExit:       () => alert("You are exiting the passage"),
        onLinkRender: () => alert("The links are rendering"),
    }
}
