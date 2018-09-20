// @flow
import React from 'react';

import Revision from './Revision'
import RevisionDiff from './RevisionDiff'

type Props = {
  revisions?: Array<any>,
  diffOpened?: Object,
  onDiffOpenClicked: Function,
};

export default class PageRevisionList extends React.Component {
  props: Props;
  render() {
    const revisions = this.props.revisions
    const revisionCount = this.props.revisions.length

    const revisionList = this.props.revisions.map((revision, idx) => {
      const revisionId = revision._id
      const revisionDiffOpened = this.props.diffOpened[revisionId] || false

      let previousRevision
      if (idx + 1 < revisionCount) {
        previousRevision = revisions[idx + 1]
      } else {
        previousRevision = revision // if it is the first revision, show full text as diff text
      }

      return (
        <div className="revision-hisory-outer" key={'revision-history-' + revisionId}>
          <Revision revision={revision} onDiffOpenClicked={this.props.onDiffOpenClicked} key={'revision-history-rev-' + revisionId} />
          <RevisionDiff
            revisionDiffOpened={revisionDiffOpened}
            currentRevision={revision}
            previousRevision={previousRevision}
            key={'revision-diff-' + revisionId}
          />
        </div>
      )
    })

    return <div className="revision-history-list">{revisionList}</div>
  }
}
