'use strict'

import ignore from 'ignore'
import { toggleDiff } from '../collapse-diff'

let ig
let autocollapseDeletedFiles

export function init(autocollapsePaths, collapseDeletedFiles) {
    ig = ignore().add(autocollapsePaths)
    autocollapseDeletedFiles = collapseDeletedFiles
}

export function collapseIfNeeded(section) {
    if (ig) {
        collapseIfNeededAsync(section)
    } else {
        console.error(
            `refined-bitbucket: You need to call \`.${init.name}\` before \`.${
                collapseIfNeeded.name
            }\``
        )
    }
}

function collapseIfNeededAsync(section) {
    const filename = section.getAttribute('data-filename').trim()
    const isDeleted = section.querySelector(
        'h1.filename span.diff-entry-lozenge.aui-lozenge-error'
    )

    const shouldCollapse =
        ig.ignores(filename) || (autocollapseDeletedFiles && isDeleted)

    if (shouldCollapse) {
        toggleDiff(section)
    }
}
