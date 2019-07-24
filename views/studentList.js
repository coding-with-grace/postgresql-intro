const html = require('html-template-tag')

module.exports = students => html`<html>
    <body>
        ${students.map((student) =>
                html`<div>
                <p>${student.name} studies ${student.major}.</p>
                </div>`
            )}
    </body>
<html>`
