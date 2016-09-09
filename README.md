# Calculator

The service offers an endpoint that reads a string input and parses it. It should return either a HTTP error code or a solution for the calculation in JSON form.

An example of calculus query:
- Original query: 2 * (23/(3*3))- 23 * (2*3)
- With encoding: MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk=


GET /calculus?query=MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk=

will return

{"error":false,"message":"-132.888888888888886"}
