avropipe for node
=================

This is a simple Node.js rewrite of avropipe.c

Use it to decode avro messages as they come into stdin.

### Usage

Clone the repo and install node_modules

    yarn install

Run and pipe messages to it

    yarn start < message.bin

Messages will be converted to JSON and returned on stdout. Any message that can not be decoded will be logged as-is.

### Caveats

Currently this is a very simple implementation that expects all messages to be separated by NEWLINE. Messages that include newlines will likely fail to be decoded.
