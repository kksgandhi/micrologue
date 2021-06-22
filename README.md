Micrologue
==========

Micrologue is an interactive fiction (text based adventure) engine focused on dialogues between the player and a number of NPCs (Non Player Characters). These dialogues are simple, a number of NPCs say their lines, then the player is given options to respond. After the player chooses a response, the NPCs respond and the cycle starts anew.

If your game doesn't fit into this mold, I suggest looking into [Twine](https://twinery.org/). [Here is a megalist of Twine resources.](https://twinelab.net/twine-resources/#/) Remember, micrologue is a standalone engine, not a Twine format. If you are interested in a Twine format that does something similar to micrologue, I suggest checking out [trialogue](https://github.com/phivk/trialogue)

If you don't have any coding experience, this should still be easy to use.

If you have a lot of coding expertise, the fact that this is written in raw javascript means that it should be flexible and extensible, though depending on your need [Twine](https://twinery.org/) might still be better.

Beginner's Guide
----------------

Instructions for those who just want to check out the project, or don't have much coding skill.

Go to the releases section on the right, download `release.zip` from the latest release, unzip it, and open `index.html`

 - You can change `<title>` in index.html to give your story a new title
 - You can change `solarized-dark` to `solarized-light` in index.html to change the colorscheme from light to dark.
 - You can change the colors for the various speakers in `speakers.css`

To actually write your own text, open `passages.js`. There is some commenting within the file that should hopefully help you along.

Advanced Guide
--------------

Clone the repository and use the typescript compiler to compile passages.ts and main.ts into their respective js files.

TODO
----

 - Start passage as variable
 - Typewriter effect
 - Find a way to export to a single minified file
 - Add light / dark mode switch
